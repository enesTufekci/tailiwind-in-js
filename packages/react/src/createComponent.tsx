import React from 'react';
import isPropValid from '@emotion/is-prop-valid';

import { htmlTags } from './html';
import { createHelpers, Helpers } from './helpers';
import { ThemeContext } from './context';

import { TailwindComponents, StyleFn } from './types';

function createComponent(createHelpers: (theme: string) => Helpers) {
  return function<T extends keyof HTMLElementTagNameMap>(htmlTag: T) {
    return function<P>(fn: StyleFn<P>) {
      return React.forwardRef((props: P & { className?: string }, ref: any) => {
        let { theme } = React.useContext(ThemeContext);
        let className = [
          ...fn({ ...createHelpers(theme) }, props),
          props.className ?? '',
        ]
          .filter(item => item !== '')
          .join(' ');

        let validProps = Object.keys(props).reduce<Partial<P>>(
          (acc, next) =>
            isPropValid(next)
              ? { ...acc, [next]: props[next as keyof P] }
              : acc,
          {}
        );

        let _props = { ...validProps, ref, className };
        return React.createElement(htmlTag, _props);
      });
    };
  };
}

let componentFactory = createComponent(createHelpers);

export let components = htmlTags.reduce(
  (acc, htmlTag) => ({ ...acc, [htmlTag]: componentFactory(htmlTag) }),
  {} as TailwindComponents
);
