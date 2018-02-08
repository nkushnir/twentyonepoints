import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Bloodpressure e2e test', () => {

    let navBarPage: NavBarPage;
    let bloodpressureDialogPage: BloodpressureDialogPage;
    let bloodpressureComponentsPage: BloodpressureComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Bloodpressures', () => {
        navBarPage.goToEntity('bloodpressure');
        bloodpressureComponentsPage = new BloodpressureComponentsPage();
        expect(bloodpressureComponentsPage.getTitle())
            .toMatch(/twentyonepointsApp.bloodpressure.home.title/);

    });

    it('should load create Bloodpressure dialog', () => {
        bloodpressureComponentsPage.clickOnCreateButton();
        bloodpressureDialogPage = new BloodpressureDialogPage();
        expect(bloodpressureDialogPage.getModalTitle())
            .toMatch(/twentyonepointsApp.bloodpressure.home.createOrEditLabel/);
        bloodpressureDialogPage.close();
    });

    it('should create and save Bloodpressures', () => {
        bloodpressureComponentsPage.clickOnCreateButton();
        bloodpressureDialogPage.setTimestampInput('2000-12-31');
        expect(bloodpressureDialogPage.getTimestampInput()).toMatch('2000-12-31');
        bloodpressureDialogPage.setSystolicInput('5');
        expect(bloodpressureDialogPage.getSystolicInput()).toMatch('5');
        bloodpressureDialogPage.setDiastolicInput('5');
        expect(bloodpressureDialogPage.getDiastolicInput()).toMatch('5');
        bloodpressureDialogPage.userSelectLastOption();
        bloodpressureDialogPage.save();
        expect(bloodpressureDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BloodpressureComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-bloodpressure div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BloodpressureDialogPage {
    modalTitle = element(by.css('h4#myBloodpressureLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    timestampInput = element(by.css('input#field_timestamp'));
    systolicInput = element(by.css('input#field_systolic'));
    diastolicInput = element(by.css('input#field_diastolic'));
    userSelect = element(by.css('select#field_user'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTimestampInput = function(timestamp) {
        this.timestampInput.sendKeys(timestamp);
    };

    getTimestampInput = function() {
        return this.timestampInput.getAttribute('value');
    };

    setSystolicInput = function(systolic) {
        this.systolicInput.sendKeys(systolic);
    };

    getSystolicInput = function() {
        return this.systolicInput.getAttribute('value');
    };

    setDiastolicInput = function(diastolic) {
        this.diastolicInput.sendKeys(diastolic);
    };

    getDiastolicInput = function() {
        return this.diastolicInput.getAttribute('value');
    };

    userSelectLastOption = function() {
        this.userSelect.all(by.tagName('option')).last().click();
    };

    userSelectOption = function(option) {
        this.userSelect.sendKeys(option);
    };

    getUserSelect = function() {
        return this.userSelect;
    };

    getUserSelectedOption = function() {
        return this.userSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
