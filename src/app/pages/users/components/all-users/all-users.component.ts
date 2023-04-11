import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { Alert, User } from 'src/app/shared/models';
import { AlertsService } from 'src/app/shared/services/alerts.service';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-all-users',
    templateUrl: './all-users.component.html',
    styleUrls: ['./all-users.component.scss'],
})
export class AllUsersComponent implements OnInit {
    keys!: Array<string>;
    users!: Array<User>;
    constructor(private userService: UsersService, private alertsService: AlertsService) {}

    ngOnInit() {
        this.loadUsers();
    }
    removeUser(idUser: number) {
        firstValueFrom(this.userService.removeOne(idUser, 'users'))
            .then((response) => {
                if (response === null) {
                    const alert: Alert = { message: 'Usuario correctamente eliminado', type: 'success' };
                    this.alertsService.dispatchData({ alert });
                    this.loadUsers();
                }
            })
            .catch((response) => console.error('Error al intentar eliminar el usuario', response));
    }
    loadUsers() {
        firstValueFrom(this.userService.getAll('users'))
            .then((response) => {
                if (response && response.length > 0) {
                    this.users = response;
                    this.keys = Object.keys(this.users[0]);
                }
            })
            .catch((response) => console.error('Error al intentar cargar la información de los usuarios', response));
    }
}
