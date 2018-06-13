/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { RfbloyaltyTestModule } from '../../../test.module';
import { RfbEventAttendanceDetailComponent } from '../../../../../../main/webapp/app/entities/rfb-event-attendance/rfb-event-attendance-detail.component';
import { RfbEventAttendanceService } from '../../../../../../main/webapp/app/entities/rfb-event-attendance/rfb-event-attendance.service';
import { RfbEventAttendance } from '../../../../../../main/webapp/app/entities/rfb-event-attendance/rfb-event-attendance.model';

describe('Component Tests', () => {

    describe('RfbEventAttendance Management Detail Component', () => {
        let comp: RfbEventAttendanceDetailComponent;
        let fixture: ComponentFixture<RfbEventAttendanceDetailComponent>;
        let service: RfbEventAttendanceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RfbloyaltyTestModule],
                declarations: [RfbEventAttendanceDetailComponent],
                providers: [
                    RfbEventAttendanceService
                ]
            })
            .overrideTemplate(RfbEventAttendanceDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RfbEventAttendanceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RfbEventAttendanceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RfbEventAttendance(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.rfbEventAttendance).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
