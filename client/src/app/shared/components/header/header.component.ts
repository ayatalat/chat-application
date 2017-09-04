import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
        username;
    constructor(private service:UserService,private translate: TranslateService, public router: Router) {
        this.username=localStorage.getItem('username')
    }

    ngOnInit() {}


    onLoggedout() {
        this.service.socket.publish('disconnect');
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
      
    }

  
}
