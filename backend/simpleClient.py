import base64
import PySimpleGUI as sg
import uuid
import socket
import base64
import json


host="127.0.0.1"
port=6789

client = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
isclicked = False
globalClicks = 0
yourClicks = 0
layout = [
    [sg.Text( key="gclick")],
    [sg.Text("your clicks: " + str(yourClicks), key = "yclick")],
    [sg.Button("click here")]
]

window = sg.Window("client", layout, size=(200, 200))

id = str(uuid.uuid4())
while True:
    window.refresh()
    event, values = window.read()
    info = {"uuid": id, "clicked":isclicked}
    client.sendto(base64.b64encode(str.encode(json.dumps(info))), (host,port))
    if(isclicked):
        isclicked = False
    if event == "click here":
        isclicked = True
        yourClicks+=1
        window["yclick"].update("your clicks: " + str(yourClicks))
    if event == sg.WIN_CLOSED:
        break
    data, addr = client.recvfrom(1024)
    data = json.loads(base64.b64decode(data))
    globalClicks = data["globalClicks"]
    window["gclick"].update("global clicks: " + str(globalClicks))

window.close()