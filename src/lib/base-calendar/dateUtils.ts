import dayjs, {isDayjs} from "dayjs";

export type UniDate = dayjs.Dayjs | Date | string | null;

/**
 * 获取今日的日期，时间清空
 */
const today = ():dayjs.Dayjs => {
    return dayjs().hour(0).minute(0).second(0).millisecond(0);
}

/**
 * 格式化日期
 * @param d
 * @param fmt
 */
const formatDate = (d: UniDate, fmt: string = 'YYYY-MM-DD'): string => {
    if (d == null) {
        return '';
    }
    d = dayjs.isDayjs(d) ? d : dayjs(d);
    return d.format(fmt);
}

const formatISODate = (d: UniDate): string => {
    if (d == null) {
        return '';
    }
    d = dayjs.isDayjs(d) ? d : dayjs(d);
    return d.toISOString();
}

/**
 * 把日期，字符串转换成dayjs格式
 * @param d
 */
const toDayjs = (d: UniDate):dayjs.Dayjs  => {
    return d == null ? null as unknown as dayjs.Dayjs : dayjs.isDayjs(d) ? d : dayjs(d);
}

export default {today, formatDate, formatISODate, toDayjs}