import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LiheApiTestModule } from '../../../test.module';
import { UserRoleDetailComponent } from 'app/entities/user-role/user-role-detail.component';
import { UserRole } from 'app/shared/model/user-role.model';

describe('Component Tests', () => {
  describe('UserRole Management Detail Component', () => {
    let comp: UserRoleDetailComponent;
    let fixture: ComponentFixture<UserRoleDetailComponent>;
    const route = ({ data: of({ userRole: new UserRole(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LiheApiTestModule],
        declarations: [UserRoleDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(UserRoleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserRoleDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load userRole on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userRole).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
