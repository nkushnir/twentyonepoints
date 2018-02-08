import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TwentyonepointsPointsModule } from './points/points.module';
import { TwentyonepointsWeightModule } from './weight/weight.module';
import { TwentyonepointsBloodpressureModule } from './bloodpressure/bloodpressure.module';
import { TwentyonepointsPreferencesModule } from './preferences/preferences.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TwentyonepointsPointsModule,
        TwentyonepointsWeightModule,
        TwentyonepointsBloodpressureModule,
        TwentyonepointsPreferencesModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TwentyonepointsEntityModule {}
