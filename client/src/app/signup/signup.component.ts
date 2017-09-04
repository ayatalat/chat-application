import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { UserService } from '../shared/services/user.service'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    model: any = {
        txtusername: '',
        txtEmail: '',
        txtPassword: '',
        txtCpassword: ''
    }

    errorMsg: string = '';
    constructor(private service: UserService, private router: ActivatedRoute, private route: Router) { }

    ngOnInit() { }
    
    confrimpassword() {
        return (this.model.txtPassword == this.model.txtCpassword);
    }

    onSubmit() {
        console.log(this.model);
        let newUser = {
            username: this.model.txtusername,
            email: this.model.txtEmail,
            password: this.model.txtPassword
        }
        this.service.signup(newUser).subscribe(result => {
            if (!result.error) {
                localStorage.setItem('isLoggedin', 'true');
                localStorage.setItem('username',result.data.username);
                localStorage.setItem('userId',result.data._id);
                this.route.navigate(['/chat']);
            }
            else {
                this.errorMsg = result.message;
            }
        },
            err => console.log(`error happened  add user${err}`)
        );

    }
}
