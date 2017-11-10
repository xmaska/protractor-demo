var SignupPageObject = require('./PageObjects/SignupPageObject.js');
var LoginPageObject = require('./PageObjects/LoginPageObject.js');
var Login = new LoginPageObject();
var Signup = new SignupPageObject();

describe('1-Check that the Kaboo signup is working properly ', function () {
    it('Opens sign-up page successfully', function () {
        Signup.openSignupPage(browser.params.signup.url);
    });
    it('Fills all fields with valid data on step 1', function () {
        Signup.fillFirstPage(browser.params.signup);
    });
    it('Clicks NEXT button', function () {
        Signup.clickNext();
    });
    it('Fills all fields with valid data from step 2', function () {
        Signup.fillSecondPage(browser.params.signup);
    });
    it('Clicks on register button if enabled', function () {
        Signup.clickRegister();
    });
    it('Displays confirmation on registration', function () {
        Signup.showConfirmation();
    });
});


describe('2-Check that the Kaboo login does not allows the user to log in as it\'s email was not confirmed!', function () {
    // This is an other way to take screenshots but we don't need it as reporter does the job
    // afterEach(() = > {
    //     console.log('afterEach');

    // var fs = require('fs-extra');
    // browser.takeScreenshot().then(function (png) {
    //     var stream = fs.createWriteStream('screenshots/stepName.png');
    //     stream.write(new Buffer(png, 'base64'));
    //     stream.end();
    // });
// });

    it('Tries to log-in with credentials registered in previous test', function () {
        console.log('Starting login test');
        Login.openLoginPage(browser.params.login.url);
        Login.setUsename(browser.params.signup.userName);
        Login.setPassword(browser.params.signup.password);
        Login.login();
    });

    it('Should still display login section due to missing confirmation', function () {
        console.log('Checking if login button is still visible');
        Login.checkIfLoginUnSuccessful();
    });

});


describe('3-Check that the Kaboo login is working properly (using credentials: autouk / Autotest1 )', function () {
    it('Tries to log-in with credentials registered in previous test', function () {
        console.log('Starting login test');
        Login.openLoginPage(browser.params.login.url);
        Login.setUsename(browser.params.login.userName);
        Login.setPassword(browser.params.login.password);
        Login.login();
    });
    it('Should  display login personal wallet after successful login!', function () {
        console.log('Checking if wallet is visible');
        Login.checkIfLoginSuccessful();
    });
});