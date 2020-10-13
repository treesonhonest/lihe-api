import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { LiheApiTestModule } from '../../../test.module';
import { RolePermissionUpdateComponent } from 'app/entities/role-permission/role-permission-update.component';
import { RolePermissionService } from 'app/entities/role-permission/role-permission.service';
import { RolePermission } from 'app/shared/model/role-permission.model';

describe('Component Tests', () => {
  describe('RolePermission Management Update Component', () => {
    let comp: RolePermissionUpdateComponent;
    let fixture: ComponentFixture<RolePermissionUpdateComponent>;
    let service: RolePermissionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LiheApiTestModule],
        declarations: [RolePermissionUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RolePermissionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RolePermissionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RolePermissionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RolePermission(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new RolePermission();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
