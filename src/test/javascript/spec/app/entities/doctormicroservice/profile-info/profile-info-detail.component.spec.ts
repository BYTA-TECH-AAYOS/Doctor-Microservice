/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DoctormicroserviceTestModule } from '../../../../test.module';
import { ProfileInfoDetailComponent } from 'app/entities/doctormicroservice/profile-info/profile-info-detail.component';
import { ProfileInfo } from 'app/shared/model/doctormicroservice/profile-info.model';

describe('Component Tests', () => {
  describe('ProfileInfo Management Detail Component', () => {
    let comp: ProfileInfoDetailComponent;
    let fixture: ComponentFixture<ProfileInfoDetailComponent>;
    const route = ({ data: of({ profileInfo: new ProfileInfo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DoctormicroserviceTestModule],
        declarations: [ProfileInfoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProfileInfoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProfileInfoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.profileInfo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
