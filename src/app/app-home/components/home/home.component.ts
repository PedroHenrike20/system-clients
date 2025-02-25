import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/app-auth/services/auth-service/auth.service';
import { HeaderService } from '../../services/header-service/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
userName: string | null;
  visibleSideBar: boolean = false;
  activeMenu: string = '';
  menuSelected: 'clients' | 'client_selected' = 'clients';

  submenus: { [key: string]: { label: string; id: 'clients' | 'client_selected' }[] } = {
    clients: [{ label: 'Clientes', id: 'clients' }, {label: 'Clientes selecionados', id: 'client_selected'}],
  };

  constructor(private authService: AuthService, private headerService: HeaderService, private router: Router) {
    this.userName = this.authService.getUserName();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const cleanUrl = event.url.split('?')[0].split('#')[0];

        const segments = cleanUrl.split('/');
        this.activeMenu = segments.length > 2 ? segments[2] : 'home';
      }
    });
  }

  onButtonClick(buttonId: 'clients' | 'client_selected') {
    this.menuSelected = buttonId;
    this.headerService.triggerButtonClick(buttonId);
  }

  logout() {
    this.authService.logout();
    this.headerService.resetState();
    this.router.navigate(['/login']);
  }

  navigateTo(menu: string) {
    this.activeMenu = menu;
    this.visibleSideBar = false;
    if (menu !== 'home') {
      this.router.navigate([`/home/${menu}`]);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
