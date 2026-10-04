import { useState, useEffect } from 'react';
import {
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
    PieChart, Pie, Cell, Legend,
} from 'recharts';

const RISK_COLORS = { LOW: '#5cd6a0', MEDIUM: '#ffb454', HIGH: '#ff5c5c' };

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
}

function formatCurrency(value) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency', currency: 'INR', maximumFractionDigits: 0,
    }).format(value);
}

function Dashboard() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchHistory() {
            try {
                const res = await fetch('http://localhost:8080/api/transactions');
                if (res.ok) setHistory(await res.json());
            } catch {
                // history stays empty; the status pill already reflects the problem
            } finally {
                setLoading(false);
            }
        }
        fetchHistory();
    }, []);


    if (loading) return <p className="scan-label">Loading dashboard...</p>;

    const total = history.length;
    const fraudTx = history.filter((t) => t.prediction === 1);
    const fraudCount = fraudTx.length;
    const fraudRate = total > 0 ? ((fraudCount / total) * 100).toFixed(2) : '0.00';
    const protectedAmount = fraudTx.reduce((sum, t) => sum + t.amount, 0);

    const riskBuckets = { LOW: 0, MEDIUM: 0, HIGH: 0 };
    history.forEach((t) => {
        const pct = t.fraudProbability * 100;
        if (pct < 30) riskBuckets.LOW += 1;
        else if (pct < 70) riskBuckets.MEDIUM += 1;
        else riskBuckets.HIGH += 1;
    });
    const riskData = Object.entries(riskBuckets).map(([name, value]) => ({ name, value }));

    const activityData = [...history].reverse().map((t, i) => ({
        index: i + 1,
        risk: +(t.fraudProbability * 100).toFixed(1),
    }));

    const recent = history.slice(0, 8);

    return (
        <div>
            <div className="dash-header">
    <div className="dash-greeting">{getGreeting()}, Paawan</div>
    <div className="tagline">AI-powered transaction intelligence</div>
        </div>

            <div className="stat-grid">
                <div className="stat-card">
                    <div className="stat-label">Total checked</div>
                    <div className="stat-value">{total.toLocaleString()}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Fraud detected</div>
                    <div className="stat-value stat-danger">{fraudCount.toLocaleString()}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Fraud rate</div>
                    <div className="stat-value">{fraudRate}%</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Amount protected</div>
                    <div className="stat-value stat-success">{formatCurrency(protectedAmount)}</div>
                </div>
            </div>

            <div className="dash-chart-grid">
                <section className="panel">
                    <h2 className="panel-title">Fraud activity</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={activityData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#262b33" />
                            <XAxis dataKey="index" stroke="#7a8089" fontSize={11} fontFamily="JetBrains Mono" />
                            <YAxis stroke="#7a8089" fontSize={11} fontFamily="JetBrains Mono" unit="%" />
                            <Tooltip contentStyle={{ background: '#15181d', border: '1px solid #262b33', fontFamily: 'JetBrains Mono', fontSize: 12 }} />
                            <Area type="monotone" dataKey="risk" stroke="#ffb454" fill="#ffb45433" />
                        </AreaChart>
                    </ResponsiveContainer>
                </section>

                <section className="panel">
                    <h2 className="panel-title">Risk distribution</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie data={riskData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={75} paddingAngle={3}>
                                {riskData.map((entry) => (
                                    <Cell key={entry.name} fill={RISK_COLORS[entry.name]} />
                                ))}
                            </Pie>
                            <Legend verticalAlign="middle" layout="vertical" align="right"
                                formatter={(value) => <span style={{ color: '#e8e6e1', fontFamily: 'JetBrains Mono', fontSize: 12 }}>{value}</span>} />
                            <Tooltip contentStyle={{ background: '#15181d', border: '1px solid #262b33', fontFamily: 'JetBrains Mono', fontSize: 12 }} />
                        </PieChart>
                    </ResponsiveContainer>
                </section>
            </div>

            <section className="panel">
                <h2 className="panel-title">Recent transactions</h2>
                <table className="recent-table">
                    <thead>
                        <tr><th>ID</th><th>Amount</th><th>Type</th><th>Risk</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                        {recent.map((t) => (
                            <tr key={t.id}>
                                <td>#{t.id}</td>
                                <td>{formatCurrency(t.amount)}</td>
                                <td>{t.type}</td>
                                <td>{(t.fraudProbability * 100).toFixed(0)}%</td>
                                <td className={t.prediction === 1 ? 'impact-up' : 'impact-down'}>
                                    {t.prediction === 1 ? 'FRAUD' : 'SAFE'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default Dashboard;