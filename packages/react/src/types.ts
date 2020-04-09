import { HTMLAttributes } from 'react';

import { Helpers } from './helpers';

export type TailwindComponent<U> = <T>(
  fn: StyleFn<T>
) => React.FC<T & HTMLAttributes<U> & { ref?: React.RefObject<U> }>;

export type StyleFn<T> = ($: Helpers, props: T) => string[];

export type TailwindComponents = {
  [P in keyof HTMLElementTagNameMap]: TailwindComponent<
    HTMLElementTagNameMap[P]
  >;
};
