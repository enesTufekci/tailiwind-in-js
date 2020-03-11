import { HTMLAttributes } from 'react';

import { helpers } from './helpers';

export type StyleFn<T> = (
  $: typeof helpers,
  props: T
) => (string | { [id: string]: string[] })[];

export type TailwindComponentFactory<U> = <T>(
  fn?: StyleFn<T>
) => React.FC<T & HTMLAttributes<U> & { ref?: React.RefObject<U> }>;

export type TailwindComponents = {
  [P in keyof HTMLElementTagNameMap]: TailwindComponentFactory<
    HTMLElementTagNameMap[P]
  >;
};
