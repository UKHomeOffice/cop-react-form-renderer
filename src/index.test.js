// Local imports
import FormRenderer, { FormTypes, HubFormats, Utils } from '.';

it('should have exported everything appropriately', () => {
  expect(FormRenderer).toBeDefined();
  expect(FormTypes).toBeDefined();
  expect(HubFormats).toBeDefined();
  expect(Utils).toBeDefined();
});
