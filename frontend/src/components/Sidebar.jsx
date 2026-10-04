import { LayoutDashboard, Activity, History, BarChart3, Bell, Settings } from 'lucide-react';

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, enabled: true },
    { id: 'single', label: 'Detection', icon: Activity, enabled: true },
    { id: 'history', label: 'Transactions', icon: History, enabled: true },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, enabled: false },
    { id: 'alerts', label: 'Alerts', icon: Bell, enabled: false },
    { id: 'settings', label: 'Settings', icon: Settings, enabled: false },
];

function Sidebar({ view, onChangeView }) {
    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                {navItems.map(({ id, label, icon: Icon, enabled }) => (
                    <button
                        key={id}
                        disabled={!enabled}
                        className={`sidebar-nav-item ${view === id ? 'is-active' : ''} ${!enabled ? 'is-disabled' : ''}`}
                        onClick={() => enabled && onChangeView(id)}
                    >
                        <Icon size={16} />
                        {label}
                        {!enabled && <span className="soon-badge">Soon</span>}
                    </button>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;