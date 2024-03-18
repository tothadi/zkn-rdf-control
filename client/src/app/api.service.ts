import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

export interface ApiResponse {
    message: string;
}

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient, private auth: AuthService) {}

    public openGate(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>('/api/bar?bar=INCOMING&toggle=open', {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` },
        });
    }

    public closeGate(): Observable<ApiResponse> {
        return this.http.get<ApiResponse>('/api/bar?bar=INCOMING&toggle=close', {
            headers: { Authorization: `Bearer ${this.auth.getToken()}` },
        });
    }
}
