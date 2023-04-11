import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { URLSSERVICES } from './urls';

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    url: string = environment.urlApi;

    subject = new Subject<any>();
    resetDataSubject = this.subject.asObservable();

    constructor(public http: HttpClient, @Inject(URLSSERVICES) public urlsServices: any) {}

    getOne = (id: number | string, nameService: string, additional: string = ''): Observable<any> =>
        this.http.get<any>(`${this.url}${this.urlsServices[nameService]()}${additional}/${id}`);
    getAll = (nameService: string): Observable<any> => this.http.get<any>(`${this.url}${this.urlsServices[nameService]()}`);
    getManyUrl = (nameService: string, additional: string = ''): Observable<any> =>
        this.http.get<any>(`${this.url}${this.urlsServices[nameService]()}${additional}`);
    getMany = (items: any, nameService: string, additional: string = ''): Observable<any> =>
        this.http.post<any>(`${this.url}${this.urlsServices[nameService]()}${additional}`, items);

    addOne = (item: any, nameService: string, additional: string = ''): Observable<any> =>
        this.http.post<any>(`${this.url}${this.urlsServices[nameService]()}${additional}`, item);
    addMany = (items: any, nameService: string, additional: string = ''): Observable<any> =>
        this.http.post<any>(`${this.url}${this.urlsServices[nameService]()}${additional}`, items);

    updateOne = (item: any, nameService: string, id: string | number, additional: string = ''): Observable<any> =>
        this.http.put<any>(`${this.url}${this.urlsServices[nameService]()}${additional}/${id}`, item);
    updateMany = (items: any[], nameService: string, additional: string = ''): Observable<any> =>
        this.http.put<any[]>(`${this.url}${this.urlsServices[nameService]()}${additional}`, items);

    removeOne = (id: any, nameService: string, additional: string = ''): Observable<any> =>
        this.http.delete<any>(`${this.url}${this.urlsServices[nameService]()}${additional}/${id}`);
    removeMany = (ids: any, nameService: string, additional: string = ''): Observable<any> =>
        this.http.delete<any>(`${this.url}${this.urlsServices[nameService]()}${additional}`, { body: ids });

    dispatchData = (data: any) => this.subject.next(data);
}
