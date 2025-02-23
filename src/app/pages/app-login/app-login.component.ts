import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/app-login/services/auth-service/auth.service';
import { AuthModel } from './models/auth.model';

@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.scss']
})
export class AppLoginComponent {

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
