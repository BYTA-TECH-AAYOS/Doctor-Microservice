/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { DoctorSessionInfoService } from 'app/entities/doctormicroservice/doctor-session-info/doctor-session-info.service';
import { IDoctorSessionInfo, DoctorSessionInfo } from 'app/shared/model/doctormicroservice/doctor-session-info.model';

describe('Service Tests', () => {
  describe('DoctorSessionInfo Service', () => {
    let injector: TestBed;
    let service: DoctorSessionInfoService;
    let httpMock: HttpTestingController;
    let elemDefault: IDoctorSessionInfo;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      injector = getTestBed();
      service = injector.get(DoctorSessionInfoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new DoctorSessionInfo(0, currentDate, currentDate, currentDate, currentDate);
    });

    describe('Service methods', async () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            date: currentDate.format(DATE_FORMAT),
            startTime: currentDate.format(DATE_TIME_FORMAT),
            endTime: currentDate.format(DATE_TIME_FORMAT),
            interval: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(JSON.stringify(returnedFromService));
      });

      it('should create a DoctorSessionInfo', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            date: currentDate.format(DATE_FORMAT),
            startTime: currentDate.format(DATE_TIME_FORMAT),
            endTime: currentDate.format(DATE_TIME_FORMAT),
            interval: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            date: currentDate,
            startTime: currentDate,
            endTime: currentDate,
            interval: currentDate
          },
          returnedFromService
        );
        service
          .create(new DoctorSessionInfo(null))
          .pipe(take(1))
          .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(JSON.stringify(returnedFromService));
      });

      it('should update a DoctorSessionInfo', async () => {
        const returnedFromService = Object.assign(
          {
            date: currentDate.format(DATE_FORMAT),
            startTime: currentDate.format(DATE_TIME_FORMAT),
            endTime: currentDate.format(DATE_TIME_FORMAT),
            interval: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate,
            startTime: currentDate,
            endTime: currentDate,
            interval: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(JSON.stringify(returnedFromService));
      });

      it('should return a list of DoctorSessionInfo', async () => {
        const returnedFromService = Object.assign(
          {
            date: currentDate.format(DATE_FORMAT),
            startTime: currentDate.format(DATE_TIME_FORMAT),
            endTime: currentDate.format(DATE_TIME_FORMAT),
            interval: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            date: currentDate,
            startTime: currentDate,
            endTime: currentDate,
            interval: currentDate
          },
          returnedFromService
        );
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

      it('should delete a DoctorSessionInfo', async () => {
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
