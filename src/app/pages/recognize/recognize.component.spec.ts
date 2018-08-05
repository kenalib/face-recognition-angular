import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecognizeComponent } from './recognize.component';

describe('RecognizeComponent', () => {
  let component: RecognizeComponent;
  let fixture: ComponentFixture<RecognizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecognizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecognizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
