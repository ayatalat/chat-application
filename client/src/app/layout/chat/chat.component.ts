import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import * as io from 'socket.io-client';
import { routerTransition } from '../../router.animations';


const url = "http://localhost:3000";
@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    animations: [routerTransition()]
})
export class ChatComponent implements OnInit {
    socket;
    username = '';
    userId = '';
    txtmessage: string = '';
    onlineUsers;
    offlineUsers;
    messages = [];
    reciever: any = null;
    constructor(public service: UserService, private router: Router, private activatedRoute: ActivatedRoute) {
        if (localStorage.getItem('username') == '' || localStorage.getItem('username')==undefined) {
            this.router.navigate(['/login']);
        } else {
            this.socket = io.connect(url);
            this.service.socket = this.socket;
            this.username = localStorage.getItem('username');
            this.userId = localStorage.getItem('userId');
            this.socket.emit("join", { id: this.userId, username: this.username });
            // online users without current user
            this.socket.on('onlineUsers', users => this.onlineUsers = users.filter(user => user.id != this.userId));
            // offline users
            this.socket.on('offlineUsers', users => this.offlineUsers = users);
            this.socket.on('onlinemessage', msg => {
                if (this.reciever != null) {
                    this.messages.push(msg);
                } 
                else{
                    //open chat window to other user
                    let reciever = this.onlineUsers.find(user => user.id == msg.from)
                    this.sendtouser(reciever, true)
                    this.messages.push(msg);
                }

            });
            this.socket.on('offlinemessage', msg => {
                    this.messages.push(msg);         
            });
            this.socket.on('getmessaeges', messages => this.messages = messages);
        }



    }
    ngOnInit() {
    }
    sendMessage() {
        if (this.txtmessage != "") {
            console.log("send to", this.reciever);
            if (this.reciever.check) {
                console.log('online')
                this.socket.emit('onlinemessage', {
                    message: this.txtmessage,
                    to: this.reciever.id
                });
                this.txtmessage = "";
            } else {
                console.log('offline');
                this.socket.emit('offlinemessage', {
                    message: this.txtmessage,
                    to: this.reciever.id
                });
                this.txtmessage = "";


            }

        }
    }
    sendtouser(user, check) {
        this.messages = [];
        console.log(user);
        user.check = check;
        this.reciever = user;
        this.socket.emit("messageHistory", user.id);

    }

}
