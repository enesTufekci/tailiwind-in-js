# Tailwind in JS

## Motivation

[Tailwind](https://tailwindcss.com) css is awesome but it is lacking component level composibility and it is hard to maintain class names in markup when you use it with frontend frameworks like [React](https://reactjs.org). This library is trying to be a solution for this issue with CSS-in-JS like approach.

## Installation

```
npm install @tailwind-in-js/react
```

or

```
yarn add @tailwind-in-js/react
```

For the tailwind part please follow the [instructions](https://tailwindcss.com/docs/installation) on tailwindcss' website.

## Usage

> Only with react (for now)

**Basic**

```tsx
import { tw } from "@tailwind-in-js/react";

let Button = tw.button(() => [
  "text-gray-700",
  "bg-indigo-500",
  "rounded-md",
  "shadow-sm"
]);
```

**Using props as condition**

```tsx
import { tw } from "@tailwind-in-js/react";

let Button = tw.button(($, { isActive }) => [
  "text-gray-700",
  "rounded-md",
  "shadow-sm",
  $.if(isActive, ["bg-indigo-500"], ["bg-indigo-300"])
]);
```

**Media queries**

```tsx
import { tw } from "@tailwind-in-js/react";

let Button = tw.button($ => [
  "text-gray-700",
  "rounded-md",
  "shadow-sm",
  $.sm(["text-sm", "p-1"]),
  $.md(["text-md", "p-2"]),
  $.xl(["text-xl", "p-3"])
]);
```

**Modifiers**

```tsx
import { tw } from "@tailwind-in-js/react";

let Button = tw.button($ => [
  "text-gray-700",
  "rounded-md",
  "shadow-sm",
  "bg-indigo-400",
  $.hover(["bg-indigo-500"]),
  $.focus(["bg-indigo-600"])
]);
```

**Media queries with modifiers**

```tsx
import { tw } from "@tailwind-in-js/react";

let Button = tw.button($ => [
  "text-gray-700",
  "rounded-md",
  "shadow-sm",
  "bg-indigo-500",
  $.hover(["bg-indigo-500"]),
  $.focus(["bg-indigo-600"]),
  $.sm([
    "bg-green-400", //
    $.hover(["bg-green-500"]),
    $.focus(["bg-green-600"])
  ])
]);
```

**Composition using macro**

```tsx
import { tw } from "@tailwind-in-js/react";

let buttonBase = tw.macro(() => [
  "text-gray-700", //
  "rounded-md",
  "shadow-sm"
]);

let buttonPrimary = tw.macro($ => [
  "bg-indigo-400",
  $.hover(["bg-indigo-500"]),
  $.focus(["bg-indigo-600"])
]);

let buttonSecondary = tw.macro($ => [
  "bg-green-400",
  $.hover(["bg-green-500"]),
  $.focus(["bg-green-600"])
]);

let Button = tw.button(($, { variant }) => [
  buttonBase,
  $.if(variant === "primary", buttonPrimary),
  $.if(variant === "secondary", buttonSecondary)
]);
```

**With typescript**

```tsx
import { tw } from "@tailwind-in-js/react";

type ButtonVariants = "primary" | "secondary";

let Button = tw.button<{variant: ButtonVariants}>(($, { variant }) => [
  ...
]);

```

## Upcoming features

- Cli tool for improving dx

- Typescript support for class name auto completions (also for the custom class names)

- Inheritence e.g

```tsx
import { tw } from "@tailwind-in-js/react";

let Text = tw.span(() => ["text-gray-500"]);

let Button = tw.button(($, { variant }) => [
  $.child(Text, [
    $.if(variant === "primary", ["text-gray-700"], ["text-gray-600"])
  ])
]);
```

## Contributing

All kind of PRs are welcome.
