import { Component } from '@angular/core';
import { AuthModel } from '../../models/auth.model';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginModel: AuthModel = {
      userName: ''
    };
  
    get isActiveButtonLogin(): boolean {
      return this.loginModel.userName.trim().length <= 3
    }
  
    constructor(private authService: AuthService, private router: Router) {}
  
    login(){
      if(this.loginModel.userName.trim()){
        this.authService.setUserName(this.loginModel.userName);
        this.router.navigate(['/home']);
      }
    }

}
