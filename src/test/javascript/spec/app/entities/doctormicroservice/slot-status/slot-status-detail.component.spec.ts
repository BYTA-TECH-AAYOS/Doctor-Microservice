/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DoctormicroserviceTestModule } from '../../../../test.module';
import { SlotStatusDetailComponent } from 'app/entities/doctormicroservice/slot-status/slot-status-detail.component';
import { SlotStatus } from 'app/shared/model/doctormicroservice/slot-status.model';

describe('Component Tests', () => {
  describe('SlotStatus Management Detail Component', () => {
    let comp: SlotStatusDetailComponent;
    let fixture: ComponentFixture<SlotStatusDetailComponent>;
    const route = ({ data: of({ slotStatus: new SlotStatus(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DoctormicroserviceTestModule],
        declarations: [SlotStatusDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SlotStatusDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SlotStatusDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.slotStatus).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
