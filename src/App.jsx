import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'

import NuevosIngresos from './pages/NuevosIngresos.jsx'
import Inicio from './pages/Inicio.jsx'
import Clubes from './pages/Clubes.jsx'
import Paises from './pages/Paises.jsx'
import Contactanos from './pages/Contactanos.jsx'
import PaginaArticulo from './pages/PaginaArticulo.jsx'
import PaginaVistaProductos from './pages/PaginaVistaProductos.jsx'
import Tienda from './pages/Tienda.jsx'
import Nosotros from './pages/Nosotros.jsx'

import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminPanel from './pages/admin/AdminPanel.jsx'
import AdminProductos from './pages/admin/AdminProductos.jsx'
import AdminProductoForm from './pages/admin/AdminProductoForm.jsx'
import AdminCategorias from './pages/admin/AdminCategorias.jsx'
import AdminCategoriaForm from './pages/admin/AdminCategoriaForm.jsx'

import { useAuth } from './contexts/AuthContext.jsx'

function ProtectedRoute({ children }) {
    const { session, loading } = useAuth()
    if (loading) return null
    if (!session) return <Navigate to="/admin/login" replace />
    return children
}

function App() {
    return (
        <Router>
            <Routes>
                {/* Tienda pública */}
                <Route path="/" element={<Inicio />} />
                <Route path="/tienda" element={<Tienda />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/nuevos-ingresos" element={<NuevosIngresos />} />
                <Route path="/clubes" element={<Clubes />} />
                <Route path="/paises" element={<Paises />} />
                <Route path="/contactanos" element={<Contactanos />} />
                <Route path="/producto/:id" element={<PaginaArticulo />} />
                <Route path="/productos/:id" element={<PaginaVistaProductos />} />

                {/* Admin */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>}>
                    <Route index element={<Navigate to="/admin/productos" replace />} />
                    <Route path="productos" element={<AdminProductos />} />
                    <Route path="productos/nuevo" element={<AdminProductoForm />} />
                    <Route path="productos/:id" element={<AdminProductoForm />} />
                    <Route path="categorias" element={<AdminCategorias />} />
                    <Route path="categorias/nuevo" element={<AdminCategoriaForm />} />
                    <Route path="categorias/:id" element={<AdminCategoriaForm />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
