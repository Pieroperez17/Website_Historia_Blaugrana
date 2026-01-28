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
        id: 2,
        documentId: "a1b2c3d4e5f6g7h8i9j0k12",
        nombre: "Primera División",
        descripcion: null,
        tipo: "Club",
        imagenRef: {
            id: 2,
            documentId: "m1n2o3p4q5r6s7t8u9v0w12",
            name: "argentina.png",
            formats: {
                large: { url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/argentina.jpg" },
                medium: { url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/argentina.jpg" },
                small: { url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/argentina.jpg" }
            }
        },
        url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/argentina.jpg"
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
        id: 4,
        documentId: "o1p2q3r4s5t6u7v8w9x0y12",
        nombre: "Brasileirao",
        descripcion: null,
        tipo: "Club",
        imagenRef: {
            id: 4,
            documentId: "c1d2e3f4g5h6i7j8k9l0m12",
            name: "brasil.png",
            formats: {
                large: { url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/brasil.jpg" },
                medium: { url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/brasil.jpg" },
                small: { url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/brasil.jpg" }
            }
        },
        url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/brasil.jpg"
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
    },
    {
        id: 8,
        documentId: "i1j2k3l4m5n6o7p8q9r0s12",
        nombre: "Ligue 1",
        descripcion: null,
        tipo: "Club",
        imagenRef: {
            id: 8,
            documentId: "t1u2v3w4x5y6z7a8b9c0d12",
            name: "francia.png",
            formats: {
                large: { url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/francia.jpg" },
                medium: { url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/francia.jpg" },
                small: { url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/francia.jpg" }
            }
        },
        url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/francia.jpg"
    },
    {
        id: 9,
        documentId: "j1k2l3m4n5o6p7q8r9s0t12",
        nombre: "Primeira Liga",
        descripcion: null,
        tipo: "Club",
        imagenRef: {
            id: 9,
            documentId: "u1v2w3x4y5z6a7b8c9d0e12",
            name: "portugal.png",
            formats: {
                large: { url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/portugal.jpg" },
                medium: { url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/portugal.jpg" },
                small: { url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/portugal.jpg" }
            }
        },
        url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/portugal.jpg"
    },
    {
        id: 10,
        documentId: "k1l2m3n4o5p6q7r8s9t0u12",
        nombre: "Liga MX",
        descripcion: null,
        tipo: "Club",
        imagenRef: {
            id: 10,
            documentId: "v1w2x3y4z5a6b7c8d9e0f12",
            name: "mexico.png",
            formats: {
                large: { url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/mexico.jpg" },
                medium: { url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/mexico.jpg" },
                small: { url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/mexico.jpg" }
            }
        },
        url: "https://paladarnegro.net/escudoteca/ligas/ligas/img/mexico.jpg"
    }
];


export default categorias;