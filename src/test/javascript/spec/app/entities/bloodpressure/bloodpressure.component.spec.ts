/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TwentyonepointsTestModule } from '../../../test.module';
import { BloodpressureComponent } from '../../../../../../main/webapp/app/entities/bloodpressure/bloodpressure.component';
import { BloodpressureService } from '../../../../../../main/webapp/app/entities/bloodpressure/bloodpressure.service';
import { Bloodpressure } from '../../../../../../main/webapp/app/entities/bloodpressure/bloodpressure.model';

describe('Component Tests', () => {

    describe('Bloodpressure Management Component', () => {
        let comp: BloodpressureComponent;
        let fixture: ComponentFixture<BloodpressureComponent>;
        let service: BloodpressureService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TwentyonepointsTestModule],
                declarations: [BloodpressureComponent],
                providers: [
                    BloodpressureService
                ]
            })
            .overrideTemplate(BloodpressureComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BloodpressureComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BloodpressureService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Bloodpressure(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.bloodpressures[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
