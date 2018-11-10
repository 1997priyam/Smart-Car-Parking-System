import paho.mqtt.client as mqtt
import requests, json
import copy

new_state = {'A1':'0', 'A2':'0', 'B1':'0', 'B2':'0'}
old_state = {'A1':'0', 'A2':'0', 'B1':'0', 'B2':'0'}
MQTT_SERVER = "127.0.0.1"
path_1 = "/node1/data"
path_2 = "/node2/data"
server_url = 'http://localhost:3000/data'
headers = {'content-type': 'application/json'}


def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe(path_1)
    client.subscribe(path_2)

def on_message(client, userdata, msg):
    message = str(msg.payload)
    slotsandval = message.split(',')
    for ele in slotsandval:
        slot = ele.split(':')
        slot_name = slot[0]
        slot_value = slot[1]
        new_state[slot_name] = slot_value
    
    if(cmp(new_state, old_state) !=  0):
        data_json = json.dumps(new_state)
        for k,v in new_state.items():
            old_state[k] = v
        print(data_json)
        try:
            r = requests.post(server_url, data=data_json, headers=headers)
            print(r.status_code)
        except requests.exceptions.RequestException as e:
            print(e.message)
    
    else:
        pass

client = mqtt.Client("Rpi priyam")
client.on_connect = on_connect
client.on_message = on_message
 
client.connect(MQTT_SERVER, 1883, 60)
client.loop_forever()
