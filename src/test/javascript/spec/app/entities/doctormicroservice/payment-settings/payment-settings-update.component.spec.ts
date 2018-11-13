/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DoctormicroserviceTestModule } from '../../../../test.module';
import { PaymentSettingsUpdateComponent } from 'app/entities/doctormicroservice/payment-settings/payment-settings-update.component';
import { PaymentSettingsService } from 'app/entities/doctormicroservice/payment-settings/payment-settings.service';
import { PaymentSettings } from 'app/shared/model/doctormicroservice/payment-settings.model';

describe('Component Tests', () => {
  describe('PaymentSettings Management Update Component', () => {
    let comp: PaymentSettingsUpdateComponent;
    let fixture: ComponentFixture<PaymentSettingsUpdateComponent>;
    let service: PaymentSettingsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DoctormicroserviceTestModule],
        declarations: [PaymentSettingsUpdateComponent]
      })
        .overrideTemplate(PaymentSettingsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PaymentSettingsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaymentSettingsService);
    });

    describe('save', () => {
      it(
        'Should call update service on save for existing entity',
        fakeAsync(() => {
          // GIVEN
          const entity = new PaymentSettings(123);
          spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
          comp.paymentSettings = entity;
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
          const entity = new PaymentSettings();
          spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
          comp.paymentSettings = entity;
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
