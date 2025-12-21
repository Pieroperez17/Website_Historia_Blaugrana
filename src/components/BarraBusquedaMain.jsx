import React, { useState } from 'react';
import { GoSearch } from "react-icons/go";

function SimpleSearchBar() {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSearch = () => {
        if (inputValue.trim()) {
            window.location.href = `/productos/${encodeURIComponent(inputValue)}`;
        }
    };



    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #e0e0e0',
            borderRadius: '999px',
            padding: '10px 20px',
            width: '580px',
            background: '#fff'
        }}>
            <input
                type="text"
                placeholder="Buscar producto o información"
                value={inputValue}
                onChange={handleInputChange}
                style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    fontSize: '16px',
                    color: '#333',
                    background: 'transparent'
                }}
            />
            <button
                onClick={handleSearch}
                style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0 8px'
                }}
            >
                <GoSearch  size={20} color="#333" />
            </button>
        </div>
    );
}

export default SimpleSearchBar;
