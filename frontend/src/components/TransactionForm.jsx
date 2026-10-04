const TRANSACTION_TYPES = ['CASH_IN', 'CASH_OUT', 'DEBIT', 'PAYMENT', 'TRANSFER'];

const FIELDS = [
    { name: 'step', label: 'Time step (hour)', type: 'number' },
    { name: 'amount', label: 'Amount', type: 'number' },
    { name: 'oldbalanceOrg', label: 'Sender balance before', type: 'number' },
    { name: 'newbalanceOrig', label: 'Sender balance after', type: 'number' },
    { name: 'oldbalanceDest', label: 'Receiver balance before', type: 'number' },
    { name: 'newbalanceDest', label: 'Receiver balance after', type: 'number' },
];

function TransactionForm({ transaction, onChange, onSubmit }) {
    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <div className="form-section">
                <h3 className="section-label">Transaction type</h3>
                <select
                    name="type"
                    value={transaction.type}
                    onChange={onChange}
                    style={{
                        width: '100%', fontFamily: 'var(--font-mono)', background: 'var(--bg)',
                        border: '1px solid var(--line)', borderRadius: '3px', padding: '0.5rem 0.6rem',
                        color: 'var(--text)', fontSize: '0.85rem', marginBottom: '1.25rem',
                    }}
                >
                    {TRANSACTION_TYPES.map((t) => (
                        <option key={t} value={t}>{t.replace('_', ' ')}</option>
                    ))}
                </select>
            </div>

            <div className="form-section">
                <h3 className="section-label">Transaction details</h3>
                <div className="form-grid form-grid-primary">
                    {FIELDS.map(({ name, label }) => (
                        <div key={name} className="form-field">
                            <label htmlFor={name}>{label}</label>
                            <input
                                type="number" step="any" min="0" id={name} name={name}
                                value={transaction[name]} onChange={onChange}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <button type="submit" className="submit-btn">Run check</button>
        </form>
    );
}

export default TransactionForm;