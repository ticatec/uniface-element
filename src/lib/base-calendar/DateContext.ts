import i18n from "$lib/i18n/i18nContext";


export default class DateContext {

    private _weekBegin: number = 1;
    private _dateFmt: string = "YYYY-MM-DD";
    private _timeFmt: string = "HH:mm:ss";
    private static instance: DateContext;

    private constructor() {

    }

    static getInstance():DateContext {
        if (DateContext.instance == null) {
            DateContext.instance = new DateContext();
        }
        return DateContext.instance;
    }


    get months():Array<string> {
        return i18n.get("uniface.calendar.months");
    }

    get monthsAbbr():Array<string> {
        return i18n.get("uniface.calendar.monthsAbbr");
    }

    get weekTitle():Array<string> {
        return i18n.get("uniface.calendar.weekTitle");
    }

    get weekTitleAbbr():Array<string> {
        return i18n.get("uniface.calendar.weekTitleAbbr");
    }

    set weekBegin(value: number) {
        if (value < 0 || value > 6) {
            throw new Error('Invalid value')
        }
        this._weekBegin = value;
    }

    get weekBegin(): number {
        return this._weekBegin;
    }

    set dateFormat(value: string) {
        this._dateFmt = value;
    }

    get dateFormat(): string {
        return this._dateFmt;
    }

    set timeFormat(value: string) {
        this._timeFmt = value;
    }

    get timeFormat(): string {
        return this._timeFmt;
    }

}






