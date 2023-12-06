# React Tools Library

`@ilz5753/react-tools` is a comprehensive utility library for React, offering an assortment of hooks, providers, and components oriented towards optimizing common development patterns in React and enhancing overall functionality.

## Features

### `ErrorHandlerProvider`

Provides a context for managing errors across a React application. Utilize the ErrorHandlerProvider to centrally capture and handle errors within your application.

### `EventEmitter`

Implements the publish/subscribe pattern, enabling components to broadcast events and register corresponding event listeners. This facilitates communication between disparate components without resorting to prop drilling or context usage.

### `forgottonProviderMessage`

Assists development by issuing a meaningful warning when attempting to access context values without the presence of a surrounding `<Provider>`. This feature aids in identifying missing providers during early stages of development.

### `FreezeProvider`

This provider allows you to “freeze” your application state, prohibiting state updates and re-renders. It is beneficial for scenarios where you need to ensure the UI remains invariant, such as during critical animations or transitions.

### `GenerateTreeFromArray`

This utility function transforms a flat array structure into a tree, typically useful for creating hierarchies from flat data structures. It is valuable for menu navigation, file systems, or any hierarchical representation of data.

### `NavigationProvider`

Manages navigation within your application via a context provider. Use `NavigationProvider` to oversee the current location, navigation history, and transitions between different views in a Single Page Application (SPA).

### `useContext`

A custom implementation of React’s built-in `useContext` hook, potentially incorporating additional developer warnings or enhancements. This hook provides access to context values using an interface identical to React’s native hook.

### `useErrorHandler`

This custom hook interacts with the `ErrorHandlerProvider` to handle errors within components, simplifying the process of catching and handling errors locally or elevating them to a global handler.

### `useFreeze`

A hook that collaborates with `FreezeProvider` to control the “freezing” of your application’s state. It can be employed to trigger or apply the “frozen” status from within components.

### `useNavigation`

A hook tailored for interacting with `NavigationProvider`, facilitating streamlined access to navigation actions and state. Simplify the navigation and routing logic within components by utilizing this hook.

## Installation

To integrate `@ilz5753/react-tools` into your project, simply install it using your package manager of choice:

```bash
npm install @ilz5753/react-tools --save
```

or if you're using yarn:

```bash
yarn add @ilz5753/react-tools
```

## Usage

Here's a quick example to get you started:

```jsx
import { ErrorHandlerProvider, useErrorHandler } from "@ilz5753/react-tools";

const MyComponent = () => {
  const { show } = useErrorHandler();

  const dangerousAction = () => {
    try {
      // Something risky that might throw an error
    } catch (error) {
      show({
        // ...
      });
    }
  };

  return <button onClick={dangerousAction}>Do Risky Thing</button>;
};

const App = () => (
  <ErrorHandlerProvider>
    <MyComponent />
  </ErrorHandlerProvider>
);
```

## Contributing

We welcome your contributions! Please feel free to submit issues and pull requests to the [react-tools repository](#).

## License

`react-tools` is [MIT licensed](/LICENSE.txt).
