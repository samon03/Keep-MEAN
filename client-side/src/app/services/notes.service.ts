import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Note } from '../shared/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  selectedNote: Note;
  notes: Note[];
  readonly baseURL = 'http://localhost:3000/notes';

  constructor(private http: HttpClient) { }

  getNote(): Observable<Note[]>{
    return this.http.get<Note[]>(this.baseURL);
  }

  postNote(note: Note): Observable<Note[]>{
     return this.http.post<Note[]>(this.baseURL, note);
  }

  putNote(note: Note): Observable<Note[]>{
    return this.http.put<Note[]>(this.baseURL + `/${note._id}`, note);
  }

 // tslint:disable-next-line: typedef variable-name
  deleteNote(_id: string): Observable<Note[]>
  {
    return this.http.delete<Note[]>(this.baseURL + `/${_id}`);
  }
}
