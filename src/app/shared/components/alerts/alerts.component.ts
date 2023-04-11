import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert } from '../../models';
import { AlertsService } from '../../services/alerts.service';

@Component({
    selector: 'app-alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss'],
})
export class AlertsComponent implements OnInit, OnDestroy {
    subscriptions: Subscription = new Subscription();
    showAlert: boolean = false;
    message!: string;
    type!: 'danger' | 'success';

    constructor(private alertsService: AlertsService) {}

    ngOnInit() {
        this.subscriptions.add(
            this.alertsService.resetDataSubject.subscribe(({ alert }: any) => {
                if (alert) {
                    const { message, type }: Alert = alert;
                    this.message = message;
                    this.type = type;
                    this.showAlert = true;
                    setTimeout(() => {
                        this.showAlert = false;
                    }, 3000);
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
