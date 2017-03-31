import { browser, element, by, ElementFinder, ExpectedConditions } from 'protractor';

describe('User can logout system', () => {

  beforeEach(() => {
    //browser.driver.sleep(5000)
  });

  afterEach(() => {
    //browser.driver.sleep(5000)
  })

  it('Logout', () => {

    browser.wait(ExpectedConditions.visibilityOf(element(by.css('[menutoggle]'))), 5000).then(() => {
      element(by.id('menu_settings')).click().then(() => {
        browser.driver.sleep(1000)
        element(by.id('btn_logout')).click().then(() => {
        })
      })
    })

  })

  it('Login', () => {

    browser.driver.actions()
        .mouseDown(element(by.id('email'))).click()
        .sendKeys("jdwei@yahoo.com")
        .mouseDown(element(by.id('password'))).click()
        .sendKeys("111111")
        .perform()

    element(by.id('btn_login')).click().then(() => {
      browser.wait(ExpectedConditions.presenceOf(element(by.css('ion-menu'))), 5000).then(() => {
        browser.getTitle().then((title) => {
          expect(title).toEqual('Note List');
        });
      })
    });
 
  });


})