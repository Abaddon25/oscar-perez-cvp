import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { URLSSERVICES } from 'src/app/shared/services/urls';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends SharedService {
  constructor(http: HttpClient, @Inject(URLSSERVICES) urlsServices: any) {
    super(http, urlsServices);
  }
}
