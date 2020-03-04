import { HTMLAttributes } from 'react';

import { helpers } from './helpers';

export type TailwindComponent<U> = <T>(
  fn: StyleFn<T>
) => React.FC<T & HTMLAttributes<U> & { ref?: React.RefObject<U> }>;

export type StyleFn<T> = ($: typeof helpers, props: T) => string[];

export type TailwindComponents = {
  [P in keyof HTMLElementTagNameMap]: TailwindComponent<
    HTMLElementTagNameMap[P]
  >;
};
