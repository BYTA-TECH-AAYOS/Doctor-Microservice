import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDoctorSessionInfo } from 'app/shared/model/doctormicroservice/doctor-session-info.model';

type EntityResponseType = HttpResponse<IDoctorSessionInfo>;
type EntityArrayResponseType = HttpResponse<IDoctorSessionInfo[]>;

@Injectable({ providedIn: 'root' })
export class DoctorSessionInfoService {
  public resourceUrl = SERVER_API_URL + 'api/doctor-session-infos';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/doctor-session-infos';

  constructor(private http: HttpClient) {}

  create(doctorSessionInfo: IDoctorSessionInfo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(doctorSessionInfo);
    return this.http
      .post<IDoctorSessionInfo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(doctorSessionInfo: IDoctorSessionInfo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(doctorSessionInfo);
    return this.http
      .put<IDoctorSessionInfo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDoctorSessionInfo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDoctorSessionInfo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDoctorSessionInfo[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(doctorSessionInfo: IDoctorSessionInfo): IDoctorSessionInfo {
    const copy: IDoctorSessionInfo = Object.assign({}, doctorSessionInfo, {
      date: doctorSessionInfo.date != null && doctorSessionInfo.date.isValid() ? doctorSessionInfo.date.format(DATE_FORMAT) : null,
      startTime: doctorSessionInfo.startTime != null && doctorSessionInfo.startTime.isValid() ? doctorSessionInfo.startTime.toJSON() : null,
      endTime: doctorSessionInfo.endTime != null && doctorSessionInfo.endTime.isValid() ? doctorSessionInfo.endTime.toJSON() : null,
      interval: doctorSessionInfo.interval != null && doctorSessionInfo.interval.isValid() ? doctorSessionInfo.interval.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date != null ? moment(res.body.date) : null;
      res.body.startTime = res.body.startTime != null ? moment(res.body.startTime) : null;
      res.body.endTime = res.body.endTime != null ? moment(res.body.endTime) : null;
      res.body.interval = res.body.interval != null ? moment(res.body.interval) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((doctorSessionInfo: IDoctorSessionInfo) => {
        doctorSessionInfo.date = doctorSessionInfo.date != null ? moment(doctorSessionInfo.date) : null;
        doctorSessionInfo.startTime = doctorSessionInfo.startTime != null ? moment(doctorSessionInfo.startTime) : null;
        doctorSessionInfo.endTime = doctorSessionInfo.endTime != null ? moment(doctorSessionInfo.endTime) : null;
        doctorSessionInfo.interval = doctorSessionInfo.interval != null ? moment(doctorSessionInfo.interval) : null;
      });
    }
    return res;
  }
}
