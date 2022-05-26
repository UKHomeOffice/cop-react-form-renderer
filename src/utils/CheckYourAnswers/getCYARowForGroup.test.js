//local imports 
import {render } from '@testing-library/react';
import getCYARowForGroup from './getCYARowForGroup';



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
        const rowsObj = [
          {
            pageId: 'address-details',
            fieldId: 'address',
            key: 'Address details',
            value: {
              key: null,
              ref: null,
              props: {
                children: [
                  {
                    type: 'div',
                    key: 'firstLineOfTheAddress',
                    ref: null,
                    props: {
                      children: {
                        key: null,
                        ref: null,
                        props: {
                          component: {
                            id: 'firstLineOfTheAddress',
                            fieldId: 'firstLineOfTheAddress',
                            label: 'Address',
                            type: 'text',
                            required: true,
                            groupId: 'addressDetails',
                            custom_errors: [
                              {
                                type: "required",
                                message: "Please enter first line of the the address"
                              }
                            ],
                            source: {
                              field: "addressDetails.firstLineOfTheAddress"
                            },
                            use: "firstLineOfTheAddress",
                            cya_label: "Address",
                            full_path: "UK address.firstLineOfTheAddress",
                            readonly: true
                          },
                          wrap: false,
                          value: "10 Downing Street"
                        },
                        _owner: null,
                        _store: {}
                      }
                    },
                    _owner: null,
                    _store: {}
                  },
                  {
                    type: "div",
                    key: "town",
                    ref: null,
                    props: {
                      children: {
                        key: null,
                        ref: null,
                        props: {
                          component: {
                            id: "town",
                            fieldId: "town",
                            label: "Town",
                            type: "text",
                            required: true,
                            custom_errors: [
                              {
                                type: "required",
                                message: "Please enter Town"
                              }
                            ],
                            source: {
                              field: "addressDetails.town"
                            },
                            use: "town",
                            cya_label: "Town",
                            full_path: "UK address.town",
                            readonly: true
                          },
                          wrap: false,
                          value: "City of Westminster"
                        },
                        _owner: null,
                        _store: {}
                      }
                    },
                    _owner: null,
                    _store: {}
                  },
                  {
                    type: "div",
                    key: "city",
                    ref: null,
                    props: {
                      children: {
                        key: null,
                        ref: null,
                        props: {
                          component: {
                            id: "city",
                            fieldId: "city",
                            label: "City",
                            type: "text",
                            required: true,
                            groupId: "addressDetails",
                            custom_errors: [
                              {
                                type: "required",
                                message: "Please enter city"
                              }
                            ],
                            source: {
                              field: "addressDetails.city"
                            },
                            use: "city",
                            cya_label: "City",
                            full_path: "UK address.city",
                            readonly: true
                          },
                          wrap: false,
                          value: "London"
                        },
                        _owner: null,
                        _store: {}
                      }
                    },
                    _owner: null,
                    _store: {}
                  },
                  {
                    type: "div",
                    key: "postCode",
                    ref: null,
                    props: {
                      children: {
                        key: null,
                        ref: null,
                        props: {
                          component: {
                            id: "postCode",
                            fieldId: "postCode",
                            label: "Postcode",
                            type: "text",
                            required: true,
                            groupId: "addressDetails",
                            custom_errors: [
                              {
                                type: "required",
                                message: "Please enter postcode"
                              }
                            ],
                            source: {
                              field: "addressDetails.postCode"
                            },
                            use: "postCode",
                            cya_label: "Postcode",
                            full_path: "UK address.postCode",
                            readonly: true
                          },
                          wrap: false,
                          value: "SW1A 2AA"
                        },
                        _owner: null,
                        _store: {}
                      }
                    },
                    _owner: null,
                    _store: {}
                  }
                ]
              },
              _owner: null,
              _store: {}
            },
            action: {
              page: "address-details",
              label: "Change",
              aria_suffix: "address details"
            }
          },
          {
            pageId: 'address-details',
            id: 'firstLineOfTheAddress',
            fieldId: 'firstLineOfTheAddress',
            key: 'Address',
            component: {
              id: 'firstLineOfTheAddress',
              fieldId: 'firstLineOfTheAddress',
              label: 'Address',
              type: 'text',
              required: true,
              groupId: 'addressDetails',
              custom_errors: [
                {
                  type: 'required',
                  message: 'Please enter first line of the the address'
                }
              ],
              source: {
                field: 'addressDetails.firstLineOfTheAddress'
              },
              use: 'firstLineOfTheAddress',
              cya_label: 'Address',
              full_path: 'UK address.firstLineOfTheAddress'
            },
            value: '10 Downing Street',
            action: {
              page: 'address-details',
              label: 'Change',
              aria_suffix: 'address details'
            }
          },
          {
            pageId: 'address-details',
            id: 'town',
            fieldId: 'town',
            key: 'Town',
            component: {
              id: 'town',
              fieldId: 'town',
              label: 'Town',
              type: 'text',
              required: true,
              custom_errors: [
                {
                  type: 'required',
                  message: 'Please enter Town'
                }
              ],
              source: {
                field: 'addressDetails.town'
              },
              use: 'town',
              cya_label: 'Town',
              full_path: 'UK address.town'
            },
            value: 'City of Westminster',
            action: {
              page: 'address-details',
              label: 'Change',
              aria_suffix: 'address details'
            }
          },
          {
            pageId: 'address-details',
            id: 'city',
            fieldId: 'city',
            key: 'City',
            component: {
              id: 'city',
              fieldId: 'city',
              label: 'City',
              type: 'text',
              required: true,
              groupId: 'addressDetails',
              custom_errors: [
                {
                  type: 'required',
                  message: 'Please enter city'
                }
              ],
              source: {
                field: 'addressDetails.city'
              },
              use: 'city',
              cya_label: 'City',
              full_path: 'UK address.city'
            },
            value: 'London',
            action: {
              page: 'address-details',
              label: 'Change',
              aria_suffix: 'address details'
            }
          },
          {
            pageId: 'address-details',
            id: 'postCode',
            fieldId: 'postCode',
            key: 'Postcode',
            component: {
              id: 'postCode',
              fieldId: 'postCode',
              label: 'Postcode',
              type: 'text',
              required: true,
              groupId: 'addressDetails',
              custom_errors: [
                {
                  type: 'required',
                  message: 'Please enter postcode'
                }
              ],
              source: {
                field: 'addressDetails.postCode'
              },
              use: 'postCode',
              cya_label: 'Postcode',
              full_path: 'UK address.postCode'
            },
            value: 'SW1A 2AA',
            action: {
              page: 'address-details',
              label: 'Change',
              aria_suffix: 'address details'
            }
          }
        ];
        
        const { container } = render(getCYARowForGroup(PAGE, PAGE.groups[0], rowsObj, ON_ACTION).row.value);
        expect(container.childNodes.length).toEqual(4);
        const addressValues = container.childNodes;
        expect(addressValues[0].childNodes[0].textContent).toEqual(PAGE.formData.firstLineOfTheAddress)
        expect(addressValues[1].childNodes[0].textContent).toEqual(PAGE.formData.town)
        expect(addressValues[2].childNodes[0].textContent).toEqual(PAGE.formData.city)
        expect(addressValues[3].childNodes[0].textContent).toEqual(PAGE.formData.postCode)

      })

    })

  })
  
});
