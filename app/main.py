from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask.helpers import send_from_directory
from app.torch_utils import transform_image, get_prediction

app = Flask(__name__, static_folder='../frontend/build', static_url_path='')
CORS(app)

ALLOWED_EXTENSTIONS = {'png', 'jpeg', 'jpg'}
def allowed_file(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSTIONS

@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if(request.method == 'POST'):
        file = request.files.get('file')
        if file is None or file.filename == "":
            return jsonify({'error': 'no file'})
        if not allowed_file(file.filename):
             return jsonify({'error': 'format not supported'})

        try:
            img_bytes = file.read()
            tensor = transform_image(img_bytes)
            prediction = get_prediction(tensor)
            data = {'prediction': prediction.item()}
            return jsonify(data)

        except:
            return jsonify({'error': 'error during prediction'})

    return "unexpected"