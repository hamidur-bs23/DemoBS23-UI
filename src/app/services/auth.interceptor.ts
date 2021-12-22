import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const tokenFromStorage = localStorage.getItem('token');
        
        if(tokenFromStorage){
            
            const clonedReq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + tokenFromStorage)
            });

            return next.handle(clonedReq);
        } else {
            return next.handle(req);
        }
    }
    
}