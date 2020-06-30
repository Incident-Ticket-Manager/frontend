import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Profile} from "../model/Profile";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const profile: Profile = JSON.parse(sessionStorage.getItem("profile"));

    if (profile != null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${profile.token}`
        }
      });
    }
    return next.handle(request);
  }
}
