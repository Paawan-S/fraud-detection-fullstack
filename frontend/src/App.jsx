import { useState } from 'react';
import TransactionForm from './components/TransactionForm';
import PredictionResult from './components/PredictionResult';
import './App.css';

const FEATURE_FIELDS = [
    'Time',
    ...Array.from({ length: 28 }, (_, i) => `V${i + 1}`),
    'Amount',
];

const initialTransaction = Object.fromEntries(
    FEATURE_FIELDS.map((field) => [field, 0])
);

function App() {
    const [transaction, setTransaction] = useState(initialTransaction);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function handleChange(e) {
        const { name, value } = e.target;
        setTransaction((prev) => ({
            ...prev,
            [name]: parseFloat(value) || 0,
        }));
    }

    async function handleSubmit() {
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('http://localhost:8080/api/transactions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(transaction),
            });

            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status}`);
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="app">
            <h1>Fraud Detection System</h1>
            <TransactionForm
                transaction={transaction}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
            {loading && <p>Checking transaction...</p>}
            {error && <p className="error">Error: {error}</p>}
            {result && <PredictionResult result={result} />}
        </div>
    );
}

export default App;