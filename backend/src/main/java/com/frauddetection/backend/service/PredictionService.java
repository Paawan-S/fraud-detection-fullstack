package com.frauddetection.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.frauddetection.backend.dto.PredictionResponse;
import com.frauddetection.backend.model.Transaction;

@Service
public class PredictionService {

    @Value("${ml.service.url}")
    private String mlServiceUrl;

    private final RestClient restClient = RestClient.builder()
            .requestFactory(new SimpleClientHttpRequestFactory())
            .build();

    public PredictionResponse getPrediction(Transaction transaction) {
        return restClient.post()
                .uri(mlServiceUrl)
                .contentType(MediaType.APPLICATION_JSON)
                .body(transaction)
                .retrieve()
                .body(PredictionResponse.class);
    }
}