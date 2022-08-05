import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Test/components/home/home.component';
import { LoginComponent } from './Test/components/login/login.component';

const routes: Routes = [
 
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: HomeComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
