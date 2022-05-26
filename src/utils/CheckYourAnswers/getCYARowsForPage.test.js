// Local imports
import { render } from '@testing-library/react';
import { ComponentTypes } from '../../models';
import getCYARowsForPage from './getCYARowsForPage';

describe('utils', () => {

  describe('CheckYourAnswers', () => {
    
    describe('getCYARowsForPage', () => {

      const expectObjectLike = (received, expected) => {
        Object.keys(expected).forEach(key => {
          expect(received[key]).toEqual(expected[key]);
        });
      };

      it('should get a appropriate row for a page with a single readonly text component', () => {
        const COMPONENT = { type: 'text', readonly: true, id: 'a', fieldId: 'a', label: 'Alpha' };
        const PAGE = {
          id: 'page',
          components: [ COMPONENT ],
          formData: { a: 'Bravo' }
        };
        const ON_ACTION = () => {};
        const ROWS = getCYARowsForPage(PAGE, ON_ACTION);
        expect(ROWS.length).toEqual(1);
        ROWS.forEach((row, index) => {
          expectObjectLike(row, {
            pageId: PAGE.id,
            fieldId: PAGE.components[index].fieldId,
            key: PAGE.components[index].label,
            action: null,
            component: COMPONENT,
            value: 'Bravo'
          });
        });
      });

      it('should get appropriate rows for a page with two editable text components', () => {
        const COMPONENT_A = { type: 'text', id: 'a', fieldId: 'a', label: 'Alpha' };
        const COMPONENT_B = { type: 'text', id: 'b', fieldId: 'b', label: 'Bravo' };
        const PAGE = {
          id: 'page',
          components: [ COMPONENT_A, COMPONENT_B ],
          formData: { a: 'Alpha Charlie', b: 'Bravo Charlie' },
          cya_link: {}
        };
        const ON_ACTION = () => {};
        const ROWS = getCYARowsForPage(PAGE, ON_ACTION);
        expect(ROWS.length).toEqual(2);
        ROWS.forEach((row, index) => {
          expectObjectLike(row, {
            pageId: PAGE.id,
            fieldId: PAGE.components[index].fieldId,
            key: PAGE.components[index].label,
            component: PAGE.components[index],
            value: `${PAGE.components[index].label} Charlie`
          });
          expectObjectLike(row.action, { onAction: ON_ACTION });
        });
      });

      it(`should filter out any components that shouldn't be shown`, () => {
        const COMPONENT_A = { type: 'text', id: 'a', fieldId: 'a', label: 'Alpha' };
        const COMPONENT_B = { type: 'text', id: 'b', fieldId: 'b', label: 'Bravo' };
        const COMPONENT_C = { type: 'heading', content: 'Heading component' };
        const PAGE = {
          id: 'page',
          components: [ COMPONENT_A, COMPONENT_B, COMPONENT_C ],
          formData: { a: 'Alpha Charlie', b: 'Bravo Charlie' },
          cya_link: {}
        };
        const ON_ACTION = () => {};
        const ROWS = getCYARowsForPage(PAGE, ON_ACTION);
        expect(ROWS.length).toEqual(2);
        ROWS.forEach((row, index) => {
          expectObjectLike(row, {
            pageId: PAGE.id,
            fieldId: PAGE.components[index].fieldId,
            key: PAGE.components[index].label,
            component: PAGE.components[index],
            value: `${PAGE.components[index].label} Charlie`
          });
          expectObjectLike(row.action, { onAction: ON_ACTION });
        });
      });

      it('should get a appropriate row for a page with a single readonly text component inside of a container', () => {
        const FORM_DATA = {
          container: {
            a: 'Bravo'
          }
        };
        const COMPONENT = { type: 'text', readonly: true, id: 'a', fieldId: 'a', label: 'Alpha' };
        const CONTAINER = {
          id: 'container',
          fieldId: 'container',
          type: ComponentTypes.CONTAINER,
          components: [ COMPONENT ],
          value: FORM_DATA.container,
          formData: FORM_DATA
        };
        const PAGE = {
          id: 'page',
          components: [ CONTAINER ],
          formData: FORM_DATA
        };
        const ON_ACTION = () => {};
        const ROWS = getCYARowsForPage(PAGE, ON_ACTION);
        expect(ROWS.length).toEqual(1);
        ROWS.forEach((row, index) => {
          expectObjectLike(row, {
            pageId: PAGE.id,
            fieldId: CONTAINER.components[index].fieldId,
            key: CONTAINER.components[index].label,
            action: null,
            component: COMPONENT,
            value: 'Bravo'
          });
        });
      }); 

      it('Add ability to display answers from multiple fields in a single row', () => {
        const COMPONENT_ADDRESS = {id: 'firstLineOfTheAddress', fieldId: 'firstLineOfTheAddress', label: 'address', type: 'text'};
        const COMPONENT_TOWN = {id: 'town', fieldId: 'town', label: 'Town', type: 'text'};
        const COMPONENT_CITY = {id: 'city', fieldId: 'city', label: 'City', type: 'text'};
        const COMPONENT_POSTCODE = {id: 'postCode', fieldId: 'postCode', label: 'postCode', type: 'text'};
        const PAGE = {
          components : [ COMPONENT_ADDRESS, COMPONENT_TOWN, COMPONENT_CITY, COMPONENT_POSTCODE ],
          id: 'addressDetails',
          fieldId : 'UK address',
          groups: [
            {
              id: 'address',
              label: 'Address details',
              components: [
                'firstLineOfTheAddress',
                'town',
                'city',
                'postCode'
              ]
            }
          ],
          name: 'address-details',
          title: 'Address details',
          formData: {
            firstLineOfTheAddress: '10 Downing Street',
            town: 'City of Westminster',
            city: 'London',
            postCode: 'SW1A 2AA'
          },
        };
        const ON_ACTION = () => {};
        const { container } = render(getCYARowsForPage(PAGE, ON_ACTION).map(row => row.value));
        expect(container.childNodes.length).toEqual(4);
        const addressValues = container.childNodes;
        expect(addressValues[0].childNodes[0].textContent).toEqual('10 Downing Street')
        expect(addressValues[1].childNodes[0].textContent).toEqual('City of Westminster')
        expect(addressValues[2].childNodes[0].textContent).toEqual('London')
        expect(addressValues[3].childNodes[0].textContent).toEqual('SW1A 2AA')
      });

    });

  });

});
