export class IpfsUrl {
  public constructor(public readonly url: string) {
    if (!url.startsWith('ipfs://')) {
      throw new Error('IpfsUrl :: Invalid url: ' + this.url);
    }
  }
}
