package com.frauddetection.backend.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.frauddetection.backend.dto.PredictionResponse;
import com.frauddetection.backend.model.Transaction;
import com.frauddetection.backend.model.TransactionRecord;
import com.frauddetection.backend.repository.TransactionRepository;
import com.frauddetection.backend.service.PredictionService;

@RestController
public class PredictionController {

    private final PredictionService predictionService;
    private final TransactionRepository transactionRepository;

    public PredictionController(PredictionService predictionService, TransactionRepository transactionRepository) {
        this.predictionService = predictionService;
        this.transactionRepository = transactionRepository;
    }

    @GetMapping("/api/transactions")
public List<TransactionRecord> getHistory() {
    return transactionRepository.findAllByOrderByCreatedAtDesc();
}

    @PostMapping("/api/transactions")
    public PredictionResponse receiveTransaction(@RequestBody Transaction transaction) {
        // 1. Call Python to get the actual prediction
        PredictionResponse prediction = predictionService.getPrediction(transaction);

        // 2. Build a record combining the transaction and the result
        TransactionRecord record = new TransactionRecord();
        record.setStep(transaction.getStep());
        record.setType(transaction.getType());
        record.setAmount(transaction.getAmount());
        record.setOldbalanceOrg(transaction.getOldbalanceOrg());
        record.setNewbalanceOrig(transaction.getNewbalanceOrig());
        record.setOldbalanceDest(transaction.getOldbalanceDest());
        record.setNewbalanceDest(transaction.getNewbalanceDest());
        record.setIsFlaggedFraud(transaction.getIsFlaggedFraud());

        record.setPrediction(prediction.getPrediction());
        record.setFraudProbability(prediction.getFraudProbability());
        record.setTopFeatures(
            prediction.getTopContributingFeatures().stream()
                .map(f -> f.getFeature() + " (" + f.getImpact() + ")")
                .collect(Collectors.joining(", "))
        );
        record.setCreatedAt(LocalDateTime.now());

        // 3. Save it to the database
        transactionRepository.save(record);

        // 4. Return the prediction to whoever called this endpoint
        return prediction;
    }
}