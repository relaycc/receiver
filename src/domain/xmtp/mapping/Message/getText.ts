import { Message } from './Message';

export const getText = (message: Message): string => {
  console.log('Getting text from message', message);
  return 'PLACEHOLDER TEXT';
};
