import { useState } from 'react';
import TransactionForm from './components/TransactionForm';
import PredictionResult from './components/PredictionResult';
import HistoryView from './components/HistoryView';
import { ShieldCheck } from 'lucide-react';
import Sidebar from './components/Sidebar';
import './App.css';

const initialTransaction = {
    step: 1, type: 'PAYMENT', amount: 0,
    oldbalanceOrg: 0, newbalanceOrig: 0,
    oldbalanceDest: 0, newbalanceDest: 0,
    isFlaggedFraud: 0,
};

const GENUINE_EXAMPLE = {
    step: 1, type: 'PAYMENT', amount: 9839.64,
    oldbalanceOrg: 170136.0, newbalanceOrig: 160296.36,
    oldbalanceDest: 0.0, newbalanceDest: 0.0, isFlaggedFraud: 0,
};

const FRAUD_EXAMPLE = {
    step: 1, type: 'TRANSFER', amount: 181.0,
    oldbalanceOrg: 181.0, newbalanceOrig: 0.0,
    oldbalanceDest: 0.0, newbalanceDest: 0.0, isFlaggedFraud: 0,
};

function App() {
    const [transaction, setTransaction] = useState(initialTransaction);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [view, setView] = useState('single');

    function handleChange(e) {
        const { name, value } = e.target;
        setTransaction((prev) => ({
            ...prev,
            [name]: name === 'type' ? value : (parseFloat(value) || 0),
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
        <div className="app-shell">
            <Sidebar view={view} onChangeView={setView} />

            <main className="main-area">
                {view === 'single' && (
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
                )}

                {view === 'history' && (
                    <div className="console">
                        <div className="console-header">
                            <div className="brand">
                                <ShieldCheck size={24} />
                                <h1>Transaction History</h1>
                            </div>
                            <p className="tagline">Every transaction checked in this session, newest first.</p>
                        </div>
                        <HistoryView />
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;