import { RootState } from 'redux/store';

export const selectLoading = (state: RootState) => {
  return state.loading.requests > 0;
};
