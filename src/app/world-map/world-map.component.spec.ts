import { TestBed } from '@angular/core/testing';
import { WorldMapComponent } from './world-map.component';

describe('WorldMapComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorldMapComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(WorldMapComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });
});
