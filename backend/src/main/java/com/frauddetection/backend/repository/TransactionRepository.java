package com.frauddetection.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.frauddetection.backend.model.TransactionRecord;

public interface TransactionRepository extends JpaRepository<TransactionRecord, Long> {
    List<TransactionRecord> findAllByOrderByCreatedAtDesc();
}