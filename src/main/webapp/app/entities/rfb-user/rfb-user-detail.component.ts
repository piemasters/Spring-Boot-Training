import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RfbUser } from './rfb-user.model';
import { RfbUserService } from './rfb-user.service';

@Component({
    selector: 'jhi-rfb-user-detail',
    templateUrl: './rfb-user-detail.component.html'
})
export class RfbUserDetailComponent implements OnInit, OnDestroy {

    rfbUser: RfbUser;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private rfbUserService: RfbUserService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRfbUsers();
    }

    load(id) {
        this.rfbUserService.find(id)
            .subscribe((rfbUserResponse: HttpResponse<RfbUser>) => {
                this.rfbUser = rfbUserResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRfbUsers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'rfbUserListModification',
            (response) => this.load(this.rfbUser.id)
        );
    }
}
