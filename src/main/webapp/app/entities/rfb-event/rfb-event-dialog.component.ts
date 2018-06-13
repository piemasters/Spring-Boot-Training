import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RfbEvent } from './rfb-event.model';
import { RfbEventPopupService } from './rfb-event-popup.service';
import { RfbEventService } from './rfb-event.service';
import { RfbLocation, RfbLocationService } from '../rfb-location';

@Component({
    selector: 'jhi-rfb-event-dialog',
    templateUrl: './rfb-event-dialog.component.html'
})
export class RfbEventDialogComponent implements OnInit {

    rfbEvent: RfbEvent;
    isSaving: boolean;

    rfblocations: RfbLocation[];
    eventDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private rfbEventService: RfbEventService,
        private rfbLocationService: RfbLocationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.rfbLocationService.query()
            .subscribe((res: HttpResponse<RfbLocation[]>) => { this.rfblocations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.rfbEvent.id !== undefined) {
            this.subscribeToSaveResponse(
                this.rfbEventService.update(this.rfbEvent));
        } else {
            this.subscribeToSaveResponse(
                this.rfbEventService.create(this.rfbEvent));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RfbEvent>>) {
        result.subscribe((res: HttpResponse<RfbEvent>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RfbEvent) {
        this.eventManager.broadcast({ name: 'rfbEventListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRfbLocationById(index: number, item: RfbLocation) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-rfb-event-popup',
    template: ''
})
export class RfbEventPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rfbEventPopupService: RfbEventPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.rfbEventPopupService
                    .open(RfbEventDialogComponent as Component, params['id']);
            } else {
                this.rfbEventPopupService
                    .open(RfbEventDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
