import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChildrensComponent } from './list-childrens.component';

describe('ListChildrensComponent', () => {
  let component: ListChildrensComponent;
  let fixture: ComponentFixture<ListChildrensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListChildrensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChildrensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
