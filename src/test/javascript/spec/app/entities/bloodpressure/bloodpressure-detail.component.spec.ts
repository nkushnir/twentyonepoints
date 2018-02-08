/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TwentyonepointsTestModule } from '../../../test.module';
import { BloodpressureDetailComponent } from '../../../../../../main/webapp/app/entities/bloodpressure/bloodpressure-detail.component';
import { BloodpressureService } from '../../../../../../main/webapp/app/entities/bloodpressure/bloodpressure.service';
import { Bloodpressure } from '../../../../../../main/webapp/app/entities/bloodpressure/bloodpressure.model';

describe('Component Tests', () => {

    describe('Bloodpressure Management Detail Component', () => {
        let comp: BloodpressureDetailComponent;
        let fixture: ComponentFixture<BloodpressureDetailComponent>;
        let service: BloodpressureService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TwentyonepointsTestModule],
                declarations: [BloodpressureDetailComponent],
                providers: [
                    BloodpressureService
                ]
            })
            .overrideTemplate(BloodpressureDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BloodpressureDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BloodpressureService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Bloodpressure(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bloodpressure).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
