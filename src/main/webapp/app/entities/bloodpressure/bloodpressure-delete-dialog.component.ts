import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Bloodpressure } from './bloodpressure.model';
import { BloodpressurePopupService } from './bloodpressure-popup.service';
import { BloodpressureService } from './bloodpressure.service';

@Component({
    selector: 'jhi-bloodpressure-delete-dialog',
    templateUrl: './bloodpressure-delete-dialog.component.html'
})
export class BloodpressureDeleteDialogComponent {

    bloodpressure: Bloodpressure;

    constructor(
        private bloodpressureService: BloodpressureService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bloodpressureService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bloodpressureListModification',
                content: 'Deleted an bloodpressure'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bloodpressure-delete-popup',
    template: ''
})
export class BloodpressureDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bloodpressurePopupService: BloodpressurePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bloodpressurePopupService
                .open(BloodpressureDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
