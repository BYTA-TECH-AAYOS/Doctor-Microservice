/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DoctormicroserviceTestModule } from '../../../../test.module';
import { ReservedSlotUpdateComponent } from 'app/entities/doctormicroservice/reserved-slot/reserved-slot-update.component';
import { ReservedSlotService } from 'app/entities/doctormicroservice/reserved-slot/reserved-slot.service';
import { ReservedSlot } from 'app/shared/model/doctormicroservice/reserved-slot.model';

describe('Component Tests', () => {
  describe('ReservedSlot Management Update Component', () => {
    let comp: ReservedSlotUpdateComponent;
    let fixture: ComponentFixture<ReservedSlotUpdateComponent>;
    let service: ReservedSlotService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DoctormicroserviceTestModule],
        declarations: [ReservedSlotUpdateComponent]
      })
        .overrideTemplate(ReservedSlotUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReservedSlotUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReservedSlotService);
    });

    describe('save', () => {
      it(
        'Should call update service on save for existing entity',
        fakeAsync(() => {
          // GIVEN
          const entity = new ReservedSlot(123);
          spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
          comp.reservedSlot = entity;
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
          const entity = new ReservedSlot();
          spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
          comp.reservedSlot = entity;
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
