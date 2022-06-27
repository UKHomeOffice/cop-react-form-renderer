// Global imports
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { renderDomWithValidation } from '../setupTests';

// Local imports
import sleep from '../utils/sleep.test';
import useRefData, { STATUS_COMPLETE, STATUS_LOADING } from './useRefData';

const TestComponent = ({ component }) => {
  const { status, data } = useRefData(component);
  if (data.length === 0) {
    return <div>{status}</div>;
  }
  return (
    <ul>
      {data.map((item, index) => (
        <li key={index} id={item.value}>{item.label}</li>
      ))}
    </ul>
  );
};

describe('hooks', () => {

  describe('useRefData', () => {

    const ABC = [
      { id: 'a', name: 'Alpha', specialName: 'Alpha Centauri', guid: '123456' },
      { id: 'b', name: 'Beta', specialName: 'Beta Carotene', guid: '234567' },
      { id: 'c', name: 'Charlie', specialName: 'Charlie Chaplin', guid: '345678' }
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

    it('can handle a component with no data url', async () => {
      const COMPONENT = { id: 'component' };
      act(() => {
        renderDomWithValidation(<TestComponent component={COMPONENT} />, container);
      });
      expect(container.textContent).toEqual(STATUS_COMPLETE);
    });

    it('can handle a component with a data url and return appropriate values', async () => {
      const URL = '/api/data';
      const COMPONENT = {
        id: 'component',
        data: { url: URL }
      };
      mockAxios.onGet(URL).reply(200, { data: ABC });
      act(() => {
        renderDomWithValidation(<TestComponent component={COMPONENT} />, container);
      });
      expect(container.textContent).toEqual(STATUS_LOADING);

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

    it('can handle a component with no data url but data options instead', async () => {
      const COMPONENT = { id: 'component', data: { options: ABC } };
      act(() => {
        renderDomWithValidation(<TestComponent component={COMPONENT} />, container);
      });

      expect(container.childNodes.length).toEqual(1);
      const ul = container.childNodes[0];
      expect(ul.tagName).toEqual('UL');
      expect(ul.childNodes.length).toEqual(ABC.length);
      ul.childNodes.forEach((li, index) => {
        expect(li.id).toEqual(ABC[index].id);
        expect(li.textContent).toEqual(ABC[index].name);
      });
    });

    it('can handle a component with a url that throws an error', async () => {
      const URL = '/api/error';
      const COMPONENT = {
        id: 'component',
        data: { url: URL }
      };
      mockAxios.onGet(URL).reply(500, {});
      act(() => {
        renderDomWithValidation(<TestComponent component={COMPONENT} />, container);
      });
      expect(container.textContent).toEqual(STATUS_LOADING);

      await act(() => sleep(100));
      expect(container.textContent).toEqual(STATUS_COMPLETE);
    });

    it('can handle a component with a custom item structure', async () => {
      const COMPONENT = {
        id: 'component',
        data: { options: ABC },
        item: { value: 'guid', label: 'specialName' }
      };
      act(() => {
        renderDomWithValidation(<TestComponent component={COMPONENT} />, container);
      });

      expect(container.childNodes.length).toEqual(1);
      const ul = container.childNodes[0];
      expect(ul.tagName).toEqual('UL');
      expect(ul.childNodes.length).toEqual(ABC.length);
      ul.childNodes.forEach((li, index) => {
        expect(li.id).toEqual(ABC[index].guid);
        expect(li.textContent).toEqual(ABC[index].specialName);
      });
    });

  });

});
