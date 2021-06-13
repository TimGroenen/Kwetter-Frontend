import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Account } from 'src/app/models/account/account';
import { Auth } from '../../models/auth/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private accountUrl = 'gateway-service:8080/api/user';
    private loggedInUsername = "";

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

    public setAccount(acc: Account) {
        sessionStorage.setItem('account', JSON.stringify(acc));
    }

    public getAccount(): Account | null {
        let acc = sessionStorage.getItem('account')

        if(acc == null) return null;

        return JSON.parse(acc);
    }

    public removeAccount() {
        sessionStorage.removeItem('account');
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

    public login(username: string, password: string): Observable<HttpResponse<any>> {
        let auth = new Auth(username, password);
        return this.httpClient.post(this.accountUrl + "/login", auth, { observe: 'response' });
    }

    public register(username: string, name: string, password: string): Observable<HttpResponse<Account>> {
        let auth = new Auth(username, password, name);
        return this.httpClient.post<Account>(this.accountUrl + "/register", auth, { observe: 'response' });
    }

    public getAccountByEmail(email: string): Observable<HttpResponse<Account>> {
        let auth = new Auth(email, "", "");
        return this.httpClient.post<Account>(this.accountUrl + "/email", auth, { observe: "response" });
    }
}
