import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Bloodpressure } from './bloodpressure.model';
import { BloodpressurePopupService } from './bloodpressure-popup.service';
import { BloodpressureService } from './bloodpressure.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-bloodpressure-dialog',
    templateUrl: './bloodpressure-dialog.component.html'
})
export class BloodpressureDialogComponent implements OnInit {

    bloodpressure: Bloodpressure;
    isSaving: boolean;

    users: User[];
    timestampDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private bloodpressureService: BloodpressureService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bloodpressure.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bloodpressureService.update(this.bloodpressure));
        } else {
            this.subscribeToSaveResponse(
                this.bloodpressureService.create(this.bloodpressure));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Bloodpressure>>) {
        result.subscribe((res: HttpResponse<Bloodpressure>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Bloodpressure) {
        this.eventManager.broadcast({ name: 'bloodpressureListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-bloodpressure-popup',
    template: ''
})
export class BloodpressurePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bloodpressurePopupService: BloodpressurePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bloodpressurePopupService
                    .open(BloodpressureDialogComponent as Component, params['id']);
            } else {
                this.bloodpressurePopupService
                    .open(BloodpressureDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
