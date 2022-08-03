### Install

npm i --save-dev @daopanel/receiver @xmtp/xmtp-js use-immer wagmi styled-components

OR

yarn add --dev @daopanel/receiver @xmtp/xmtp-js use-immer wagmi styled-components

### Configure

import { Receiver } from '@daopanel/receiver';

Wrap your app in Receiver component.
If your site connects to a wallet, and the user has connected, you can pass the wallet in using the signer prop.
Ex. <Receiver signer={signer} />

## Available Scripts

### Build the library

```
npm run rollup
```

### Publish the library

```
npm publish
```