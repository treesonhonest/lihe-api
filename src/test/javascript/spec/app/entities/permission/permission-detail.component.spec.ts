import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LiheApiTestModule } from '../../../test.module';
import { PermissionDetailComponent } from 'app/entities/permission/permission-detail.component';
import { Permission } from 'app/shared/model/permission.model';

describe('Component Tests', () => {
  describe('Permission Management Detail Component', () => {
    let comp: PermissionDetailComponent;
    let fixture: ComponentFixture<PermissionDetailComponent>;
    const route = ({ data: of({ permission: new Permission(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [LiheApiTestModule],
        declarations: [PermissionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PermissionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PermissionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load permission on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.permission).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
