import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Person } from '../models/person';
import { FacePhoto } from '../models/face-photo';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AlifaceApiService {
  private peopleUrl = environment.peopleUrl;
  private registerUrl = environment.registerUrl;
  private findFacesUrl = environment.findFacesUrl;

  constructor(
    private http: HttpClient,
  ) { }

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.peopleUrl);
  }

  addPhoto(name: string, photo: string): Observable<Person> {
    const person = {
      name: name,
      photoBase64: photo,
    };

    return this.http.post<Person>(this.registerUrl, person).pipe(
      tap((person1: Person) => console.log(`added person w/ id=${person1.id}`)),
      catchError(this.handleError<Person>('addPhoto'))
    );
  }

  deletePerson(id: string): Observable<Person> {
    const url = `${this.peopleUrl}/${id}`;

    return this.http.delete<Person>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted person id=${id}`)),
      catchError(this.handleError<Person>('deletePerson'))
    );
  }

  findAllInImage(photoBase64: string) {
    return this.http.post<FacePhoto>(this.findFacesUrl, photoBase64).pipe(
      tap(_ => console.log(_)),
      catchError(this.handleError<FacePhoto>('findAllInImage'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
