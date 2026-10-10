FROM python:3.12-slim

WORKDIR /app

COPY ml-service/requirements.txt .
RUN pip install --no-cache-dir --default-timeout=120 --retries 5 -r requirements.txt

COPY ml-service/main.py .
COPY models/fraud_model_paysim.pkl ./models/fraud_model_paysim.pkl

ENV MODEL_PATH=/app/models/fraud_model_paysim.pkl

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]