import { SimonPage } from './app.po';

describe('simon App', () => {
  let page: SimonPage;

  beforeEach(() => {
    page = new SimonPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
