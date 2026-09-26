# Stage 1: Data Exploration Summary

**Dataset**: Credit Card Fraud Detection (ULB), 284,807 transactions, 31 columns
(Time, V1–V28 anonymized PCA features, Amount, Class), no missing values.

## Class Imbalance
- Genuine: 284,315 (99.827%)
- Fraud: 492 (0.173%)
- A model predicting "not fraud" for everything would score 99.83% accuracy
  while catching zero fraud — accuracy is not a usable metric here.

## Amount Patterns
- Fraud median amount (9.25) is lower than genuine (22.00), suggesting
  fraudsters often use small amounts to avoid detection.
- Fraud mean (122.21) is higher than genuine (88.29), and fraud's 75th
  percentile (105.89) exceeds genuine's (77.05) — fraud has more spread
  in its mid-to-upper range despite a lower typical value.
- Genuine transactions have far higher maximum values (up to 25,691)
  than fraud (up to 2,125).

## Time Patterns
- Time (seconds since first transaction) has near-zero correlation with
  fraud (-0.012) — no meaningful time-of-day fraud pattern in this data.

## Feature Correlations with Class
- Strongest negative correlations: V17 (-0.326), V14 (-0.303), V12 (-0.261),
  V10 (-0.217)
- Strongest positive correlations: V11 (0.155), V4 (0.133)
- These are the features most likely to drive the model's predictions.

## Implications for Stage 2
- Class imbalance must be addressed (SMOTE or class-weighting).
- Precision, Recall, and F1 will be used instead of accuracy.
- V17, V14, V12, V10, V11, V4 are expected to be important features.