import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { RegisterComponent } from "./components/register/register.component";

const routes : Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },

    { path: 'product', loadChildren: ()=>import('./product/product.module').then(m=>m.ProductModule)},

    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    {path: 'logout', component: LoginComponent },

    { path: '**', component: NotFoundComponent }

];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}