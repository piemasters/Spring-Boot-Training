/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RfbloyaltyTestModule } from '../../../test.module';
import { RfbUserDetailComponent } from '../../../../../../main/webapp/app/entities/rfb-user/rfb-user-detail.component';
import { RfbUserService } from '../../../../../../main/webapp/app/entities/rfb-user/rfb-user.service';
import { RfbUser } from '../../../../../../main/webapp/app/entities/rfb-user/rfb-user.model';

describe('Component Tests', () => {

    describe('RfbUser Management Detail Component', () => {
        let comp: RfbUserDetailComponent;
        let fixture: ComponentFixture<RfbUserDetailComponent>;
        let service: RfbUserService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RfbloyaltyTestModule],
                declarations: [RfbUserDetailComponent],
                providers: [
                    RfbUserService
                ]
            })
            .overrideTemplate(RfbUserDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RfbUserDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RfbUserService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RfbUser(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.rfbUser).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
