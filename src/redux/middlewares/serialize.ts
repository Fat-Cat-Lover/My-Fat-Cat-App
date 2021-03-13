import { Middleware } from '@reduxjs/toolkit';
import { classToPlain } from 'class-transformer';

export const serializePayload: Middleware = store => next => action => {
  if (action.payload) {
    action.payload = classToPlain(action.payload);
  }
  return next(action);
};
