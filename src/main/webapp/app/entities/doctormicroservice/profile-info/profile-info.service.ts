import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProfileInfo } from 'app/shared/model/doctormicroservice/profile-info.model';

type EntityResponseType = HttpResponse<IProfileInfo>;
type EntityArrayResponseType = HttpResponse<IProfileInfo[]>;

@Injectable({ providedIn: 'root' })
export class ProfileInfoService {
  public resourceUrl = SERVER_API_URL + 'api/profile-infos';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/profile-infos';

  constructor(private http: HttpClient) {}

  create(profileInfo: IProfileInfo): Observable<EntityResponseType> {
    return this.http.post<IProfileInfo>(this.resourceUrl, profileInfo, { observe: 'response' });
  }

  update(profileInfo: IProfileInfo): Observable<EntityResponseType> {
    return this.http.put<IProfileInfo>(this.resourceUrl, profileInfo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProfileInfo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProfileInfo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProfileInfo[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
