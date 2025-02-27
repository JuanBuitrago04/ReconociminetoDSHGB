const express = require('express');
const multer = require('multer');
const cors = require('cors');
const analyzeImage = require('./analyze.js');
const analyzePdf = require('./analyzePdf.js'); // Importar analyzePdf.js

const app = express();
app.use(express.json());
app.use(cors());  // Usar cors middleware
const PORT = 3000;

// Configuración de multer para almacenamiento en memoria
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(file.originalname.toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        return extname && mimetype ? cb(null, true) : cb(new Error('Solo se permiten imágenes'));
    }
});

const uploadPdf = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /pdf/;
        const extname = fileTypes.test(file.originalname.toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        return extname && mimetype ? cb(null, true) : cb(new Error('Solo se permiten archivos PDF'));
    }
});

// Ruta para subir y analizar imágenes
app.post('/upload', upload.single('archivo'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No se subió ningún archivo' });

    try {
        const analysisResult = await analyzeImage(req.file.buffer); // Enviar buffer convertido a Base64
        res.json({ mensaje: 'Archivo subido correctamente', analisis: analysisResult });
    } catch (error) {
        console.error("Error al analizar la imagen:", error);
        console.error("Detalles del error:", error);
        res.status(500).json({ error: 'No se pudo analizar la imagen' });
    }
});

// Ruta para subir y analizar PDFs
app.post('/upload-pdf', uploadPdf.single('archivo'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No se subió ningún archivo' });

    try {
        const analysisResult = await analyzePdf(req.file.buffer); // Enviar buffer del PDF
        res.json({ mensaje: 'Archivo subido correctamente', analisis: analysisResult });
    } catch (error) {
        console.error("Error al analizar el PDF:", error);
        console.error("Detalles del error:", error);
        res.status(500).json({ error: 'No se pudo analizar el PDF' });
    }
});

// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));