const FEATURE_FIELDS = [
    'Time',
    ...Array.from({ length: 28 }, (_, i) => `V${i + 1}`),
    'Amount',
];

function TransactionForm({ transaction, onChange, onSubmit }) {
    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <div className="form-grid">
                {FEATURE_FIELDS.map((field) => (
                    <div key={field} className="form-field">
                        <label htmlFor={field}>{field}</label>
                        <input
                            type="number"
                            step="any"
                            id={field}
                            name={field}
                            value={transaction[field]}
                            onChange={onChange}
                        />
                    </div>
                ))}
            </div>
            <button type="submit">Check Transaction</button>
        </form>
    );
}

export default TransactionForm;