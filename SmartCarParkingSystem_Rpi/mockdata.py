import time
import requests, json
endpoint_1 = 'http://localhost:3000/data/2'
endpoint_2 = 'http://localhost:3000/data/3'
headers = {'content-type': 'application/json'}

data1 = {'A1':'0', 'A2':'0', 'B1':'1', 'B2':'1', 'C1':'0'}
data2 = {'A1':'0', 'A2':'1', 'B1':'1', 'B2':'0', 'C1':'0', 'C2':'1'}

while True:
    data_json1 = json.dumps(data1)
    data_json2 = json.dumps(data2)
    try:
        r = requests.post(endpoint_1, data=data_json1, headers=headers)
        print(r.status_code)
    except requests.exceptions.RequestException as e:
        print(e.message)
    time.sleep(5)
    try:
        r = requests.post(endpoint_2, data=data_json2, headers=headers)
        print(r.status_code)
    except requests.exceptions.RequestException as e:
        print(e.message)
    time.sleep(5)

    for k,v in data1.items():
        if(data1[k] == '0'):
            data1[k] = '1'
        else:
            data1[k] = '0'
    
    for k,v in data2.items():
        if(data2[k] == '0'):
            data2[k] = '1'
        else:
            data2[k] = '0'