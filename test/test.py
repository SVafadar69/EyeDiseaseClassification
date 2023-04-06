import requests

resp = requests.post('https://eyediseaseclassification.onrender.com//predict', files={'file': open("0_left.jpg", 'rb')})

print(resp)