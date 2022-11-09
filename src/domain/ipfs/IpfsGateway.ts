import { isValidUrl } from '../util';
import { IpfsUrl } from './IpfsUrl';

export class IpfsGateway {
  public url: string;
  public constructor(ipfsUrl: IpfsUrl) {
    const url = 'https://gateway.ipfs.io/ipfs/' + ipfsUrl.url.slice(7);
    if (!isValidUrl(url)) {
      throw new Error('IpfsGateway :: Invalid url: ' + this.url);
    }
    this.url = url;
  }
}
