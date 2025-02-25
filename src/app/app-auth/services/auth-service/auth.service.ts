import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setUserName(name: string){
    localStorage.setItem('username', name);
  }
  
  getUserName(): string | null {
    return localStorage.getItem('username');
    
  }

  isAuthenticated(): boolean {
    return !!this.getUserName();
  }

  logout() {
    localStorage.removeItem('username');
  }
}
