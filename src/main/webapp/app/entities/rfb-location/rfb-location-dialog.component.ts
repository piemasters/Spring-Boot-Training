import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RfbLocation } from './rfb-location.model';
import { RfbLocationPopupService } from './rfb-location-popup.service';
import { RfbLocationService } from './rfb-location.service';

@Component({
    selector: 'jhi-rfb-location-dialog',
    templateUrl: './rfb-location-dialog.component.html'
})
export class RfbLocationDialogComponent implements OnInit {

    rfbLocation: RfbLocation;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private rfbLocationService: RfbLocationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.rfbLocation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.rfbLocationService.update(this.rfbLocation));
        } else {
            this.subscribeToSaveResponse(
                this.rfbLocationService.create(this.rfbLocation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RfbLocation>>) {
        result.subscribe((res: HttpResponse<RfbLocation>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RfbLocation) {
        this.eventManager.broadcast({ name: 'rfbLocationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-rfb-location-popup',
    template: ''
})
export class RfbLocationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rfbLocationPopupService: RfbLocationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.rfbLocationPopupService
                    .open(RfbLocationDialogComponent as Component, params['id']);
            } else {
                this.rfbLocationPopupService
                    .open(RfbLocationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
