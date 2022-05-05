import socket
import json
import base64



globalClicks = 0
cycles = 0

info = []
UDP_IP_ADDR = "127.0.0.1"
PORT = 6789
CYCLE_RESET = 60

socket_serv = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
socket_serv.bind((UDP_IP_ADDR, PORT))

print("running on port: " + str(PORT))


while True:
    data, addr = socket_serv.recvfrom(1024)
    cycles += 1
    data = json.loads(base64.b64decode(data))
    user = next(((index,item) for index,item in enumerate(info) if item['uuid'] == data["uuid"]),False)
    if(user):
        print("adding")
        difference = data["clicks"] - user[1]["clicks"]
        globalClicks += difference
        user[1]["clicks"] = data["clicks"]
        user[1]["rank"] = user[0] + 1
        clientInfo = {"globalClicks":globalClicks, "position":user[1]["rank"]}
    else:
        print("new user")
        newuser = {}
        newuser.update(data)
        info.append(newuser)
        print("added new user")
        clientInfo = {"globalClicks":globalClicks, "position":len(info)}
    if (cycles % CYCLE_RESET == 0):
        info.sort(reverse=True, key=lambda k : k['clicks'])
        print(str(info))
    toSend=base64.b64encode(str.encode(json.dumps(clientInfo)))
    print(clientInfo)
    print("sending ...")
    socket_serv.sendto(toSend, addr)