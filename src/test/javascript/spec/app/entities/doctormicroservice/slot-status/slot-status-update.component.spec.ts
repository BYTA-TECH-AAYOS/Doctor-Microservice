/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DoctormicroserviceTestModule } from '../../../../test.module';
import { SlotStatusUpdateComponent } from 'app/entities/doctormicroservice/slot-status/slot-status-update.component';
import { SlotStatusService } from 'app/entities/doctormicroservice/slot-status/slot-status.service';
import { SlotStatus } from 'app/shared/model/doctormicroservice/slot-status.model';

describe('Component Tests', () => {
  describe('SlotStatus Management Update Component', () => {
    let comp: SlotStatusUpdateComponent;
    let fixture: ComponentFixture<SlotStatusUpdateComponent>;
    let service: SlotStatusService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DoctormicroserviceTestModule],
        declarations: [SlotStatusUpdateComponent]
      })
        .overrideTemplate(SlotStatusUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SlotStatusUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SlotStatusService);
    });

    describe('save', () => {
      it(
        'Should call update service on save for existing entity',
        fakeAsync(() => {
          // GIVEN
          const entity = new SlotStatus(123);
          spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
          comp.slotStatus = entity;
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
          const entity = new SlotStatus();
          spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
          comp.slotStatus = entity;
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
