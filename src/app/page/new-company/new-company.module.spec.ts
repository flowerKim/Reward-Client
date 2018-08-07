import { NewCompanyModule } from './new-company.module';

describe('NewCompanyModule', () => {
  let newCompanyModule: NewCompanyModule;

  beforeEach(() => {
    newCompanyModule = new NewCompanyModule();
  });

  it('should create an instance', () => {
    expect(newCompanyModule).toBeTruthy();
  });
});
