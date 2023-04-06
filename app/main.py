from flask import Flask, request, jsonify

from app.torch_utils import transform_image, get_prediction

app = Flask(__name__)

ALLOWED_EXTENSTIONS = {'png', 'jpeg', 'jpg'}
def allowed_file(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSTIONS

@app.route('/')
def hello_world():
    return 'You have successfully deployed!'

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
  
    return jsonify({'result': 1})

