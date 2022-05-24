//local imports 
import getCYARowForGroup from './getCYARowForGroup';
import ADDRESS_ROWS from '../../json/addressRows.json'

describe('utils', () => {

    describe('CheckYourAnswers', () => {

        describe('getCYARowsForGroup', () => {

            it('should check address values', () => {
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
                const rowsObj = ADDRESS_ROWS;

                const getPageDetails = getCYARowForGroup(PAGE, PAGE.groups[0], rowsObj, ON_ACTION);
                expect(getPageDetails.row.fieldId).toContain('address')
                expect(getPageDetails.row.pageId).toContain('addressDetails')

                const addressRows = getPageDetails.row.value.props.children;
                expect(addressRows.length).toEqual(4);
                expect(addressRows[0].props.children.props.value).toEqual(PAGE.formData.firstLineOfTheAddress);
                expect(addressRows[1].props.children.props.value).toEqual(PAGE.formData.town);
                expect(addressRows[2].props.children.props.value).toEqual(PAGE.formData.city);
                expect(addressRows[3].props.children.props.value).toEqual(PAGE.formData.postCode);
 
            })

        })
    })

});
