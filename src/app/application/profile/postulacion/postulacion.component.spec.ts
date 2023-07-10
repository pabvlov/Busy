import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulacionComponent } from './postulacion.component';

describe('PostulacionComponent', () => {
  let component: PostulacionComponent;
  let fixture: ComponentFixture<PostulacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostulacionComponent]
    });
    fixture = TestBed.createComponent(PostulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
