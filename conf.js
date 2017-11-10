var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var randomstring = require("randomstring");

//configuration of the reporter (directory, report filename and custom stylesheet
var reporter = new HtmlScreenshotReporter({
    dest: 'reports',
    filename: 'test-report.html',
    userCss: '../style.css',
    showConfiguration: true
});

exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['signUpLogin.js'],
    //custom parameters, can be changed via command line:
    // protractor conf.js --parameters.login.userName=example --parameters.login.password=password
    params: {
        login: {
            url: 'http://kaboo:flappybird@qatest.staging.kaboo.com/en/login',
            userName: 'autouk',
            password: 'Autotest1'
        },
        signup: {
            url: 'http://kaboo:flappybird@qatest.staging.kaboo.com/en/signup',
            email: randomstring.generate(7) + '@email.com',
            userName: randomstring.generate(5),
            password: randomstring.generate(7) + 'A123',
            phone: 699 + randomstring.generate({
                length: 8,
                charset: 'numeric'
            })
        }
    },
//Setup for running with chrome
//  capabilities: {
//    'browserName': 'chrome',
// 	'chromeOptions' : {
// 			'args' : ['incognito', '--start-maximized'], /*this line is for maximize the window and switch on incognito view */
// 			/*prefs : {
// 				'profile:managed_default_content_settings.notifications' : 1
// 			}*/
// 		}
//  },
//Setup for running with Firefox
// capabilities: {
//    'browserName': 'firefox', // 'firefox 'or 'safari' or 'opera'
//     "firefox_binary": "C:/Program Files/Mozilla Firefox/firefox.exe", //might need this for Windows when Firefox binary is not at the default place
//  },
    multiCapabilities: [{
        'browserName': 'chrome',
    }, {
        'browserName': 'firefox'
    }],
    //need to run browsers sequentially because the same user can not be logged in parrallelly
    maxSessions: 1,
    beforeLaunch: function () {
        console.log('beforeLaunch');
        return new Promise(function (resolve) {
            reporter.beforeLaunch(resolve);
        });
    },
    onPrepare: function (config_) {
        console.log('onPrepare');
        console.log("Generated parameters: " + JSON.stringify(browser.params));
        jasmine.getEnv().addReporter(reporter);
    },
    afterLaunch: function (exitCode) {
        console.log('afterLaunch');
        return new Promise(function (resolve) {
            reporter.afterLaunch(resolve.bind(this, exitCode));
        });
    },
    onComplete: function (exitCode) {
        console.log('onComplete');
    }

};
