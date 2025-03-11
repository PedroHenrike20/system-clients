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
    const name = localStorage.getItem('username');
    const nameParts = name?.trim().split(' ');

    return nameParts?.slice(0,2).join(' ')!
    
  }

  isAuthenticated(): boolean {
    return !!this.getUserName();
  }

  logout() {
    localStorage.removeItem('username');
  }
}
