import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TreeModule } from '@circlon/angular-tree-component';

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

import { SharedModule } from './shared/shared.module';
import { HttpErrorInterceptor} from './interceptors/http-error.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AlertComponent } from './alert.component';

import { NavbarComponent } from './layouts/navbar/navbar.component';
import { HomeComponent } from './layouts/home/home.component';
import { CategoryTreeComponent } from './components/category-tree/category-tree.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AlertComponent,
    NavbarComponent,
    HomeComponent, CategoryTreeComponent, CategoryDetailComponent, CategoryEditComponent, CategoryAddComponent, ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    KeycloakAngularModule,
    TreeModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initializeKeycloak, multi: true, deps: [KeycloakService] },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmationDialogComponent
  ]
})
export class AppModule { }

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init(environment.keycloakOptions);
}
