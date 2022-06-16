// Local imports
import cleanHiddenNestedData from './cleanHiddenNestedData';

describe('components', () => {
  describe('FormRenderer', () => {
    describe('helpers', () => {
      describe('cleanHiddenNestedData', () => {
        it('remove data corresponding to hidden nested components', () => {
          const patch = { parent: 'option2', nested1: 'should not be included', nested2: 'should be included' };
          const page = {
            id: 'page',
            name: 'page',
            title: 'Page',
            components: [
              {
                id: 'parent',
                fieldId: 'parent',
                type: 'radios',
                data: {
                  options: [
                    {
                      value: 'option1',
                      nested: [
                        {
                          id: 'nested1',
                          fieldId: 'nested1',
                        },
                      ],
                    },
                    {
                      value: 'option2',
                      nested: [
                        {
                          id: 'nested2',
                          fieldId: 'nested2',
                        },
                      ],
                    },
                  ],
                },
              },
            ],
          };
          const updatedPatch = cleanHiddenNestedData(patch, page);
          expect(updatedPatch['nested1']).toBeFalsy();
          expect(updatedPatch['nested2']).toBeTruthy();
        });
      });
    });
  });
});
