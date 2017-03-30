'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /jobs when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/jobs");
  });


  describe('jobs', function() {

    beforeEach(function() {
      browser.get('index.html#!/jobs');
    });


    it('should render jobs when user navigates to /jobs', function() {
      expect(element.all(by.css('[ng-view] button.add-job')).first().getText()).
        toMatch(/Add new job/);
    });

  });
});
