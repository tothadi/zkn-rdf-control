import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MerlegComponent } from './merleg/merleg.component';
//import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'merleg', component: MerlegComponent,  },
  { path: 'home', component: HomeComponent },
  //{ path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
