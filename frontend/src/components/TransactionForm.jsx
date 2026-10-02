import { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const PRIMARY_FIELDS = ['Time', 'Amount'];
const PCA_FIELDS = Array.from({ length: 28 }, (_, i) => `V${i + 1}`);

function TransactionForm({ transaction, onChange, onSubmit }) {
    const [showAdvanced, setShowAdvanced] = useState(false);

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <div className="form-section">
                <h3 className="section-label">Transaction Details</h3>
                <div className="form-grid form-grid-primary">
                    {PRIMARY_FIELDS.map((field) => (
                        <div key={field} className="form-field">
                            <label htmlFor={field}>{field}</label>
                            <input
                                type="number" step="any" id={field} name={field}
                                value={transaction[field]} onChange={onChange}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <button
                type="button"
                className="toggle-advanced"
                onClick={() => setShowAdvanced((s) => !s)}
            >
                {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                {showAdvanced ? 'Hide' : 'Show'} anonymized features (V1–V28)
            </button>

            {showAdvanced && (
                <div className="form-section">
                    <div className="form-grid">
                        {PCA_FIELDS.map((field) => (
                            <div key={field} className="form-field">
                                <label htmlFor={field}>{field}</label>
                                <input
                                    type="number" step="any" id={field} name={field}
                                    value={transaction[field]} onChange={onChange}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <button type="submit" className="submit-btn">
                <Search size={18} />
                Check Transaction
            </button>
        </form>
    );
}

export default TransactionForm;