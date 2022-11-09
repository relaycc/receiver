import { SendOptions as XmtpSendOptions } from '@xmtp/xmtp-js';
import {
  ContentTypeId,
  toXmtpContentTypeId,
  fromXmtpContentTypeId,
} from './ContentTypeId';

export interface SendOptions {
  contentType?: ContentTypeId;
}

export const toXmtpSendOptions = (
  opts?: SendOptions
): XmtpSendOptions | undefined => {
  if (opts === undefined) {
    return undefined;
  } else {
    return {
      ...opts,
      contentType: (() => {
        if (opts.contentType === undefined) {
          return undefined;
        } else {
          return toXmtpContentTypeId(opts.contentType);
        }
      })(),
    };
  }
};

export const fromXmtpSendOptions = (
  opts?: XmtpSendOptions
): SendOptions | undefined => {
  if (opts === undefined) {
    return undefined;
  } else {
    return {
      ...opts,
      contentType: (() => {
        if (opts.contentType === undefined) {
          return undefined;
        } else {
          return fromXmtpContentTypeId(opts.contentType);
        }
      })(),
    };
  }
};
