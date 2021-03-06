import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IContactInfo } from 'app/shared/model/doctormicroservice/contact-info.model';

type EntityResponseType = HttpResponse<IContactInfo>;
type EntityArrayResponseType = HttpResponse<IContactInfo[]>;

@Injectable({ providedIn: 'root' })
export class ContactInfoService {
  public resourceUrl = SERVER_API_URL + 'api/contact-infos';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/contact-infos';

  constructor(private http: HttpClient) {}

  create(contactInfo: IContactInfo): Observable<EntityResponseType> {
    return this.http.post<IContactInfo>(this.resourceUrl, contactInfo, { observe: 'response' });
  }

  update(contactInfo: IContactInfo): Observable<EntityResponseType> {
    return this.http.put<IContactInfo>(this.resourceUrl, contactInfo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContactInfo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContactInfo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContactInfo[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
