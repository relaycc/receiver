<img width="1257" alt="image" src="https://user-images.githubusercontent.com/100799178/189496413-85d3486d-2545-4b4c-9212-b943d503ed62.png">

# Overview

**The best way to add Web3 messaging to your site!**

Relay Receiver is a [React](https://reactjs.org/) library that makes it easy to
add Web3 messaging to your website.

- 🔥 Out-of-the-box wallet-to-wallet messaging, to a site admin or between users.
- ✅ Easily customizable, with nice defaults.
- 🦄 Built on top of [XMTP](https://xmtp.com)

## Quick start

Check out the [example](https://github.com/relaycc/receiver-example-cra) using [create-react-app](https://create-react-app.dev/) and [wagmi](https://wagmis.sh). You can see it live at https://react.relay.cc, or run it yourself:

```bash
git clone https://github.com/relaycc/receiver-example-cra.git
cd receiver-example-cra
npm install
npm start
# Then navigate to http://localhost:3000 in your browser
```

## Installation

```
# with npm
npm install @relaycc/receiver
# with yarn
yarn add @relaycc/receiver
```

## Basic Usage

The default configuration adds Receiver as an intercom-style messaging widget. To implement
this configuration, add `<Intercom />`, `<Window />` and `<Launcher />` to your app, making sure to pass in the user's connected wallet.

```TypeScript
import { Intercom, Window, Launcher } from '@relaycc/receiver';

function App() {
  return (
    <div className="App">
      <Launcher wallet={wallet} />
      <Intercom>
        <Window />
      </Intercom>
    </div>
  );
}

export default App;
```

## Launch Directly to a Conversation

The `<Launcher />` component, when clicked, will by default open a Receiver `<Window />` with the inbox view
active. To instead jump directly into a 1:1 conversation with a specific wallet (the site's support team, for example),
you can pass in the `peerAddress` prop:

```TypeScript
import { Intercom, Window, Launcher } from '@relaycc/receiver';

function App() {
  return (
    <div className="App">
      <Intercom>
        <Window />
      </Intercom>
      <Launcher wallet={wallet} peerAddress={'0x1800TECHSUPPORT'} />
    </div>
  );
}

export default App;
```

## Custom Launch Button

You can also use the `useLaunch` hook to turn any component into a Receiver launcher:

```TypeScript
import { Intercom, Window, useLaunch } from '@relaycc/receiver';

function App() {
  const launch = useLaunch(wallet);
  return (
    <div className="App">
      <Intercom>
        <Window />
      </Intercom>
      <button onClick={() => launch()}>
        Open Conversations List
      </button>
      <button onClick={() => launch('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045')}>
        Talk to Vitalik
      </button>
    </div>
  );
}

export default App;
```

## Custom Positioning

The `<Intercom />` component is just a utility component that positions the Receiver
window and applies nice default transitions to opening and closing the window.
This means that the `<Window />` component can be positioned anywhere you like.
For example, you could center it:

```TypeScript
import { Window, Launcher } from '@relaycc/receiver';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="full-width-centered-container">
        <Window />
        <Launcher />
      </div>
    </div>
  );
}

export default App;
```

```css
/* App.css */
.overlay {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

## Custom CSS

The `<Window />` components accepts a `className` prop you can use to apply
custom CSS to the window. In the future, we will provide fine-grained access to
various components. For now, the `className` prop will work best for applying
basic styling like a border, box-shadow, or custom positioning.

```css
/* App.css */
.bordered {
  border: 3px solid black;
}
```

```TypeScript
<Window className="bordered">
```

## Documentation

For full documentation, visit [docs.relay.cc](https://docs.relay.cc/relay/relay-receiver).

## License

Licensed under the MIT License, Copyright © 2022-present [Relay](https://relay.cc).

See [LICENSE](./LICENSE) for more information.
