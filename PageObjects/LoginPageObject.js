'use strict';

var LoginPageObject = function () {

    var userName = element(by.css('[name="username"]'));
    var password = element(by.css('[name="password"]'));
    var loginButton = element(by.css('.e-btn'));
    var profileWallet = element(by.css('[id="wallet"]'));

    this.refresh = function () {
        browser.refresh();
    }
    this.waitForLoginPageLoaded = function () {
        browser.waitForAngularEnabled(true);
        browser.wait(function () {
            return loginButton.isDisplayed();
        }, 10000).then(function (v) {
            console.log("Is the page loaded: " + v)
        });
    };

    this.checkIfLoginSuccessful = function () {
        browser.waitForAngularEnabled(true);
        browser.wait(function () {
            return profileWallet.isDisplayed();
        }, 10000).then(function (v) {
            console.log("Is login successful: " + v)
        });
    };

    this.checkIfLoginUnSuccessful = function () {
        browser.wait(function () {
            return loginButton.isDisplayed();
        }, 10000).then(function (v) {
            console.log("Login button still displayed: " + v)
        });
    };

    this.openLoginPage = function (url) {
        browser.get(url);
        this.waitForLoginPageLoaded();
    };

    this.setUsename = function (user) {
        userName.sendKeys(user);
    };

    this.setPassword = function (pass) {
        password.sendKeys(pass);
    };

    this.login = function () {
        loginButton.click();
    };

    //we can do screen shots even from here
    this.takeScreenshot = function () {
        var fs = require('fs-extra');
        browser.takeScreenshot().then(function (png) {
            //		               var capabilites = browser.getCapabilities();
            //                       var browserName = capabilites.get('browserName');
            //		                console.log('Browser: '+browserName);
            var stream = fs.createWriteStream('screenshots/screenshot.png');
            stream.write(new Buffer(png, 'base64'));
            stream.end();
        });
    }
//this can be used to debug tests
//browser.pause();
};

module.exports = LoginPageObject;