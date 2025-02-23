const i18nDateString:any = {
    zh: {
        months:  [
            '一月', '二月', '三月','四月', '五月', '六月','七月', '八月', '九月','十月', '十一月', '十二月'
        ],
        monthsAbbr:  [
            '一月', '二月', '三月','四月', '五月', '六月','七月', '八月', '九月','十月', '十一月', '十二月'
        ],
        weekTitle: [
            "日", "一", "二", "三", "四", "五", "六"
        ],
        confirmText: "确认"
    },
    en: {
        months:  [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ],
        monthsAbbr:  [
            'Jan', 'Feb', 'Mar','Api', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        weekTitle: [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ],
        weekTitleAbbr: [
            "Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"
        ],
        confirmText: "OK"
    },
    fr: {
        months:  [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ],
        monthsAbbr:  [
            'Jan', 'Fév', 'Mar','Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'
        ],
        weekTitle: [
            "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"
        ],
        weekTitleAbbr: [
            "Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"
        ],
        confirmText: "OK"
    }
}

export {i18nDateString};

export default class DateContext {

    private _months: Array<string>;
    private _monthsAbbr: Array<string>;
    private _weekTitle: Array<string>;
    private _weekTitleAbbr: Array<string>;
    private _weekBegin: number = 1;
    private _dateFmt: string = "YYYY-MM-DD";
    private _timeFmt: string = "HH:mm:ss";
    private _confirmText: string = 'OK';
    private static instance: DateContext;

    private constructor(res: any) {
        this._months = res.months;
        this._monthsAbbr = res.monthsAbbr??res.months;
        this._weekTitle = res.weekTitle;
        this._weekTitleAbbr = res.weekTitleAbbr??res.weekTitle;
        this._confirmText = res.confirmText??'OK';
    }

    static getInstance():DateContext {
        if (DateContext.instance == null) {
            DateContext.instance = new DateContext(i18nDateString.en);
        }
        return DateContext.instance;
    }

    static initialize(res: any):DateContext {
        DateContext.instance = new DateContext(res || i18nDateString.en);
        return DateContext.instance;
    }

    get months():Array<string> {
        return [...this._months];
    }

    get monthsAbbr():Array<string> {
        return [...this._monthsAbbr];
    }

    get weekTitle():Array<string> {
        return [...this._weekTitle];
    }

    get weekTitleAbbr():Array<string> {
        return [...this._weekTitleAbbr];
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

    get confirmText(): string {
        return this._confirmText;
    }
}






