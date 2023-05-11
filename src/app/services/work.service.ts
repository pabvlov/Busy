import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Work } from '../interfaces/work';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  constructor(private httpClient: HttpClient) { }

  uploadWork(body: FormData) {
    return this.httpClient.post('http://localhost:3000/work/add', body);
  }
}
