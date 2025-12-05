import Layout from "../Layout.jsx";
import { useEffect, useState } from "react";
import { ThreeDot } from 'react-loading-indicators'
import {ViewCardProduct} from "../components/ViewCardProduct.jsx";
import './EstilosGenerales.css';

export default function NuevosIngresos() {
    const [NuevosIngresosData, setNuevosIngresosData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
        useEffect(() => {
            const baseUrl = import.meta.env.VITE_API_Url ;
            const apiAuth = import.meta.env.VITE_API_Authorization ;
    
            if (!baseUrl) {
                console.error("API base URL not found in environment variables.");
                console.log("Current env vars:", baseUrl);
                return;
            }
            if (!apiAuth) {
                console.error("API authorization token not found in environment variables.");
                return;
            }
    
    
        async function fetchCategories() {
            try {
                const res = await fetch(`${baseUrl}/api/products?populate=*`, {
                    method: "GET",
                    headers: {
                        ...(apiAuth ? { Authorization: apiAuth } : {}),
                    },
                });
                if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
                const json = await res.json();
                // If the API returns an array use it directly, otherwise try common wrappers
                setNuevosIngresosData(json.data);
                setIsLoading(false);
                console.log(json.data);
                //console.log(json.data[0].imagenRef.url);
            } catch (err) {
                if (err.name !== "AbortError") console.error("Error loading categories:", err);
            }
        }
    
        fetchCategories();
        return;
        }, []);
    
    const Nuevos_Ingresos = NuevosIngresosData.filter(producto => producto.categories.some(cat => cat.nombre === "Nuevo Ingreso") )
    return (
        <Layout>
            {isLoading ? (
                <div style={{ display: 'flex', gap:'2rem'  ,justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
                    <ThreeDot variant="bounce" color="#4492C2" size="small" text="" textColor="" />
                </div>
            ) : (
                <div className="container-club">
                    {NuevosIngresosData.map((producto) => (
                        <ViewCardProduct key={producto.id} product={producto} />
                    ))}
                </div>
            )}
            
        </Layout>
    );
}
