import { Component, OnInit } from '@angular/core';

import { AlifaceApiService } from '../../services/aliface-api.service';
import { Person } from '../../models/person';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  people: Person[];

  constructor(
    private apiService: AlifaceApiService,
  ) { }

  ngOnInit() {
    this.apiService.getPeople().subscribe(
      people => this.people = people
    );
  }

}
