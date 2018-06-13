/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RfbloyaltyTestModule } from '../../../test.module';
import { RfbEventDetailComponent } from '../../../../../../main/webapp/app/entities/rfb-event/rfb-event-detail.component';
import { RfbEventService } from '../../../../../../main/webapp/app/entities/rfb-event/rfb-event.service';
import { RfbEvent } from '../../../../../../main/webapp/app/entities/rfb-event/rfb-event.model';

describe('Component Tests', () => {

    describe('RfbEvent Management Detail Component', () => {
        let comp: RfbEventDetailComponent;
        let fixture: ComponentFixture<RfbEventDetailComponent>;
        let service: RfbEventService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RfbloyaltyTestModule],
                declarations: [RfbEventDetailComponent],
                providers: [
                    RfbEventService
                ]
            })
            .overrideTemplate(RfbEventDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RfbEventDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RfbEventService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RfbEvent(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.rfbEvent).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
