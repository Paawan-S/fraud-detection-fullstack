import { Activity, History } from 'lucide-react';

function Sidebar({ view, onChangeView }) {
    const navItems = [
        { id: 'single', label: 'Single check', icon: Activity },
        { id: 'history', label: 'History', icon: History },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <span className="sidebar-brand-mark">FD</span>
                <span className="sidebar-brand-name">Fraud Terminal</span>
            </div>
            <nav className="sidebar-nav">
                {navItems.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        className={`sidebar-nav-item ${view === id ? 'is-active' : ''}`}
                        onClick={() => onChangeView(id)}
                    >
                        <Icon size={16} />
                        {label}
                    </button>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;