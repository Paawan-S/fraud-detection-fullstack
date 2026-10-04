package com.frauddetection.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class TransactionRecord {

    @Id
    @GeneratedValue
    private Long id;

    private int step;
    private String type;
    private double amount;
    private double oldbalanceOrg;
    private double newbalanceOrig;
    private double oldbalanceDest;
    private double newbalanceDest;
    private int isFlaggedFraud;

    private int prediction;
    private double fraudProbability;
    private String topFeatures;
    private LocalDateTime createdAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public int getStep() { return step; }
    public void setStep(int step) { this.step = step; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
    public double getOldbalanceOrg() { return oldbalanceOrg; }
    public void setOldbalanceOrg(double oldbalanceOrg) { this.oldbalanceOrg = oldbalanceOrg; }
    public double getNewbalanceOrig() { return newbalanceOrig; }
    public void setNewbalanceOrig(double newbalanceOrig) { this.newbalanceOrig = newbalanceOrig; }
    public double getOldbalanceDest() { return oldbalanceDest; }
    public void setOldbalanceDest(double oldbalanceDest) { this.oldbalanceDest = oldbalanceDest; }
    public double getNewbalanceDest() { return newbalanceDest; }
    public void setNewbalanceDest(double newbalanceDest) { this.newbalanceDest = newbalanceDest; }
    public int getIsFlaggedFraud() { return isFlaggedFraud; }
    public void setIsFlaggedFraud(int isFlaggedFraud) { this.isFlaggedFraud = isFlaggedFraud; }
    public int getPrediction() { return prediction; }
    public void setPrediction(int prediction) { this.prediction = prediction; }
    public double getFraudProbability() { return fraudProbability; }
    public void setFraudProbability(double fraudProbability) { this.fraudProbability = fraudProbability; }
    public String getTopFeatures() { return topFeatures; }
    public void setTopFeatures(String topFeatures) { this.topFeatures = topFeatures; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}