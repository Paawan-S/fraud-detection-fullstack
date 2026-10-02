import { useState } from 'react';
import TransactionForm from './components/TransactionForm';
import PredictionResult from './components/PredictionResult';
import { ShieldCheck } from 'lucide-react';
import './App.css';

const FEATURE_FIELDS = [
    'Time',
    ...Array.from({ length: 28 }, (_, i) => `V${i + 1}`),
    'Amount',
];

const initialTransaction = Object.fromEntries(
    FEATURE_FIELDS.map((field) => [field, 0])
);

const GENUINE_EXAMPLE = {
    Time: 160760.0, V1: -0.6744660646, V2: 1.4081050197, V3: -1.1106220536, V4: -1.3283657784,
    V5: 1.3889960325, V6: -1.3084390671, V7: 1.8858789027, V8: -0.6142329663, V9: 0.3116522125,
    V10: 0.6507570036, V11: -0.8577846615, V12: -0.2299614458, V13: -0.1998170048, V14: 0.2663713263,
    V15: -0.0465441685, V16: -0.7413980897, V17: -0.6056166441, V18: -0.3925681879, V19: -0.162648311,
    V20: 0.3943218208, V21: 0.0800842396, V22: 0.8100335956, V23: -0.2243272304, V24: 0.7078992374,
    V25: -0.1358370227, V26: 0.0451021965, V27: 0.5338372191, V28: 0.2913192526, Amount: 23.0,
};

const FRAUD_EXAMPLE = {
    Time: 57007.0, V1: -1.2712441917, V2: 2.4626752685, V3: -2.8513950033, V4: 2.3244800653,
    V5: -1.3722448898, V6: -0.9481956865, V7: -3.0652343617, V8: 1.1669269479, V9: -2.2687705884,
    V10: -4.8811429269, V11: 2.2551474887, V12: -4.6863868976, V13: 0.6523746685, V14: -6.174288348,
    V15: 0.594379608, V16: -4.8496923871, V17: -6.5365207353, V18: -3.1190938816, V19: 1.7154944198,
    V20: 0.5604780757, V21: 0.6529410513, V22: 0.0819309764, V23: -0.2213478312, V24: -0.5235821592,
    V25: 0.2242281619, V26: 0.7563345227, V27: 0.6328004773, V28: 0.2501870928, Amount: 0.01,
};

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

    function loadExample(example) {
        setTransaction(example);
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
        <div className="console">
            <div className="console-header">
                <div className="brand">
                    <ShieldCheck size={24} />
                    <h1>Fraud Detection Terminal</h1>
                </div>
                <p className="tagline">
                    Score a transaction and see exactly which signals drove the model's decision.
                </p>
            </div>

            <div className="console-grid">
                <section className="panel">
                    <h2 className="panel-title">Transaction input</h2>

                    <div className="example-buttons">
                        <button className="example-btn" onClick={() => loadExample(GENUINE_EXAMPLE)}>
                            Load genuine example
                        </button>
                        <button className="example-btn example-btn-fraud" onClick={() => loadExample(FRAUD_EXAMPLE)}>
                            Load fraud example
                        </button>
                    </div>

                    <TransactionForm
                        transaction={transaction}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    />
                </section>

                <section className="panel">
                    <h2 className="panel-title">Analysis</h2>

                    {loading && (
                        <div>
                            <div className="scan-track">
                                <div className="scan-bar" />
                            </div>
                            <p className="scan-label">Analyzing transaction...</p>
                        </div>
                    )}

                    {!loading && error && (
                        <div className="error-state">
                            <p className="error-line">Request failed</p>
                            <p>{error}</p>
                        </div>
                    )}

                    {!loading && !error && !result && (
                        <div className="idle-state">
                            <p className="idle-line">awaiting transaction<span className="cursor">_</span></p>
                            <p className="idle-hint">
                                Enter transaction details on the left and run a check to see the
                                model's verdict and factor breakdown here.
                            </p>
                        </div>
                    )}

                    {!loading && result && <PredictionResult result={result} />}
                </section>
            </div>
        </div>
    );
}

export default App;