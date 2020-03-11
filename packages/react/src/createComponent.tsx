import React from 'react';

import { htmlTags } from './html';
import { helpers, Helpers } from './helpers';
import { getValidProps, extractStyleData } from './utils';

import { TailwindComponents, StyleFn } from './types';

let TailwindComponent = React.createContext<Record<string, string>>({});

function useTailwindContext(ids: string[]) {
  let value = React.useContext(TailwindComponent);

  return ids.reduce<Record<string, string>>(
    (acc, next) => ({
      ...acc,
      [next]: value[next] ?? '',
    }),
    {}
  );
}

function createComponent(helpers: Helpers) {
  return function<T extends keyof HTMLElementTagNameMap>(htmlTag: T) {
    const twId = String(Math.random());
    return function<P>(fn: StyleFn<P> = () => []) {
      let Component = React.forwardRef(
        (props: P & { className?: string }, ref: any) => {
          let { ownClassNames, children: _children } = extractStyleData(
            fn({ ...helpers }, props)
          );
          const styles = useTailwindContext([twId, ...Object.keys(_children)]);

          let className = [ownClassNames, styles[twId], props.className ?? '']
            .filter(item => item !== '')
            .join(' ');

          let validProps = getValidProps(props);

          let _props = { ...validProps, ref, className };

          return (
            <TailwindComponent.Provider value={{ ...styles, ..._children }}>
              {React.createElement(htmlTag, _props)}
            </TailwindComponent.Provider>
          );
        }
      );

      (Component as any).twId = twId;
      Component.displayName = `TW.${htmlTag}`;
      return Component;
    };
  };
}

let componentFactory = createComponent(helpers);

export let components = htmlTags.reduce(
  (acc, htmlTag) => ({ ...acc, [htmlTag]: componentFactory(htmlTag) }),
  {} as TailwindComponents
);
