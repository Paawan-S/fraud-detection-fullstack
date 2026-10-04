import { useState, useEffect, useRef } from 'react';
import { Bell, ShieldCheck } from 'lucide-react';

function TopHeader() {
    const [online, setOnline] = useState(false);
    const [history, setHistory] = useState([]);
    const [bellOpen, setBellOpen] = useState(false);
    const bellRef = useRef(null);

    useEffect(() => {
        async function checkStatus() {
            try {
                const res = await fetch('http://localhost:8080/');
                setOnline(res.ok);
            } catch {
                setOnline(false);
            }
        }
        checkStatus();
        const interval = setInterval(checkStatus, 10000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        async function fetchAlerts() {
            try {
                const res = await fetch('http://localhost:8080/api/transactions');
                if (res.ok) setHistory(await res.json());
            } catch {
                // bell just shows zero alerts
            }
        }
        fetchAlerts();
        const interval = setInterval(fetchAlerts, 15000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        function handleClickOutside(e) {
            if (bellRef.current && !bellRef.current.contains(e.target)) {
                setBellOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fraudAlerts = history.filter((t) => t.prediction === 1).slice(0, 5);

    return (
        <header className="top-header">
            <div className="top-header-brand">
                <ShieldCheck size={20} />
                <span>FraudGuard AI</span>
            </div>

            <div className="top-header-right">
                <div className={`status-pill ${online ? 'status-online' : 'status-offline'}`}>
                    <span className="status-dot" /> {online ? 'System Online' : 'Backend Unreachable'}
                </div>

                <div className="bell-wrap" ref={bellRef}>
                    <button className="icon-btn" onClick={() => setBellOpen((o) => !o)}>
                        <Bell size={18} />
                        {fraudAlerts.length > 0 && <span className="bell-badge">{fraudAlerts.length}</span>}
                    </button>
                    {bellOpen && (
                        <div className="bell-dropdown">
                            <div className="bell-dropdown-title">Recent fraud alerts</div>
                            {fraudAlerts.length === 0 && <div className="bell-empty">No fraud flagged yet</div>}
                            {fraudAlerts.map((t) => (
                                <div key={t.id} className="bell-item">
                                    <span>#{t.id} &middot; {t.type}</span>
                                    <span className="impact-up">{(t.fraudProbability * 100).toFixed(0)}%</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="user-badge" title="Paawan Singhai · Fraud Analyst">PS</div>
            </div>
        </header>
    );
}

export default TopHeader;