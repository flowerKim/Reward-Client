import { CompanyDetailModule } from './company-detail.module';

describe('CompanyDetailModule', () => {
  let companyDetailModule: CompanyDetailModule;

  beforeEach(() => {
    companyDetailModule = new CompanyDetailModule();
  });

  it('should create an instance', () => {
    expect(companyDetailModule).toBeTruthy();
  });
});
