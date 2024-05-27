import { browser, by, element } from 'protractor';

describe('DBT-ICE', function(){
  it('Can fill user credentials',function(){
     //browser.driver.get('http://ice-dev.bio.pune.cdac.in');
     browser.driver.get('https://www.flipkart.com/');
     browser.manage().window().maximize();
     element(by.css('._2IX_2-.VJZDxU')).sendKeys('palash');
     element(by.css('._2IX_2-._3mctLh.VJZDxU')).sendKeys('palash');
     
     element(by.css('.btn.btn-success')).click();
     browser.sleep(20000);
    
     // element(by.class('menu-title text-truncate ng-star-inserted')).click();
  
  });
});





// describe('Google\'s Search Functionality', function() {
//   it('can find search results', function() {
  
//   browser.driver.get('https://google.com/');
//   element(by.name('q')).sendKeys('BrowserStack');
//   element(by.name('btnG')).click();
  
//   //title of the launched webpage is expected to be BrowserStack - Google Search
//   browser.sleep(10000);
//   expect(browser.getTitle()).toEqual('BrowserStack - Google Search');
//   });
//   });