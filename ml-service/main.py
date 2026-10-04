from fastapi import FastAPI, HTTPException
import joblib
from pydantic import BaseModel
import pandas as pd
import shap
import numpy as np

app = FastAPI()

model = joblib.load('../models/fraud_model_paysim.pkl')
explainer = shap.TreeExplainer(model)

@app.get("/")
def read_root():
    return {"message": "Fraud detection service is running"}

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "model_loaded": True,
        "n_features_expected": model.n_features_in_,
    }

class Transaction(BaseModel):
    step: int
    type: str
    amount: float
    oldbalanceOrg: float
    newbalanceOrig: float
    oldbalanceDest: float
    newbalanceDest: float
    isFlaggedFraud: int = 0

@app.post("/predict")
def predict(transaction: Transaction):
    try:
        data = transaction.dict()
        tx_type = data.pop('type')

        for t in ['CASH_OUT', 'DEBIT', 'PAYMENT', 'TRANSFER']:
            data[f'type_{t}'] = 1 if tx_type == t else 0

        input_df = pd.DataFrame([data])
        input_df = input_df.reindex(columns=model.feature_names_in_, fill_value=0)

        prediction = model.predict(input_df)[0]
        probability = model.predict_proba(input_df)[0][1]

        shap_values = explainer.shap_values(input_df)
        shap_values_fraud = shap_values[0, :, 1]

        feature_impact = list(zip(input_df.columns, shap_values_fraud))
        feature_impact.sort(key=lambda x: abs(x[1]), reverse=True)
        top_features = [{"feature": f, "impact": round(float(v), 4)} for f, v in feature_impact[:5]]

        return {
            "prediction": int(prediction),
            "fraud_probability": round(float(probability), 4),
            "top_contributing_features": top_features,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")