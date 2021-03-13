import { RootState } from 'redux/store';

export function selectDiaryDate(state: RootState) {
  return state.diaryDate.value;
}
