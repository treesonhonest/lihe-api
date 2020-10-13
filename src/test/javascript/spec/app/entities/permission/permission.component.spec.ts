import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LiheApiTestModule } from '../../../test.module';
import { PermissionComponent } from 'app/entities/permission/permission.component';
import { PermissionService } from 'app/entities/permission/permission.service';
import { Permission } from 'app/shared/model/permission.model';

describe('Component Tests', () => {
  describe('Permission Management Component', () => {
    let comp: PermissionComponent;
    let fixture: ComponentFixture<PermissionComponent>;
    let service: PermissionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LiheApiTestModule],
        declarations: [PermissionComponent],
      })
        .overrideTemplate(PermissionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PermissionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PermissionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Permission(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.permissions && comp.permissions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
