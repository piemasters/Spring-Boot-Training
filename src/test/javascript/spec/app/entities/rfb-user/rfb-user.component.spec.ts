/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RfbloyaltyTestModule } from '../../../test.module';
import { RfbUserComponent } from '../../../../../../main/webapp/app/entities/rfb-user/rfb-user.component';
import { RfbUserService } from '../../../../../../main/webapp/app/entities/rfb-user/rfb-user.service';
import { RfbUser } from '../../../../../../main/webapp/app/entities/rfb-user/rfb-user.model';

describe('Component Tests', () => {

    describe('RfbUser Management Component', () => {
        let comp: RfbUserComponent;
        let fixture: ComponentFixture<RfbUserComponent>;
        let service: RfbUserService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RfbloyaltyTestModule],
                declarations: [RfbUserComponent],
                providers: [
                    RfbUserService
                ]
            })
            .overrideTemplate(RfbUserComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RfbUserComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RfbUserService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RfbUser(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.rfbUsers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
