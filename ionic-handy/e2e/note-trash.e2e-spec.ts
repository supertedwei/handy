import { browser, element, by, ElementFinder, ExpectedConditions } from 'protractor';

describe('User can operate Note Trash', () => {

  var items
  var currentCount = 0

  beforeEach(() => {
    items = element.all(by.css('ion-item-sliding'));
  });

  afterEach(() => {
    browser.driver.sleep(1000)
  })

  it('Click on Note Trash menu', () => {
    element(by.id('menu_note_trash')).click()
    browser.wait(ExpectedConditions.visibilityOf(element(by.css('#node_trash_list_page'))), 3000)
  })

  it('Get Count', () => {
    browser.driver.sleep(1000)
    items.count().then(function(count) {
      currentCount = count
    });
  })

  it('Click on Note menu', () => {
    element(by.id('menu_note')).click()
    browser.wait(ExpectedConditions.visibilityOf(element(by.css('#node_list_page'))), 3000)
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

    browser.wait(ExpectedConditions.invisibilityOf(element(by.css('#node_add_page'))), 3000)
  })

  it('Enter Note view page', () => {
    element(by.css('ion-item-sliding:first-child')).click()
    browser.wait(ExpectedConditions.visibilityOf(element(by.css('#node_view_page'))), 3000)
  })

  it('Delete Note', () => {
    element(by.id('btn_delete')).click()
    browser.wait(ExpectedConditions.invisibilityOf(element(by.css('#node_view_page'))), 3000)
  })

  it('Click on Note Trash menu', () => {
    element(by.id('menu_note_trash')).click()
    browser.wait(ExpectedConditions.visibilityOf(element(by.css('#node_trash_list_page'))), 3000)
  })

  it('Check Count', () => {
    items.count().then(function(count) {
      expect(currentCount).toEqual(count - 1)
      currentCount = count
    })
  })
})