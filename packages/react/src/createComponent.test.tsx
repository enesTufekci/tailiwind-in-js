import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { components } from './createComponent';

describe('createComponent()', () => {
  test('basic', () => {
    let Component = components.div(() => ['m-1']);
    let { container } = render(<Component />);
    expect(container.querySelector('div')!.className).toEqual('m-1');
  });

  test('with child', () => {
    let Button = components.button();
    let Wrapper = components.div($ => ['m-1', $.child(Button, ['m-2'])]);
    let { getByTestId } = render(
      <Wrapper data-testid="wrapper">
        <Button data-testid="button">Hello</Button>
      </Wrapper>
    );
    expect(getByTestId('wrapper').className).toEqual('m-1');
    expect(getByTestId('button').className).toEqual('m-2');
  });

  test('with className prop', () => {
    let Button = components.button();
    let Wrapper = components.div($ => ['m-1', $.child(Button, ['m-2'])]);
    let { getByTestId } = render(
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
    let Button = components.button(() => ['text-gray-100']);
    let Wrapper = components.div<{ isActive: boolean }>(($, { isActive }) => [
      'm-1',
      $.child(Button, [
        $.if(
          isActive,
          ['bg-gray-100', 'text-gray-500'],
          ['bg-gray-200', 'text-gray-500']
        ),
      ]),
    ]);
    let Component = () => {
      let [isActive, setIsActive] = React.useState(false);
      return (
        <Wrapper data-testid="wrapper" isActive={isActive}>
          <Button data-testid="button" onClick={() => setIsActive(s => !s)}>
            Hello
          </Button>
        </Wrapper>
      );
    };
    let { getByTestId } = render(<Component />);
    expect(getByTestId('wrapper').className).toEqual('m-1');
    expect(getByTestId('button').className).toEqual(
      'text-gray-100 bg-gray-200 text-gray-500'
    );

    fireEvent.click(getByTestId('button'));
    expect(getByTestId('button').className).toEqual(
      'text-gray-100 bg-gray-100 text-gray-500'
    );

    fireEvent.click(getByTestId('button'));
    expect(getByTestId('button').className).toEqual(
      'text-gray-100 bg-gray-200 text-gray-500'
    );
  });
});
