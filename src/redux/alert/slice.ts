import { createSlice } from '@reduxjs/toolkit';

interface AlertProps {
  message?: string;
  buttons: {
    text: string;
    onClick?: () => any;
  }[];
  onDismiss?: () => any;
}

interface AlertState {
  show: boolean;
  alertProps: AlertProps | undefined;
}

interface AlertReducers {
  [fn: string]: (...args: any) => any;
  showAlert: (state: AlertState, action: { payload: AlertProps; type: string }) => any;
  dismissAlert: (state: AlertState) => any;
}

export const alertSlice = createSlice<AlertState, AlertReducers>({
  name: 'alert',
  initialState: {
    show: false,
    alertProps: undefined,
  },
  reducers: {
    showAlert: (state, action) => {
      state.alertProps = action.payload;
      state.show = true;
    },
    dismissAlert: state => {
      if (state.alertProps?.onDismiss) {
        state.alertProps.onDismiss();
      }
      state.show = false;
      state.alertProps = undefined;
    },
  },
});

export const { showAlert, dismissAlert } = alertSlice.actions;
export const alertReducer = alertSlice.reducer;
