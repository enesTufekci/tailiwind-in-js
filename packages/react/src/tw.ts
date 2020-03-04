import { components } from './createComponent';
import { TailwindComponents } from './types';
import { Helpers, helpers } from './helpers';

interface TW extends TailwindComponents {
  macro: (fn: (helpers: Helpers) => string[]) => string[];
}

export const tw: TW = {
  ...components,
  macro: fn => fn(helpers),
};

tw.button($ => [
  'text-gray-100',
  $.if(true, ['text-gray-300'], ['text-gray-400']),
]);
