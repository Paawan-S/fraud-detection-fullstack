package com.frauddetection.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class PredictionResponse {

    private int prediction;

    @JsonProperty("fraud_probability")
    private double fraudProbability;

    @JsonProperty("top_contributing_features")
    private List<FeatureImpact> topContributingFeatures;

    public int getPrediction() { return prediction; }
    public void setPrediction(int prediction) { this.prediction = prediction; }
    public double getFraudProbability() { return fraudProbability; }
    public void setFraudProbability(double fraudProbability) { this.fraudProbability = fraudProbability; }
    public List<FeatureImpact> getTopContributingFeatures() { return topContributingFeatures; }
    public void setTopContributingFeatures(List<FeatureImpact> topContributingFeatures) { this.topContributingFeatures = topContributingFeatures; }

    public static class FeatureImpact {
        private String feature;
        private double impact;

        public String getFeature() { return feature; }
        public void setFeature(String feature) { this.feature = feature; }
        public double getImpact() { return impact; }
        public void setImpact(double impact) { this.impact = impact; }
    }
}