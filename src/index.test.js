// Local imports
import FormRenderer, { FormTypes, HubFormats, intercepts, Utils } from '.';

it('should have exported everything appropriately', () => {
  expect(FormRenderer).toBeDefined();
  expect(FormTypes).toBeDefined();
  expect(HubFormats).toBeDefined();
  expect(intercepts).toBeDefined();
  expect(Utils).toBeDefined();
});
