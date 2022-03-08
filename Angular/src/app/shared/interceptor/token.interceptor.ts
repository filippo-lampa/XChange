import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public tokenStorageService: TokenStorageService) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                token: `${this.tokenStorageService.getToken()}`
            }
        });
        return next.handle(request);
    }

}