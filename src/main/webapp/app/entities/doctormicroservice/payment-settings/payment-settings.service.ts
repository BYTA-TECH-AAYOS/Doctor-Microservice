import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPaymentSettings } from 'app/shared/model/doctormicroservice/payment-settings.model';

type EntityResponseType = HttpResponse<IPaymentSettings>;
type EntityArrayResponseType = HttpResponse<IPaymentSettings[]>;

@Injectable({ providedIn: 'root' })
export class PaymentSettingsService {
  public resourceUrl = SERVER_API_URL + 'api/payment-settings';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/payment-settings';

  constructor(private http: HttpClient) {}

  create(paymentSettings: IPaymentSettings): Observable<EntityResponseType> {
    return this.http.post<IPaymentSettings>(this.resourceUrl, paymentSettings, { observe: 'response' });
  }

  update(paymentSettings: IPaymentSettings): Observable<EntityResponseType> {
    return this.http.put<IPaymentSettings>(this.resourceUrl, paymentSettings, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPaymentSettings>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPaymentSettings[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPaymentSettings[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
