import { Clock, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const TRANSACTION_TYPES = ['CASH_IN', 'CASH_OUT', 'DEBIT', 'PAYMENT', 'TRANSFER'];

function Field({ name, label, value, onChange }) {
    return (
        <div className="form-field">
            <label htmlFor={name}>{label}</label>
            <input type="number" step="any" min="0" id={name} name={name} value={value} onChange={onChange} />
        </div>
    );
}

function TransactionForm({ transaction, onChange, onSubmit }) {
    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <div className="form-section">
                <h3 className="section-label">Transaction type</h3>
                <select name="type" value={transaction.type} onChange={onChange} className="type-select">
                    {TRANSACTION_TYPES.map((t) => (
                        <option key={t} value={t}>{t.replace('_', ' ')}</option>
                    ))}
                </select>
            </div>

            <div className="form-section">
                <h3 className="group-header"><Clock size={13} /> Timing &amp; amount</h3>
                <div className="form-grid form-grid-primary">
                    <Field name="step" label="Time step (hour)" value={transaction.step} onChange={onChange} />
                    <Field name="amount" label="Amount" value={transaction.amount} onChange={onChange} />
                </div>
            </div>

            <div className="form-section">
                <h3 className="group-header"><ArrowUpRight size={13} /> Sender account</h3>
                <div className="form-grid form-grid-primary">
                    <Field name="oldbalanceOrg" label="Balance before" value={transaction.oldbalanceOrg} onChange={onChange} />
                    <Field name="newbalanceOrig" label="Balance after" value={transaction.newbalanceOrig} onChange={onChange} />
                </div>
            </div>

            <div className="form-section">
                <h3 className="group-header"><ArrowDownRight size={13} /> Receiver account</h3>
                <div className="form-grid form-grid-primary">
                    <Field name="oldbalanceDest" label="Balance before" value={transaction.oldbalanceDest} onChange={onChange} />
                    <Field name="newbalanceDest" label="Balance after" value={transaction.newbalanceDest} onChange={onChange} />
                </div>
            </div>

            <button type="submit" className="submit-btn"><Wallet size={16} /> Run check</button>
        </form>
    );
}

export default TransactionForm;