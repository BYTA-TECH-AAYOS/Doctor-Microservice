/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DoctormicroserviceTestModule } from '../../../../test.module';
import { DoctorSettingsDeleteDialogComponent } from 'app/entities/doctormicroservice/doctor-settings/doctor-settings-delete-dialog.component';
import { DoctorSettingsService } from 'app/entities/doctormicroservice/doctor-settings/doctor-settings.service';

describe('Component Tests', () => {
  describe('DoctorSettings Management Delete Component', () => {
    let comp: DoctorSettingsDeleteDialogComponent;
    let fixture: ComponentFixture<DoctorSettingsDeleteDialogComponent>;
    let service: DoctorSettingsService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DoctormicroserviceTestModule],
        declarations: [DoctorSettingsDeleteDialogComponent]
      })
        .overrideTemplate(DoctorSettingsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DoctorSettingsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DoctorSettingsService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
