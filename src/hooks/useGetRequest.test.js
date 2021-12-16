// Global imports
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

// Local imports
import sleep from '../utils/sleep.test';
import useGetRequest, { STATUS_FETCHING } from './useGetRequest';

const TestComponent = ({ url }) => {
  const { status, data } = useGetRequest(url);
  if (!data) {
    return <div>{status}</div>;
  }
  return (
    <ul>
      {data.data && data.data.map((item, index) => (
        <li key={index} id={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

describe('hooks', () => {

  describe('useGetRequest', () => {

    const ABC = [
      { id: 'a', name: 'Alpha' },
      { id: 'b', name: 'Beta' },
      { id: 'c', name: 'Charlie' }
    ];
    const mockAxios = new MockAdapter(axios);
    let container = null;
    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
      mockAxios.reset();
    });

    afterEach(() => {
      unmountComponentAtNode(container);
      container.remove();
      container = null;
    });

    it('can handle a call and return appropriate values', async () => {
      const URL = '/api/data';
      mockAxios.onGet(URL).reply(200, { data: ABC });
      act(() => {
        render(<TestComponent url={URL} />, container);
      });
      expect(container.textContent).toEqual(STATUS_FETCHING);

      await act(() => sleep(100));
      expect(container.childNodes.length).toEqual(1);
      const ul = container.childNodes[0];
      expect(ul.tagName).toEqual('UL');
      expect(ul.childNodes.length).toEqual(ABC.length);
      ul.childNodes.forEach((li, index) => {
        expect(li.id).toEqual(ABC[index].id);
        expect(li.textContent).toEqual(ABC[index].name);
      });
    });

  });

});
