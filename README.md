# Relay Receiver

**The best way to add Web3 messaging to your site!**

Relay Receiver is a [React](https://reactjs.org/) library that makes it easy to
add Web3 messaging to your site.

- 🔥 Out-of-the-box wallet-to-wallet messaging.
- ✅ Easily customizable.
- 🦄 Built on top of [XMTP](https://xmtp.com) and [wagmi](https://github.com/tmm/wagmi)

## Quick start

Check out the example using [create-react-app](https://create-react-app.dev/).

```bash
git clone https://github.com/relaycc/receiver-example-cra.git
cd receiver-example-cra.git
npm install
npm start
```

## Usage

It's quite easy:

- Wrap your `App` component in `Receiver`
- Add `ReceiverLaunch` component

```TypeScript
import logo from './logo.svg';
import './App.css';
import { Receiver, ReceiverLaunch } from '@relaycc/receiver';

function App() {
  return (
    <Receiver>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <ReceiverLaunch />
      </div>
    </Receiver>
  );
}

export default App;
```

## Documentation

For full documentation, visit [docs.relay.cc](https://docs.relay.cc/relay/relay-receiver).

### Try it out

## Examples

_Coming Soon_

## License

Licensed under the MIT License, Copyright © 2022-present [Relay](https://relay.cc).

See [LICENSE](./LICENSE) for more information.
