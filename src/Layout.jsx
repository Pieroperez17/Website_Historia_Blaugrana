import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from 'lucide-react';
import InputBusquedaSimple from "./components/BarraBusquedaMain.jsx";
import { LuUserRound } from "react-icons/lu";
import { LuShoppingCart } from "react-icons/lu";

import './index.css';

const BarraNavegacion = () => {
    const [open, setOpen] = useState(false);
    const [busqueda, setBusqueda] = useState("");

    return (
        <header className="navbar">
            <div className="navbar-container">
                <div className="Texto-info">🚚📦 Envíos GRATIS en todo Lima desde S/.500 💰 💳</div>
                <div className="navbar-content">
                    <div className="navbar-hd">
                        <img  src="src/public/logo.png" alt="Logo Historia Blaugrana" className="logo-image" />
                        <InputBusquedaSimple
                            placeholder="Buscar producto o información"
                            value={busqueda}
                            onChange={e => setBusqueda(e.target.value)}
                        />
                        <div className="aww">
                            <div>
                                <LuUserRound size={30} color="#333" />
                                <p>Mi Cuenta</p>
                            </div>
                            <div>
                                <LuShoppingCart  size={30} color="#333" />
                                <p>Carrito</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <nav className="nav-desktop">
                        <Link 
                            to={'/inicio'}
                            className="nav-link"
                        >
                            INICIO
                        </Link>
                        <Link 
                            to={'/clubes'}
                            className="nav-link"
                        >
                            CLUBES
                        </Link>
                        <Link 
                            to={'/paises'}
                            className="nav-link"
                        >
                            PAÍSES
                        </Link>
                        <Link 
                            to={'/nuevos-ingresos'}
                            className="nav-link"
                        >
                            NUEVOS INGRESOS
                        </Link>
                        <Link 
                            to={'/contactanos'}
                            className="nav-link"
                        >
                            CONTÁCTANOS
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="menu-toggle"
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle navigation"
                    >
                        {open ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <nav className={`nav-mobile ${open ? 'open' : ''}`}>
                    <div className="nav-mobile-content">
                        <Link
                            to={'/inicio'}
                            className="nav-link-mobile"
                        >
                            Inicio
                        </Link>
                        <Link
                            to={'/clubes'}
                            className="nav-link-mobile"
                        >
                            Clubes
                        </Link>
                        <Link
                            to={'/paises'}
                            className="nav-link-mobile"
                        >
                            Países
                        </Link>
                        <Link
                            to={'/nuevos-ingresos'}
                            className="nav-link-mobile"
                        >
                            Nuevos Ingresos
                        </Link>
                        <Link
                            to={'/contactanos'}
                            className="nav-link-mobile"
                        >
                            Contáctanos
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
};


const Layout = ({children}) => {
    


    return (
    <div className="container">
            <BarraNavegacion />
            <main className="main">
                {children}
            </main>

            <footer className="footer">
                <div className="footer-content">
                    <p>
                        © {new Date().getFullYear()} Historia Blaugrana Shop-store. Todos los derechos reservados.
                    </p>
                    <nav className="footer-nav">
                        <Link to="/inicio" className="footer-link">Inicio</Link>
                        <Link to="/clubes" className="footer-link">Clubes</Link>
                        <Link to="/paises" className="footer-link">Países</Link>
                        <Link to="/nuevos-ingresos" className="footer-link">Nuevos Ingresos</Link>
                        <Link to="/contactanos" className="footer-link">Contáctanos</Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
};
export default Layout;    