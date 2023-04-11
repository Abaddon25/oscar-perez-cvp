import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { httpInterceptorProviders } from './interceptors/interceptors';
import { AlertsComponent } from './components/alerts/alerts.component';

const components = [NavbarComponent, AlertsComponent];
const modules = [CommonModule, HttpClientModule, RouterModule, FormsModule, ReactiveFormsModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components, ...modules],
  providers: [httpInterceptorProviders],
})
export class SharedModule {}
