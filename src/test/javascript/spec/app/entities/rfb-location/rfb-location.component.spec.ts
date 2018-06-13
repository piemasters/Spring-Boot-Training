/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RfbloyaltyTestModule } from '../../../test.module';
import { RfbLocationComponent } from '../../../../../../main/webapp/app/entities/rfb-location/rfb-location.component';
import { RfbLocationService } from '../../../../../../main/webapp/app/entities/rfb-location/rfb-location.service';
import { RfbLocation } from '../../../../../../main/webapp/app/entities/rfb-location/rfb-location.model';

describe('Component Tests', () => {

    describe('RfbLocation Management Component', () => {
        let comp: RfbLocationComponent;
        let fixture: ComponentFixture<RfbLocationComponent>;
        let service: RfbLocationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RfbloyaltyTestModule],
                declarations: [RfbLocationComponent],
                providers: [
                    RfbLocationService
                ]
            })
            .overrideTemplate(RfbLocationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RfbLocationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RfbLocationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RfbLocation(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.rfbLocations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
