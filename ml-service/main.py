from fastapi import FastAPI
import joblib
from pydantic import BaseModel
import pandas as pd
import shap
import numpy as np

app = FastAPI()

# Loaded once, when the server starts - not on every request
model = joblib.load('../models/fraud_model.pkl')
explainer = shap.TreeExplainer(model)

@app.get("/")
def read_root():
    return {"message": "Fraud detection service is running"}

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "model_loaded": True,
        "n_features_expected": model.n_features_in_
    }

class Transaction(BaseModel):
    Time: float
    V1: float
    V2: float
    V3: float
    V4: float
    V5: float
    V6: float
    V7: float
    V8: float
    V9: float
    V10: float
    V11: float
    V12: float
    V13: float
    V14: float
    V15: float
    V16: float
    V17: float
    V18: float
    V19: float
    V20: float
    V21: float
    V22: float
    V23: float
    V24: float
    V25: float
    V26: float
    V27: float
    V28: float
    Amount: float

@app.post("/predict")
def predict(transaction: Transaction):
    input_df = pd.DataFrame([transaction.dict()])

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
        "top_contributing_features": top_features
    }
