import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { RegisterComponent } from "./components/register/register.component";
import { AuthGuard } from "./services/auth-guard.service";

const routes : Routes = [
    { path: 'home', component: HomeComponent },    
    { path: '', redirectTo: '/home', pathMatch: 'full' },

    { path: 'product', loadChildren: ()=>import('./product/product.module').then(m=>m.ProductModule) },

    { path: 'category', loadChildren: ()=>import('./category/category.module').then(m=>m.CategoryModule) },
    
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LoginComponent },

    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}