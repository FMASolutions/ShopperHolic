import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { HTTP_INTERCEPTORS, HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        var token = localStorage.getItem("bearerToken");
        console.log("adding bearer token: " + token);
        if (token) {
            const newReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
            return next.handle(newReq);
        }
        else { return next.handle(req); }
    }
};

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpRequestInterceptor,
            multi: true
        }
    ]
})
export class HttpInterceptorModule { }