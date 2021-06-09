import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { AccessGuardService } from './services/access-guard/access-guard.service';
import { ProfileComponent } from './components/profile/profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { requiresLogin: false }, canActivate: [ AccessGuardService ] },
  { path: 'register', component: RegisterComponent, data: { requiresLogin: false }, canActivate: [ AccessGuardService ] },
  { path: 'profile/:id', component: ProfileComponent, data: { requiresLogin: true }, canActivate: [ AccessGuardService ]},
  { path: 'notFound', component: NotFoundComponent, data: { requiresLogin: false }, canActivate: [ AccessGuardService ]},
  { path: 'home', component: HomeComponent, data: { requiresLogin: true }, canActivate: [ AccessGuardService ] },
  { path: '', redirectTo: '/login', pathMatch: 'full'}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
