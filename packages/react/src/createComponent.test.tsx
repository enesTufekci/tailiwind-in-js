import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { components } from './createComponent';

describe('createComponent()', () => {
  test('basic', () => {
    const Component = components.div(() => ['m-1']);
    const { container } = render(<Component />);
    expect(container.querySelector('div')!.className).toEqual('m-1');
  });

  test('with child', () => {
    const Button = components.button();
    const Wrapper = components.div($ => ['m-1', $.child(Button, ['m-2'])]);
    const { getByTestId } = render(
      <Wrapper data-testid="wrapper">
        <Button data-testid="button">Hello</Button>
      </Wrapper>
    );
    expect(getByTestId('wrapper').className).toEqual('m-1');
    expect(getByTestId('button').className).toEqual('m-2');
  });

  test('with className prop', () => {
    const Button = components.button();
    const Wrapper = components.div($ => ['m-1', $.child(Button, ['m-2'])]);
    const { getByTestId } = render(
      <Wrapper data-testid="wrapper" className="wrapper">
        <Button data-testid="button" className="button">
          Hello
        </Button>
      </Wrapper>
    );
    expect(getByTestId('wrapper').className).toEqual('m-1 wrapper');
    expect(getByTestId('button').className).toEqual('m-2 button');
  });

  test('child with updates', async () => {
    const Button = components.button();
    const Wrapper = components.div<{ isActive: boolean }>(($, { isActive }) => [
      'm-1',
      $.child(Button, [$.if(isActive, ['bg-gray-100'], ['bg-gray-200'])]),
    ]);
    const Component = () => {
      const [isActive, setIsActive] = React.useState(false);
      return (
        <Wrapper data-testid="wrapper" isActive={isActive}>
          <Button data-testid="button" onClick={() => setIsActive(s => !s)}>
            Hello
          </Button>
        </Wrapper>
      );
    };
    const { getByTestId } = render(<Component />);
    expect(getByTestId('wrapper').className).toEqual('m-1');
    expect(getByTestId('button').className).toEqual('bg-gray-200');

    fireEvent.click(getByTestId('button'));
    expect(getByTestId('button').className).toEqual('bg-gray-100');

    fireEvent.click(getByTestId('button'));
    expect(getByTestId('button').className).toEqual('bg-gray-200');
  });
});
