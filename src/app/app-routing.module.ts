import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';
import { HomePageComponent } from './MyComponents/home-page/home-page.component';
import { LoginComponent } from './MyComponents/login/login.component';
import { SyncPageComponent } from './MyComponents/sync-page/sync-page.component';
import { SyncDataComponent } from './MyComponents/sync-data/sync-data.component';
import { NewSyncPageComponent } from './MyComponents/new-sync-page/new-sync-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'Home', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'SyncStatus', component: SyncDataComponent, canActivate: [AuthGuard] },
  { path: 'sync', component: SyncPageComponent, canActivate: [AuthGuard] },
  { path: 'NewSyncPage', component: NewSyncPageComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
