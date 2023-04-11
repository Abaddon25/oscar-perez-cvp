import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditUsersComponent } from './components/edit-users/edit-users.component';

@NgModule({
  declarations: [
    AllUsersComponent,
    EditUsersComponent,
  ],
  imports: [CommonModule, UsersRoutingModule, SharedModule],
})
export class UsersModule {}
