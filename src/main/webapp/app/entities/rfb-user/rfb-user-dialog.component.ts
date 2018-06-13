import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RfbUser } from './rfb-user.model';
import { RfbUserPopupService } from './rfb-user-popup.service';
import { RfbUserService } from './rfb-user.service';
import { RfbLocation, RfbLocationService } from '../rfb-location';

@Component({
    selector: 'jhi-rfb-user-dialog',
    templateUrl: './rfb-user-dialog.component.html'
})
export class RfbUserDialogComponent implements OnInit {

    rfbUser: RfbUser;
    isSaving: boolean;

    homelocations: RfbLocation[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private rfbUserService: RfbUserService,
        private rfbLocationService: RfbLocationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.rfbLocationService
            .query({filter: 'rfbuser-is-null'})
            .subscribe((res: HttpResponse<RfbLocation[]>) => {
                if (!this.rfbUser.homeLocationId) {
                    this.homelocations = res.body;
                } else {
                    this.rfbLocationService
                        .find(this.rfbUser.homeLocationId)
                        .subscribe((subRes: HttpResponse<RfbLocation>) => {
                            this.homelocations = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.rfbUser.id !== undefined) {
            this.subscribeToSaveResponse(
                this.rfbUserService.update(this.rfbUser));
        } else {
            this.subscribeToSaveResponse(
                this.rfbUserService.create(this.rfbUser));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RfbUser>>) {
        result.subscribe((res: HttpResponse<RfbUser>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RfbUser) {
        this.eventManager.broadcast({ name: 'rfbUserListModification', content: 'OK'});
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
    selector: 'jhi-rfb-user-popup',
    template: ''
})
export class RfbUserPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rfbUserPopupService: RfbUserPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.rfbUserPopupService
                    .open(RfbUserDialogComponent as Component, params['id']);
            } else {
                this.rfbUserPopupService
                    .open(RfbUserDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
