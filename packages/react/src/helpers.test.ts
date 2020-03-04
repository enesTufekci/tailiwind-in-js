import { _media, _modifiers, _if } from './helpers';

describe('_if()', () => {
  it('conditional', () => {
    expect(_if(true, ['foo'], ['bar'])).toEqual('foo');
    expect(_if(false, ['foo'], ['bar'])).toEqual('bar');
  });
});

describe('_media', () => {
  it('appends media prefixes to given string', () => {
    expect(_media.sm(['foo', 'bar', 'baz'])).toEqual('sm:foo sm:bar sm:baz');
    expect(_media.md(['foo', 'bar', 'baz'])).toEqual('md:foo md:bar md:baz');
    expect(_media.lg(['foo', 'bar', 'baz'])).toEqual('lg:foo lg:bar lg:baz');
    expect(_media.xl(['foo', 'bar', 'baz'])).toEqual('xl:foo xl:bar xl:baz');
  });
});

describe('_modifiers', () => {
  it('appends media prefixes to given string', () => {
    expect(_modifiers.hover(['foo', 'bar', 'baz'])).toEqual(
      'hover:foo hover:bar hover:baz'
    );
    expect(_modifiers.active(['foo', 'bar', 'baz'])).toEqual(
      'active:foo active:bar active:baz'
    );
    expect(_modifiers.focus(['foo', 'bar', 'baz'])).toEqual(
      'focus:foo focus:bar focus:baz'
    );
  });
});

describe('_modifiers in _media', () => {
  it('appends media prexies', () => {
    expect(_media.sm(['cux', _modifiers.focus(['foo', 'bar', 'baz'])])).toEqual(
      'sm:cux sm:focus:foo sm:focus:bar sm:focus:baz'
    );
  });
});
