/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DoctormicroserviceTestModule } from '../../../../test.module';
import { DoctorSettingsDetailComponent } from 'app/entities/doctormicroservice/doctor-settings/doctor-settings-detail.component';
import { DoctorSettings } from 'app/shared/model/doctormicroservice/doctor-settings.model';

describe('Component Tests', () => {
  describe('DoctorSettings Management Detail Component', () => {
    let comp: DoctorSettingsDetailComponent;
    let fixture: ComponentFixture<DoctorSettingsDetailComponent>;
    const route = ({ data: of({ doctorSettings: new DoctorSettings(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DoctormicroserviceTestModule],
        declarations: [DoctorSettingsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DoctorSettingsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DoctorSettingsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.doctorSettings).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
