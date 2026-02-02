const categorias = [
    {
        id: 1,
        documentId: "pazriq0pupglqmcf6urlkf51", //id aleatorio de la categoria
        nombre: "Bundesliga",
        descripcion: null,
        tipo: "Club",
        imagenRef: {
            id: 1,
            documentId: "crpvnamokdisebnx2vo4r5j2", //id aleatorio de la categoria
            name: "barcelona.png",
            formats: {
                large:{url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/alemania.jpg",},
                small:{url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/alemania.jpg",},
                medium:{url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/alemania.jpg",}
                },
            },
            url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/alemania.jpg",
    },
    {
        id: 3,
        documentId: "z9y8x7w6v5u4t3s2r1q0p12",
        nombre: "Liga 1",
        descripcion: null,
        tipo: "Club",
        imagenRef: {
            id: 3,
            documentId: "l9k8j7h6g5f4e3d2c1b0a12",
            name: "peru.png",
            formats: {
                large: { url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/peru.jpg" },
                medium: { url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/peru.jpg" },
                small: { url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/peru.jpg" }
            }
        },
        url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/peru.jpg"
    },
    {
        id: 5,
        documentId: "f1e2d3c4b5a6978877665544",
        nombre: "Premier League",
        descripcion: null,
        tipo: "Club",
        imagenRef: {
            id: 5,
            documentId: "p0o9i8u7y6t5r4e3w2q1z12",
            name: "inglaterra.png",
            formats: {
                large: { url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/inglaterra.jpg" },
                medium: { url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/inglaterra.jpg" },
                small: { url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/inglaterra.jpg" }
            }
        },
        url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/inglaterra.jpg"
    },
    {
        id: 6,
        documentId: "g1h2i3j4k5l6m7n8o9p0q12",
        nombre: "LaLiga",
        descripcion: null,
        tipo: "Club",
        imagenRef: {
            id: 6,
            documentId: "r1s2t3u4v5w6x7y8z9a0b12",
            name: "espana.png",
            formats: {
                large: { url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/espana.jpg" },
                medium: { url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/espana.jpg" },
                small: { url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/espana.jpg" }
            }
        },
        url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/espana.jpg"
    },
    {
        id: 7,
        documentId: "h1i2j3k4l5m6n7o8p9q0r12",
        nombre: "Serie A",
        descripcion: null,
        tipo: "Club",
        imagenRef: {
            id: 7,
            documentId: "s1t2u3v4w5x6y7z8a9b0c12",
            name: "italia.png",
            formats: {
                large: { url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/italia.jpg" },
                medium: { url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/italia.jpg" },
                small: { url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/italia.jpg" }
            }
        },
        url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/italia.jpg"
    }
];
categorias.push(
    {
        id: 11,
        documentId: "paislatino123abc456def",
        nombre: "CONMEBOL",
        descripcion: null,
        tipo: "Pais",
        imagenRef: {
            id: 11,
            documentId: "imglatino123abc",
            name: "conmebol.png",
            formats: {
                large: { url: "https://paladarnegro.net/escudoteca/confederaciones/confederaciones/img/conmebol.jpg" },
                medium: { url: "https://paladarnegro.net/escudoteca/confederaciones/confederaciones/img/conmebol.jpg" },
                small: { url: "https://paladarnegro.net/escudoteca/confederaciones/confederaciones/img/conmebol.jpg" }
            }
        },
        url: "https://paladarnegro.net/escudoteca/confederaciones/confederaciones/img/conmebol.jpg"
    },
    {
        id: 12,
        documentId: "paisonoropa456ghi789jkl",
        nombre: "UEFA",
        descripcion: null,
        tipo: "Pais",
        imagenRef: {
            id: 12,
            documentId: "imgeuropa456ghi",
            name: "uefa.png",
            formats: {
                large: { url: "https://paladarnegro.net/escudoteca/confederaciones/confederaciones/img/uefa.jpg" },
                medium: { url: "https://paladarnegro.net/escudoteca/confederaciones/confederaciones/img/uefa.jpg" },
                small: { url: "https://paladarnegro.net/escudoteca/confederaciones/confederaciones/img/uefa.jpg" }
            }
        },
        url: "https://paladarnegro.net/escudoteca/confederaciones/confederaciones/img/uefa.jpg"
    },
    {
        id: 13,
        documentId: "paisafrica789mno012pqr",
        nombre: "CAF",
        descripcion: null,
        tipo: "Pais",
        imagenRef: {
            id: 13,
            documentId: "imgafrica789mno",
            name: "caf.png",
            formats: {
                large: { url: "https://paladarnegro.net/escudoteca/confederaciones/confederaciones/img/caf.jpg" },
                medium: { url: "https://paladarnegro.net/escudoteca/confederaciones/confederaciones/img/caf.jpg" },
                small: { url: "https://paladarnegro.net/escudoteca/confederaciones/confederaciones/img/caf.jpg" }
            }
        },
        url: "https://paladarnegro.net/escudoteca/confederaciones/confederaciones/img/caf.jpg"
    },
    {
        id: 14,
        documentId: "paisasia012stu345vwx",
        nombre: "AFC",
        descripcion: null,
        tipo: "Pais",
        imagenRef: {
            id: 14,
            documentId: "imgasia012stu",
            name: "afc.png",
            formats: {
                large: { url: "https://paladarnegro.net/escudoteca/confederaciones/confederaciones/img/asian.jpg" },
                medium: { url: "https://paladarnegro.net/escudoteca/confederaciones/confederaciones/img/asian.jpg" },
                small: { url: "https://paladarnegro.net/escudoteca/confederaciones/confederaciones/img/asian.jpg" }
            }
        },
        url: "https://paladarnegro.net/escudoteca/confederaciones/confederaciones/img/asian.jpg"
    },
    {
        id: 15,
        documentId: "paisoceania345yz012abc",
        nombre: "OFC",
        descripcion: null,
        tipo: "Pais",
        imagenRef: {
            id: 15,
            documentId: "imgoceania345yz",
            name: "ofc.png",
            formats: {
                large: { url: "https://paladarnegro.net/escudoteca/confederaciones/confederaciones/img/ofc.jpg" },
                medium: { url: "https://paladarnegro.net/escudoteca/confederaciones/confederaciones/img/ofc.jpg" },
                small: { url: "https://paladarnegro.net/escudoteca/confederaciones/confederaciones/img/ofc.jpg" }
            }
        },
        url: "https://paladarnegro.net/escudoteca/confederaciones/confederaciones/img/ofc.jpg"
    }
);

export default categorias;