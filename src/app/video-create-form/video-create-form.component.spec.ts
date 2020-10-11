import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCreateFormComponent } from './video-create-form.component';

describe('VideoCreateFormComponent', () => {
  let component: VideoCreateFormComponent;
  let fixture: ComponentFixture<VideoCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoCreateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
