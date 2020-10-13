import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LiheApiTestModule } from '../../../test.module';
import { RolePermissionDetailComponent } from 'app/entities/role-permission/role-permission-detail.component';
import { RolePermission } from 'app/shared/model/role-permission.model';

describe('Component Tests', () => {
  describe('RolePermission Management Detail Component', () => {
    let comp: RolePermissionDetailComponent;
    let fixture: ComponentFixture<RolePermissionDetailComponent>;
    const route = ({ data: of({ rolePermission: new RolePermission(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LiheApiTestModule],
        declarations: [RolePermissionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RolePermissionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RolePermissionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load rolePermission on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.rolePermission).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
