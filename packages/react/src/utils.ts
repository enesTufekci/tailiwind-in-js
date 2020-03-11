import isPropValid from '@emotion/is-prop-valid';
import { StyleFn } from './types';

export function shallowEqualObjects(
  objA: Record<string, string>,
  objB: Record<string, string>
): boolean {
  if (objA === objB) {
    return true;
  }

  if (!objA || !objB) {
    return false;
  }

  var aKeys = Object.keys(objA);
  var bKeys = Object.keys(objB);
  var len = aKeys.length;

  if (bKeys.length !== len) {
    return false;
  }

  for (var i = 0; i < len; i++) {
    var key = aKeys[i];

    if (
      objA[key] !== objB[key] ||
      !Object.prototype.hasOwnProperty.call(objB, key)
    ) {
      return false;
    }
  }

  return true;
}

export function getValidProps<T>(props: T): Partial<T> {
  return Object.keys(props).reduce(
    (acc, next) =>
      isPropValid(next) ? { ...acc, [next]: props[next as keyof T] } : acc,
    {}
  );
}

export function extractStyleData<P>(stuff: ReturnType<StyleFn<P>>) {
  let ownClasNames: string[] = [];
  let children = {};

  for (const item of stuff) {
    if (typeof item === 'string') {
      ownClasNames.push(item);
    } else {
      children = { ...children, ...item };
    }
  }

  return {
    ownClassNames: ownClasNames.join(' '),
    children,
  };
}
