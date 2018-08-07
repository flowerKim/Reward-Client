import { UsageHistoryModule } from './usage-history.module';

describe('UsageHistoryModule', () => {
  let usageHistoryModule: UsageHistoryModule;

  beforeEach(() => {
    usageHistoryModule = new UsageHistoryModule();
  });

  it('should create an instance', () => {
    expect(usageHistoryModule).toBeTruthy();
  });
});
