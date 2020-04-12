import { FLASH_MESSAGE } from './constants';

export function flashMessage(text, messageType) {
  return {
    type: FLASH_MESSAGE,
    text,
    messageType,
  };
}
