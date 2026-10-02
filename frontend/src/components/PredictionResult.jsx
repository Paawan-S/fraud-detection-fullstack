function PredictionResult({ result }) {
    const isFraud = result.prediction === 1;
    const probabilityPercent = (result.fraud_probability * 100).toFixed(1);

    return (
        <div className={`result-card ${isFraud ? 'result-fraud' : 'result-genuine'}`}>
            <h2>{isFraud ? '⚠ Fraud Detected' : '✓ Transaction Genuine'}</h2>
            <p className="probability">
                {probabilityPercent}% fraud probability
            </p>

            <h3>Top Contributing Factors</h3>
            <ul className="feature-list">
                {result.top_contributing_features.map((f) => (
                    <li key={f.feature} className="feature-item">
                        <span className="feature-name">{f.feature}</span>
                        <span className={f.impact > 0 ? 'impact-up' : 'impact-down'}>
                            {f.impact > 0 ? '▲' : '▼'} {Math.abs(f.impact)}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PredictionResult;