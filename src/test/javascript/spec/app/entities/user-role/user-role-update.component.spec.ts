import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { LiheApiTestModule } from '../../../test.module';
import { UserRoleUpdateComponent } from 'app/entities/user-role/user-role-update.component';
import { UserRoleService } from 'app/entities/user-role/user-role.service';
import { UserRole } from 'app/shared/model/user-role.model';

describe('Component Tests', () => {
  describe('UserRole Management Update Component', () => {
    let comp: UserRoleUpdateComponent;
    let fixture: ComponentFixture<UserRoleUpdateComponent>;
    let service: UserRoleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LiheApiTestModule],
        declarations: [UserRoleUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(UserRoleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserRoleUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserRoleService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserRole(123);
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
        const entity = new UserRole();
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
