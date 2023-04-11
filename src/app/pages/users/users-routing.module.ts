import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { EditUsersComponent } from './components/edit-users/edit-users.component';

const routes: Routes = [
  { path: '', redirectTo: 'all-users', pathMatch: 'full' },
  { path: 'all-users', component: AllUsersComponent },
  { path: 'create-users', component: EditUsersComponent },
  { path: 'update-users/:id', component: EditUsersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
