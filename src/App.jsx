import {BrowserRouter as Router ,Route,Routes} from 'react-router-dom'
import './App.css'


import NuevosIngresos from './pages/NuevosIngresos.jsx'
import Inicio from './pages/Inicio.jsx'
import Clubes from './pages/Clubes.jsx'
import Paises from './pages/Paises.jsx'
import Contactanos from './pages/Contactanos.jsx'
import PaginaArticulo from './pages/PaginaArticulo.jsx'
import PaginaVistaProductos from './pages/PaginaVistaProductos.jsx'


function App() {
  

  return (
    <>
      <Router>
        <Routes>
          {/* Otras Rutas */}
          <Route path="/" element={<Inicio/>} />
          <Route path="/nuevos-ingresos" element={<NuevosIngresos/>} />
          <Route path="/clubes" element={<Clubes/>} />
          <Route path="/paises" element={<Paises/>} />
          <Route path="/contactanos" element={<Contactanos/>} />
          <Route path="/producto/:id" element={<PaginaArticulo/>} />
          <Route path="/productos/:id" element={<PaginaVistaProductos/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
