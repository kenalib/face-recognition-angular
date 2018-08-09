import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { AlifaceApiService } from './aliface-api.service';
import { environment } from '../../environments/environment';
import { Person } from '../models/person';
import { FacePhoto } from '../models/face-photo';

describe('AlifaceApiService', () => {
  let injector: TestBed;
  let service: AlifaceApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlifaceApiService],
      imports: [
        HttpClientTestingModule,
      ],
    });

    injector = getTestBed();
    service = injector.get(AlifaceApiService);
    httpMock = injector.get(HttpTestingController);

  });

  it('should be created', inject([AlifaceApiService], (service: AlifaceApiService) => {
    expect(service).toBeTruthy();
  }));

  it('should return an Observable<Person[]>', () => {
    const person1: Person = { id: 'TEST1', name: 'Test1', photo: null, photoBase64: null };
    const person2: Person = { id: 'TEST2', name: 'Test2', photo: null, photoBase64: null };
    const dummyPeople = [person1, person2];

    service.getPeople().subscribe(persons => {
      expect(persons.length).toBe(2);
      expect(persons).toEqual(dummyPeople);
    });

    const req = httpMock.expectOne(environment.peopleUrl);
    expect(req.request.method).toBe("GET");

    // provide dummy values as responses
    req.flush(dummyPeople);
  });

  it('should return an Observable<Person>', () => {
    const person1: Person = { id: 'TEST1', name: 'Test1', photo: null, photoBase64: null };

    service.addPhoto("dummy", "dummy").subscribe(person => {
      expect(person).toEqual(person1);
    });

    const req = httpMock.expectOne(environment.registerUrl);

    // provide dummy values as responses
    req.flush(person1);
  });

  it('should return an Observable<FacePhoto>', () => {

    const dummyPhoto: FacePhoto = { faces: null, persons: null, photo: null };

    service.findAllInImage('testing').subscribe(result => {
      expect(result.faces.length).toBe(0);
    });

    const req = httpMock.expectOne(environment.findFacesUrl);
    expect(req.request.url).toBe(environment.findFacesUrl);

    // TODO: fix issue https://github.com/jasmine/jasmine/issues/1523
    // req.flush(dummyPhoto);
  });

  afterEach(() => {
    httpMock.verify();
  });

});
