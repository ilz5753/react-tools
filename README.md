# react-tools

A React utility library providing a collection of hooks, providers, and components designed to streamline common React development patterns and enhance functionality.

## Features

### `ErrorHandlerProvider`

A context provider for handling errors throughout your React application. Wrap your app with `ErrorHandlerProvider` to catch and manage errors in a centralized location.

### `EventEmitter`

An implementation of the publish/subscribe pattern, allowing components to emit events and register listeners. Use it to facilitate communication between disconnected components without prop drilling or context.

### `forgottonProviderMessage`

A development aid that provides a meaningful warning when context values are accessed without a surrounding `<Provider>`. This helps in identifying missing providers during early development phases.

### `FreezeProvider`

A provider that allows you to "freeze" your application state, preventing state updates and re-renders. It is useful for situations where you need to ensure the UI remains unchanged, such as during critical animations or transitions.

### `GenerateTreeFromArray`

A utility function to convert a flat array structure into a tree, typically used for creating hierarchies from flat data structures. Useful for menu navigation, file systems, or any nested representation of data.

### `NavigationProvider`

A context provider to manage navigation in your application. Use `NavigationProvider` to handle current location, navigation history, and transition between different views in a SPA (Single Page Application).

### `useContext`

A custom implementation of React's built-in `useContext` hook that may include additional developer warnings or enhancements. Use it to access context values with an interface identical to React's hook.

### `useErrorHandler`

A custom hook that works with `ErrorHandlerProvider` to handle errors within your components. It simplifies the process of catching and handling errors locally or escalating them to a global handler.

### `useFreeze`

A hook interacting with `FreezeProvider` to control the "freezing" of your app's state. This hook can be used to trigger or apply freeze status from within components.

### `useNavigation`

A hook for interacting with `NavigationProvider`, providing easy access to navigation actions and state. Simplify the navigation and routing logic in your components with this hook.

## Installation

To use `react-tools` in your project, you need to install it:

```bash
npm install react-tools --save
```

or if you're using yarn:

```bash
yarn add react-tools
```

## Usage

Here's a quick example to get you started:

```jsx
import { ErrorHandlerProvider, useErrorHandler } from "react-tools";

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
