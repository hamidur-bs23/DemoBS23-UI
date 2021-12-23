import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoriesComponent } from "./components/categories/categories.component";
import { CategoryComponent } from "./components/categories/category/category.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { ProductComponent } from "./components/products/product/product.component";
import { ProductsComponent } from "./components/products/products.component";
import { RegisterComponent } from "./components/register/register.component";

const routes : Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },

    {
        path: 'products/product:id',
        component: ProductComponent
    },
    {
        path: 'products',
        component: ProductsComponent
    },
    

    
    {
        path: 'categories',
        component: CategoriesComponent
    },    
    {
        path: 'category:id',
        component: CategoryComponent
    },



    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'logout',
        component: LoginComponent
    },

    {
        path: '**',
        component: NotFoundComponent
    }

];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}