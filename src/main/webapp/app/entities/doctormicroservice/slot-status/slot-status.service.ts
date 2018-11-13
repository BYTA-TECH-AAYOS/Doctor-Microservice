import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISlotStatus } from 'app/shared/model/doctormicroservice/slot-status.model';

type EntityResponseType = HttpResponse<ISlotStatus>;
type EntityArrayResponseType = HttpResponse<ISlotStatus[]>;

@Injectable({ providedIn: 'root' })
export class SlotStatusService {
  public resourceUrl = SERVER_API_URL + 'api/slot-statuses';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/slot-statuses';

  constructor(private http: HttpClient) {}

  create(slotStatus: ISlotStatus): Observable<EntityResponseType> {
    return this.http.post<ISlotStatus>(this.resourceUrl, slotStatus, { observe: 'response' });
  }

  update(slotStatus: ISlotStatus): Observable<EntityResponseType> {
    return this.http.put<ISlotStatus>(this.resourceUrl, slotStatus, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISlotStatus>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISlotStatus[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISlotStatus[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
