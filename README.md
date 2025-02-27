# Backend del Analizador Inteligente de Imágenes y PDFs

Este proyecto es el backend del Analizador Inteligente de Imágenes y PDFs. Proporciona endpoints para subir y analizar imágenes y archivos PDF utilizando APIs de terceros para generar descripciones y resúmenes.

## Requisitos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

## Instalación

1. Clona el repositorio en tu máquina local:
    ```sh
    git clone https://github.com/tu-usuario/tu-repositorio.git
    ```

2. Navega al directorio del backend:
    ```sh
    cd /c:/Users/juancamilo/Desktop/ReconocimientoDeepSeek/backend
    ```

3. Instala las dependencias necesarias:
    ```sh
    npm install
    ```

## Configuración

1. Crea un archivo `.env` en el directorio del backend y agrega las siguientes variables de entorno:
    ```env
    API_KEY_HUGGINGFACE=tu_api_key_de_huggingface
    API_KEY_DEEPSEEK=tu_api_key_de_deepseek
    ```

2. Asegúrate de reemplazar `tu_api_key_de_huggingface` y `tu_api_key_de_deepseek` con tus claves de API reales.

## Uso

1. Inicia el servidor:
    ```sh
    node server.js
    ```

2. El servidor estará corriendo en `http://localhost:3000`.

## Endpoints

### Subir y analizar imágenes

- **URL:** `/upload`
- **Método:** `POST`
- **Descripción:** Sube y analiza una imagen.
- **Parámetros:**
    - `archivo` (form-data): El archivo de imagen a subir.
- **Respuesta:**
    ```json
    {
        "mensaje": "Archivo subido correctamente",
        "analisis": {
            "traducido": "Descripción en español"
        }
    }
    ```

### Subir y analizar PDFs

- **URL:** `/upload-pdf`
- **Método:** `POST`
- **Descripción:** Sube y analiza un archivo PDF.
- **Parámetros:**
    - `archivo` (form-data): El archivo PDF a subir.
- **Respuesta:**
    ```json
    {
        "mensaje": "Archivo subido correctamente",
        "analisis": "Resumen del contenido del PDF en español"
    }
    ```

## Estructura del Proyecto

- `server.js`: Archivo principal del servidor que configura los endpoints y maneja las solicitudes.
- `analyze.js`: Módulo para analizar imágenes utilizando la API de Hugging Face y traducir el texto utilizando la API de DeepSeek.
- `analyzePdf.js`: Módulo para analizar archivos PDF, generar resúmenes y traducir el contenido utilizando la API de DeepSeek.

## Dependencias

- `express`: Framework web para Node.js.
- `multer`: Middleware para manejar la subida de archivos.
- `cors`: Middleware para habilitar CORS.
- `pdf-parse`: Biblioteca para extraer texto de archivos PDF.
- `node-fetch`: Biblioteca para realizar solicitudes HTTP.

## Contribuir

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Agregar nueva funcionalidad'`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarnos a través de [juancamilobuitragohernandez13@gmail.com](mailto:tu-email@dominio.com).
