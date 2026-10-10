import { useState, useEffect } from 'react';
import { API_URL } from '../config';
import {
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell,
} from 'recharts';

function HistoryView() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchHistory() {
            try {
                const response = await fetch(`${API_URL}/api/transactions`);
                if (!response.ok) throw new Error(`Server responded with status ${response.status}`);
                setHistory(await response.json());
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchHistory();
    }, []);

    if (loading) return <p className="scan-label">Loading history...</p>;
    if (error) return <p className="error-line">Failed to load history: {error}</p>;
    if (history.length === 0) return <p className="idle-hint">No transactions checked yet.</p>;

    const chartData = [...history].reverse().map((t) => ({
        id: t.id,
        risk: +(t.fraudProbability * 100).toFixed(1),
    }));

    return (
        <div>
            <section className="panel" style={{ marginBottom: '1.25rem' }}>
                <h2 className="panel-title">Risk trend</h2>
                <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#262b33" />
                        <XAxis dataKey="id" stroke="#7a8089" fontSize={11} fontFamily="JetBrains Mono" />
                        <YAxis stroke="#7a8089" fontSize={11} fontFamily="JetBrains Mono" unit="%" />
                        <Tooltip contentStyle={{ background: '#15181d', border: '1px solid #262b33', fontFamily: 'JetBrains Mono', fontSize: 12 }} />
                        <Bar dataKey="risk" radius={[2, 2, 0, 0]}>
                            {chartData.map((entry) => (
                                <Cell key={entry.id} fill={entry.risk >= 50 ? '#ff5c5c' : '#5cd6a0'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </section>

            <section className="panel">
                <h2 className="panel-title">Transaction log</h2>
                <table className="recent-table">
                    <thead>
                        <tr><th>ID</th><th>Amount</th><th>Type</th><th>Risk</th><th>Status</th><th style={{ textAlign: 'right' }}>Time</th></tr>
                    </thead>
                    <tbody>
                        {history.map((t) => (
                            <tr key={t.id}>
                                <td>#{t.id}</td>
                                <td>₹{t.amount.toLocaleString()}</td>
                                <td>{t.type}</td>
                                <td>{(t.fraudProbability * 100).toFixed(1)}%</td>
                                <td className={t.prediction === 1 ? 'impact-up' : 'impact-down'}>
                                    {t.prediction === 1 ? 'FRAUD' : 'SAFE'}
                                </td>
                                <td style={{ color: 'var(--text-dim)', textAlign: 'right' }}>
                                    {new Date(t.createdAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default HistoryView;