/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { PaymentSettingsService } from 'app/entities/doctormicroservice/payment-settings/payment-settings.service';
import { IPaymentSettings, PaymentSettings } from 'app/shared/model/doctormicroservice/payment-settings.model';

describe('Service Tests', () => {
  describe('PaymentSettings Service', () => {
    let injector: TestBed;
    let service: PaymentSettingsService;
    let httpMock: HttpTestingController;
    let elemDefault: IPaymentSettings;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      injector = getTestBed();
      service = injector.get(PaymentSettingsService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new PaymentSettings(0, false, 0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', async () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(JSON.stringify(returnedFromService));
      });

      it('should create a PaymentSettings', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new PaymentSettings(null))
          .pipe(take(1))
          .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(JSON.stringify(returnedFromService));
      });

      it('should update a PaymentSettings', async () => {
        const returnedFromService = Object.assign(
          {
            isPaymentEnabled: true,
            amount: 1,
            paymentMethod: 'BBBBBB',
            currency: 'BBBBBB',
            intent: 'BBBBBB',
            noteToPayer: 'BBBBBB',
            paymentGatewayProvider: 'BBBBBB',
            paymentGatewayCredentials: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(JSON.stringify(returnedFromService));
      });

      it('should return a list of PaymentSettings', async () => {
        const returnedFromService = Object.assign(
          {
            isPaymentEnabled: true,
            amount: 1,
            paymentMethod: 'BBBBBB',
            currency: 'BBBBBB',
            intent: 'BBBBBB',
            noteToPayer: 'BBBBBB',
            paymentGatewayProvider: 'BBBBBB',
            paymentGatewayCredentials: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => expect(body).toContainEqual(expected));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(JSON.stringify([returnedFromService]));
        httpMock.verify();
      });

      it('should delete a PaymentSettings', async () => {
        const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
