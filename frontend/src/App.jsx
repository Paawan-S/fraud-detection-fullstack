import { useState } from 'react';
import TransactionForm from './components/TransactionForm';
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

    function handleChange(e) {
        const { name, value } = e.target;
        setTransaction((prev) => ({
            ...prev,
            [name]: parseFloat(value) || 0,
        }));
    }

    function handleSubmit() {
        console.log('Submitting transaction:', transaction);
        // Step 6 will replace this with a real call to your Java backend
    }

    return (
        <div className="app">
            <h1>Fraud Detection System</h1>
            <TransactionForm
                transaction={transaction}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

export default App;