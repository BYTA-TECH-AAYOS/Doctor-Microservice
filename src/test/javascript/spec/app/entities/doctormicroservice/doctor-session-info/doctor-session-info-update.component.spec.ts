/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DoctormicroserviceTestModule } from '../../../../test.module';
import { DoctorSessionInfoUpdateComponent } from 'app/entities/doctormicroservice/doctor-session-info/doctor-session-info-update.component';
import { DoctorSessionInfoService } from 'app/entities/doctormicroservice/doctor-session-info/doctor-session-info.service';
import { DoctorSessionInfo } from 'app/shared/model/doctormicroservice/doctor-session-info.model';

describe('Component Tests', () => {
  describe('DoctorSessionInfo Management Update Component', () => {
    let comp: DoctorSessionInfoUpdateComponent;
    let fixture: ComponentFixture<DoctorSessionInfoUpdateComponent>;
    let service: DoctorSessionInfoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DoctormicroserviceTestModule],
        declarations: [DoctorSessionInfoUpdateComponent]
      })
        .overrideTemplate(DoctorSessionInfoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DoctorSessionInfoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DoctorSessionInfoService);
    });

    describe('save', () => {
      it(
        'Should call update service on save for existing entity',
        fakeAsync(() => {
          // GIVEN
          const entity = new DoctorSessionInfo(123);
          spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
          comp.doctorSessionInfo = entity;
          // WHEN
          comp.save();
          tick(); // simulate async

          // THEN
          expect(service.update).toHaveBeenCalledWith(entity);
          expect(comp.isSaving).toEqual(false);
        })
      );

      it(
        'Should call create service on save for new entity',
        fakeAsync(() => {
          // GIVEN
          const entity = new DoctorSessionInfo();
          spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
          comp.doctorSessionInfo = entity;
          // WHEN
          comp.save();
          tick(); // simulate async

          // THEN
          expect(service.create).toHaveBeenCalledWith(entity);
          expect(comp.isSaving).toEqual(false);
        })
      );
    });
  });
});
