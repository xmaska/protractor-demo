"# protractor-demo" 
=====================

# Demo test report of the bonus exercise:
<a href=http://htmlpreview.github.io/?https://github.com/xmaska/protractor-demo/blob/master/reports/test-report.html">Test run with Firefox and Chrome</a>


## Issues found
1. In chrome, the page keeps reloading after login and it breaks the entire functionality. (this is why chrome test fails in automation report)
2. When the sign-up form is filled but the backend validation fails, the error reason is not returned to the user. (for example phone number is not matching with the required format for the country specified)

# Installation instructions
npm install protractor
npm install jasmine-reporters
npm install protractor-jasmine2-screenshot-reporter
npm install randomstring
