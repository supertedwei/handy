import { browser, element, by, ElementFinder, ExpectedConditions } from 'protractor';

describe('User can CRUD Note', () => {

  var items
  var historyItems
  var currentCount = 0
  var currentHistoryCount = 0

  beforeEach(() => {
    items = element.all(by.css('ion-item-sliding'));
    historyItems = element.all(by.css('ion-card'));
  });

  afterEach(() => {
    browser.driver.sleep(1000)
  })

  it('Get Count', () => {
    browser.driver.sleep(5000)
    items.count().then(function(count) {
      currentCount = count
    });
  })

  it('Press ADD button', () => {
    element(by.id('btn_add_note')).click()
    browser.wait(ExpectedConditions.visibilityOf(element(by.css('#node_add_page'))), 3000)
  })

  it('Enter Note data and save', () => {
    browser.driver.actions()
      .mouseDown(element(by.id('in_title'))).click()
      .sendKeys("E2E Title")
      .mouseDown(element(by.id('in_content'))).click()
      .sendKeys("E2E Content")
      .mouseDown(element(by.id('btn_save'))).click()
      .perform()

    browser.wait(ExpectedConditions.invisibilityOf(element(by.css('#node_add_page'))), 3000).then(() => {
      items.count().then(function(count) {
        expect(currentCount).toEqual(count - 1)
        currentCount = count
      });
    })
  })

  it('Enter Note view page', () => {
    element(by.css('ion-item-sliding:first-child')).click()
    browser.wait(ExpectedConditions.visibilityOf(element(by.css('#node_view_page'))), 3000)
  })

  it('Press history button', () => {
    element(by.css('#btn_history')).click()
  })

  it('Get History Count', () => {
    historyItems.count().then(function(count) {
      currentHistoryCount = count
    });
  })

  it('Enter Note edit page', () => {
    element(by.css('#btn_edit')).click()
    browser.wait(ExpectedConditions.visibilityOf(element(by.css('#node_edit_page'))), 3000)
  })

  it('Enter Note data and save', () => {
    browser.driver.actions()
      .mouseDown(element(by.id('in_title'))).click()
      .sendKeys("123")
      .mouseDown(element(by.id('in_content'))).click()
      .sendKeys("xyz")
      .mouseDown(element(by.id('btn_save'))).click()
      .perform()

    browser.wait(ExpectedConditions.invisibilityOf(element(by.css('#node_edit_page'))), 3000).then(() => {
      items.count().then(function(count) {
        expect(currentCount).toEqual(count)
        currentCount = count
      });
      historyItems.count().then(function(count) {
        expect(currentHistoryCount).toEqual(count - 1)
        currentHistoryCount = count
      });
    })
  })

  it('Delete Note', () => {
    element(by.id('btn_delete')).click()
    browser.wait(ExpectedConditions.invisibilityOf(element(by.css('#node_view_page'))), 3000).then(() => {
      items.count().then(function(count) {
        expect(currentCount).toEqual(count + 1)
        currentCount = count
      });
    })
  })

})