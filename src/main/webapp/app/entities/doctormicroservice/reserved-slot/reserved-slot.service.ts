import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IReservedSlot } from 'app/shared/model/doctormicroservice/reserved-slot.model';

type EntityResponseType = HttpResponse<IReservedSlot>;
type EntityArrayResponseType = HttpResponse<IReservedSlot[]>;

@Injectable({ providedIn: 'root' })
export class ReservedSlotService {
  public resourceUrl = SERVER_API_URL + 'api/reserved-slots';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/reserved-slots';

  constructor(private http: HttpClient) {}

  create(reservedSlot: IReservedSlot): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reservedSlot);
    return this.http
      .post<IReservedSlot>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(reservedSlot: IReservedSlot): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reservedSlot);
    return this.http
      .put<IReservedSlot>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IReservedSlot>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IReservedSlot[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IReservedSlot[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(reservedSlot: IReservedSlot): IReservedSlot {
    const copy: IReservedSlot = Object.assign({}, reservedSlot, {
      date: reservedSlot.date != null && reservedSlot.date.isValid() ? reservedSlot.date.format(DATE_FORMAT) : null,
      startTime: reservedSlot.startTime != null && reservedSlot.startTime.isValid() ? reservedSlot.startTime.toJSON() : null,
      endTime: reservedSlot.endTime != null && reservedSlot.endTime.isValid() ? reservedSlot.endTime.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date != null ? moment(res.body.date) : null;
      res.body.startTime = res.body.startTime != null ? moment(res.body.startTime) : null;
      res.body.endTime = res.body.endTime != null ? moment(res.body.endTime) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((reservedSlot: IReservedSlot) => {
        reservedSlot.date = reservedSlot.date != null ? moment(reservedSlot.date) : null;
        reservedSlot.startTime = reservedSlot.startTime != null ? moment(reservedSlot.startTime) : null;
        reservedSlot.endTime = reservedSlot.endTime != null ? moment(reservedSlot.endTime) : null;
      });
    }
    return res;
  }
}
