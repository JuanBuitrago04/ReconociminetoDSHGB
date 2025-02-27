const fetch = require('node-fetch');
const dotenv = require('dotenv');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const HUGGING_FACE_API_URL = process.env.HUGGING_FACE_API_URL;
const DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL;
const API_KEY_HUGGINGFACE = process.env.API_KEY_HUGGINGFACE;
const API_KEY_DEEPSEEK = process.env.API_KEY_DEEPSEEK;

// Función para analizar imagen con Hugging Face
async function analyzeImage(imageBuffer) {
    try {
        const response = await fetch(HUGGING_FACE_API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY_HUGGINGFACE}`,
                "Content-Type": "application/octet-stream"
            },
            body: imageBuffer
        });

        if (!response.ok) {
            throw new Error(`Error en Hugging Face: ${response.statusText}`);
        }

        const data = await response.json();
        const text = data[0]?.generated_text || "No se pudo generar una descripción.";

        console.log("Texto en inglés:", text);

        // Llamamos a DeepSeek para traducir el texto al español
        const translatedText = await translateText(text);

        return { traducido: translatedText };
    } catch (error) {
        console.error("Error al analizar la imagen:", error);
        return { error: "No se pudo analizar la imagen" };
    }
}

// Función para traducir texto con DeepSeek
async function translateText(text) {
    try {
        const response = await fetch(DEEPSEEK_API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY_DEEPSEEK}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [
                    { role: "system", content: "You are a professional English-to-Spanish translator." },
                    { role: "user", content: `Translate this text to Spanish: "${text}"` }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`Error en DeepSeek: ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content || "No se pudo traducir el texto.";
    } catch (error) {
        console.error("Error en la traducción:", error);
        return "Error al traducir el texto.";
    }
}

module.exports = analyzeImage;
