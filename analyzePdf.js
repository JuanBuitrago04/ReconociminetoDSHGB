const pdfParse = require('pdf-parse');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL;
const API_KEY_DEEPSEEK = process.env.API_KEY_DEEPSEEK;

async function analyzePdf(pdfBuffer) {
    try {
        const data = await pdfParse(pdfBuffer);
        const text = data.text || "No se pudo extraer el texto del PDF.";

        // Llamamos a DeepSeek para generar una explicación del contenido del PDF
        const explanation = await generateExplanation(text);

        // Traducimos la explicación al español
        const translatedExplanation = await translateText(explanation);

        return { traducido: translatedExplanation };
    } catch (error) {
        console.error("Error al analizar el PDF:", error);
        return { error: "No se pudo analizar el PDF" };
    }
}

// Función para generar una explicación del contenido del PDF con DeepSeek
async function generateExplanation(text) {
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
                    { role: "system", content: "You are an AI that summarizes PDF content." },
                    { role: "user", content: `Please summarize the following PDF content: "${text}"` }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`Error en DeepSeek: ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content || "No se pudo generar una explicación del contenido del PDF.";
    } catch (error) {
        console.error("Error al generar la explicación:", error);
        return "Error al generar la explicación del contenido del PDF.";
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

module.exports = analyzePdf;
