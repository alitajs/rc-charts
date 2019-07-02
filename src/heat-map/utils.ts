import moment from 'moment';
import { IData } from './calendar';

const Months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

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

// 获取间隔的所有日期
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

/**
 * 获取chart数据
 * @param range
 * @param data
 * @param weekStart
 */
export function getChartData(
  range: string | string[],
  data: IData = {},
  weekStart: 1 | 7
) {
  const result = {
    data: [],
    months: []
  };
  const weeks = [0];
  const dates = getVirtualDate(range);

  if (dates && dates.length) {
    // 求取需要展示的月份
    const startMonth = moment(dates[0]).month();
    const endMonth = moment(dates[dates.length - 1]).month();

    result.months = getMonths(startMonth, endMonth);
    result.data = dates.map((item, index) => {
      const current = moment(item);

      let weekday = current.weekday();

      if (weekStart === 1) {
        weekday = current.weekday() === 0 ? 7 : current.weekday();

        weekday = weekday -1;
      }

      if (weekday === 0 && index !== 0) {
        weeks.push(weeks[weeks.length - 1] + 1);
      }

      return {
        date: item,
        week: weeks[weeks.length - 1],
        value: data[item] || 0,
        // 周几
        day: weekday,
        month: current.month(),
      }
    });
  }

  return result;
}

// 获取设置范围所有的月份
export function getMonths(
  startMonth: number,
  endMonth: number
): string[] {
  const months = [];

  if (startMonth < endMonth) {
    for (let i = startMonth; i <= endMonth; i++) {
      months.push(i);
    }
  } else {
    for (let i = startMonth; i <= 11; i++) {
      months.push(i);
    }
    for (let i = 0; i <= endMonth; i++) {
      months.push(i);
    }
  }

  return months.map(item => Months[item]);
}
