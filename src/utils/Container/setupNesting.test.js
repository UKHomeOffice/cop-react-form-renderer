import { ComponentTypes } from '../../models';
import setupNesting from './setupNesting';

describe('utils.Container.setupNesting', () => {

  const getComponent = (id, type) => {
    return { id, fieldId: id, type };
  };

  it('should handle an undefined container', () => {
    expect(setupNesting(undefined)).toBeUndefined();
  });

  it('should handle a null container', () => {
    expect(setupNesting(null)).toBeNull();
  });

  it('should handle a single level of nesting', () => {
    const CONTAINER = {
      ...getComponent('container', ComponentTypes.CONTAINER),
      components: [
        getComponent('text', ComponentTypes.TEXT),
        getComponent('email', ComponentTypes.EMAIL)
      ]
    };
    expect(setupNesting(CONTAINER)).toEqual({
      id: 'container', fieldId: 'container', type: ComponentTypes.CONTAINER,
      components: [
        { id: 'text', fieldId: 'text', full_path: 'container.text', type: ComponentTypes.TEXT },
        { id: 'email', fieldId: 'email', full_path: 'container.email', type: ComponentTypes.EMAIL }
      ]
    });
  });

  it('should handle multiple levels of nesting', () => {
    const CONTAINER = {
      ...getComponent('container', ComponentTypes.CONTAINER),
      components: [
        getComponent('text', ComponentTypes.TEXT),
        {
          ...getComponent('inner', ComponentTypes.CONTAINER),
          components: [
            getComponent('text', ComponentTypes.TEXT),
            getComponent('email', ComponentTypes.EMAIL)
          ]
        },
        getComponent('email', ComponentTypes.EMAIL)
      ]
    };
    expect(setupNesting(CONTAINER)).toEqual({
      id: 'container', fieldId: 'container', type: ComponentTypes.CONTAINER,
      components: [
        { id: 'text', fieldId: 'text', full_path: 'container.text', type: ComponentTypes.TEXT },
        {
          id: 'inner', fieldId: 'inner', full_path: 'container.inner', type: ComponentTypes.CONTAINER,
          components: [
            { id: 'text', fieldId: 'text', full_path: 'container.inner.text', type: ComponentTypes.TEXT },
            { id: 'email', fieldId: 'email', full_path: 'container.inner.email', type: ComponentTypes.EMAIL }
          ]
        },
        { id: 'email', fieldId: 'email', full_path: 'container.email', type: ComponentTypes.EMAIL }
      ]
    });
  });

});
