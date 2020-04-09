import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { tw } from './tw';
import { useTheme, ThemeProvider } from './context';

describe('tw', () => {
  it('respects theme', () => {
    let Button = tw.button($ => [
      $.theme({
        light: ['bg-gray-100'],
        dark: ['bg-gray-900'],
      }),
      $.sm([
        $.theme({
          light: ['bg-green-100'],
          dark: ['bg-green-900'],
        }),
      ]),
    ]);
    let Component: React.FC = () => {
      let { theme, changeTheme } = useTheme();
      return (
        <Button
          data-testid="theme-toggle"
          onClick={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          Change Theme
        </Button>
      );
    };

    let { getByTestId } = render(
      <ThemeProvider themes={['light', 'dark']} defaultTheme="light">
        <Component />
      </ThemeProvider>
    );

    expect(getByTestId('theme-toggle').className).toEqual(
      'bg-gray-100 sm:bg-green-100'
    );
    fireEvent.click(getByTestId('theme-toggle'));

    expect(getByTestId('theme-toggle').className).toEqual(
      'bg-gray-900 sm:bg-green-900'
    );
  });

  it('it doesnt fail without ThemeProvider', () => {
    let Button = tw.button($ => [
      $.theme({
        light: ['bg-gray-100'],
      }),
    ]);

    let { getByTestId } = render(<Button data-testid="no-theme">Test</Button>);
    expect(getByTestId('no-theme').className).toEqual('');
  });
});
