/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RfbloyaltyTestModule } from '../../../test.module';
import { RfbEventAttendanceDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/rfb-event-attendance/rfb-event-attendance-delete-dialog.component';
import { RfbEventAttendanceService } from '../../../../../../main/webapp/app/entities/rfb-event-attendance/rfb-event-attendance.service';

describe('Component Tests', () => {

    describe('RfbEventAttendance Management Delete Component', () => {
        let comp: RfbEventAttendanceDeleteDialogComponent;
        let fixture: ComponentFixture<RfbEventAttendanceDeleteDialogComponent>;
        let service: RfbEventAttendanceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RfbloyaltyTestModule],
                declarations: [RfbEventAttendanceDeleteDialogComponent],
                providers: [
                    RfbEventAttendanceService
                ]
            })
            .overrideTemplate(RfbEventAttendanceDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RfbEventAttendanceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RfbEventAttendanceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
