import moment from 'moment';
import { IData } from './calendar';

/**
 * 解析时间范围
 * @param range
 *
 * 某一年
 * range: '2017'
 *
 * 某个月
 * range: '2017-02'
 *
 * 某个区间 可以月、天为单位 不能超过一年
 * range: ['2017-01-02', '2017-02-23']
 * range: ['2017-01', '2017-02']
 */
export function getDateRange(
  range: string | string[]
): moment.Moment[] {
  let startDate;
  let endDate;

  if (typeof range === 'string') {
    const date = moment(range, ['YYYY', 'YYYY-MM']);
    const times = range.split('-');
    // 某一年
    if (times.length === 1) {
      startDate = date.startOf('year');
      endDate = moment(date).endOf('year');
    }
    // 某个月
    else {
      startDate = date.startOf('month');
      endDate = moment(date).endOf('month');
    }
  }

  if (Array.isArray(range) && range.length === 2) {
    const start = range[0];
    const end = range[1];

    let startTime = moment(start, ['YYYY-MM-DD', 'YYYY-MM']);
    let endTime = moment(end, ['YYYY-MM-DD', 'YYYY-MM']);

    if (startTime > endTime) {
      [startTime, endTime] = [endTime, startTime];
    }

    const starTimes = start.split('-');
    if (starTimes.length === 2) {
      startDate = startTime.startOf('month');
    } else {
      startDate = moment(startTime);
    }

    const endTimes = end.split('-');
    if (endTimes.length === 2) {
      endDate = endTime.endOf('month');
    } else {
      endDate = endTime
    }
  }
  return [startDate, endDate]
}

// 获取制动间隔的所有日期
export function getVirtualDate(
  range: string | string[]
): string[] {
  const dates = [];
  const newRange= getDateRange(range);

  if (newRange && newRange.length === 2) {
    const endTime = newRange[1].unix();

    let currentDate = newRange[0];

    while (currentDate.unix() <= endTime) {
      dates.push(currentDate.format('YYYY-MM-DD'));
      currentDate = currentDate.add(1, 'day');
    }
  }

  return dates;
}

export function getChartData(
  range: string | string[],
  data: IData = {}
) {
  let result = [];
  const dates = getVirtualDate(range);

  if (dates && dates.length) {
    const startWeek = moment(dates[0]).week();
    result = dates.map(item => {
      const current = moment(item);
      return {
        date: item,
        week: (current.week() - startWeek).toString(),
        value: data[item] || 0,
        // 周几
        day: current.weekday(),
        month: current.month(),
      }
    });
  }

  return result;
}
