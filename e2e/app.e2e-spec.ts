import { FormsLecturePage } from './app.po';

describe('forms-lecture App', () => {
  let page: FormsLecturePage;

  beforeEach(() => {
    page = new FormsLecturePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
