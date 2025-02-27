# 📸📝 Backend for the Intelligent Image and PDF Analyzer

This project is the backend for the Intelligent Image and PDF Analyzer. It provides endpoints to upload and analyze images and PDF files using third-party APIs to generate descriptions and summaries.

## 🚀 Requirements

- Node.js (version 14 or higher)
- npm (version 6 or higher)

## 📥 Installation

1. Clone the repository to your local machine:
    ```sh
    git clone https://github.com/your-username/your-repository.git
    ```

2. Navigate to the backend directory:
    ```sh
    cd /c:/Users/juancamilo/Desktop/ReconocimientoDeepSeek/backend
    ```

3. Install the necessary dependencies:
    ```sh
    npm install
    ```

## ⚙️ Configuration

1. Create a `.env` file in the backend directory and add the following environment variables:
    ```env
    API_KEY_HUGGINGFACE=your_huggingface_api_key
    API_KEY_DEEPSEEK=your_deepseek_api_key
    DEEPSEEK_API_URL=https://api.deepseek.com/v1/chat/completions
    HUGGING_FACE_API_URL=https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base
    ```

2. Make sure to replace `your_huggingface_api_key` and `your_deepseek_api_key` with your actual API keys.

## 🛠️ Usage

1. Start the server:
    ```sh
    node server.js
    ```

2. The server will be running at `http://localhost:3000`.

## 📡 Endpoints

### Upload and Analyze Images

- **URL:** `/upload`
- **Method:** `POST`
- **Description:** Upload and analyze an image.
- **Parameters:**
    - `archivo` (form-data): The image file to upload.
- **Response:**
    ```json
    {
        "mensaje": "File uploaded successfully",
        "analisis": {
            "traducido": "Description in Spanish"
        }
    }
    ```

### Upload and Analyze PDFs

- **URL:** `/upload-pdf`
- **Method:** `POST`
- **Description:** Upload and analyze a PDF file.
- **Parameters:**
    - `archivo` (form-data): The PDF file to upload.
- **Response:**
    ```json
    {
        "mensaje": "File uploaded successfully",
        "analisis": "Summary of the PDF content in Spanish"
    }
    ```

## 🤖 Artificial Intelligence Technologies Used

### Hugging Face

Hugging Face is a leading provider of natural language processing (NLP) models and tools. In this project, we use the Hugging Face API to analyze images and generate descriptions. The specific model used is `Salesforce/blip-image-captioning-base`, which is designed for image captioning.

- **Purpose:** Generate descriptive text for images.
- **API URL:** `https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base`

### DeepSeek

DeepSeek is an advanced AI platform that provides various models for text processing, including translation and summarization. In this project, we use the DeepSeek API to translate text from English to Spanish and to generate summaries of PDF content.

- **Purpose:** Translate text and generate summaries.
- **API URL:** `https://api.deepseek.com/v1/chat/completions`

### How It Works

1. **Image Analysis:**
   - The user uploads an image.
   - The image is sent to the Hugging Face API, which generates a descriptive text in English.
   - The descriptive text is then sent to the DeepSeek API for translation into Spanish.
   - The translated text is returned to the user.

2. **PDF Analysis:**
   - The user uploads a PDF file.
   - The PDF content is extracted and sent to the DeepSeek API to generate a summary.
   - The summary is then translated into Spanish using the DeepSeek API.
   - The translated summary is returned to the user.

## 📂 Project Structure

- `server.js`: Main server file that configures the endpoints and handles requests.
- `analyze.js`: Module to analyze images using the Hugging Face API and translate the text using the DeepSeek API.
- `analyzePdf.js`: Module to analyze PDF files, generate summaries, and translate the content using the DeepSeek API.

## 📦 Dependencies

- `express`: Web framework for Node.js.
- `multer`: Middleware for handling file uploads.
- `cors`: Middleware to enable CORS.
- `pdf-parse`: Library to extract text from PDF files.
- `node-fetch`: Library to make HTTP requests.

## 🤝 Contributing

If you want to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push your changes (`git push origin feature/new-feature`).
5. Open a Pull Request.

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## 📧 Contact

If you have any questions or suggestions, feel free to contact us at [juancamilobuitragohernandez13@gmail.com](mailto:juancamilobuitragohernandez13@gmail.com).
