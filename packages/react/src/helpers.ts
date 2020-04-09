const media = ['sm', 'md', 'lg', 'xl'];
const modifiers = ['hover', 'active', 'focus'];

export let append = (strToAppend: string) => {
  return (classNames: string[]) =>
    classNames
      .map(item =>
        item
          .split(' ')
          .map(i => `${strToAppend}:${i}`)
          .join(' ')
      )
      .join(' ');
};

export let _if = (prop: boolean, stylesA: string[], stylesB: string[] = []) =>
  prop ? stylesA.join(' ') : stylesB.join(' ');

export let _modifiers = modifiers.reduce(
  (acc, next) => ({
    ...acc,
    [next]: append(next),
  }),
  {} as Record<'hover' | 'active' | 'focus', (classNames: string[]) => string>
);

export let _media = media.reduce(
  (acc, next) => ({
    ...acc,
    [next]: append(next),
  }),
  {} as Record<'sm' | 'md' | 'lg' | 'xl', (classNames: string[]) => string>
);

export let _theme = (theme: string) => (data: Record<string, string[]>) => {
  return data[theme].join(' ');
};

export interface Helpers
  extends Record<'sm' | 'md' | 'lg' | 'xl', (classNames: string[]) => string>,
    Record<'hover' | 'active' | 'focus', (classNames: string[]) => string> {
  if: typeof _if;
  theme: ReturnType<typeof _theme>;
}

export let helpers = {
  if: _if,
  ..._modifiers,
  ..._media,
};

export let createHelpers = (theme: string): Helpers => ({
  theme: _theme(theme),
  ...helpers,
});

// export type Helpers = typeof helpers;
