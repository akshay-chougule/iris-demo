import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  signIn(data) {
    return this.http.post('/auth/token', data);
  }
}
