import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { WeightComponent } from './weight.component';
import { WeightDetailComponent } from './weight-detail.component';
import { WeightPopupComponent } from './weight-dialog.component';
import { WeightDeletePopupComponent } from './weight-delete-dialog.component';

@Injectable()
export class WeightResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const weightRoute: Routes = [
    {
        path: 'weight',
        component: WeightComponent,
        resolve: {
            'pagingParams': WeightResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyonepointsApp.weight.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'weight/:id',
        component: WeightDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyonepointsApp.weight.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const weightPopupRoute: Routes = [
    {
        path: 'weight-new',
        component: WeightPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyonepointsApp.weight.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'weight/:id/edit',
        component: WeightPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyonepointsApp.weight.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'weight/:id/delete',
        component: WeightDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'twentyonepointsApp.weight.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
