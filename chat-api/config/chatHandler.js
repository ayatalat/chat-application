
var Message = require('../models/message');
var User = require('../models/user');
module.exports = function (io) {
    var usersArr = [];
    io.on('connection', clientSocket => {
        console.log("new connection!!")
        clientSocket.on('join', userInfo => {
            clientSocket.userInfo = userInfo;
            // add user socket to users array
            usersArr.push(clientSocket);

            //get onlineusers 
            let onlineUsers = usersArr.map((user) => user.userInfo)
            // send  online users to all users 
            clientSocket.broadcast.emit("onlineUsers", onlineUsers);
            // send online users to logged user
            clientSocket.emit("onlineUsers", onlineUsers)


            // get offline users fitler database from onlineusers 
            User.find({}, { "id": 1, "username": 1 }, (err, users) => {
                users = users.map(user => ({ username: user.username, id: user._id }));
        
                let offlineUsers=users.filter(function (user) {
                    return onlineUsers.filter(function (onlineuser) {
                        return onlineuser.id ==user.id;
                    }).length == 0
                });

                clientSocket.broadcast.emit("offlineUsers", offlineUsers);
                clientSocket.emit("offlineUsers", offlineUsers);
            })


        })

        clientSocket.on('onlinemessage', data => {
            console.log(data);
            let message = new Message();
            message.message = data.message;
            message.to = data.to
            message.from = clientSocket.userInfo.id;
            message.save();

            let recieverSocket = usersArr.find(user => user.userInfo.id == data.to)
            recieverSocket.emit("onlinemessage", message);
            clientSocket.emit("onlinemessage", message);
        })
       
         clientSocket.on('offlinemessage', data => {
            let message = new Message();
            message.message = data.message;
            message.to = data.to
            message.from = clientSocket.userInfo.id;
            message.save();
            clientSocket.emit("offlinemessage", message);
        })

        clientSocket.on('messageHistory',(userId)=>{
            Message.find({
              to:{$in:[userId,clientSocket.userInfo.id]},
              from:{$in:[userId,clientSocket.userInfo.id]}              
            },{"_id":0,"to":1,"from":1,"message":1},(err,messages)=>{
                clientSocket.emit('getmessaeges',messages);
            }).sort('created_at');
        })
        clientSocket.on("disconnect", () => {
            console.log('disconnect');
            //remove current socket user from usersArr 
           usersArr = usersArr.filter((user) => user.userInfo != clientSocket.userInfo);
            // remove user from online
            let onlineUsers = usersArr.map((user) => user.userInfo)
            clientSocket.broadcast.emit("onlineUsers", onlineUsers);

            User.find({}, { "id": 1, "username": 1 }, (err, users) => {
            users = users.map(user => ({ username: user.username, id: user._id }));
             let offlineUsers=users.filter(function (user) {
                    return onlineUsers.filter(function (onlineuser) {
                        return onlineuser.id ==user.id;
                    }).length == 0
                });
              clientSocket.broadcast.emit("offlineUsers", offlineUsers);
               
            })

        })
    })
}