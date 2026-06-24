import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './Admin.css'

export default function AdminPanel() {
    const { signOut } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await signOut()
        navigate('/admin/login')
    }

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-sidebar-logo">
                    <h2>Historia Blaugrana</h2>
                    <p>Panel de Administración</p>
                </div>

                <nav className="admin-nav">
                    <NavLink
                        to="/admin/productos"
                        className={({ isActive }) => 'admin-nav-link' + (isActive ? ' active' : '')}
                    >
                        🧥 Productos
                    </NavLink>
                    <NavLink
                        to="/admin/categorias"
                        className={({ isActive }) => 'admin-nav-link' + (isActive ? ' active' : '')}
                    >
                        🗂️ Categorías
                    </NavLink>
                    <a href="/" target="_blank" rel="noopener noreferrer" className="admin-nav-link">
                        🌐 Ver tienda
                    </a>
                </nav>

                <div className="admin-sidebar-footer">
                    <button className="admin-logout-btn" onClick={handleLogout}>
                        Cerrar sesión
                    </button>
                </div>
            </aside>

            <main className="admin-main">
                <Outlet />
            </main>
        </div>
    )
}
