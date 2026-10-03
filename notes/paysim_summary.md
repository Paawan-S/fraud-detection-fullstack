
# PaySim Dataset — Exploration Summary

**Dataset**: 6,362,620 transactions, 11 columns (step, type, amount, nameOrig,
oldbalanceOrg, newbalanceOrig, nameDest, oldbalanceDest, newbalanceDest,
isFraud, isFlaggedFraud). No missing values.

## Class Imbalance
- Genuine: 6,354,407 (99.871%)
- Fraud: 8,213 (0.129%) — even rarer than the credit card dataset (0.173%)

## Transaction Type is a Strong Signal
Fraud occurs ONLY in CASH_OUT (4,116 cases) and TRANSFER (4,097 cases) —
zero fraud in CASH_IN, DEBIT, or PAYMENT. Confirmed directly via crosstab.

## Amount Patterns
- Fraud mean amount (1,467,967) is ~8x higher than genuine (178,197) —
  opposite pattern from the credit card dataset, where fraud skewed smaller.

## Balance Patterns — Strong, Possibly Simulator-Specific Signal
- newbalanceOrig for fraud transactions: 0.00 at the 25th, 50th, AND 75th
  percentiles — the sender's account is drained to exactly zero in at least
  75% of fraud cases.
- This is an unusually clean signal, likely reflecting how PaySim's fraud
  injection logic works rather than universal real-world fraud behavior.
  Worth treating with some caution as a feature, and worth noting explicitly
  as a dataset characteristic.

## Implications for Model Training
- nameOrig/nameDest are IDs, not usable features — will be dropped.
- 'type' is categorical — needs encoding (one-hot).
- Given 6.3M rows, will train on a stratified sample for practical runtime.
- Class imbalance still requires SMOTE/class-weighting, same as before.
