import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface UserDetails {
    _id: string;
    email: string;
    username: string;
    fullname: string;
    exp: number;
    iat: number;
}

export interface User {
    email: string;
    password: string;
    username: string;
    fullname: string;
}

export interface LoginData {
    password: string;
    username: string;
}

@Injectable()
export class AuthenticationService {
    private token: string | null = null;

    constructor(private http: HttpClient, private router: Router) {}

    private saveToken(token: string): void {
        localStorage.setItem('mean-token', token);
        this.token = token;
    }

    public getToken(): string | null {
        if (!this.token) {
            this.token = localStorage.getItem('mean-token');
        }
        return this.token;
    }

    public getUserDetails(): UserDetails | null {
        const token = this.getToken();
        let payload;
        if (token) {
            payload = token.split('.')[1];
            payload = window.atob(payload);
            return JSON.parse(payload);
        } else {
            return null;
        }
    }

    public isLoggedIn(): boolean {
        const user = this.getUserDetails();
        if (user) {
            return user.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }

    public register(user: User): Observable<UserDetails> {
        return this.http.post<UserDetails>(`/api/signup`, user).pipe(
            map((data) => {
                if ('token' in data) {
                    this.saveToken(data.token as string);
                }
                return data;
            })
        );
    }

    public login(user: LoginData): Observable<UserDetails> {
      return this.http.post<UserDetails>(`/api/signin`, user).pipe(
        map((data) => {
            if ('token' in data) {
                this.saveToken(data.token as string);
            }
            return data;
        })
    );
    }

    public profile(): Observable<User> {
        return this.http.get<User>(`/api/user`, {
          headers: { Authorization: `Bearer ${this.getToken()}` },
      });
    }

    public logout(): void {
        this.token = '';
        window.localStorage.removeItem('mean-token');
        this.router.navigate(['/home']);
    }
}
