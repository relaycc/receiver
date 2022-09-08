# Relay Receiver

**The best way to add Web3 messaging to your site!**

Relay Receiver is a [React](https://reactjs.org/) library that makes it easy to
add a web3 site inbox to your website.

- 🔥 Out-of-the-box wallet-to-wallet messaging, to a site admin or between users. 
- ✅ Easily customizable.
- 🦄 Built on top of [XMTP](https://xmtp.com) and [wagmi](https://github.com/tmm/wagmi)

## Quick start

Check out the example using [create-react-app](https://create-react-app.dev/). Installs the same version that is on try.relay.cc 

```bash
git clone https://github.com/relaycc/receiver-example-cra.git
cd receiver-example-cra.git
npm install
npm start
```

## Install Guide

It's quite easy:

```
npm install --save @relaycc/receiver
```

- Wrap your `App` component in `Receiver`
- Add `ReceiverLaunch` component

```TypeScript
import { Receiver, FixedLaunch } from '@relaycc/receiver';

function App() {
  return (
    <Receiver>
      <div className="App">
        <FixedLaunch />
      </div>
    </Receiver>
  );
}

export default App;
```

Alternately, import `InlineLaunch` to attach the launch function to a component already on the site. 

## Documentation

For full documentation, visit [docs.relay.cc](https://docs.relay.cc/relay/relay-receiver).

### Try it out

## Examples

_Coming Soon_

## License

Licensed under the MIT License, Copyright © 2022-present [Relay](https://relay.cc).

See [LICENSE](./LICENSE) for more information.
