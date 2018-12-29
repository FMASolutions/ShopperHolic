import { Injectable, NgModule } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { HTTP_INTERCEPTORS, HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, switchMap, filter, take, tap } from 'rxjs/operators';
import { AuthenticatedUserModel } from 'src/app/models/security/authenticatedUserModel';
import { MatDialog } from '@angular/material';
import { LoginComponent } from 'src/app/components/generic/login/login.component';
import { Globals } from '../../../globals'

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    private isRefreshing: boolean = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private authService: AuthService, private loginDialog: MatDialog) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let bearerToken: string = "";
        if (req.url.toLowerCase().indexOf('auth/tokenrefresh') > 1) {
            bearerToken = this.authService.currentUser.refreshToken;
        } else {
            bearerToken = this.authService.currentUser.bearerToken;
        }

        if (bearerToken) {
            req = this.addToken(req, bearerToken)
        }

        return next.handle(req).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401) { //Unauthorized
                return this.handle401Error(req, next, error);
            } else {
                return throwError(error);
            }
        }));
    }

    private handle401Error(req: HttpRequest<any>, next: HttpHandler, currentError: HttpErrorResponse) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(switchMap((user: AuthenticatedUserModel) => {
                this.isRefreshing = false;
                this.refreshTokenSubject.next(user.bearerToken);
                return next.handle(this.addToken(req, user.bearerToken));
            }));
        } else if (req.url.toLowerCase().indexOf('auth/tokenrefresh') > 1) {
            this.isRefreshing = false;
            this.authService.logoutExistingUser();
            let dialogRef = this.loginDialog.open(LoginComponent,Globals.APP_SETTINGS.DEFAULT_MODAL_SETTINGS);
            dialogRef.afterClosed().pipe(tap((returnData =>{
                return next.handle(req);    
            })));
            
        } else {
            return this.refreshTokenSubject.pipe(
                filter(user => user != null),
                take(1),
                switchMap(bearerToken => {
                    return next.handle(this.addToken(req, bearerToken));
                })
            );
        }
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`
            }
        });
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