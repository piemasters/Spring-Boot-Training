/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RfbloyaltyTestModule } from '../../../test.module';
import { RfbLocationDetailComponent } from '../../../../../../main/webapp/app/entities/rfb-location/rfb-location-detail.component';
import { RfbLocationService } from '../../../../../../main/webapp/app/entities/rfb-location/rfb-location.service';
import { RfbLocation } from '../../../../../../main/webapp/app/entities/rfb-location/rfb-location.model';

describe('Component Tests', () => {

    describe('RfbLocation Management Detail Component', () => {
        let comp: RfbLocationDetailComponent;
        let fixture: ComponentFixture<RfbLocationDetailComponent>;
        let service: RfbLocationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RfbloyaltyTestModule],
                declarations: [RfbLocationDetailComponent],
                providers: [
                    RfbLocationService
                ]
            })
            .overrideTemplate(RfbLocationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RfbLocationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RfbLocationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RfbLocation(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.rfbLocation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
