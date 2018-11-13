/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DoctormicroserviceTestModule } from '../../../../test.module';
import { DoctorSessionInfoDetailComponent } from 'app/entities/doctormicroservice/doctor-session-info/doctor-session-info-detail.component';
import { DoctorSessionInfo } from 'app/shared/model/doctormicroservice/doctor-session-info.model';

describe('Component Tests', () => {
  describe('DoctorSessionInfo Management Detail Component', () => {
    let comp: DoctorSessionInfoDetailComponent;
    let fixture: ComponentFixture<DoctorSessionInfoDetailComponent>;
    const route = ({ data: of({ doctorSessionInfo: new DoctorSessionInfo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DoctormicroserviceTestModule],
        declarations: [DoctorSessionInfoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DoctorSessionInfoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DoctorSessionInfoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.doctorSessionInfo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
