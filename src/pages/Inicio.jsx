import Layout from "../Layout.jsx";
import React from "react";

export default function Inicio() {
    return (
        <Layout>
            <main style={styles.container}>
                <img style={styles.imge} src="https://jdesblog.s3.eu-west-1.amazonaws.com/wp-content/uploads/2025/07/Blog_Header_1920x840-38-1920x840.jpg" alt="" />
                <h1>Bienvenid@ a Historia Blaugrana</h1>
                <p>Esta es la página de inicio. Aquí encontrarás un breve resumen sobre la historia del club.</p>
                
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
        height: "auto",
    },
};