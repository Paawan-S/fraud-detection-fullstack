package com.frauddetection.backend.service;

import com.frauddetection.backend.model.Transaction;
import com.frauddetection.backend.dto.PredictionResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class PredictionService {

    private final RestClient restClient = RestClient.create();

    public PredictionResponse getPrediction(Transaction transaction) {
        return restClient.post()
                .uri("http://localhost:8000/predict")
                .body(transaction)
                .retrieve()
                .body(PredictionResponse.class);
    }
}