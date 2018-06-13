import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RfbEventAttendance } from './rfb-event-attendance.model';
import { RfbEventAttendancePopupService } from './rfb-event-attendance-popup.service';
import { RfbEventAttendanceService } from './rfb-event-attendance.service';
import { RfbEvent, RfbEventService } from '../rfb-event';
import { RfbUser, RfbUserService } from '../rfb-user';

@Component({
    selector: 'jhi-rfb-event-attendance-dialog',
    templateUrl: './rfb-event-attendance-dialog.component.html'
})
export class RfbEventAttendanceDialogComponent implements OnInit {

    rfbEventAttendance: RfbEventAttendance;
    isSaving: boolean;

    rfbevents: RfbEvent[];

    rfbusers: RfbUser[];
    attendanceDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private rfbEventAttendanceService: RfbEventAttendanceService,
        private rfbEventService: RfbEventService,
        private rfbUserService: RfbUserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.rfbEventService.query()
            .subscribe((res: HttpResponse<RfbEvent[]>) => { this.rfbevents = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.rfbUserService.query()
            .subscribe((res: HttpResponse<RfbUser[]>) => { this.rfbusers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.rfbEventAttendance.id !== undefined) {
            this.subscribeToSaveResponse(
                this.rfbEventAttendanceService.update(this.rfbEventAttendance));
        } else {
            this.subscribeToSaveResponse(
                this.rfbEventAttendanceService.create(this.rfbEventAttendance));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RfbEventAttendance>>) {
        result.subscribe((res: HttpResponse<RfbEventAttendance>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RfbEventAttendance) {
        this.eventManager.broadcast({ name: 'rfbEventAttendanceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRfbEventById(index: number, item: RfbEvent) {
        return item.id;
    }

    trackRfbUserById(index: number, item: RfbUser) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-rfb-event-attendance-popup',
    template: ''
})
export class RfbEventAttendancePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rfbEventAttendancePopupService: RfbEventAttendancePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.rfbEventAttendancePopupService
                    .open(RfbEventAttendanceDialogComponent as Component, params['id']);
            } else {
                this.rfbEventAttendancePopupService
                    .open(RfbEventAttendanceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
