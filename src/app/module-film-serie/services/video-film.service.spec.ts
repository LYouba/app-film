import { TestBed } from '@angular/core/testing';

import { VideoFilmService } from './video-film.service';

describe('VideoFilmService', () => {
  let service: VideoFilmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoFilmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
