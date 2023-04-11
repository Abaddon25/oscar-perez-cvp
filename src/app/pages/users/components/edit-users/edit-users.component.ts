import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Alert, Gender, State, User } from 'src/app/shared/models';
import { AlertsService } from 'src/app/shared/services/alerts.service';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-edit-users',
    templateUrl: './edit-users.component.html',
    styleUrls: ['./edit-users.component.scss'],
})
export class EditUsersComponent implements OnInit {
    idUser!: number;
    userForm!: FormGroup;
    genders: Array<Gender> = [
        { id: 'female', description: 'Femenino' },
        { id: 'male', description: 'Masculino' },
        { id: 'other', description: 'Otros' },
    ];
    states: Array<State> = [
        { id: 'active', description: 'Activo' },
        { id: 'inactive', description: 'Inactivo' },
    ];

    type: 'create' | 'update' = 'create';

    get name(): AbstractControl | null {
        return this.userForm.get('name');
    }
    get errorName(): boolean | undefined {
        return this.name?.touched && this.name?.errors ? this.name?.errors['required'] : undefined;
    }
    get email(): AbstractControl | null {
        return this.userForm.get('email');
    }
    get errorEmailRequired(): boolean | undefined {
        return this.email?.touched && this.email?.errors ? this.email?.errors['required'] : undefined;
    }
    get errorEmailFormat(): boolean | undefined {
        return this.email?.touched && this.email?.errors ? this.email?.errors['email'] : undefined;
    }
    get gender(): AbstractControl | null {
        return this.userForm.get('gender');
    }
    get errorGender(): boolean | undefined {
        return this.gender?.touched && this.gender?.errors ? this.gender?.errors['required'] : undefined;
    }
    get status(): AbstractControl | null {
        return this.userForm.get('status');
    }
    get errorStatus(): boolean | undefined {
        return this.status?.touched && this.status?.errors ? this.status?.errors['required'] : undefined;
    }

    constructor(private usersServices: UsersService, private alertsService: AlertsService, private activeRoute: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.loadForm();
        this.idUser = this.activeRoute.snapshot.params['id'];
        if (this.idUser) {
            this.type = 'update';
            firstValueFrom(this.usersServices.getOne(this.idUser, 'users')).then((response) => this.loadForm(response));
        }
    }
    loadForm(user?: User) {
        this.userForm = new FormGroup({
            name: new FormControl(user?.name, Validators.required),
            email: new FormControl(user?.email, [Validators.required, Validators.email]),
            gender: new FormControl(user ? user.gender : '', Validators.required),
            status: new FormControl(user ? user.status : '', Validators.required),
        });
    }
    saveUser() {
        const user = this.userForm.value;
        if (this.type === 'update') {
            firstValueFrom(this.usersServices.updateOne(user, 'users', this.idUser))
                .then((response) => {
                    if (response.id) {
                        const alert: Alert = { message: 'Usuario correctamente actualizado', type: 'success' };
                        this.alertsService.dispatchData({ alert });
                        this.router.navigate(['/all-users']);
                    }
                })
                .catch((response) => console.error(`Error presentado en el guardado`, response));
        } else {
            firstValueFrom(this.usersServices.addOne(user, 'users'))
                .then((response) => {
                    if (response.id) {
                        const alert: Alert = { message: 'Usuario correctamente creado', type: 'success' };
                        this.alertsService.dispatchData({ alert });
                        this.router.navigate(['/all-users']);
                    }
                })
                .catch((response) => {
                    if (response.error.length > 0) {
                        const error = response.error[0];
                        if ((error.field = 'email')) {
                            const alert: Alert = { message: 'Correo electrónico ya existe', type: 'danger' };
                            this.alertsService.dispatchData({ alert });
                        }
                    }
                    console.error(`Error presentado en el guardado`, response);
                });
        }
    }
}
