import {i18nUtils} from "@ticatec/i18n";

const langRes = {
    common: {
        btnClose: "Close",
        btnCancel: 'Cancel',
        btnConfirm: "OK",
        textMore: "Load more",
    },
    colorPicker: "Pick up color",
    calendar: {
        months: [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ],
        monthsAbbr: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        weekTitle: [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ],
        weekTitleAbbr: [
            "Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"
        ],
        confirmText: "OK"
    },
    upload: {
        btnRetry: "Retry",
        btnRemove: "Delete",
        btnPickup: "Pickup files"
    },
    propertyEditor: {
        colName: "Attribute",
        colValue: "Value"
    },
    dataTable: {
        rowNo: "#",
        actions: "Actions",
        emptyDataSet: 'Empty dataset'
    },
    transfer: {
        selectIndicator: "Selected: {{selected}}/{{total}}"
    }

}

const i18nRes = i18nUtils.createResourceProxy(langRes, 'uniface');

export default i18nRes;