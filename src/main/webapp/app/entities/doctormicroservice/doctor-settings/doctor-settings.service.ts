import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDoctorSettings } from 'app/shared/model/doctormicroservice/doctor-settings.model';

type EntityResponseType = HttpResponse<IDoctorSettings>;
type EntityArrayResponseType = HttpResponse<IDoctorSettings[]>;

@Injectable({ providedIn: 'root' })
export class DoctorSettingsService {
  public resourceUrl = SERVER_API_URL + 'api/doctor-settings';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/doctor-settings';

  constructor(private http: HttpClient) {}

  create(doctorSettings: IDoctorSettings): Observable<EntityResponseType> {
    return this.http.post<IDoctorSettings>(this.resourceUrl, doctorSettings, { observe: 'response' });
  }

  update(doctorSettings: IDoctorSettings): Observable<EntityResponseType> {
    return this.http.put<IDoctorSettings>(this.resourceUrl, doctorSettings, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDoctorSettings>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDoctorSettings[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDoctorSettings[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
