import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class AlifaceApiService {
  private peopleUrl = 'http://192.168.33.10:8080/face-recognition/people';

  constructor(
    private http: HttpClient,
  ) { }

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.peopleUrl);
  }

  savePhoto(arg0: any): any {
    console.log('Method not implemented.');
  }

}
