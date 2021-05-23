import dayjs from 'dayjs';
import { mockDiarys } from 'mocks/diary';
import { Diary } from 'models/diary';

export function getDiary(catId: number, date: Date): Promise<Diary> {
  return Promise.resolve(mockDiarys[`${catId}/${dayjs(date).format('YYYYMMDD')}`]);
}
