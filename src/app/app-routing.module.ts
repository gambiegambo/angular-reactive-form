import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'users',  component: UserComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'login', component: LoginComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}