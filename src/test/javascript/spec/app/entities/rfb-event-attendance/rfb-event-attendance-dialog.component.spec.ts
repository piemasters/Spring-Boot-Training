/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { RfbloyaltyTestModule } from '../../../test.module';
import { RfbEventAttendanceDialogComponent } from '../../../../../../main/webapp/app/entities/rfb-event-attendance/rfb-event-attendance-dialog.component';
import { RfbEventAttendanceService } from '../../../../../../main/webapp/app/entities/rfb-event-attendance/rfb-event-attendance.service';
import { RfbEventAttendance } from '../../../../../../main/webapp/app/entities/rfb-event-attendance/rfb-event-attendance.model';
import { RfbEventService } from '../../../../../../main/webapp/app/entities/rfb-event';
import { RfbUserService } from '../../../../../../main/webapp/app/entities/rfb-user';

describe('Component Tests', () => {

    describe('RfbEventAttendance Management Dialog Component', () => {
        let comp: RfbEventAttendanceDialogComponent;
        let fixture: ComponentFixture<RfbEventAttendanceDialogComponent>;
        let service: RfbEventAttendanceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [RfbloyaltyTestModule],
                declarations: [RfbEventAttendanceDialogComponent],
                providers: [
                    RfbEventService,
                    RfbUserService,
                    RfbEventAttendanceService
                ]
            })
            .overrideTemplate(RfbEventAttendanceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RfbEventAttendanceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RfbEventAttendanceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RfbEventAttendance(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.rfbEventAttendance = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'rfbEventAttendanceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RfbEventAttendance();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.rfbEventAttendance = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'rfbEventAttendanceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
