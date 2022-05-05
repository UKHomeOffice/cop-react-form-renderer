// Local imports
import { ComponentTypes } from '../../models';
import { EDITABLE_TYPES } from '../Component/isEditable';
import getEditableComponents from './getEditableComponents';

describe('utils.Container.getEditableComponents', () => {
  const HTML = { type: 'html', tagName: 'p', content: 'Alpha' };
  const INSET_TEXT = { type: 'inset-text', content: 'Bravo' };
  const HEADING = { type: 'heading', size: 'm', content: 'Charlie' };

  it('should return an empty array for a null container', () => {
    expect(getEditableComponents(null)).toEqual([]);
  });

  it('should return an empty array for a container with no components', () => {
    expect(getEditableComponents({ components: [] })).toEqual([]);
  });

  it('should return an empty array for a container with only non-editable components', () => {
    const COMPONENTS = [ HTML, INSET_TEXT, HEADING ];
    expect(getEditableComponents({ components: COMPONENTS })).toEqual([]);
  });

  it('should return an empty array for a container that contains a container with only non-editable components', () => {
    const COMPONENTS = [ HTML, INSET_TEXT, HEADING ];
    const INNER_CONTAINER = { type: ComponentTypes.CONTAINER, components: COMPONENTS };
    expect(getEditableComponents({ components: [ INNER_CONTAINER ] })).toEqual([]);
  });

  EDITABLE_TYPES.forEach(type => {

    it(`should return just the "${type}" component if it exists in the components, but no non-editable ones`, () => {
      const EDITABLE = { type };
      const COMPONENTS = [ HTML, EDITABLE, INSET_TEXT, HEADING ];
      expect(getEditableComponents({ components: COMPONENTS })).toEqual([ EDITABLE ]);
    });

    it(`should return just the "${type}" component if it exists inside an inner container's components, but no non-editable ones`, () => {
      const EDITABLE = { type };
      const COMPONENTS = [ HTML, EDITABLE, INSET_TEXT, HEADING ];
      const INNER_CONTAINER = { type: ComponentTypes.CONTAINER, components: COMPONENTS };
      expect(getEditableComponents({ components: [ INNER_CONTAINER ] })).toEqual([ EDITABLE ]);
    });

    it(`should return just all "${type}" components that exists at any nested level within the container, but no non-editable ones`, () => {
      const EDITABLE = { type };
      const COMPONENTS = [ HTML, EDITABLE, INSET_TEXT, HEADING ];
      const INNER_INNER_CONTAINER = { type: ComponentTypes.CONTAINER, components: COMPONENTS };
      const INNER_CONTAINER = { type: ComponentTypes.CONTAINER, components: [ ...COMPONENTS, INNER_INNER_CONTAINER ] };
      expect(getEditableComponents({ components: [ EDITABLE, INNER_CONTAINER ] })).toEqual([ EDITABLE, EDITABLE, EDITABLE ]);
    });

  });

  it('should return all editable components and no non-editable ones', () => {
    const COMPONENTS = [ HTML, INSET_TEXT, HEADING ];
    EDITABLE_TYPES.forEach(type => {
      COMPONENTS.push({ type });
    })
    const RESULT = getEditableComponents({ components: COMPONENTS });
    expect(RESULT.length).toEqual(EDITABLE_TYPES.length);
    EDITABLE_TYPES.forEach(type => {
      expect(RESULT).toContainEqual({ type });
    });
  });

  it('should return all editable components and no non-editable ones, regardless of nesting level', () => {
    const EDITABLE_COMPONENTS = EDITABLE_TYPES.map(type => {
      return { type };
    });
    const NON_EDITABLE_COMPONENTS = [HTML, INSET_TEXT, HEADING];
    const COMPONENTS = [
      ...EDITABLE_COMPONENTS,
      ...NON_EDITABLE_COMPONENTS,
      {
        type: ComponentTypes.CONTAINER,
        id: 'inner',
        components: [
          ...EDITABLE_COMPONENTS,
          ...NON_EDITABLE_COMPONENTS,
          {
            type: ComponentTypes.CONTAINER,
            id: 'inner-inner',
            components: [ ...NON_EDITABLE_COMPONENTS, ...EDITABLE_COMPONENTS ]
          }
        ]
      }
    ];
    const RESULT = getEditableComponents({ components: COMPONENTS });
    expect(RESULT.length).toEqual(EDITABLE_TYPES.length * 3); // 1 each at top, inner, and inner-inner levels.
    EDITABLE_TYPES.forEach(type => {
      expect(RESULT).toContainEqual({ type });
    });
    expect(RESULT).not.toContainEqual(HTML);
    expect(RESULT).not.toContainEqual(INSET_TEXT);
    expect(RESULT).not.toContainEqual(HEADING);
  });

});
