/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RfbloyaltyTestModule } from '../../../test.module';
import { RfbEventAttendanceComponent } from '../../../../../../main/webapp/app/entities/rfb-event-attendance/rfb-event-attendance.component';
import { RfbEventAttendanceService } from '../../../../../../main/webapp/app/entities/rfb-event-attendance/rfb-event-attendance.service';
import { RfbEventAttendance } from '../../../../../../main/webapp/app/entities/rfb-event-attendance/rfb-event-attendance.model';

describe('Component Tests', () => {

    describe('RfbEventAttendance Management Component', () => {
        let comp: RfbEventAttendanceComponent;
        let fixture: ComponentFixture<RfbEventAttendanceComponent>;
        let service: RfbEventAttendanceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RfbloyaltyTestModule],
                declarations: [RfbEventAttendanceComponent],
                providers: [
                    RfbEventAttendanceService
                ]
            })
            .overrideTemplate(RfbEventAttendanceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RfbEventAttendanceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RfbEventAttendanceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RfbEventAttendance(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.rfbEventAttendances[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
