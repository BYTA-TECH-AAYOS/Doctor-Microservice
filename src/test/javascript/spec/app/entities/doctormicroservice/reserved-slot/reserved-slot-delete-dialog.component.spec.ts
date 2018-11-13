/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DoctormicroserviceTestModule } from '../../../../test.module';
import { ReservedSlotDeleteDialogComponent } from 'app/entities/doctormicroservice/reserved-slot/reserved-slot-delete-dialog.component';
import { ReservedSlotService } from 'app/entities/doctormicroservice/reserved-slot/reserved-slot.service';

describe('Component Tests', () => {
  describe('ReservedSlot Management Delete Component', () => {
    let comp: ReservedSlotDeleteDialogComponent;
    let fixture: ComponentFixture<ReservedSlotDeleteDialogComponent>;
    let service: ReservedSlotService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DoctormicroserviceTestModule],
        declarations: [ReservedSlotDeleteDialogComponent]
      })
        .overrideTemplate(ReservedSlotDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ReservedSlotDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReservedSlotService);
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
