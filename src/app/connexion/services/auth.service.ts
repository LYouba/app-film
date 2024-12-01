import { HttpClient, HttpErrorResponse, HttpHeaders, HttpInterceptor, HttpParams, HttpResponse, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url = 'http://localhost:8085';

  constructor(private http: HttpClient, private httpXsrf : HttpXsrfTokenExtractor) {}

  private header = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'basic dXNlcjphYXplcnQ='
  });
  
  registerUser(user: User) {
    this.http.post(`${this.url}/users`, user, {headers: this.header}).subscribe({
      next: response => {
      // Obtenez les en-têtes de la réponse
      console.log(response);
      
      if (response instanceof HttpResponse) {
        const headers: HttpHeaders = response.headers;
        // Obtenez les cookies de la réponse
      const cookies: string | null = headers.get('Set-Cookie');
      
      // Utilisez les cookies comme nécessaire
      console.log('Cookies de la réponse:', cookies);
      }
  
      
    },error : response => {
      // Obtenez les en-têtes de la réponse
      
      if (response instanceof HttpErrorResponse) {
        console.log(response);
        const headers: HttpHeaders = response.headers;
        // Obtenez les cookies de la réponse
      const cookies: string | null = headers.get('Set-Cookie');
      
      // Utilisez les cookies comme nécessaire
      console.log('Cookies de la réponse:', cookies);
      }
  
      
    }}
    )
    // .pipe(
    //   catchError((err) => {
    //     console.log(err);
    //     return of( err);
    //   })
    // );
  }

  logIn(credentials :{email: string, passWord: string}) {
    console.log(this.httpXsrf.getToken());

    this.httpXsrf.getToken();

    let params : HttpParams = new HttpParams();
    params.set("email", credentials.email);
    params.set("password", credentials.passWord);

    this.http.post(`${this.url}/login`, {headers: this.header, params: params}).subscribe({
      next: response => {
      // Obtenez les en-têtes de la réponse
      console.log(response);
      
      if (response instanceof HttpResponse) {
        const headers: HttpHeaders = response.headers;
        // Obtenez les cookies de la réponse
      const cookies: string | null = headers.get('Set-Cookie');
      
      // Utilisez les cookies comme nécessaire
      console.log('Cookies de la réponse:', cookies);
      }
  
      
    },error : response => {
      // Obtenez les en-têtes de la réponse
      
      if (response instanceof HttpErrorResponse) {
        console.log(response);
        const headers: HttpHeaders = response.headers;
        // Obtenez les cookies de la réponse
      const cookies: string | null = headers.get('Set-Cookie');
      
      // Utilisez les cookies comme nécessaire
      console.log('Cookies de la réponse:', cookies);
      }
  
      
    }}
    )
    // .pipe(
    //   catchError((err) => {
    //     console.log(err);
    //     return of( err);
    //   })
    // );
  }
}
