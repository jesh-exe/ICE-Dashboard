import { browser, by, element  } from 'protractor';
describe('DBT-ICE', function(){
  it('Can fill user credentials',function(){
     
    
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
      element(by.css('.d-none.d-sm-inline-block')).click();
      element(by.id('UDuserName')).sendKeys('palash');
      element(by.id('UDEmail')).sendKeys('palash@cdac.in');
      element(by.id('UDPassword')).sendKeys('palash123');
      element(by.id('UDConfPassword')).sendKeys('palash123');
      element(by.id('UDFirstName')).sendKeys('Palash');
      element(by.id('UDLastName')).sendKeys('Pullarwar');
      element(by.css('.btn.btn-primary.feather.icon-calendar.waves-effect.waves-float.waves-light')).click();
      element(by.css('.btn-light.ng-star-inserted')).click();
      element(by.css("label[for='gender-1']")).click();
      //element(by.for('gender-1')).click();
      browser.sleep(5000);
      element(by.id('UDContactNumber')).sendKeys('8877886543');
      element(by.id('addressLine1')).sendKeys('Parihar chowk, Aundh');
      element(by.id('addressLine2')).sendKeys('Baner');
      element(by.id('landmark')).sendKeys('Shop');
      element(by.id('city')).sendKeys('Pune');
      element(by.id('state')).sendKeys('Maharashtra');
      element(by.id('zipCode')).sendKeys('446756');
      //element(by.css('.btn.btn-primary.waves-effect.waves-float.waves-light')).click();
      element.all(by.css('.btn.btn-primary.waves-effect.waves-float.waves-light')).get(1).click();
      element.all(by.css('.btn.btn-primary.waves-effect.waves-float.waves-light')).then(function(arr){
        console.log(arr.length)
        arr.forEach(function(tag){
            //console.log(tag);
        })
                });
      browser.sleep(10000);
     
     //element(by.class('menu-title text-truncate ng-star-inserted')).click();
  
  });
});