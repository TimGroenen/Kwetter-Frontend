import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private accountUrl = 'http://localhost:8080/api/user';
    private loggedInUsername = "";
    private loggedInUser = null;

    constructor(private httpClient: HttpClient) { }

    public setAccountToken(accountToken: string) {
        sessionStorage.setItem('token', accountToken);
    }

    public getAccountToken(): string {
        let token = sessionStorage.getItem('token');
        if(token == null) { return ""; }
        return token;
    }

    public removeAccountToken() {
        sessionStorage.removeItem('token');
    }

    public getLoggedInUsername(): String {
        if (this.loggedInUsername.length == 0) {
            const helper = new JwtHelperService();
            const accountToken = this.getAccountToken();
            if (accountToken) {
                const decodedToken = helper.decodeToken(this.getAccountToken());
                this.loggedInUsername = decodedToken.sub;
            }
        }
        return this.loggedInUsername;
    }

    public login(username: string, password: string): Observable<any> {
        let auth = new Auth(username, password);
        return this.httpClient.post(this.accountUrl + "/login", auth, { observe: 'response' });
    }

    public register(username: string, password: string): Observable<any> {
        let auth = new Auth(username, password);
        return this.httpClient.post(this.accountUrl + "/register", auth, { observe: 'response' });
    }
}
