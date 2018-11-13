/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DoctormicroserviceTestModule } from '../../../../test.module';
import { ProfileInfoDeleteDialogComponent } from 'app/entities/doctormicroservice/profile-info/profile-info-delete-dialog.component';
import { ProfileInfoService } from 'app/entities/doctormicroservice/profile-info/profile-info.service';

describe('Component Tests', () => {
  describe('ProfileInfo Management Delete Component', () => {
    let comp: ProfileInfoDeleteDialogComponent;
    let fixture: ComponentFixture<ProfileInfoDeleteDialogComponent>;
    let service: ProfileInfoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DoctormicroserviceTestModule],
        declarations: [ProfileInfoDeleteDialogComponent]
      })
        .overrideTemplate(ProfileInfoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProfileInfoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfileInfoService);
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
