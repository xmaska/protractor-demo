'use strict';

var SignupPageObject = function () {


    var email = element(by.css('[name="email"]'));
    var useNname = element(by.css('[name="username"]'));
    var password = element(by.css('input[name="password"]'));
    var repeatPassword = element(by.css('input[name="passwordRepeat"]'));
    var acceptTerms = element(by.css('[class="e-label__checkbox-icon"]'));

    var nextButton = element(by.css('[class="e-btn m-auth-form__button m-auth-registration__button"]'));

    var firstName = element(by.css('[name="firstname"]'));
    var lastName = element(by.css('[name="lastname"]'));
    var days = element(by.css('[id="days"]'));
    var months = element(by.css('[id="months"]'));
    var years = element(by.css('[id="years"]'));
    var address = element(by.css('[name="address"]'));
    var postcode = element(by.css('[name="postalCode"]'));
    var city = element(by.css('[name="city"]'));

    var country = element(by.css('[class="c-dropdown__toggle c-dropdown__toggle--bottom e-flag is-selected e-flag--gi"]'));
    var austria = element(by.css('a[data-value="AT"]'));
    var currency = element(by.css('[class="c-dropdown__toggle  c-dropdown__toggle--bottom is-selected"]'));
    var phonePrefix = element(by.css('[class="c-dropdown__toggle  is-selected c-dropdown__toggle--bottom"]'));
    var phonenumber = element(by.css('[name="phoneNumber"]'));

    var registerNow = element(by.css('[class="e-btn m-auth-form__button m-auth-registration__button m-auth-registration__button--step2"]'));

    var verification = element(by.css('[class="e-btn m-auth-form__button ng-isolate-scope"]'));


    this.waitForSignupPageLoaded = function () {
        browser.waitForAngularEnabled(true);
        browser.wait(function () {
            return email.isDisplayed();
        }, 10000).then(function (v) {
            console.log("Is the page loaded: " + v)
        });
    };

    this.openSignupPage = function (url) {
        browser.get(url);
        this.waitForSignupPageLoaded();
    };

    this.fillFirstPage = function (signup) {
        email.sendKeys(signup.email);
        useNname.sendKeys(signup.userName);
        password.sendKeys(signup.password);
        repeatPassword.sendKeys(signup.password);
        acceptTerms.click();
    };

    this.clickNext = function () {
        nextButton.click();
    };

    this.fillSecondPage = function (signup) {
        firstName.sendKeys('firstName');
        lastName.sendKeys('lastName');
        days.sendKeys('1');
        months.sendKeys('1');
        years.sendKeys('1986');
        address.sendKeys('Address');
        postcode.sendKeys('123456');
        city.sendKeys('Vienna');
        country.click();
        austria.click();
        phonenumber.sendKeys(signup.phone);
    };

    this.clickRegister = function () {
        var until = protractor.ExpectedConditions;
        browser.wait(until.presenceOf(registerNow), 10000, 'Element taking too long to appear in the DOM');
        browser.wait(function () {
            return registerNow.isDisplayed();
        }, 10000).then(function (v) {
            console.log("Is the register button displayed: " + v)
        });
        registerNow.click()
    };

    this.showConfirmation = function () {
        browser.waitForAngularEnabled(true);
        var until = protractor.ExpectedConditions;
        browser.wait(until.presenceOf(verification), 10000, 'Element taking too long to appear in the DOM');
        browser.wait(function () {
            return verification.isDisplayed();
        }, 10000).then(function (v) {
            console.log("Is the confirmation displayed: " + v)
        });

    };

//this can be used to debug tests
//browser.pause();
};

module.exports = SignupPageObject;