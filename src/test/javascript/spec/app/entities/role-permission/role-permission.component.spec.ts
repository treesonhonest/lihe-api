import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LiheApiTestModule } from '../../../test.module';
import { RolePermissionComponent } from 'app/entities/role-permission/role-permission.component';
import { RolePermissionService } from 'app/entities/role-permission/role-permission.service';
import { RolePermission } from 'app/shared/model/role-permission.model';

describe('Component Tests', () => {
  describe('RolePermission Management Component', () => {
    let comp: RolePermissionComponent;
    let fixture: ComponentFixture<RolePermissionComponent>;
    let service: RolePermissionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LiheApiTestModule],
        declarations: [RolePermissionComponent],
      })
        .overrideTemplate(RolePermissionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RolePermissionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RolePermissionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RolePermission(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.rolePermissions && comp.rolePermissions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
