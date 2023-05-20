import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Work } from '../interfaces/work';
import { ApiResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  constructor(private httpClient: HttpClient) { }

  uploadWork(body: FormData) {
    return this.httpClient.post('http://localhost:3000/work/add', body);
  }

  getWorks() {
    return this.httpClient.get<ApiResponse>('http://localhost:3000/works');
  }

  
}
