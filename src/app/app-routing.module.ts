import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth-guard/auth-guard.guard';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full',},
  { path: 'login', redirectTo: 'login', pathMatch: 'full',},
  { path: 'admin', redirectTo: 'admin/dashboard/student', pathMatch: 'full'},
  { path: 'admin/dashboard', redirectTo: 'admin/dashboard/student', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
