import { browser, by, element } from 'protractor';

describe('DBT-ICE', function()  
    {
        it('Can fill user credentials',function()
        {
     
     //element(by.id('.d-flex.align-items-center.ng-star-inserted')).click();
     //element(by.id('pass')).sendKeys('123456');
    
            browser.waitForAngularEnabled(false);
            browser.ignoreSynchronization = true;
      //browser.driver.get('http://ice-dev.bio.pune.cdac.in/home');
            browser.driver.get('http://iam.bio.pune.cdac.in/auth/realms/ice/protocol/openid-connect/auth?client_id=ice-angular&redirect_uri=http%3A%2F%2Fice-dev.bio.pune.cdac.in%2Fuser%2Fuserlist&state=4bdeaa48-b8c5-4187-a50a-52ddde1d16ea&response_mode=fragment&response_type=code&scope=openid&nonce=d8a84985-b022-4324-94a8-42a319ea8ed2&code_challenge=tjYD8DDC0vAE_icJ1Z08cKIWyKkGlgLy4DuG92CWPRs&code_challenge_method=S256');
            browser.manage().window().maximize();
            
      //element(by.css('.menu-title.text-truncate.ng-star-inserted')).click();
            element(by.id('username')).sendKeys('preet');
            element(by.id('password')).sendKeys('preet123');
            element(by.id('kc-login')).click();
            browser.sleep(5000);
            element(by.name('searchValue')).sendKeys('john');       
            browser.sleep(2000);
        })
    });