import { TestBed } from '@angular/core/testing';

import { VideoSerieService } from './video-serie.service';

describe('VideoSerieService', () => {
  let service: VideoSerieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoSerieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
