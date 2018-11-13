/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DoctormicroserviceTestModule } from '../../../../test.module';
import { PaymentSettingsDetailComponent } from 'app/entities/doctormicroservice/payment-settings/payment-settings-detail.component';
import { PaymentSettings } from 'app/shared/model/doctormicroservice/payment-settings.model';

describe('Component Tests', () => {
  describe('PaymentSettings Management Detail Component', () => {
    let comp: PaymentSettingsDetailComponent;
    let fixture: ComponentFixture<PaymentSettingsDetailComponent>;
    const route = ({ data: of({ paymentSettings: new PaymentSettings(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DoctormicroserviceTestModule],
        declarations: [PaymentSettingsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PaymentSettingsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PaymentSettingsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.paymentSettings).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
