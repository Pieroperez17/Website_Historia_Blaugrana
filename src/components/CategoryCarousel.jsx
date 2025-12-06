import React, { useState, useEffect, useRef } from 'react';
import './Components.css';

export const CategoryCarousel = ({ categories }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(5);
    const intervalRef = useRef(null);

    // Detectar tamaño de pantalla y ajustar items visibles
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setItemsPerView(2);
            } else if (window.innerWidth < 1024) {
                setItemsPerView(4);
            } else {
                setItemsPerView(5);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const startAutoScroll = () => {
        stopAutoScroll();
        intervalRef.current = setInterval(() => {
            handleNext();
        }, 3000);
    };

    const stopAutoScroll = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    const handleNext = () => {
        setCurrentIndex((prev) => {
            const maxIndex = categories.length - itemsPerView;
            return prev >= maxIndex ? 0 : prev + 1;
        });
    };

    const handlePrev = () => {
        stopAutoScroll();
        setCurrentIndex((prev) => {
            const maxIndex = categories.length - itemsPerView;
            return prev <= 0 ? maxIndex : prev - 1;
        });
        startAutoScroll();
    };

    const handleNextManual = () => {
        stopAutoScroll();
        handleNext();
        startAutoScroll();
    };

    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(null);

    useEffect(() => {
        startAutoScroll();
        return () => stopAutoScroll();
    }, [currentIndex, categories.length, itemsPerView]);

    return (
        <div className="carousel-container">
            <div className="carousel-wrapper">
                <button
                    className={`carousel-button carousel-button-left ${hoveredButton === 'prev' ? 'carousel-button-hover' : ''}`}
                    onClick={handlePrev}
                    onMouseEnter={() => setHoveredButton('prev')}
                    onMouseLeave={() => setHoveredButton(null)}
                    aria-label="Anterior"
                >
                    <span className="carousel-arrow">‹</span>
                </button>

                <div 
                    className="carousel-track"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                    }}
                >
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="category-item"
                            style={{
                                flex: `0 0 calc((100% - ${(itemsPerView - 1) * 20}px) / ${itemsPerView})`
                            }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className={`image-container ${hoveredIndex === index ? 'image-container-hover' : ''}`}>
                                <img
                                    src={category?.imagenRef?.formats?.medium?.url}
                                    alt={category.nombre}
                                    className="category-image"
                                />
                            </div>
                            <p className="category-name">{category.nombre}</p>
                        </div>
                    ))}
                </div>

                <button
                    className={`carousel-button carousel-button-right ${hoveredButton === 'next' ? 'carousel-button-hover' : ''}`}
                    onClick={handleNextManual}
                    onMouseEnter={() => setHoveredButton('next')}
                    onMouseLeave={() => setHoveredButton(null)}
                    aria-label="Siguiente"
                >
                    <span className="carousel-arrow">›</span>
                </button>
            </div>
        </div>
    );
};