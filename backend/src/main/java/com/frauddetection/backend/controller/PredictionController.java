package com.frauddetection.backend.controller;

import com.frauddetection.backend.model.Transaction;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PredictionController {

    @PostMapping("/api/transactions")
    public Transaction receiveTransaction(@RequestBody Transaction transaction) {
        return transaction;
    }
}