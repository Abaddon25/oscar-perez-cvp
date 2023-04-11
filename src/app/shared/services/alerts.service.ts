import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { URLSSERVICES } from './urls';

@Injectable({
    providedIn: 'root',
})
export class AlertsService extends SharedService {
    constructor(http: HttpClient, @Inject(URLSSERVICES) urlsServices: any) {
        super(http, urlsServices);
    }
}
