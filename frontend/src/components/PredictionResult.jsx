import { ShieldAlert, ShieldCheck, TrendingUp, TrendingDown } from 'lucide-react';

const TOTAL_SEGMENTS = 24;


function formatFeatureName(name) {
    const labels = {
        step: 'Time step',
        amount: 'Amount',
        oldbalanceOrg: 'Sender balance (before)',
        newbalanceOrig: 'Sender balance (after)',
        oldbalanceDest: 'Receiver balance (before)',
        newbalanceDest: 'Receiver balance (after)',
        isFlaggedFraud: 'Simulator flag',
        type_CASH_OUT: 'Type: Cash out',
        type_DEBIT: 'Type: Debit',
        type_PAYMENT: 'Type: Payment',
        type_TRANSFER: 'Type: Transfer',
    };
    return labels[name] || name;
}
function PredictionResult({ result }) {
    const isFraud = result.prediction === 1;
    const probabilityPercent = (result.fraud_probability * 100).toFixed(1);
    const filledSegments = Math.round((probabilityPercent / 100) * TOTAL_SEGMENTS);
    const maxImpact = Math.max(...result.top_contributing_features.map((f) => Math.abs(f.impact)));

    return (
        <div className={`result-wrap ${isFraud ? 'is-fraud' : 'is-genuine'}`}>
            <div className="result-verdict">
                {isFraud ? <ShieldAlert size={22} /> : <ShieldCheck size={22} />}
                {isFraud ? 'Fraud detected' : 'Transaction genuine'}
            </div>
            <p className="result-desc">
                {isFraud
                    ? 'This transaction shows strong fraud indicators.'
                    : 'No significant fraud indicators detected.'}
            </p>

            <div className="meter-row">
                <div className="meter">
                    {Array.from({ length: TOTAL_SEGMENTS }).map((_, i) => (
                        <span
                            key={i}
                            className={`meter-seg ${i < filledSegments ? (isFraud ? 'seg-fraud' : 'seg-safe') : ''}`}
                        />
                    ))}
                </div>
                <span className="meter-value">{probabilityPercent}%</span>
            </div>

            <h3 className="factors-title">Top contributing factors</h3>
            <ul className="feature-list">
                {result.top_contributing_features.map((f) => (
                    <li key={f.feature} className="feature-item">
                        <div className="feature-item-top">
                            <span className="feature-name">{formatFeatureName(f.feature)}</span>
                            <span className={f.impact > 0 ? 'impact-up' : 'impact-down'}>
                                {f.impact > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                {Math.abs(f.impact)}
                            </span>
                        </div>
                        <div className="feature-bar-track">
                            <div
                                className={`feature-bar-fill ${f.impact > 0 ? 'bar-up' : 'bar-down'}`}
                                style={{ width: `${(Math.abs(f.impact) / maxImpact) * 100}%` }}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PredictionResult;