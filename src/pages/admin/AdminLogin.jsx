import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './Admin.css'

export default function AdminLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { signIn } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        const { error } = await signIn(email, password)
        if (error) {
            setError('Credenciales incorrectas. Verifica tu email y contraseña.')
        } else {
            navigate('/admin/productos')
        }
        setLoading(false)
    }

    return (
        <div className="admin-login-wrap">
            <div className="admin-login-card">
                <h1>Historia Blaugrana</h1>
                <p>Panel de Administración</p>

                {error && <div className="admin-login-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="admin-login-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="admin@email.com"
                            required
                            autoFocus
                        />
                    </div>
                    <div className="admin-login-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button type="submit" className="admin-login-btn" disabled={loading}>
                        {loading ? 'Ingresando...' : 'Ingresar'}
                    </button>
                </form>
            </div>
        </div>
    )
}
