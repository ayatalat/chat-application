import { Injectable } from '@angular/core';
import { Http, Response, Request } from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class UserService {

  loginUrl = "http://localhost:3000/users/login";
  signupUrl = "http://localhost:3000/users/signup";
  
 
  socket;
  
  
  constructor(private http: Http) { }

  login(user) {
    return this.http.post(this.loginUrl, user).map((response: Response) => response.json());
  }

  signup(user) {
    return this.http.post(this.signupUrl, user).map((response: Response) => response.json());
  }

 


}