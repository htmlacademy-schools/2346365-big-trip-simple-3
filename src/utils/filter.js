import { FilterType } from '../mock/const';
import dayjs from 'dayjs';

const isTripDateBeforeToday = (date) => dayjs(date).isBefore(dayjs(), 'D') || dayjs(date).isSame(dayjs(), 'D');

const filter = {
  [FilterType.FUTURE]: (tripPoints) => tripPoints.filter((tripPoint) => isTripDateBeforeToday(tripPoint.dateFrom)),
  [FilterType.EVERYTHING]: (tripPoints) => tripPoints,
};

const generateFilter = () => Object.keys(filter).map((filterName) => filterName );

export { generateFilter };
