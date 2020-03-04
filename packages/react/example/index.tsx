import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { tw } from '../src';
import './main.css';

type ButtonVariants = 'primary' | 'secondary';

interface ButtonProps {
  variant?: ButtonVariants;
}

let buttonBase = tw.macro($ => [
  'text-gray-700',
  'rounded-md',
  'shadow',
  'shadow-sm',
  'text-sm',
  'px-2',
  'py-1',
  'transition-colors',
  'ease-linear',
  'duration-100',
]);

let buttonPrimary = tw.macro($ => [
  'bg-indigo-500',
  'text-gray-900',
  $.hover(['bg-indigo-700', 'text-gray-400']),
]);

let buttonSecondary = tw.macro($ => [
  'bg-green-500',
  $.hover(['bg-green-700', 'text-gray-300']),
]);

let Button = tw.button<ButtonProps>(($, { variant = 'primary' }) => [
  ...buttonBase,
  $.if(variant === 'primary', buttonPrimary),
  $.if(variant === 'secondary', buttonSecondary),
]);

let Container = tw.div($ => [
  'flex', //
  'flex-col',
  $.md(['flex-row']),
]);

let ButtonContainer = tw.div(() => ['m-2']);

const App = () => {
  return (
    <Container>
      <ButtonContainer>
        <Button>Primary</Button>
      </ButtonContainer>
      <ButtonContainer>
        <Button variant="secondary">Secondary</Button>
      </ButtonContainer>
    </Container>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
