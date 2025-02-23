import type {UniDate} from "$lib/calendar/dateUtils";
import dayjs, {isDayjs} from "dayjs";

const formatDate = (d: UniDate, fmt: string)=> {
    return (d == null) ? '' : isDayjs(d) ? d.format(fmt) : dayjs(d).format(fmt);
}

export default {
    formatDate
}