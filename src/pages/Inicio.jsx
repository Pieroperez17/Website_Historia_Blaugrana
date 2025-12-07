import Layout from "../Layout.jsx";
import { useEffect, useState } from "react";
import React from "react";
import { CategoryCarousel } from "../components/CategoryCarousel.jsx";
import { ThreeDot } from 'react-loading-indicators'
import {FooterInfo} from "../components/FooterInfo.jsx";
import {ViewCardProduct} from "../components/ViewCardProduct.jsx";


import './EstilosGenerales.css';


export default function Inicio() {
    const [clubesData, setClubesData] = useState([]);
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
            const res = await fetch(`${baseUrl}/api/categories?populate=*`, {
                method: "GET",
                headers: {
                    ...(apiAuth ? { Authorization: apiAuth } : {}),
                },
            });
            if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
            const json = await res.json();
            // If the API returns an array use it directly, otherwise try common wrappers
            setClubesData(json.data);
            setIsLoading(false);
            //console.log(json.data[0].imagenRef.url);
        } catch (err) {
            if (err.name !== "AbortError") console.error("Error loading categories:", err);
        }
    }

    fetchCategories();
    return;
    }, []);

    const [NuevosIngresosData, setNuevosIngresosData] = useState([]);
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
            <main style={styles.container} >
                <img style={styles.imge} className="ImageInicioView" src="https://magical-horn-ed73f8415c.media.strapiapp.com/imagetest_19a734a241.jpg" alt="Imagen Inicio 1" />
                { isLoading ? (
                    <div style={{ display: 'flex', gap:'2rem'  ,justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
                        <ThreeDot variant="bounce" color="#4492C2" size="small" text="" textColor="" />
                    </div>
                ) : (
                    <>
                        <h1 style={{margin:'0px'}}>Clubes</h1>
                        <CategoryCarousel categories={clubesData.filter( club => club.tipo == 'Club')} />
                    </>
                )}
                { isLoading ? (
                    <div style={{ display: 'flex', gap:'2rem'  ,justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
                        <ThreeDot variant="bounce" color="#4492C2" size="small" text="" textColor="" />
                    </div>
                ) : (
                    <>
                        <h1>Nuevos Ingresos</h1>
                        <div className="container-club">
                            {Nuevos_Ingresos.map((producto) => (
                                <ViewCardProduct key={producto.id} product={producto} />
                            ))}
                        </div>
                    </>
                    
                )}


                <FooterInfo />
            </main>
        </Layout>
        
    );
}

const styles = {
    container: {
        width: "100%",
        margin: "0 auto",
        textAlign: "center",
        color: "#111",
    },
    imge: {
        width: "100%",
    },
};