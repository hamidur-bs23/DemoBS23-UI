import { ErrorHandler, NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './services/auth.service';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { AppConfigService } from './services/app-config.service';

import { AppErrorHandler } from './common/error-exceptions/app-error-handler';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoryComponent } from './components/categories/category/category.component';
import { ProductComponent } from './components/products/product/product.component';
import { AuthGuard } from './services/auth-guard.service';


const appInitializerFn = (appConfigService: AppConfigService) => {
  return async () => {
    console.log("App Init....START");
    await appConfigService.loadAppConfig();
    console.log("App Init....FINISH???");
  }
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NotFoundComponent,
    NavBarComponent,
    RegisterComponent,
    LoginComponent,
    ProductsComponent,
    ProductComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    ProductService,
    CategoryService,
    AppConfigService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
