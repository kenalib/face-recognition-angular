import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RecognizeComponent } from './recognize.component';

describe('RecognizeComponent', () => {
  let component: RecognizeComponent;
  let fixture: ComponentFixture<RecognizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecognizeComponent ],
      imports: [
        MatCardModule,
        HttpClientTestingModule,
      ],
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

  it('should start camera', () => {
    // TODO: get camera permission
    component.ngOnInit();
    component.onClickCamera();
    component.ngOnDestroy();
  });

});
