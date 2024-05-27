// // An example configuration file.
// exports.config = {
//     directConnect: true,

//     // Capabilities to be passed to the webdriver instance
//     capabilities: {
//         'browserName': 'chrome'
//     },

//     framework: 'jasmine',

//     // Spec patterns are relative to the current working directory when
//     // protractor is called.
//     specs: ['testCases/example_spec.js'],

//     //options to be passed jasmine.
//     jasmineNodeOpts: {
//         showColors: true,
//         defaultTimeoutInterval: 30000,
//         print: function() {}
//     },
// };





// exports.config = {
//     seleniumAddress: 'http://localhost:4444/wd/hub',
//     //specs: ['todo-spec.js']

//     capabilities: {
//         browserName: 'chrome'
//     },

//     specs: ['testCases/example-spec.js'],

//     jasmineNodeOpts: {
//         showColors: true, // Use colors in the command line report.
//     }
//   };


// exports.config = {
//     framework: 'jasmine',
//     capabilities: {
//     browserName: 'chrome',
//     },
//     //specs: ['example_spec.js']
//     specs: ['searchUser.js']
//     };

const { specReporter } = require('jasmine-spec-reporter');

exports.config = {
    allScriptsTimeout: 11000,
    specs: [
        './src/**/*.app.e2e-spec.ts'
    ],
    capabilities:{
        'browserName':'chrome'
    },
    directConnect: true,
    baseUrl: 'http://iam.bio.pune.cdac.in/auth/realms/ice/protocol/openid-connect/auth?client_id=ice-angular&redirect_uri=http%3A%2F%2Fice-dev.bio.pune.cdac.in%2Fuser%2Fuserlist&state=bb0e1f5b-a00c-41b5-801b-18b9770548fd&response_mode=fragment&response_type=code&scope=openid&nonce=389a2bda-4ed6-4fc1-8ac9-03ffc81f8e19&code_challenge=y-irQuCWSO_KkP1Gxd0Eu8TDFKURSyCEpuhDnrBODwA&code_challenge_method=S256',
    framework:'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval:30000,
        print: function(){}
    },
    onPrepare() {
        require('ts-node').register({
          project: require('path').join(__dirname, './tsconfig.e2e.json')
        });
        jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
      }
    }
}


  
