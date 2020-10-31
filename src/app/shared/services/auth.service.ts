import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private options = { withCredentials: true };

    constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

    public authenticate(): void {
        this.http.get('http://localhost/AuthAPI/api/auth', this.options)
                .subscribe(res => {
                    console.log(res);
                },
                (error) => {
                    console.log(error);
                });
    }
}
