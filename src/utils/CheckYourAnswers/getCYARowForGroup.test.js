// Local imports 
import { renderWithValidation } from '../../setupTests';
import getCYARowForGroup from './getCYARowForGroup';
import getCYARow from './getCYARow';

describe('utils', () => {

  describe('CheckYourAnswers', () => {

    describe('getCYARowsForGroup', () => {

      it('should check address values block', () => {
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
        const rows = PAGE.components.map(component => {
          return getCYARow(PAGE, component, ON_ACTION);
        });
        const { container } = renderWithValidation(
          getCYARowForGroup(PAGE, PAGE.groups[0], rows, ON_ACTION).row.value
        );
        expect(container.childNodes.length).toEqual(4);
        const addressValues = container.childNodes;
        expect(addressValues[0].childNodes[0].textContent).toEqual('10 Downing Street')
        expect(addressValues[1].childNodes[0].textContent).toEqual('City of Westminster')
        expect(addressValues[2].childNodes[0].textContent).toEqual('London')
        expect(addressValues[3].childNodes[0].textContent).toEqual('SW1A 2AA')

      })

    })

  })
  
});
