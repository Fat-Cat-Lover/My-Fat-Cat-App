import { RootState } from 'redux/store';

export function selectDiaryDate(state: RootState) {
  return new Date(state.diaryDate.value * 1000);
}
