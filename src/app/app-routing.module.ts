import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLoginComponent } from './pages/app-login/app-login.component';
import { AppHomeComponent } from './pages/app-home/app-home.component';
import { AuthGuard } from './guards/auth-guard/auth.guard';
import { HomeComponent } from './pages/app-home/components/home/home.component';
import { ProductsComponent } from './pages/app-home/components/products/products.component';
import { ClientsComponent } from './pages/app-home/components/clients/clients.component';

const routes: Routes = [
  {path: 'login', component: AppLoginComponent},
  {path: 'home',  component: AppHomeComponent, canActivate: [AuthGuard], children: [
    {path: '', component: HomeComponent,  },
    {path: 'products', component: ProductsComponent,  },
    {path: 'clients', component: ClientsComponent,  },

  ] },
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
