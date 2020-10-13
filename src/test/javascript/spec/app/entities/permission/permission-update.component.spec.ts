import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { LiheApiTestModule } from '../../../test.module';
import { PermissionUpdateComponent } from 'app/entities/permission/permission-update.component';
import { PermissionService } from 'app/entities/permission/permission.service';
import { Permission } from 'app/shared/model/permission.model';

describe('Component Tests', () => {
  describe('Permission Management Update Component', () => {
    let comp: PermissionUpdateComponent;
    let fixture: ComponentFixture<PermissionUpdateComponent>;
    let service: PermissionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LiheApiTestModule],
        declarations: [PermissionUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PermissionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PermissionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PermissionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Permission(123);
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
        const entity = new Permission();
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
