import { ErrorHandler, NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { AppConfigService } from './services/app-config.service';
import { AppToastrService } from './services/app-toastr.service';

import { AppErrorHandler } from './common/error-exceptions/app-error-handler';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';


const appInitializerFn = (appConfigService: AppConfigService) => () => appConfigService.loadAppConfig();


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NotFoundComponent,
    NavBarComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SharedModule,

    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    })
  ],
  providers: [
    AuthGuard,
    AuthService,
    AppToastrService,
    AppConfigService,

    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: APP_INITIALIZER, useFactory: appInitializerFn, multi: true, deps: [AppConfigService] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
