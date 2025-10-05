import { test, expect } from '@playwright/test';
import { getAvgTimeToFirstReview } from '@/components/AvgTimeToFirstReview/getAvgTimeToFirstReview';

test('getAvgTimeToFirstReview', async () => {
  expect(await getAvgTimeToFirstReview('')).toEqual('13.4h');
});
