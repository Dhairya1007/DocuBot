# DocuBot: Your Intelligent Document Management Assistant

DocuBot is a powerful and versatile AI Chatbot that uses advanced natural language processing techniques to create custom Chatbots for document files. Whether you're looking to search through extensive research papers or find specific information in PDFs, DocuBot has you covered. This project combines the power of LlamaIndex and OpenAI to provide seamless document indexing and intelligent search capabilities.

## Features

- **Document Indexing:** DocuBot processes both plain text (txt) and PDF files, creating vector embeddings for efficient and accurate answers.
- **Natural Language Search:** Utilizing OpenAI's cutting-edge technology, DocuBot understands your queries in natural language, ensuring accurate and relevant search results.
- **Flask Backend:** The backend of DocuBot is built using Python and Flask, providing a robust and scalable foundation for document processing and API interactions.
- **Responsive React Frontend:** The user-friendly frontend, developed in React, offers a seamless experience across devices, making it easy to search, train, and manage documents.

## Getting Started

### Backend Setup

1. **Obtain OpenAI API Key:**
   - Create a free account on OpenAI and obtain your API key.
   - Paste the obtained API key on line number 9 of `app.py` in the `backend` folder.

2. **Start the Backend:**
   - Navigate to the `backend` directory.
   - Run the command: `python3 app.py`

### Frontend Setup
Note: In fact, the entire UI component on this project was created by ChatGPT! 

1. **Install Dependencies:**
   - Navigate to the `chatbot-frontend` directory.
   - Run: `npm install` to install all required dependencies.

2. **Configure Backend URL:**
   - In `AskPage.js` and `TrainPage.js`, change the 'baseURL' constant to the URL of your backend application.

3. **Start the Frontend:**
   - Run: `npm start` to launch the frontend application.

## Usage

1. **Training:**
   - Upload your text and PDF documents to train DocuBot.
   - DocuBot processes these documents, creating vector embeddings for intelligent search.

2. **Searching:**
   - Enter your queries in natural language on the frontend.
   - DocuBot provides relevant search results based on the trained documents.

## Future Plans

I am currently learning Langchain and am planning to create a much more complex AI chatbot with several additional features. In addition to this, I am working on a much better UI for the forntend. The present UI is pretty basic and just for demonstration purposes. 

## Contributions

I welcome contributions from the community to enhance DocuBot further. Whether you're skilled in Python, React, or have expertise in natural language processing, your contributions are valuable. Fork the repository, make your changes, and submit a pull request.

## License

DocuBot is licensed under the [MIT License](LICENSE).

