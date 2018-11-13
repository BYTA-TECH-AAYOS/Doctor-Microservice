/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DoctormicroserviceTestModule } from '../../../../test.module';
import { ProfileInfoUpdateComponent } from 'app/entities/doctormicroservice/profile-info/profile-info-update.component';
import { ProfileInfoService } from 'app/entities/doctormicroservice/profile-info/profile-info.service';
import { ProfileInfo } from 'app/shared/model/doctormicroservice/profile-info.model';

describe('Component Tests', () => {
  describe('ProfileInfo Management Update Component', () => {
    let comp: ProfileInfoUpdateComponent;
    let fixture: ComponentFixture<ProfileInfoUpdateComponent>;
    let service: ProfileInfoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DoctormicroserviceTestModule],
        declarations: [ProfileInfoUpdateComponent]
      })
        .overrideTemplate(ProfileInfoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfileInfoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfileInfoService);
    });

    describe('save', () => {
      it(
        'Should call update service on save for existing entity',
        fakeAsync(() => {
          // GIVEN
          const entity = new ProfileInfo(123);
          spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
          comp.profileInfo = entity;
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
          const entity = new ProfileInfo();
          spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
          comp.profileInfo = entity;
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
