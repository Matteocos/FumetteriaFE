import { TestBed } from '@angular/core/testing';

import { UtentiService } from './lista-utenti.service';

describe('ListaUtentiService', () => {
  let service: UtentiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtentiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
