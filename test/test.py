import requests

resp = requests.post('http://localhost:5000/predict', files={'file': open("0_left.jpg", 'rb')})

print(resp.text)