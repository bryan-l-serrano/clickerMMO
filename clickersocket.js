const app = require('express')
const http = require('http').Server(app)
const io = require('socket.io')(http)

globalClicks = 0;
cycles = 0
playerData = [];

http.listen(6788, () =>{
    console.log("listening on port 6788");
});

io.on('connection', (socket) =>{
    console.log('a user connected');


    socket.on('click', (val) =>{
        cycles += 1;
        globalClicks +=1;
        if (cycles % 100 == 0){
            playerData.sort((a,b) => b.clicks - a.clicks);
            console.log(playerData);
        }
        //user = playerData.filter(function(item){return item.uuid == val.uuid});
        user = playerData.find(item => item.uuid == val.uuid);
        console.log(user);
        if (user){
            user.clicks +=1;
            toClient = {"globalClicks":globalClicks, "rank":playerData.findIndex(item => item.uuid == val.uuid)+1};
        }
        else{
            toClient = {"globalClicks":globalClicks, "rank":playerData.length};
            playerData.push({"uuid":val.uuid,"clicks":1, "rank":playerData.length});
            console.log(playerData);
        }
        socket.emit('updateClicks', toClient);
    });


    socket.on('disconnect', ()=>{
        console.log('user disconnected');
    });


});