import os
import openai
from llama_index import VectorStoreIndex, SimpleDirectoryReader
from llama_index import StorageContext, load_index_from_storage
from flask import Flask, request, jsonify
from flask_cors import CORS

open_ai_key = "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"
openai.api_key = open_ai_key

# Create a folder for storing model outputs if it doesn't exist
dirs = ['model_outputs','raw_files']
for dir in dirs:
    if not os.path.exists(dir):
        os.makedirs(dir)

app = Flask(__name__)
CORS(app)

@app.route('/train-from-file', methods=['POST'])
def train_using_file():

    # Get the model_name from the form data
    model_name = request.form['model_name']
    raw_files_path = 'raw_files/{}'.format(model_name)
    if not os.path.exists(raw_files_path):
        os.makedirs(raw_files_path)
    model_output_path = 'model_outputs/{}'.format(model_name)

    # Get the uploaded file from the request
    file = request.files['file']
    # Save the uploaded file to a temporary location
    file_path = os.path.join(raw_files_path, file.filename)
    file.save(file_path)

    # Check if the file is allowed based on its extension
    allowed_extensions = {'txt', 'pdf'}
    if file.filename.split('.')[-1].lower() not in allowed_extensions:
        return jsonify({'error': 'Invalid file format. Allowed formats: txt, pdf'}), 400
    
    documents = SimpleDirectoryReader(raw_files_path).load_data()
    index = VectorStoreIndex.from_documents(documents)
    index.storage_context.persist(persist_dir=model_output_path)

    return jsonify({'message': f'Model {model_name} trained successfully.'}), 200

    # except Exception as e:
    #     return jsonify({'error': str(e)}), 500


@app.route('/ask', methods=['POST'])
def ask():
        
        data = request.get_json(silent=True)
        question = data.get('question')
        model_name = data.get('model_name')

        trained_model_path = os.path.join('model_outputs', model_name)

        storage_context = StorageContext.from_defaults(persist_dir=trained_model_path)
        index_load = load_index_from_storage(storage_context)

        query_engine = index_load.as_query_engine()
        response = query_engine.query(question).response

        print(type(response))

        return jsonify({'answer': response}), 200

    # except Exception as e:
    #     return jsonify({'error': str(e)}), 500


    # # except Exception as e:
    # #     return jsonify({'error': str(e)}), 500

@app.route('/models', methods=['GET'])
def get_models():
    model_names = os.listdir('model_outputs')
    return jsonify({'models':model_names}),200
    
    
if __name__ == '__main__':
    app.run()