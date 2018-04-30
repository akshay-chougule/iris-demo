import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class InfactService {
  constructor(private http: HttpClient) {}

  getInfactRecord() {
    return this.http.get('/api/infact-record');
  }
}
