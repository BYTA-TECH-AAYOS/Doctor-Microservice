/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DoctormicroserviceTestModule } from '../../../../test.module';
import { PaymentSettingsDeleteDialogComponent } from 'app/entities/doctormicroservice/payment-settings/payment-settings-delete-dialog.component';
import { PaymentSettingsService } from 'app/entities/doctormicroservice/payment-settings/payment-settings.service';

describe('Component Tests', () => {
  describe('PaymentSettings Management Delete Component', () => {
    let comp: PaymentSettingsDeleteDialogComponent;
    let fixture: ComponentFixture<PaymentSettingsDeleteDialogComponent>;
    let service: PaymentSettingsService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DoctormicroserviceTestModule],
        declarations: [PaymentSettingsDeleteDialogComponent]
      })
        .overrideTemplate(PaymentSettingsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PaymentSettingsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaymentSettingsService);
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
