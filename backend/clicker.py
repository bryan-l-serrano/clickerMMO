import socket
import json
import base64



globalClicks = 0

info = []
UDP_IP_ADDR = "127.0.0.1"
PORT = 6789

socket_serv = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
socket_serv.bind((UDP_IP_ADDR, PORT))

print("running on port: " + str(PORT))


while True:
    data, addr = socket_serv.recvfrom(1024)
    data = json.loads(base64.b64decode(data))
    user = next(((index,item) for index,item in enumerate(info) if item['uuid'] == data["uuid"]),False)
    if(user):
        if(data["clicked"] == True):
            print("adding")
            globalClicks += 1
            user[1]["clicks"] += 1
            user[1]["place"] = user[0] + 1
        clientInfo = {"globalClicks":globalClicks, "position":user[1]["place"]}
    else:
        print("new user")
        globalClicks+=1
        newuser = {"clicks":1, "place":-1}
        newuser.update(data)
        info.append(newuser)
        print("added new user")
        clientInfo = {"globalClicks":globalClicks}
    if (globalClicks % 100 == 0):
        info.sort(reverse=True, key=lambda k : k['clicks'])
        print(str(info))
    toSend=base64.b64encode(str.encode(json.dumps(clientInfo)))
    print(clientInfo)
    print("sending ...")
    socket_serv.sendto(toSend, addr)