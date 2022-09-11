<img width="1257" alt="image" src="https://user-images.githubusercontent.com/100799178/189496413-85d3486d-2545-4b4c-9212-b943d503ed62.png">


# Overview

**The best way to add Web3 messaging to your site!**

Relay Receiver is a [React](https://reactjs.org/) library that makes it easy to
add Web3 messaging to your website.

- 🔥 Out-of-the-box wallet-to-wallet messaging, to a site admin or between users. 
- ✅ Easily customizable with nice defaults.
- 🦄 Built on top of [XMTP](https://xmtp.com)

## Installation

```
# with npm
npm install @relaycc/receiver
# with yarn
yarn add @relaycc/receiver
```

## Quick start

Check out the [example](https://github.com/relaycc/receiver-example-cra) using [create-react-app](https://create-react-app.dev/) and [wagmi](https://wagmis.sh). You can see it live at https://react.relay.cc, or run it yourself:

```bash
git clone https://github.com/relaycc/receiver-example-cra.git
cd receiver-example-cra
npm install
npm start
# Then navigate to http://localhost:3000 in your browser
```

## Usage

The simplest case is to just add `<Window />` and `<Launcher />` to your app, making sure to pass
in the user's connected wallet. 

```TypeScript
import { Window, Launcher } from '@relaycc/receiver';

function App() {
  return (
    <div className="App">
      // The `wallet` props here come from whatever wallet connect system you are already using.
      <Window />
      <Launcher wallet={wallet} />
    </div>
  );
}

export default App;
```
The `<Launcher />` component, when clicked, will by default open a Receiver `<Window />` with the inbox view
active. To instead jump directly into a 1:1 conversation with a specific wallet (the site's support team, for example),
you can pass in the `peerAddress` prop:

```TypeScript
import { Window, Launcher } from '@relaycc/receiver';

function App() {
  return (
    <div className="App">
      <Window />
      <Launcher wallet={wallet} peerAddress={'0x1800TECHSUPPORT'} />
    </div>
  );
}

export default App;
```

You can also use the `useLaunch` hook to turn any component into a Receiver launcher:

```TypeScript
import { Window, useLaunch } from '@relaycc/receiver';

function App() {
  const launch = useLaunch(wallet);
  return (
    <div className="App">
      <Window />
      <button onClick={() => launch('0x0cb27e883E207905AD2A94F9B6eF0C7A99223C37'}>
        Talk to the Relay Founder
      </button>
      <button onClick={() => launch('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'}>
        Talk to Vitalik
      </button>
    </div>
  );
}

export default App;
```

## Documentation

For full documentation, visit [docs.relay.cc](https://docs.relay.cc/relay/relay-receiver).

## License

Licensed under the MIT License, Copyright © 2022-present [Relay](https://relay.cc).

See [LICENSE](./LICENSE) for more information.
