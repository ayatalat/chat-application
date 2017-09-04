import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { UserService } from '../shared/services/user.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    model = {
        txtEmail: '',
        txtPassword: ''
    }
    errorMsg = '';
    loggedAdmin;
    constructor(public router: Router, private service: UserService) {
    }

    ngOnInit() {
    }

    onLoggedin() {
        console.log(this.model);
        this.loggedAdmin = 
        {
            email: this.model.txtEmail,
            password: this.model.txtPassword
        }
        this.service.login(this.loggedAdmin).subscribe(result => {
            console.log(result);
            if (!result.error) {
                localStorage.setItem('isLoggedin', 'true');
                localStorage.setItem('username',result.username);
                localStorage.setItem('userId',result.id);
                this.router.navigate(['/chat']);
            }
            else {
                this.errorMsg = result.message;
            }

        },
            err => console.log(`error happen login  ${err}`));
        
        
    }




}
