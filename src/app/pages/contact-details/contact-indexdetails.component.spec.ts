import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactIndexdetailsComponent } from './contact-indexdetails.component';

describe('ContactIndexdetailsComponent', () => {
  let component: ContactIndexdetailsComponent;
  let fixture: ComponentFixture<ContactIndexdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactIndexdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactIndexdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
