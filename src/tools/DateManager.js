export default class DateManager {

    constructor() {
        this.date = new Date()
    }

    getDate() {
        return this.date
    }

    getStringYear() {
        return this.date.getFullYear().toString()
    }

    getStringMonth() {
        return this.date.getMonth().toString().length === 1 ? `0${this.date.getMonth().toString()}` : this.date.getMonth().toString()
    }

    getStringDay() {
        return this.date.getDate().toString().length === 1 ? `0${this.date.getDate().toString()}` : this.date.getDate().toString()
    }

    getStringHours() {
        return this.date.getHours().toString()
    }

    getStringMinutes() {
        return this.date.getMinutes().toString()
    }

    getStringSeconds() {
        return this.date.getSeconds().toString()
    }

    getStringSAPDateFormat() {
        return this.date.toISOString().split('T')[0].replaceAll('-','')
    }

    getStringSAPTimeFormat() {
        return this.date.toTimeString().split(' ')[0].replaceAll(':', '')
    }

    getStringISODate() {
        return this.date.toISOString().split('T')[0]
    }

    getStringTime() {
        return this.date.toTimeString().split(' ')[0]
    }

    static getStringSAPDateFormat(strDate) {
        return strDate.substring(0,10).replaceAll('-', '')
    }

    static getStringSAPTimeFormat(strTime) {
        return strTime.replaceAll(':', '')
    }
}