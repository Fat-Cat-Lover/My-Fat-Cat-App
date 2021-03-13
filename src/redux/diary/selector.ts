import { plainToClass } from 'class-transformer';
import { Diary } from 'models/diary';
import { RootState } from 'redux/store';

export function selectDiary(state: RootState) {
  return plainToClass(Diary, state.diary.currentDiary);
}
