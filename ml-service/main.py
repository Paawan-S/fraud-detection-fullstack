from fastapi import FastAPI
import joblib

app = FastAPI()

# Loaded once, when the server starts - not on every request
model = joblib.load('../models/fraud_model.pkl')

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