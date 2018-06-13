/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RfbloyaltyTestModule } from '../../../test.module';
import { RfbEventComponent } from '../../../../../../main/webapp/app/entities/rfb-event/rfb-event.component';
import { RfbEventService } from '../../../../../../main/webapp/app/entities/rfb-event/rfb-event.service';
import { RfbEvent } from '../../../../../../main/webapp/app/entities/rfb-event/rfb-event.model';

describe('Component Tests', () => {

    describe('RfbEvent Management Component', () => {
        let comp: RfbEventComponent;
        let fixture: ComponentFixture<RfbEventComponent>;
        let service: RfbEventService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RfbloyaltyTestModule],
                declarations: [RfbEventComponent],
                providers: [
                    RfbEventService
                ]
            })
            .overrideTemplate(RfbEventComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RfbEventComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RfbEventService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RfbEvent(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.rfbEvents[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
