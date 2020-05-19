import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FlashcardService {
  private url = 'http://localhost:8096/translation';

  constructor(private http: HttpClient) { }

  getMessage(): Observable<Message> {
    return this.http.post<Message>(this.url, null);
  }
}

export interface Message {
  message: string;
}
