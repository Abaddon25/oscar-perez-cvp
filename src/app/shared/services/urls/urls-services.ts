import { InjectionToken } from '@angular/core';

const UrlsServices = {
    users: () => 'users',
};
export const URLSSERVICES = new InjectionToken('URLSSERVICES', {
    providedIn: 'root',
    factory: () => UrlsServices,
});
