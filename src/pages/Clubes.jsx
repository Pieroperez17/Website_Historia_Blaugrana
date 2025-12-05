import Layout from "../Layout.jsx";
import { useEffect, useState } from "react";
import { ThreeDot } from 'react-loading-indicators'
import './EstilosGenerales.css';

export default function Clubes() {
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


    return (
        <Layout>
            {isLoading ? (
                <div style={{ display: 'flex', gap:'2rem'  ,justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
                    <ThreeDot variant="bounce" color="#4492C2" size="small" text="" textColor="" />
                </div>
            ) : (
                <div className="container-club">
                    {clubesData.filter( club => club.tipo == 'Club' && true).map((club) => (
                        <div key={club.id} className="card-club">
                            <img src={club.imagenRef?.url} alt={club.imagenRef?.name} className="image-club" />
                            <div className="info-club">
                                <h2>{club.nombre}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
        </Layout>
    );
}
