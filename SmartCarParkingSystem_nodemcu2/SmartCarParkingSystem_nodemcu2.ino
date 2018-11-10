#include <ESP8266WiFi.h>
#include <MQTT.h>
 
WiFiClient WiFiclient;
MQTTClient client;
const char* ssid     = "Priyam_SCPS";
const char* password = "priyam123456";
const char* mqtt_host = "192.168.43.4";
const int trigPin1 = D7;
const int echoPin1 = D8;
const int trigPin2 = D1;
const int echoPin2 = D2;
const int led1 = 2;
const int led2 = 0;
String state_1;
String state_2;
String final_state;
long duration;
int distance;

void setup() {
pinMode(trigPin1, OUTPUT);
pinMode(echoPin1, INPUT);
pinMode(trigPin2, OUTPUT);
pinMode(echoPin2, INPUT);
pinMode(led1, OUTPUT);
pinMode(led2, OUTPUT);
Serial.begin(115200);
delay(10);
Serial.println();
Serial.println();
Serial.print("Connecting to ");
Serial.println(ssid);
 
WiFi.begin(ssid, password);
while (WiFi.status() != WL_CONNECTED) {
  delay(500);
  Serial.print(".");
 }
 
Serial.println("");
Serial.println("WiFi connected");  
Serial.println("IP address: ");
Serial.println(WiFi.localIP());
delay(2000);
 
Serial.print("connecting to MQTT broker...");
client.begin(mqtt_host, WiFiclient);
connect();
}

void connect() {
 while (!client.connect("nodemcu 2")) {
   Serial.print(".");
 }
Serial.println("\nconnected!");
}

void loop() {
  
//Checking the connection 
client.loop();
if(!client.connected())
{
  connect();
}

//Getting state from ultrasonic - 1 
digitalWrite(trigPin1, LOW);
delayMicroseconds(2);
digitalWrite(trigPin1, HIGH);
delayMicroseconds(10);
digitalWrite(trigPin1, LOW);
duration = pulseIn(echoPin1, HIGH);
distance= duration*0.034/2;
if(distance<=10)
{
  state_1="1";
  digitalWrite(led1, HIGH);
  }
else {
  state_1="0";
  digitalWrite(led1, LOW);
  }

//Getting state from ultrasonic - 2
digitalWrite(trigPin2, LOW);
delayMicroseconds(2);
digitalWrite(trigPin2, HIGH);
delayMicroseconds(10);
digitalWrite(trigPin2, LOW);
duration = pulseIn(echoPin2, HIGH);
distance= duration*0.034/2;
if(distance<=10)
{
  state_2="1";
  digitalWrite(led2, HIGH);
  }
  else {
    state_2="0";
    digitalWrite(led2, LOW);
    }

final_state = "B1:"+state_1+",B2:"+state_2;
Serial.println(final_state);
client.publish("/node2/data", final_state);
delay(1000);

}
