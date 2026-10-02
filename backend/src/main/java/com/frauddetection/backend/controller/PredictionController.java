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
        record.setTime(transaction.getTime());
        record.setV1(transaction.getV1());
        record.setV2(transaction.getV2());
        record.setV3(transaction.getV3());
        record.setV4(transaction.getV4());
        record.setV5(transaction.getV5());
        record.setV6(transaction.getV6());
        record.setV7(transaction.getV7());
        record.setV8(transaction.getV8());
        record.setV9(transaction.getV9());
        record.setV10(transaction.getV10());
        record.setV11(transaction.getV11());
        record.setV12(transaction.getV12());
        record.setV13(transaction.getV13());
        record.setV14(transaction.getV14());
        record.setV15(transaction.getV15());
        record.setV16(transaction.getV16());
        record.setV17(transaction.getV17());
        record.setV18(transaction.getV18());
        record.setV19(transaction.getV19());
        record.setV20(transaction.getV20());
        record.setV21(transaction.getV21());
        record.setV22(transaction.getV22());
        record.setV23(transaction.getV23());
        record.setV24(transaction.getV24());
        record.setV25(transaction.getV25());
        record.setV26(transaction.getV26());
        record.setV27(transaction.getV27());
        record.setV28(transaction.getV28());
        record.setAmount(transaction.getAmount());

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