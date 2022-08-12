### Install

npm i --save-dev @daopanel/receiver @xmtp/xmtp-js use-immer wagmi styled-components

OR

yarn add --dev @daopanel/receiver @xmtp/xmtp-js use-immer wagmi styled-components

### Configure

import { Receiver } from '@daopanel/receiver';

Wrap your app in Receiver component.

For example in your main app file:
  <Receiver>
    ...Your Code
  </Recever>

If your site connects to a wallet, and the user has connected, you can pass the wallet in using the signer prop like this:
  <Receiver signer={signer}>
    ...Your Code
  </Recever>


You can then import ReceiverLaunch component to display the launch button.

You will need to pass in a peerAddress as a prop.

import { ReceiverLaunch } from '@daopanel/receiver';
  <ReceiverLaunch peerAddress={peerAddress} />
