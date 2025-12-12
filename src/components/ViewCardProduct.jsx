import React from 'react';
import { useState } from 'react';

export const ViewCardProduct = (Articulo) => {
    const [isHovered, setIsHovered] = useState(false);
    var item = Articulo.product;
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = windowWidth <= 600;

    const styles = {
        card: {
            backgroundColor: '#fff',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            width: '100%',
            maxWidth: isMobile ? '45%' : '320px',
            margin: '0'
        },
        cardHover: {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 12px rgba(0, 0, 0, 0.15)'
        },
        imageContainer: {
            width: '100%',
            height: isMobile ? '230px': '350px',
            overflow: 'hidden',
            backgroundColor: '#f5f5f5',
            position: 'relative'
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
        },
        stockBadge: {
            position: 'absolute',
            top: '12px',
            right: '12px',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: isMobile ? '10px':'12px',
            fontWeight: '600',
            backgroundColor: item.stock > 0 ? '#10b981' : '#ef4444',
            color: '#fff'
        },
        content: {
            padding: isMobile ? '6px':'16px'
        },
        nombre: {
            fontSize: isMobile ? '18px':'18px',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '8px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'wrap'
        },
        detailsRow: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px'
        },
        talla: {
            fontSize: '14px',
            color: '#6b7280',
            backgroundColor: '#f3f4f6',
            padding: '4px 12px',
            borderRadius: '6px',
            fontWeight: '500'
        },
        stockText: {
            fontSize: '14px',
            color: '#6b7280'
        },
        priceContainer: {
            borderTop: '1px solid #e5e7eb',
            paddingTop: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        precio: {
            fontSize: isMobile ? '15px':'24px',
            fontWeight: '700',
            color: '#1f2937'
        },
        button: {
            backgroundColor: '#3b82f6',
            color: '#fff',
            border: 'none',
            padding: isMobile ? '6px 14px':'8px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
        },
        buttonDisabled: {
            backgroundColor: '#9ca3af',
            cursor: 'not-allowed'
        }
    };

    return (
        <div 
            style={{
                ...styles.card,
                ...(isHovered ? styles.cardHover : {})
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            >
            <div style={styles.imageContainer}>
                <img 
                src={item.imagen[0]?.formats?.medium?.url || item.imagen[0]?.url} 
                alt={item.nombre}
                style={{
                    ...styles.image,
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                }}
                />
                <div style={styles.stockBadge}>
                {item.stock > 0 ? `${item.stock} disponibles` : 'Agotado'}
                </div>
            </div>
            
            <div style={styles.content}>
                <h3 style={styles.nombre}>{item.nombre}</h3>
                
                <div style={styles.detailsRow}>
                <span style={styles.talla}>Talla: {item.talla}</span>
                <span style={styles.stockText}>Stock: {item.stock}</span>
                </div>
                
                <div style={styles.priceContainer}>
                <span style={styles.precio}>S/ {item.precio?.toFixed(2)}</span>
                <button 
                    style={{
                    ...styles.button,
                    ...(item.stock === 0 ? styles.buttonDisabled : {})
                    }}
                    disabled={item.stock === 0}
                    onMouseEnter={(e) => {
                    if (item.stock > 0) e.target.style.backgroundColor = '#2563eb';
                    }}
                    onMouseLeave={(e) => {
                    if (item.stock > 0) e.target.style.backgroundColor = '#3b82f6';
                    }}
                >
                    {item.stock > 0 ? 'Agregar' : 'Agotado'}
                </button>
                </div>
            </div>
        </div>
    );

};

        




















