import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LiheApiTestModule } from '../../../test.module';
import { UserRoleComponent } from 'app/entities/user-role/user-role.component';
import { UserRoleService } from 'app/entities/user-role/user-role.service';
import { UserRole } from 'app/shared/model/user-role.model';

describe('Component Tests', () => {
  describe('UserRole Management Component', () => {
    let comp: UserRoleComponent;
    let fixture: ComponentFixture<UserRoleComponent>;
    let service: UserRoleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LiheApiTestModule],
        declarations: [UserRoleComponent],
      })
        .overrideTemplate(UserRoleComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserRoleComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserRoleService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UserRole(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.userRoles && comp.userRoles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
