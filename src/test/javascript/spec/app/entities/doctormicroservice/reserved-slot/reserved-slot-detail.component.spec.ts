/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DoctormicroserviceTestModule } from '../../../../test.module';
import { ReservedSlotDetailComponent } from 'app/entities/doctormicroservice/reserved-slot/reserved-slot-detail.component';
import { ReservedSlot } from 'app/shared/model/doctormicroservice/reserved-slot.model';

describe('Component Tests', () => {
  describe('ReservedSlot Management Detail Component', () => {
    let comp: ReservedSlotDetailComponent;
    let fixture: ComponentFixture<ReservedSlotDetailComponent>;
    const route = ({ data: of({ reservedSlot: new ReservedSlot(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DoctormicroserviceTestModule],
        declarations: [ReservedSlotDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ReservedSlotDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ReservedSlotDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.reservedSlot).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
