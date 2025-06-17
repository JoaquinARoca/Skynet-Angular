import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


export const routes: Routes = [
  { path: 'panel/:modelo', loadComponent: () => import('./panel/panel.component').then(m => m.PanelComponent) },
  { path: 'form/:modelo', loadComponent: () => import('./form/form.component').then(m => m.FormComponent) },
  { path: 'form/:modelo/:id', loadComponent: () => import('./form/form.component').then(m => m.FormComponent) },
  { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
   { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutesModule { }
