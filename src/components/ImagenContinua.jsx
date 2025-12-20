import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Components.css';


export const ImagenContinua = (images) => {
    images = images.images;
    const [currentIndex, setCurrentIndex] = useState(0);
    const placeholderUrl = "https://magical-horn-ed73f8415c.media.strapiapp.com/Not_Found_Image_20bccea143.png";
    
    // Validar que images sea un array válido
    if (!Array.isArray(images) || images.length === 0) {
        images = [{ url: placeholderUrl }];
    }
    
    // Si no hay imágenes, usar placeholder
    const displayImages = images.length > 0 ? images : [{ url: placeholderUrl }];
    const totalImages = displayImages.length;
    console.log(images.length);
    
    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? totalImages - 1 : prevIndex - 1
        );
    };
    
    const goToNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === totalImages - 1 ? 0 : prevIndex + 1
        );
    };
    
    const goToImage = (index) => {
        setCurrentIndex(index);
    };

    // Función para obtener URL de imagen con fallback
    const getImageUrl = (image) => {
        if (image.formats) {
            return image.formats.medium?.url || image.formats.thumbnail?.url || image.url || placeholderUrl;
        }
        return image.url || placeholderUrl;
    };


    return (
        <div className="imagen-continua-container">
            {/* Contenedor principal de la imagen */}
            <div className="imagen-principal-wrapper">
                {/* Imagen actual */}
                <img
                    src={getImageUrl(displayImages[currentIndex])}
                    alt={`Producto ${currentIndex + 1}`}
                    className="imagen-actual"
                    onError={(e) => {
                        e.target.src = placeholderUrl;
                    }}
                />
                
                {/* Botones de navegación - solo mostrar si hay más de 1 imagen */}
                {totalImages > 1 && (
                    <>
                        {/* Botón anterior */}
                        <button
                            onClick={goToPrevious}
                            className="boton-navegacion boton-anterior"
                            aria-label="Imagen anterior"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        
                        {/* Botón siguiente */}
                        <button
                            onClick={goToNext}
                            className="boton-navegacion boton-siguiente"
                            aria-label="Imagen siguiente"
                        >
                            <ChevronRight size={24} />
                        </button>
                        
                        {/* Contador de imágenes */}
                        <div className="contador-imagenes">
                            {currentIndex + 1} / {totalImages}
                        </div>
                    </>
                )}
            </div>
            
            {/* Miniaturas - solo mostrar si hay más de 1 imagen */}
            {totalImages > 1 && (
                <div className="miniaturas-container">
                    {displayImages.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => goToImage(index)}
                            className={`miniatura-boton ${index === currentIndex ? 'activa' : ''}`}
                        >
                            <img
                                src={getImageUrl(image)}
                                alt={`Miniatura ${index + 1}`}
                                className="miniatura-imagen"
                                onError={(e) => {
                                    e.target.src = placeholderUrl;
                                }}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
