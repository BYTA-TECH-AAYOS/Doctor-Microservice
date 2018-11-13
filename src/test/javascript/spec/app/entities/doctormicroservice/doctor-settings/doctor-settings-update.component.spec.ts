/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DoctormicroserviceTestModule } from '../../../../test.module';
import { DoctorSettingsUpdateComponent } from 'app/entities/doctormicroservice/doctor-settings/doctor-settings-update.component';
import { DoctorSettingsService } from 'app/entities/doctormicroservice/doctor-settings/doctor-settings.service';
import { DoctorSettings } from 'app/shared/model/doctormicroservice/doctor-settings.model';

describe('Component Tests', () => {
  describe('DoctorSettings Management Update Component', () => {
    let comp: DoctorSettingsUpdateComponent;
    let fixture: ComponentFixture<DoctorSettingsUpdateComponent>;
    let service: DoctorSettingsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DoctormicroserviceTestModule],
        declarations: [DoctorSettingsUpdateComponent]
      })
        .overrideTemplate(DoctorSettingsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DoctorSettingsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DoctorSettingsService);
    });

    describe('save', () => {
      it(
        'Should call update service on save for existing entity',
        fakeAsync(() => {
          // GIVEN
          const entity = new DoctorSettings(123);
          spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
          comp.doctorSettings = entity;
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
          const entity = new DoctorSettings();
          spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
          comp.doctorSettings = entity;
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
