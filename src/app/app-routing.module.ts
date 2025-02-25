import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'login', loadChildren: () => import('./app-auth/app-auth.module').then(m => m.AppAuthModule)},
  {path: 'home', loadChildren: () => import('./app-home/app-home.module').then(m => m.AppHomeModule)},
  {path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
