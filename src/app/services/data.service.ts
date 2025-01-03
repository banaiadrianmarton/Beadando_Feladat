import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlayersModel } from '../models/player.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:3000/players';

  getRegistrations(): Observable<PlayersModel[]> {
    return this.http.get<PlayersModel[]>(this.url);
  }

  addRegistration(reg: PlayersModel): Observable<PlayersModel> {
    return this.http.post<PlayersModel>(this.url, reg);
  }

  modifyARegistration(reg: PlayersModel): Observable<PlayersModel> {
    return this.http.put<PlayersModel>(`${this.url}/${reg.id}`, reg);
  }

  deleteRegistration(reg: PlayersModel): Observable<PlayersModel> {
    return this.http.delete<PlayersModel>(`${this.url}/${reg.id}`);
  }
}
