import { browser, element, by, ElementFinder, ExpectedConditions } from 'protractor';

describe('User can list Note Trash', () => {

  var trashItems
  var currentTrashCount = 0

  var noteItems
  var currentNoteCount = 0

  beforeEach(() => {
    trashItems = element.all(by.css('ion-item-sliding'));
    noteItems = element.all(by.css('ion-item-sliding'));
  });

  afterEach(() => {
    browser.driver.sleep(1000)
  })

  it('Click on Note Trash menu', () => {
    element(by.id('menu_note_trash')).click()
    browser.wait(ExpectedConditions.visibilityOf(element(by.css('#node_trash_list_page'))), 3000)
  })

  it('Get Trash Count', () => {
    browser.driver.sleep(1000)
    trashItems.count().then(function(count) {
      currentTrashCount = count
    });
  })

  it('Click on Note menu', () => {
    element(by.id('menu_note')).click()
    browser.wait(ExpectedConditions.visibilityOf(element(by.css('#node_list_page'))), 3000)
  })

  it('Get Note Count', () => {
    browser.driver.sleep(1000)
    noteItems.count().then(function(count) {
      currentNoteCount = count
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

  it('Check Trash count', () => {
    trashItems.count().then(function(count) {
      expect(currentTrashCount).toEqual(count - 1)
      currentTrashCount = count
    })
  })

})

describe('User can undo Note Trash', () => {

  var trashItems
  var currentTrashCount = 0

  var noteItems
  var currentNoteCount = 0

  beforeEach(() => {
    trashItems = element.all(by.css('ion-item-sliding'));
    noteItems = element.all(by.css('ion-item-sliding'));
  });

  afterEach(() => {
    browser.driver.sleep(1000)
  })

  it('Click on Note menu', () => {
    element(by.id('menu_note')).click()
    browser.wait(ExpectedConditions.visibilityOf(element(by.css('#node_list_page'))), 3000)
  })

  it('Get Note Count', () => {
    browser.driver.sleep(1000)
    noteItems.count().then(function(count) {
      currentNoteCount = count
    });
  })

  it('Click on Note Trash menu', () => {
    element(by.id('menu_note_trash')).click()
    browser.wait(ExpectedConditions.visibilityOf(element(by.css('#node_trash_list_page'))), 3000)
  })

  it('Get Trash Count', () => {
    browser.driver.sleep(1000)
    trashItems.count().then(function(count) {
      currentTrashCount = count
    });
  })

  it('Enter Note trash view page', () => {
    element(by.css('ion-item-sliding:first-child')).click()
    browser.wait(ExpectedConditions.visibilityOf(element(by.css('#node_trash_view_page'))), 3000)
  })

  it('Undo Note Trash', () => {
    element(by.id('btn_undo')).click()
    browser.wait(ExpectedConditions.invisibilityOf(element(by.css('#node_trash_view_page'))), 3000)
    trashItems.count().then(function(count) {
      expect(currentTrashCount).toEqual(count + 1)
      currentTrashCount = count
    })
  })

  it('Click on Note menu', () => {
    element(by.id('menu_note')).click()
    browser.wait(ExpectedConditions.visibilityOf(element(by.css('#node_list_page'))), 3000)
  })

  it('Check Note count', () => {
    noteItems.count().then(function(count) {
      expect(currentNoteCount).toEqual(count - 1)
      currentNoteCount = count
    });
  })

})

describe('User can remove Note Trash permanently', () => {

  var trashItems
  var currentTrashCount = 0

  var noteItems
  var currentNoteCount = 0

  beforeEach(() => {
    trashItems = element.all(by.css('ion-item-sliding'));
    noteItems = element.all(by.css('ion-item-sliding'));
  });

  afterEach(() => {
    browser.driver.sleep(1000)
  })

  it('Click on Note menu', () => {
    element(by.id('menu_note')).click()
    browser.wait(ExpectedConditions.visibilityOf(element(by.css('#node_list_page'))), 3000)
  })

  it('Get Note Count', () => {
    browser.driver.sleep(1000)
    noteItems.count().then(function(count) {
      currentNoteCount = count
    });
  })

  it('Click on Note Trash menu', () => {
    element(by.id('menu_note_trash')).click()
    browser.wait(ExpectedConditions.visibilityOf(element(by.css('#node_trash_list_page'))), 3000)
  })

  it('Get Trash Count', () => {
    browser.driver.sleep(1000)
    trashItems.count().then(function(count) {
      currentTrashCount = count
    });
  })

  it('Enter Note trash view page', () => {
    element(by.css('ion-item-sliding:first-child')).click()
    browser.wait(ExpectedConditions.visibilityOf(element(by.css('#node_trash_view_page'))), 3000)
  })

  it('Delete Note Trash', () => {
    element(by.id('btn_delete')).click()
    browser.wait(ExpectedConditions.invisibilityOf(element(by.css('#node_trash_view_page'))), 3000)
    trashItems.count().then(function(count) {
      expect(currentTrashCount).toEqual(count + 1)
      currentTrashCount = count
    })
  })

  it('Click on Note menu', () => {
    element(by.id('menu_note')).click()
    browser.wait(ExpectedConditions.visibilityOf(element(by.css('#node_list_page'))), 3000)
  })

  it('Check Note count', () => {
    noteItems.count().then(function(count) {
      expect(currentNoteCount).toEqual(count)
      currentNoteCount = count
    });
  })

})
