// Local imports
import showContainer from './showContainer';

describe('utils.Container.showContainer', () => {
  const DATA = {
    alpha: 'Alpha',
    bravo: 'Bravo'
  };
  const HTML = { type: 'html', tagName: 'p', content: 'Alpha' };
  const INSET_TEXT = { type: 'inset-text', content: 'Bravo' };
  const HEADING = { type: 'heading', size: 'm', content: 'Charlie' };

  it('should NOT be shown when the container is null', () => {
    expect(showContainer(null, DATA)).toBeFalsy();
  });

  it('should NOT be shown when the container has a single show_when condition that is NOT matched', () => {
    const CONTAINER = {
      show_when: { field: 'charlie', op: '=', value: 'Charlie' }
    };
    expect(showContainer(CONTAINER, DATA)).toBeFalsy();
  });

  it('should NOT be shown when the container has multiple show_when conditions and at least one is NOT matched', () => {
    const CONTAINER = {
      show_when: [
        { field: 'alpha', op: '=', value: 'Alpha' },
        { field: 'charlie', op: '=', value: 'Charlie' }
      ]
    };
    expect(showContainer(CONTAINER, DATA)).toBeFalsy();
  });

  it('SHOULD be shown when the container has a single show_when condition that IS matched', () => {
    const CONTAINER = {
      show_when: { field: 'alpha', op: '=', value: 'Alpha' }
    };
    expect(showContainer(CONTAINER, DATA)).toBeTruthy();
  });

  it('SHOULD be shown when the container has multiple show_when conditions that are ALL matched', () => {
    const CONTAINER = {
      show_when: [
        { field: 'alpha', op: '=', value: 'Alpha' },
        { field: 'charlie', op: '!=', value: 'Charlie' }
      ]
    };
    expect(showContainer(CONTAINER, DATA)).toBeTruthy();
  });

  it('SHOULD be shown when the container has NO show_when conditions and NO editable components', () => {
    const CONTAINER = {
      components: [ HTML, INSET_TEXT, HEADING ]
    };
    expect(showContainer(CONTAINER, DATA)).toBeTruthy();
  });

  it('should NOT be shown when the container has NO show_when conditions and NO SHOWN editable components', () => {
    const TEXT = {
      type: 'text',
      show_when: { field: 'charlie', op: '=', value: 'Charlie' }
    };
    const RADIOS = {
      type: 'radios',
      show_when: { field: 'charlie', op: '=', value: 'Charlie' }
    };
    const CONTAINER = {
      components: [ TEXT, RADIOS ]
    };
    expect(showContainer(CONTAINER, DATA)).toBeFalsy();
  });

  it('SHOULD be shown when the container has NO show_when conditions and AT LEAST ONE SHOWN editable components', () => {
    const TEXT = {
      type: 'text',
      show_when: { field: 'alpha', op: '=', value: 'Alpha' }
    };
    const RADIOS = {
      type: 'radios',
      show_when: { field: 'charlie', op: '=', value: 'Charlie' }
    };
    const CONTAINER = {
      components: [ TEXT, RADIOS ]
    };
    expect(showContainer(CONTAINER, DATA)).toBeTruthy();
  });

  it('SHOULD be shown when the container has multiple show_when conditions, with type "or" provided and ALL are matched', () => {
    const CONTAINER = {
      show_when: {
        "type": "or",
        "fields": [
          { field: 'alpha', op: '=', value: 'Alpha' },
          { field: 'bravo', op: '=', value: 'Bravo' }
        ]
      }
    };
    expect(showContainer(CONTAINER, DATA)).toBeTruthy();
  });

  it('SHOULD be shown when the container has multiple show_when conditions, with type "or" provided and at least ONE is matched', () => {
    const CONTAINER = {
      show_when: {
        "type": "or",
        "fields": [
          { field: 'alpha', op: '=', value: 'Alpha' },
          { field: 'charlie', op: '=', value: 'Charlie' }
        ]
      }
    };
    expect(showContainer(CONTAINER, DATA)).toBeTruthy();
  });

  it('should NOT be shown when the container has multiple show_when conditions, with type "or" provided and NONE are matched', () => {
    const CONTAINER = {
      show_when: {
        "type": "or",
        "fields": [
          { field: 'alpha', op: '!=', value: 'Alpha' },
          { field: 'charlie', op: '=', value: 'Charlie' }
        ]
      }
    };
    expect(showContainer(CONTAINER, DATA)).toBeFalsy();
  });
  
});
