/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef, HostListener, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { startOfMonth, endOfMonth, addMonths, setYear, eachDay, getDate, getMonth, getYear, isToday, isSameDay, isSameMonth, isSameYear, format, getDay, subDays, setDay, addYears, subYears, setMonth } from 'date-fns';
/**
 * @record
 */
export function DatepickerOptions() { }
if (false) {
    /** @type {?|undefined} */
    DatepickerOptions.prototype.minYear;
    /** @type {?|undefined} */
    DatepickerOptions.prototype.maxYear;
    /** @type {?|undefined} */
    DatepickerOptions.prototype.displayFormat;
    /** @type {?|undefined} */
    DatepickerOptions.prototype.barTitleFormat;
    /** @type {?|undefined} */
    DatepickerOptions.prototype.dayNamesFormat;
    /** @type {?|undefined} */
    DatepickerOptions.prototype.monthNamesFormat;
    /** @type {?|undefined} */
    DatepickerOptions.prototype.barTitleIfEmpty;
    /** @type {?|undefined} */
    DatepickerOptions.prototype.firstCalendarDay;
    /** @type {?|undefined} */
    DatepickerOptions.prototype.locale;
    /** @type {?|undefined} */
    DatepickerOptions.prototype.minDate;
    /** @type {?|undefined} */
    DatepickerOptions.prototype.maxDate;
    /**
     * Placeholder for the input field
     * @type {?|undefined}
     */
    DatepickerOptions.prototype.placeholder;
    /**
     * [ngClass] to add to the input field
     * @type {?|undefined}
     */
    DatepickerOptions.prototype.addClass;
    /**
     * [ngStyle] to add to the input field
     * @type {?|undefined}
     */
    DatepickerOptions.prototype.addStyle;
    /**
     * ID to assign to the input field
     * @type {?|undefined}
     */
    DatepickerOptions.prototype.fieldId;
    /**
     * If false, barTitleIfEmpty will be disregarded and a date will always be shown. Default: true
     * @type {?|undefined}
     */
    DatepickerOptions.prototype.useEmptyBarTitle;
    /** @type {?|undefined} */
    DatepickerOptions.prototype.weekendsDay;
    /**
     * Sunday is 0 , Highlights the weekends with gray background*
     * @type {?|undefined}
     */
    DatepickerOptions.prototype.holidayList;
}
// Counter for calculating the auto-incrementing field ID
/** @type {?} */
let counter = 0;
/**
 * Internal library helper that helps to check if value is empty
 * \@param value
 * @type {?}
 */
const isNil = (/**
 * @param {?} value
 * @return {?}
 */
(value) => {
    return (typeof value === 'undefined') || (value === null);
});
const ɵ0 = isNil;
export class NgxModerndatepickerComponent {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
        /**
         * Disable datepicker's input
         */
        this.headless = false;
        /**
         * Set datepicker's visibility state
         */
        this.isOpened = false;
        /**
         * Datepicker dropdown position
         */
        this.position = 'bottom-right';
        this.positions = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
        this.onTouchedCallback = (/**
         * @return {?}
         */
        () => { });
        this.onChangeCallback = (/**
         * @return {?}
         */
        () => { });
        this.scrollOptions = {
            barBackground: '#DFE3E9',
            gridBackground: '#FFFFFF',
            barBorderRadius: '3',
            gridBorderRadius: '3',
            barWidth: '6',
            gridWidth: '6',
            barMargin: '0',
            gridMargin: '0'
        };
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @return {?}
     */
    get value() {
        return this.innerValue;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set value(val) {
        this.innerValue = val;
        this.onChangeCallback(this.innerValue);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.view = 'year';
        this.date = new Date();
        this.setOptions();
        this.initDayNames();
        this.initYears();
        this.initMonthName();
        // Check if 'position' property is correct
        if (this.positions.indexOf(this.position) === -1) {
            throw new TypeError(`ng-moderndatepicker: invalid position property value '${this.position}' (expected: ${this.positions.join(', ')})`);
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if ('options' in changes) {
            this.setOptions();
            this.initDayNames();
            this.init();
            this.initYears();
        }
    }
    /**
     * @return {?}
     */
    get defaultFieldId() {
        // Only evaluate and increment if required
        /** @type {?} */
        const value = `datepicker-${counter++}`;
        Object.defineProperty(this, 'defaultFieldId', { value });
        return value;
    }
    /**
     * @return {?}
     */
    setOptions() {
        /** @type {?} */
        const today = new Date();
        this.minYear = this.options && this.options.minYear || getYear(today) - 30;
        this.maxYear = this.options && this.options.maxYear || getYear(today) + 30;
        this.displayFormat = this.options && this.options.displayFormat || 'MMM D[,] YYYY';
        this.barTitleFormat = this.options && this.options.barTitleFormat || 'YYYY';
        this.dayNamesFormat = this.options && this.options.dayNamesFormat || 'ddd';
        this.monthNamesFormat = this.options && this.options.monthNamesFormat || 'MMM';
        this.barTitleIfEmpty = this.options && this.options.barTitleIfEmpty || 'Click to select a date';
        this.firstCalendarDay = this.options && this.options.firstCalendarDay || 0;
        this.locale = this.options && { locale: this.options.locale } || {};
        this.placeholder = this.options && this.options.placeholder || '';
        this.addClass = this.options && this.options.addClass || {};
        this.addStyle = this.options && this.options.addStyle || {};
        this.fieldId = this.options && this.options.fieldId || this.defaultFieldId;
        this.useEmptyBarTitle = this.options && 'useEmptyBarTitle' in this.options ? this.options.useEmptyBarTitle : true;
    }
    /**
     * @return {?}
     */
    nextYear() {
        this.date = addYears(this.date, 1);
        this.init();
        this.initMonthName();
    }
    /**
     * @return {?}
     */
    prevYear() {
        this.date = subYears(this.date, 1);
        this.init();
        this.initMonthName();
    }
    /**
     * @param {?} i
     * @return {?}
     */
    setDate(i) {
        this.date = this.days[i].date;
        this.value = this.date;
        this.init();
        this.close();
    }
    /**
     * @param {?} i
     * @return {?}
     */
    setYear(i) {
        this.date = setYear(this.date, this.years[i].year);
        this.init();
        this.view = 'year';
    }
    /**
     * @param {?} i
     * @return {?}
     */
    selectMonth(i) {
        this.date = setMonth(this.date, i);
        this.init();
        this.initMonthName();
        this.view = 'year';
    }
    /**
     * Checks if specified date is in range of min and max dates
     * @private
     * @param {?} date
     * @return {?}
     */
    isDateSelectable(date) {
        if (isNil(this.options)) {
            return true;
        }
        /** @type {?} */
        const minDateSet = !isNil(this.options.minDate);
        /** @type {?} */
        const maxDateSet = !isNil(this.options.maxDate);
        /** @type {?} */
        const timestamp = date.valueOf();
        if (minDateSet && (timestamp < this.options.minDate.valueOf())) {
            return false;
        }
        if (maxDateSet && (timestamp > this.options.maxDate.valueOf())) {
            return false;
        }
        return true;
    }
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    isWeekendDay(date) {
        /** @type {?} */
        const weekendsDay = Array.isArray(this.options.weekendsDay);
        if (weekendsDay) {
            return this.options.weekendsDay.indexOf(getDay(date)) != -1 ? true : false;
        }
        return false;
    }
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    isHoliday(date) {
        /** @type {?} */
        const areHolidays = Array.isArray(this.options.holidayList);
        if (areHolidays) {
            return (this.options.holidayList.filter((/**
             * @param {?} day
             * @return {?}
             */
            (day) => isSameDay(day, date)))).length ? true : false;
        }
        return false;
    }
    /**
     * @return {?}
     */
    init() {
        // this.date may be null after .reset(); fall back to current date.
        /** @type {?} */
        const actualDate = this.date || new Date();
        /** @type {?} */
        const start = startOfMonth(actualDate);
        /** @type {?} */
        const end = endOfMonth(actualDate);
        this.days = eachDay(start, end).map((/**
         * @param {?} date
         * @return {?}
         */
        date => {
            return {
                date: date,
                day: getDate(date),
                month: getMonth(date),
                year: getYear(date),
                inThisMonth: true,
                isToday: isToday(date),
                isSelected: isSameDay(date, this.innerValue) && isSameMonth(date, this.innerValue) && isSameYear(date, this.innerValue),
                isSelectable: this.isDateSelectable(date),
                isWeekend: this.isWeekendDay(date),
                isHoliday: this.isHoliday(date)
            };
        }));
        /** @type {?} */
        const tmp = getDay(start) - this.firstCalendarDay;
        /** @type {?} */
        const prevDays = tmp < 0 ? 7 - this.firstCalendarDay : tmp;
        for (let i = 1; i <= prevDays; i++) {
            /** @type {?} */
            const date = subDays(start, i);
            this.days.unshift({
                date: date,
                day: getDate(date),
                month: getMonth(date),
                year: getYear(date),
                inThisMonth: false,
                isToday: isToday(date),
                isSelected: isSameDay(date, this.innerValue) && isSameMonth(date, this.innerValue) && isSameYear(date, this.innerValue),
                isSelectable: this.isDateSelectable(date),
                isWeekend: this.isWeekendDay(date),
                isHoliday: this.isHoliday(date)
            });
        }
        if (this.innerValue) {
            this.displayValue = format(this.innerValue, this.displayFormat, this.locale);
            this.barTitle = format(start, this.barTitleFormat, this.locale);
        }
        else {
            this.displayValue = '';
            this.barTitle = this.useEmptyBarTitle ? this.barTitleIfEmpty : format(start, this.barTitleFormat, this.locale);
        }
    }
    /**
     * @return {?}
     */
    initYears() {
        /** @type {?} */
        const range = this.maxYear - this.minYear;
        this.years = Array.from(new Array(range), (/**
         * @param {?} x
         * @param {?} i
         * @return {?}
         */
        (x, i) => i + this.minYear)).map((/**
         * @param {?} year
         * @return {?}
         */
        year => {
            return {
                year: year,
                isThisYear: year === getYear(this.date),
                isToday: year === getYear(new Date()),
                isSelectable: this.isYearSelectable(year)
            };
        }));
    }
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    isYearSelectable(date) {
        /** @type {?} */
        const minDate = isNil(this.options.minDate) ? false : this.options.minDate;
        /** @type {?} */
        const maxDate = isNil(this.options.maxDate) ? false : this.options.maxDate;
        if (minDate && maxDate) {
            return minDate.getFullYear() <= date && date <= maxDate.getFullYear();
        }
        else if (minDate) {
            return minDate.getFullYear() <= date;
        }
        else if (maxDate) {
            return date <= maxDate.getFullYear();
        }
        return true;
    }
    /**
     * @return {?}
     */
    initDayNames() {
        this.dayNames = [];
        /** @type {?} */
        const start = this.firstCalendarDay;
        for (let i = start; i <= 6 + start; i++) {
            /** @type {?} */
            const date = setDay(new Date(), i);
            this.dayNames.push(format(date, this.dayNamesFormat, this.locale));
        }
    }
    /**
     * @return {?}
     */
    initMonthName() {
        /** @type {?} */
        let monthNames = [];
        /** @type {?} */
        let currentDate = new Date(this.date);
        /** @type {?} */
        const start = subYears(currentDate.setMonth(11), 1);
        for (let i = 1; i <= 12; i++) {
            /** @type {?} */
            const date = addMonths(start, i);
            monthNames.push({
                name: format(date, this.monthNamesFormat, this.locale),
                isSelected: date.getMonth() === this.date.getMonth(),
                isThisMonth: isSameMonth(date, new Date()) && isSameYear(this.date, new Date()),
                isSelectable: this.isMonthSelectable(date)
            });
        }
        this.monthNames = monthNames;
    }
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    isMonthSelectable(date) {
        /** @type {?} */
        const minDate = isNil(this.options.minDate) ? false : this.options.minDate;
        /** @type {?} */
        const maxDate = isNil(this.options.maxDate) ? false : this.options.maxDate;
        if (minDate && maxDate) {
            if (minDate.getFullYear() < date.getFullYear() && date.getFullYear() < maxDate.getFullYear()) {
                return true;
            }
            else if (minDate.getFullYear() < date.getFullYear() && date.getFullYear() == maxDate.getFullYear()) {
                if (date.getMonth() <= maxDate.getMonth()) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (minDate.getFullYear() == date.getFullYear() && date.getFullYear() < maxDate.getFullYear()) {
                if (minDate.getMonth() <= date.getMonth()) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (minDate.getFullYear() == date.getFullYear() && date.getFullYear() == maxDate.getFullYear()) {
                if (minDate.getMonth() <= date.getMonth() && date.getMonth() <= maxDate.getMonth()) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        else if (minDate) {
            if (minDate.getFullYear() < date.getFullYear()) {
                return true;
            }
            else if (minDate.getFullYear() == date.getFullYear()) {
                if (minDate.getMonth() <= date.getMonth()) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        else if (maxDate) {
            if (date.getFullYear() < maxDate.getFullYear()) {
                return true;
            }
            else if (date.getFullYear() == maxDate.getFullYear()) {
                if (date.getMonth() <= maxDate.getMonth()) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        return true;
    }
    /**
     * @return {?}
     */
    toggleView() {
        this.view = this.view === 'year' ? 'years' : 'year';
    }
    /**
     * @return {?}
     */
    toggle() {
        this.isOpened = !this.isOpened;
        if (!this.isOpened && this.view === 'years') {
            this.toggleView();
        }
    }
    /**
     * @return {?}
     */
    close() {
        this.isOpened = false;
        if (this.view === 'years') {
            this.toggleView();
        }
    }
    /**
     * @param {?=} fireValueChangeEvent
     * @return {?}
     */
    reset(fireValueChangeEvent = false) {
        this.date = null;
        this.innerValue = null;
        this.init();
        if (fireValueChangeEvent && this.onChangeCallback) {
            this.onChangeCallback(this.innerValue);
        }
    }
    /**
     * @param {?} val
     * @return {?}
     */
    writeValue(val) {
        if (val) {
            this.date = val;
            this.innerValue = val;
            this.init();
            this.displayValue = format(this.innerValue, this.displayFormat, this.locale);
            this.barTitle = format(startOfMonth(val), this.barTitleFormat, this.locale);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onBlur(e) {
        if (!this.isOpened) {
            return;
        }
        /** @type {?} */
        const input = this.elementRef.nativeElement.querySelector('.ngx-moderndatepicker-input');
        if (input == null) {
            return;
        }
        if (e.target === input || input.contains((/** @type {?} */ (e.target)))) {
            return;
        }
        /** @type {?} */
        const container = this.elementRef.nativeElement.querySelector('.ngx-moderndatepicker-calendar-container');
        if (container && container !== e.target && !container.contains((/** @type {?} */ (e.target))) && !((/** @type {?} */ (e.target))).classList.contains('year-unit') && !((/** @type {?} */ (e.target))).classList.contains('month-unit')) {
            this.close();
        }
    }
}
NgxModerndatepickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-moderndatepicker',
                template: "<div class=\"ngx-moderndatepicker-container\">\n  <input type=\"text\" *ngIf=\"!headless\" class=\"ngx-moderndatepicker-input\" [(ngModel)]=\"displayValue\" readonly [placeholder]=\"placeholder\"\n    [ngClass]=\"addClass\" [ngStyle]=\"addStyle\" [id]=\"fieldId\" [disabled]=\"disabled\" (click)=\"toggle()\" />\n  <ng-content></ng-content>\n  <div class=\"ngx-moderndatepicker-calendar-container ngx-moderndatepicker-position-{{position}}\" *ngIf=\"isOpened\">\n    <div class=\"topbar-container\">\n      <div class=\"main-calendar-selection-year\">\n        <svg width=\"14px\" height=\"14px\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n  \t       viewBox=\"0 0 489.6 489.6\" style=\"enable-background:new 0 0 489.6 489.6;\" xml:space=\"preserve\"\n          (click)=\"view === 'year' && prevYear()\">\n          <g>\n          \t<g>\n          \t\t<path style=\"fill:#2C2F33;\" d=\"M244.8,489.6c135,0,244.8-109.8,244.8-244.8S379.8,0,244.8,0S0,109.8,0,244.8\n          \t\t\tS109.8,489.6,244.8,489.6z M244.8,19.8c124.1,0,225,100.9,225,225s-100.9,225-225,225s-225-100.9-225-225S120.7,19.8,244.8,19.8z\"\n          \t\t\t/>\n          \t\t<path style=\"fill:#3C92CA;\" d=\"M265.5,326.1c1.9,1.9,4.5,2.9,7,2.9s5.1-1,7-2.9c3.9-3.9,3.9-10.1,0-14l-67.3-67.3l67.3-67.3\n          \t\t\tc3.9-3.9,3.9-10.1,0-14s-10.1-3.9-14,0l-74.3,74.3c-3.9,3.9-3.9,10.1,0,14L265.5,326.1z\"/>\n          \t</g>\n          </g>\n        </svg>\n        <span class=\"topbar-title\" (click)=\"toggleView(); initYears();\">{{ barTitle }}</span>\n        <svg width=\"14px\" height=\"14px\" viewBox=\"0 0 6 10\" version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n  \t       viewBox=\"0 0 489.6 489.6\" style=\"enable-background:new 0 0 489.6 489.6;\" xml:space=\"preserve\"\n          (click)=\"view === 'year' && nextYear()\">\n          <g>\n          \t<g>\n          \t\t<path style=\"fill:#2C2F33;\" d=\"M244.8,489.6c135,0,244.8-109.8,244.8-244.8S379.8,0,244.8,0S0,109.8,0,244.8\n          \t\t\tS109.8,489.6,244.8,489.6z M244.8,19.8c124.1,0,225,100.9,225,225s-100.9,225-225,225s-225-100.9-225-225S120.7,19.8,244.8,19.8z\"\n          \t\t\t/>\n          \t\t<path style=\"fill:#3C92CA;\" d=\"M210,326.1c1.9,1.9,4.5,2.9,7,2.9s5.1-1,7-2.9l74.3-74.3c1.9-1.9,2.9-4.4,2.9-7s-1-5.1-2.9-7\n          \t\t\tL224,163.5c-3.9-3.9-10.1-3.9-14,0s-3.9,10.1,0,14l67.3,67.3L210,312.1C206.2,316,206.2,322.3,210,326.1z\"/>\n          \t</g>\n          </g>\n        </svg>\n      </div>\n      <div class=\"main-calendar-day-names\" *ngIf=\"view === 'year'\">\n        <span class=\"day-name-unit\" *ngFor=\"let name of dayNames\">{{ name }}</span>\n      </div>\n    </div>\n    <div class=\"main-calendar-container\" *ngIf=\"view === 'year'\">\n      <div class=\"main-calendar-month-names\">\n        <div class=\"month-name-unit\" *ngFor=\"let month of monthNames; let index = index\" (click)=\"month.isSelectable && selectMonth(index)\">\n          <span class=\"month-unit\"\n            [ngClass]=\"{ 'is-this-month': month.isThisMonth, 'is-selected': month.isSelected, 'is-disabled': !month.isSelectable }\">\n            {{ month.name }}\n          </span>\n        </div>\n      </div>\n      <div class=\"main-calender-days-container\">\n        <div class=\"main-calendar-days\">\n          <div class=\"day-unit\" *ngFor=\"let day of days; let i = index;\" >\n            <span [ngClass]=\"{ 'is-prev-month': !day.inThisMonth, 'is-today': day.isToday, 'is-selected': day.isSelected, 'is-disabled': !day.isSelectable, 'is-weekend': day.isWeekend , 'is-holiday' : day.isHoliday}\"\n              (click)=\"day.isSelectable && setDate(i)\">\n              {{ day.day }}\n            </span>\n          </div>\n        </div>\n       </div>\n      </div>\n    <div class=\"main-calendar-container\" *ngIf=\"view === 'years'\">\n      <div class=\"main-calendar-years\">\n        <span class=\"year-unit\" *ngFor=\"let year of years; let i = index;\" [ngClass]=\"{ 'is-selected': year.isThisYear , 'is-today': year.isToday , 'is-disabled' : !year.isSelectable}\" (click)=\"year.isSelectable && setYear(i)\">{{ year.year }}</span>\n      </div>\n    </div>\n  </div>\n</div>\n",
                providers: [
                    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => NgxModerndatepickerComponent)), multi: true }
                ],
                styles: [".ngx-moderndatepicker-position-bottom-left{top:40px;right:0}.ngx-moderndatepicker-position-bottom-right{top:40px;left:0}.ngx-moderndatepicker-position-top-left{bottom:40px;right:0}.ngx-moderndatepicker-position-top-right{bottom:40px;left:0}.ngx-moderndatepicker-container{position:relative}.ngx-moderndatepicker-container .ngx-moderndatepicker-input{padding:5px 10px;font-size:14px;width:200px;outline:0;border:1px solid #dfe3e9}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container{position:absolute;width:356px;height:230px;background:#fff;padding:10px;box-shadow:0 1px 4px 0 rgba(0,0,0,.08);border:1px solid #dfe3e9;border-radius:4px}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .topbar-container{height:10px;padding:5px 0;display:flex;align-items:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .topbar-container .main-calendar-selection-year{display:flex;width:108px;min-width:108px}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .topbar-container .main-calendar-day-names{color:#a4a9b1;width:100%;display:flex;align-items:center;font-size:12px;padding:0 5px}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .topbar-container .main-calendar-day-names .day-name-unit{width:calc(100% / 7)!important;height:30px!important;text-transform:uppercase;text-align:center;line-height:30px}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container svg{cursor:pointer}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container svg g{fill:#ced0da}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .topbar-title{color:#3d495c;font-size:15px;font-weight:400;margin:0 10px;cursor:pointer}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container{width:100%;height:100%;font-size:14px;font-weight:500;display:flex;flex-direction:row}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-month-names{display:flex;flex-flow:row wrap;width:108px;min-width:108px;padding:15px 0}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-month-names .month-name-unit{width:45px;height:30px;text-align:center;border-radius:5px;line-height:30px;cursor:pointer}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-month-names .month-name-unit span{width:35px!important;padding:2.5px 7px;border-radius:15%;height:25px!important;line-height:25px;text-align:center}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-month-names .month-name-unit span.is-this-month,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-month-names .month-name-unit span:hover{border:2px solid #1a91eb;margin:-2px}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-month-names .month-name-unit span.is-selected{background:#1a91eb;color:#fff}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-month-names .month-name-unit span.is-disabled{cursor:not-allowed;color:#a4a9b1}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-month-names .month-name-unit span.is-disabled :hover{background:0 0}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-days,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-years{padding:15px 5px;width:100%;display:inline-block;max-height:275px;overflow:auto}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit{width:calc(100% / 8)!important;height:30px!important;display:inline-flex;float:left;padding:1px;align-items:center;justify-content:center;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;color:#3d495c}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit span,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit span,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit span,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit span{width:28px!important;border-radius:15%;height:20px!important;line-height:20px;text-align:center}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit span.is-prev-month,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit span.is-prev-month,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit span.is-prev-month,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit span.is-prev-month{color:#a4a9b1}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit span.is-today,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit span:hover,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit span.is-today,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit span:hover,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit span.is-today,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit span:hover,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit span.is-today,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit span:hover{border:2px solid #1a91eb;margin:-2px}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit span.is-selected,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit span.is-selected,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit span.is-selected,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit span.is-selected{background:#1a91eb;color:#fff}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit span.is-holiday,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit span.is-weekend,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit span.is-holiday,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit span.is-weekend,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit span.is-holiday,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit span.is-weekend,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit span.is-holiday,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit span.is-weekend{background:#e0e0e0}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit span.is-disabled,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit span.is-disabled,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit span.is-disabled,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit span.is-disabled{cursor:not-allowed;color:#a4a9b1}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-days .day-unit span.is-disabled :hover,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-days .year-unit span.is-disabled :hover,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-years .day-unit span.is-disabled :hover,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit span.is-disabled :hover{background:0 0}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-years{height:210px;display:block;padding:0}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit{width:calc(100% / 3);border-radius:10px}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit.is-disabled{cursor:not-allowed;color:#a4a9b1}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit.is-disabled :hover{background:0 0}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit.is-selected{background:#1a91eb;color:#fff}.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit.is-today,.ngx-moderndatepicker-container .ngx-moderndatepicker-calendar-container .main-calendar-container .main-calendar-years .year-unit:hover{border:2px solid #1a91eb;margin:-2px}"]
            }] }
];
/** @nocollapse */
NgxModerndatepickerComponent.ctorParameters = () => [
    { type: ElementRef }
];
NgxModerndatepickerComponent.propDecorators = {
    options: [{ type: Input }],
    headless: [{ type: Input }],
    isOpened: [{ type: Input }],
    position: [{ type: Input }],
    onBlur: [{ type: HostListener, args: ['document:click', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    NgxModerndatepickerComponent.prototype.options;
    /**
     * Disable datepicker's input
     * @type {?}
     */
    NgxModerndatepickerComponent.prototype.headless;
    /**
     * Set datepicker's visibility state
     * @type {?}
     */
    NgxModerndatepickerComponent.prototype.isOpened;
    /**
     * Datepicker dropdown position
     * @type {?}
     */
    NgxModerndatepickerComponent.prototype.position;
    /**
     * @type {?}
     * @private
     */
    NgxModerndatepickerComponent.prototype.positions;
    /** @type {?} */
    NgxModerndatepickerComponent.prototype.innerValue;
    /** @type {?} */
    NgxModerndatepickerComponent.prototype.displayValue;
    /** @type {?} */
    NgxModerndatepickerComponent.prototype.displayFormat;
    /** @type {?} */
    NgxModerndatepickerComponent.prototype.date;
    /** @type {?} */
    NgxModerndatepickerComponent.prototype.barTitle;
    /** @type {?} */
    NgxModerndatepickerComponent.prototype.barTitleFormat;
    /** @type {?} */
    NgxModerndatepickerComponent.prototype.barTitleIfEmpty;
    /** @type {?} */
    NgxModerndatepickerComponent.prototype.minYear;
    /** @type {?} */
    NgxModerndatepickerComponent.prototype.maxYear;
    /** @type {?} */
    NgxModerndatepickerComponent.prototype.firstCalendarDay;
    /** @type {?} */
    NgxModerndatepickerComponent.prototype.view;
    /** @type {?} */
    NgxModerndatepickerComponent.prototype.years;
    /** @type {?} */
    NgxModerndatepickerComponent.prototype.dayNames;
    /** @type {?} */
    NgxModerndatepickerComponent.prototype.monthNames;
    /** @type {?} */
    NgxModerndatepickerComponent.prototype.dayNamesFormat;
    /** @type {?} */
    NgxModerndatepickerComponent.prototype.monthNamesFormat;
    /** @type {?} */
    NgxModerndatepickerComponent.prototype.scrollOptions;
    /** @type {?} */
    NgxModerndatepickerComponent.prototype.days;
    /** @type {?} */
    NgxModerndatepickerComponent.prototype.locale;
    /** @type {?} */
    NgxModerndatepickerComponent.prototype.placeholder;
    /** @type {?} */
    NgxModerndatepickerComponent.prototype.addClass;
    /** @type {?} */
    NgxModerndatepickerComponent.prototype.addStyle;
    /** @type {?} */
    NgxModerndatepickerComponent.prototype.fieldId;
    /** @type {?} */
    NgxModerndatepickerComponent.prototype.useEmptyBarTitle;
    /** @type {?} */
    NgxModerndatepickerComponent.prototype.disabled;
    /**
     * @type {?}
     * @private
     */
    NgxModerndatepickerComponent.prototype.onTouchedCallback;
    /**
     * @type {?}
     * @private
     */
    NgxModerndatepickerComponent.prototype.onChangeCallback;
    /**
     * @type {?}
     * @private
     */
    NgxModerndatepickerComponent.prototype.elementRef;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1vZGVybmRhdGVwaWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1vZGVybmRhdGVwaWNrZXIvIiwic291cmNlcyI6WyJsaWIvbmd4LW1vZGVybmRhdGVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBNEIsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekgsT0FBTyxFQUFFLGlCQUFpQixFQUF3QixNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFDTCxZQUFZLEVBQ1osVUFBVSxFQUNWLFNBQVMsRUFFVCxPQUFPLEVBQ1AsT0FBTyxFQUNQLE9BQU8sRUFDUCxRQUFRLEVBQ1IsT0FBTyxFQUNQLE9BQU8sRUFDUCxTQUFTLEVBQ1QsV0FBVyxFQUNYLFVBQVUsRUFDVixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxNQUFNLEVBQ04sUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEVBRVQsTUFBTSxVQUFVLENBQUM7Ozs7QUFJbEIsdUNBMEJDOzs7SUF6QkMsb0NBQWlCOztJQUNqQixvQ0FBaUI7O0lBQ2pCLDBDQUF1Qjs7SUFDdkIsMkNBQXdCOztJQUN4QiwyQ0FBd0I7O0lBQ3hCLDZDQUEwQjs7SUFDMUIsNENBQXlCOztJQUN6Qiw2Q0FBMEI7O0lBQzFCLG1DQUFnQjs7SUFDaEIsb0NBQWU7O0lBQ2Ysb0NBQWU7Ozs7O0lBRWYsd0NBQXFCOzs7OztJQUVyQixxQ0FBb0I7Ozs7O0lBRXBCLHFDQUF1Qzs7Ozs7SUFFdkMsb0NBQWlCOzs7OztJQUVqQiw2Q0FBMkI7O0lBQzNCLHdDQUF1Qjs7Ozs7SUFFdkIsd0NBQTBCOzs7O0lBS3hCLE9BQU8sR0FBRyxDQUFDOzs7Ozs7TUFNVCxLQUFLOzs7O0FBQUcsQ0FBQyxLQUErQixFQUFFLEVBQUU7SUFDaEQsT0FBTyxDQUFDLE9BQU8sS0FB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Q0FBZ0I7O0lBQ2hCLHdEQUF5Qjs7SUFDekIsNENBQWE7O0lBQ2IsNkNBQStDOztJQUMvQyxnREFBbUI7O0lBQ25CLGtEQUF1Qjs7SUFDdkIsc0RBQXVCOztJQUN2Qix3REFBeUI7O0lBQ3pCLHFEQUFtQjs7SUFDbkIsNENBV0k7O0lBQ0osOENBQWU7O0lBQ2YsbURBQW9COztJQUNwQixnREFBbUI7O0lBQ25CLGdEQUFzQzs7SUFDdEMsK0NBQWdCOztJQUNoQix3REFBMEI7O0lBQzFCLGdEQUFrQjs7Ozs7SUFFbEIseURBQWtEOzs7OztJQUNsRCx3REFBdUQ7Ozs7O0lBZTNDLGtEQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIGZvcndhcmRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIHN0YXJ0T2ZNb250aCxcbiAgZW5kT2ZNb250aCxcbiAgYWRkTW9udGhzLFxuICBzdWJNb250aHMsXG4gIHNldFllYXIsXG4gIGVhY2hEYXksXG4gIGdldERhdGUsXG4gIGdldE1vbnRoLFxuICBnZXRZZWFyLFxuICBpc1RvZGF5LFxuICBpc1NhbWVEYXksXG4gIGlzU2FtZU1vbnRoLFxuICBpc1NhbWVZZWFyLFxuICBmb3JtYXQsXG4gIGdldERheSxcbiAgc3ViRGF5cyxcbiAgc2V0RGF5LFxuICBhZGRZZWFycyxcbiAgc3ViWWVhcnMsXG4gIHNldE1vbnRoLFxuICBpc1dpdGhpblJhbmdlXG59IGZyb20gJ2RhdGUtZm5zJztcblxuZXhwb3J0IHR5cGUgQWRkQ2xhc3MgPSBzdHJpbmcgfCBzdHJpbmdbXSB8IHsgW2s6IHN0cmluZ106IGJvb2xlYW4gfSB8IG51bGw7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0ZXBpY2tlck9wdGlvbnMge1xuICBtaW5ZZWFyPzogbnVtYmVyOyAvLyBkZWZhdWx0OiBjdXJyZW50IHllYXIgLSAzMFxuICBtYXhZZWFyPzogbnVtYmVyOyAvLyBkZWZhdWx0OiBjdXJyZW50IHllYXIgKyAzMFxuICBkaXNwbGF5Rm9ybWF0Pzogc3RyaW5nOyAvLyBkZWZhdWx0OiAnTU1NIERbLF0gWVlZWSdcbiAgYmFyVGl0bGVGb3JtYXQ/OiBzdHJpbmc7IC8vIGRlZmF1bHQ6ICdNTU1NIFlZWVknXG4gIGRheU5hbWVzRm9ybWF0Pzogc3RyaW5nOyAvLyBkZWZhdWx0ICdkZGQnXG4gIG1vbnRoTmFtZXNGb3JtYXQ/OiBzdHJpbmc7IC8vIGRlZmF1bHQgJ01NTSdcbiAgYmFyVGl0bGVJZkVtcHR5Pzogc3RyaW5nO1xuICBmaXJzdENhbGVuZGFyRGF5PzogbnVtYmVyOyAvLyAwID0gU3VuZGF5IChkZWZhdWx0KSwgMSA9IE1vbmRheSwgLi5cbiAgbG9jYWxlPzogb2JqZWN0O1xuICBtaW5EYXRlPzogRGF0ZTtcbiAgbWF4RGF0ZT86IERhdGU7XG4gIC8qKiBQbGFjZWhvbGRlciBmb3IgdGhlIGlucHV0IGZpZWxkICovXG4gIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xuICAvKiogW25nQ2xhc3NdIHRvIGFkZCB0byB0aGUgaW5wdXQgZmllbGQgKi9cbiAgYWRkQ2xhc3M/OiBBZGRDbGFzcztcbiAgLyoqIFtuZ1N0eWxlXSB0byBhZGQgdG8gdGhlIGlucHV0IGZpZWxkICovXG4gIGFkZFN0eWxlPzogeyBbazogc3RyaW5nXTogYW55IH0gfCBudWxsO1xuICAvKiogSUQgdG8gYXNzaWduIHRvIHRoZSBpbnB1dCBmaWVsZCAqL1xuICBmaWVsZElkPzogc3RyaW5nO1xuICAvKiogSWYgZmFsc2UsIGJhclRpdGxlSWZFbXB0eSB3aWxsIGJlIGRpc3JlZ2FyZGVkIGFuZCBhIGRhdGUgd2lsbCBhbHdheXMgYmUgc2hvd24uIERlZmF1bHQ6IHRydWUgKi9cbiAgdXNlRW1wdHlCYXJUaXRsZT86IGJvb2xlYW47XG4gIHdlZWtlbmRzRGF5PzogbnVtYmVyW107XG4gICAvKiogU3VuZGF5IGlzIDAgLCBIaWdobGlnaHRzIHRoZSB3ZWVrZW5kcyB3aXRoIGdyYXkgYmFja2dyb3VuZCoqL1xuICBob2xpZGF5TGlzdD86IEFycmF5PERhdGU+O1xuICAvKiogTGlzdCBvZiBIb2xpZGF5cyAqKi9cbn1cblxuLy8gQ291bnRlciBmb3IgY2FsY3VsYXRpbmcgdGhlIGF1dG8taW5jcmVtZW50aW5nIGZpZWxkIElEXG5sZXQgY291bnRlciA9IDA7XG5cbi8qKlxuICogSW50ZXJuYWwgbGlicmFyeSBoZWxwZXIgdGhhdCBoZWxwcyB0byBjaGVjayBpZiB2YWx1ZSBpcyBlbXB0eVxuICogQHBhcmFtIHZhbHVlXG4gKi9cbmNvbnN0IGlzTmlsID0gKHZhbHVlOiBEYXRlIHwgRGF0ZXBpY2tlck9wdGlvbnMpID0+IHtcbiAgcmV0dXJuICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB8fCAodmFsdWUgPT09IG51bGwpO1xufTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LW1vZGVybmRhdGVwaWNrZXInLFxuICB0ZW1wbGF0ZVVybDogJ25neC1tb2Rlcm5kYXRlcGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ25neC1tb2Rlcm5kYXRlcGlja2VyLmNvbXBvbmVudC5zY3NzJ10sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5neE1vZGVybmRhdGVwaWNrZXJDb21wb25lbnQpLCBtdWx0aTogdHJ1ZSB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4TW9kZXJuZGF0ZXBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5ASW5wdXQoKSBvcHRpb25zOiBEYXRlcGlja2VyT3B0aW9ucztcblxuICAvKipcbiAgICogRGlzYWJsZSBkYXRlcGlja2VyJ3MgaW5wdXRcbiAgICovXG4gIEBJbnB1dCgpIGhlYWRsZXNzID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFNldCBkYXRlcGlja2VyJ3MgdmlzaWJpbGl0eSBzdGF0ZVxuICAgKi9cbiAgQElucHV0KCkgaXNPcGVuZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogRGF0ZXBpY2tlciBkcm9wZG93biBwb3NpdGlvblxuICAgKi9cbiAgQElucHV0KCkgcG9zaXRpb24gPSAnYm90dG9tLXJpZ2h0JztcblxuICBwcml2YXRlIHBvc2l0aW9ucyA9IFsnYm90dG9tLWxlZnQnLCAnYm90dG9tLXJpZ2h0JywgJ3RvcC1sZWZ0JywgJ3RvcC1yaWdodCddO1xuXG4gIGlubmVyVmFsdWU6IERhdGU7XG4gIGRpc3BsYXlWYWx1ZTogc3RyaW5nO1xuICBkaXNwbGF5Rm9ybWF0OiBzdHJpbmc7XG4gIGRhdGU6IERhdGU7XG4gIGJhclRpdGxlOiBzdHJpbmc7XG4gIGJhclRpdGxlRm9ybWF0OiBzdHJpbmc7XG4gIGJhclRpdGxlSWZFbXB0eTogc3RyaW5nO1xuICBtaW5ZZWFyOiBudW1iZXI7XG4gIG1heFllYXI6IG51bWJlcjtcbiAgZmlyc3RDYWxlbmRhckRheTogbnVtYmVyO1xuICB2aWV3OiBzdHJpbmc7XG4gIHllYXJzOiB7IHllYXI6IG51bWJlcjsgaXNUaGlzWWVhcjogYm9vbGVhbiB9W107XG4gIGRheU5hbWVzOiBzdHJpbmdbXTtcbiAgbW9udGhOYW1lczogQXJyYXk8YW55PjtcbiAgZGF5TmFtZXNGb3JtYXQ6IHN0cmluZztcbiAgbW9udGhOYW1lc0Zvcm1hdDogc3RyaW5nO1xuICBzY3JvbGxPcHRpb25zOiBhbnk7XG4gIGRheXM6IHtcbiAgICBkYXRlOiBEYXRlO1xuICAgIGRheTogbnVtYmVyO1xuICAgIG1vbnRoOiBudW1iZXI7XG4gICAgeWVhcjogbnVtYmVyO1xuICAgIGluVGhpc01vbnRoOiBib29sZWFuO1xuICAgIGlzVG9kYXk6IGJvb2xlYW47XG4gICAgaXNTZWxlY3RlZDogYm9vbGVhbjtcbiAgICBpc1NlbGVjdGFibGU6IGJvb2xlYW47XG4gICAgaXNXZWVrZW5kOiBib29sZWFuO1xuICAgIGlzSG9saWRheTogYm9vbGVhbjtcbiAgfVtdO1xuICBsb2NhbGU6IG9iamVjdDtcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgYWRkQ2xhc3M6IEFkZENsYXNzO1xuICBhZGRTdHlsZTogeyBbazogc3RyaW5nXTogYW55IH0gfCBudWxsO1xuICBmaWVsZElkOiBzdHJpbmc7XG4gIHVzZUVtcHR5QmFyVGl0bGU6IGJvb2xlYW47XG4gIGRpc2FibGVkOiBib29sZWFuO1xuXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSAoKSA9PiB7IH07XG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9ICgpID0+IHsgfTtcblxuICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gIH1cblxuICBnZXQgdmFsdWUoKTogRGF0ZSB7XG4gICAgcmV0dXJuIHRoaXMuaW5uZXJWYWx1ZTtcbiAgfVxuXG4gIHNldCB2YWx1ZSh2YWw6IERhdGUpIHtcbiAgICB0aGlzLmlubmVyVmFsdWUgPSB2YWw7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuaW5uZXJWYWx1ZSk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLnNjcm9sbE9wdGlvbnMgPSB7XG4gICAgICBiYXJCYWNrZ3JvdW5kOiAnI0RGRTNFOScsXG4gICAgICBncmlkQmFja2dyb3VuZDogJyNGRkZGRkYnLFxuICAgICAgYmFyQm9yZGVyUmFkaXVzOiAnMycsXG4gICAgICBncmlkQm9yZGVyUmFkaXVzOiAnMycsXG4gICAgICBiYXJXaWR0aDogJzYnLFxuICAgICAgZ3JpZFdpZHRoOiAnNicsXG4gICAgICBiYXJNYXJnaW46ICcwJyxcbiAgICAgIGdyaWRNYXJnaW46ICcwJ1xuICAgIH07XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnZpZXcgPSAneWVhcic7XG4gICAgdGhpcy5kYXRlID0gbmV3IERhdGUoKTtcbiAgICB0aGlzLnNldE9wdGlvbnMoKTtcbiAgICB0aGlzLmluaXREYXlOYW1lcygpO1xuICAgIHRoaXMuaW5pdFllYXJzKCk7XG4gICAgdGhpcy5pbml0TW9udGhOYW1lKCk7XG5cbiAgICAvLyBDaGVjayBpZiAncG9zaXRpb24nIHByb3BlcnR5IGlzIGNvcnJlY3RcbiAgICBpZiAodGhpcy5wb3NpdGlvbnMuaW5kZXhPZih0aGlzLnBvc2l0aW9uKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYG5nLW1vZGVybmRhdGVwaWNrZXI6IGludmFsaWQgcG9zaXRpb24gcHJvcGVydHkgdmFsdWUgJyR7dGhpcy5wb3NpdGlvbn0nIChleHBlY3RlZDogJHt0aGlzLnBvc2l0aW9ucy5qb2luKCcsICcpfSlgKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCdvcHRpb25zJyBpbiBjaGFuZ2VzKSB7XG4gICAgICB0aGlzLnNldE9wdGlvbnMoKTtcbiAgICAgIHRoaXMuaW5pdERheU5hbWVzKCk7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICAgIHRoaXMuaW5pdFllYXJzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGRlZmF1bHRGaWVsZElkKCk6IHN0cmluZyB7XG4gICAgLy8gT25seSBldmFsdWF0ZSBhbmQgaW5jcmVtZW50IGlmIHJlcXVpcmVkXG4gICAgY29uc3QgdmFsdWUgPSBgZGF0ZXBpY2tlci0ke2NvdW50ZXIrK31gO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnZGVmYXVsdEZpZWxkSWQnLCB7dmFsdWV9KTtcblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHNldE9wdGlvbnMoKTogdm9pZCB7XG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpOyAvLyB0aGlzIGNvbnN0IHdhcyBhZGRlZCBiZWNhdXNlIGR1cmluZyBteSB0ZXN0cywgSSBub3RpY2VkIHRoYXQgYXQgdGhpcyBsZXZlbCB0aGlzLmRhdGUgaXMgdW5kZWZpbmVkXG4gICAgdGhpcy5taW5ZZWFyID0gdGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5taW5ZZWFyIHx8IGdldFllYXIodG9kYXkpIC0gMzA7XG4gICAgdGhpcy5tYXhZZWFyID0gdGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5tYXhZZWFyIHx8IGdldFllYXIodG9kYXkpICsgMzA7XG4gICAgdGhpcy5kaXNwbGF5Rm9ybWF0ID0gdGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5kaXNwbGF5Rm9ybWF0IHx8ICdNTU0gRFssXSBZWVlZJztcbiAgICB0aGlzLmJhclRpdGxlRm9ybWF0ID0gdGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5iYXJUaXRsZUZvcm1hdCB8fCAnWVlZWSc7XG4gICAgdGhpcy5kYXlOYW1lc0Zvcm1hdCA9IHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuZGF5TmFtZXNGb3JtYXQgfHwgJ2RkZCc7XG4gICAgdGhpcy5tb250aE5hbWVzRm9ybWF0ID0gdGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5tb250aE5hbWVzRm9ybWF0IHx8ICdNTU0nO1xuICAgIHRoaXMuYmFyVGl0bGVJZkVtcHR5ID0gdGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5iYXJUaXRsZUlmRW1wdHkgfHwgJ0NsaWNrIHRvIHNlbGVjdCBhIGRhdGUnO1xuICAgIHRoaXMuZmlyc3RDYWxlbmRhckRheSA9IHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuZmlyc3RDYWxlbmRhckRheSB8fCAwO1xuICAgIHRoaXMubG9jYWxlID0gdGhpcy5vcHRpb25zICYmIHsgbG9jYWxlOiB0aGlzLm9wdGlvbnMubG9jYWxlIH0gfHwge307XG4gICAgdGhpcy5wbGFjZWhvbGRlciA9IHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMucGxhY2Vob2xkZXIgfHwgJyc7XG4gICAgdGhpcy5hZGRDbGFzcyA9IHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuYWRkQ2xhc3MgfHwge307XG4gICAgdGhpcy5hZGRTdHlsZSA9IHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuYWRkU3R5bGUgfHwge307XG4gICAgdGhpcy5maWVsZElkID0gdGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5maWVsZElkIHx8IHRoaXMuZGVmYXVsdEZpZWxkSWQ7XG4gICAgdGhpcy51c2VFbXB0eUJhclRpdGxlID0gdGhpcy5vcHRpb25zICYmICd1c2VFbXB0eUJhclRpdGxlJyBpbiB0aGlzLm9wdGlvbnMgPyB0aGlzLm9wdGlvbnMudXNlRW1wdHlCYXJUaXRsZSA6IHRydWU7XG4gIH1cblxuICBuZXh0WWVhcigpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGUgPSBhZGRZZWFycyh0aGlzLmRhdGUsIDEpO1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMuaW5pdE1vbnRoTmFtZSgpO1xuXG4gIH1cblxuICBwcmV2WWVhcigpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGUgPSBzdWJZZWFycyh0aGlzLmRhdGUsIDEpO1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMuaW5pdE1vbnRoTmFtZSgpO1xuXG4gIH1cblxuICBzZXREYXRlKGk6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZGF0ZSA9IHRoaXMuZGF5c1tpXS5kYXRlO1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLmRhdGU7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgc2V0WWVhcihpOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGUgPSBzZXRZZWFyKHRoaXMuZGF0ZSwgdGhpcy55ZWFyc1tpXS55ZWFyKTtcbiAgICB0aGlzLmluaXQoKTtcbiAgICB0aGlzLnZpZXcgPSAneWVhcic7XG4gIH1cblxuICBzZWxlY3RNb250aChpOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGUgPSBzZXRNb250aCh0aGlzLmRhdGUsaSk7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy5pbml0TW9udGhOYW1lKCk7XG4gICAgdGhpcy52aWV3ID0gJ3llYXInO1xuICB9XG4gIC8qKlxuICAgKiBDaGVja3MgaWYgc3BlY2lmaWVkIGRhdGUgaXMgaW4gcmFuZ2Ugb2YgbWluIGFuZCBtYXggZGF0ZXNcbiAgICogQHBhcmFtIGRhdGVcbiAgICovXG4gIHByaXZhdGUgaXNEYXRlU2VsZWN0YWJsZShkYXRlOiBEYXRlKTogYm9vbGVhbiB7XG4gICAgaWYgKGlzTmlsKHRoaXMub3B0aW9ucykpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IG1pbkRhdGVTZXQgPSAhaXNOaWwodGhpcy5vcHRpb25zLm1pbkRhdGUpO1xuICAgIGNvbnN0IG1heERhdGVTZXQgPSAhaXNOaWwodGhpcy5vcHRpb25zLm1heERhdGUpO1xuXG4gICAgY29uc3QgdGltZXN0YW1wID0gZGF0ZS52YWx1ZU9mKCk7XG5cbiAgICBpZiAobWluRGF0ZVNldCAmJiAodGltZXN0YW1wIDwgdGhpcy5vcHRpb25zLm1pbkRhdGUudmFsdWVPZigpKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChtYXhEYXRlU2V0ICYmICh0aW1lc3RhbXAgPiB0aGlzLm9wdGlvbnMubWF4RGF0ZS52YWx1ZU9mKCkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcml2YXRlIGlzV2Vla2VuZERheSAoZGF0ZTogRGF0ZSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHdlZWtlbmRzRGF5ID0gQXJyYXkuaXNBcnJheSh0aGlzLm9wdGlvbnMud2Vla2VuZHNEYXkpO1xuICAgIGlmKHdlZWtlbmRzRGF5KSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLndlZWtlbmRzRGF5LmluZGV4T2YoZ2V0RGF5KGRhdGUpKSAhPSAtMSA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIGlzSG9saWRheSAoZGF0ZTogRGF0ZSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGFyZUhvbGlkYXlzID0gQXJyYXkuaXNBcnJheSh0aGlzLm9wdGlvbnMuaG9saWRheUxpc3QpO1xuICAgIGlmKGFyZUhvbGlkYXlzKSB7XG4gICAgICByZXR1cm4gKHRoaXMub3B0aW9ucy5ob2xpZGF5TGlzdC5maWx0ZXIoKGRheSk9PiBpc1NhbWVEYXkoZGF5LGRhdGUpKSkubGVuZ3RoID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgLy8gdGhpcy5kYXRlIG1heSBiZSBudWxsIGFmdGVyIC5yZXNldCgpOyBmYWxsIGJhY2sgdG8gY3VycmVudCBkYXRlLlxuICAgIGNvbnN0IGFjdHVhbERhdGUgPSB0aGlzLmRhdGUgfHwgbmV3IERhdGUoKTtcbiAgICBjb25zdCBzdGFydCA9IHN0YXJ0T2ZNb250aChhY3R1YWxEYXRlKTtcbiAgICBjb25zdCBlbmQgPSBlbmRPZk1vbnRoKGFjdHVhbERhdGUpO1xuXG4gICAgdGhpcy5kYXlzID0gZWFjaERheShzdGFydCwgZW5kKS5tYXAoZGF0ZSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkYXRlOiBkYXRlLFxuICAgICAgICBkYXk6IGdldERhdGUoZGF0ZSksXG4gICAgICAgIG1vbnRoOiBnZXRNb250aChkYXRlKSxcbiAgICAgICAgeWVhcjogZ2V0WWVhcihkYXRlKSxcbiAgICAgICAgaW5UaGlzTW9udGg6IHRydWUsXG4gICAgICAgIGlzVG9kYXk6IGlzVG9kYXkoZGF0ZSksXG4gICAgICAgIGlzU2VsZWN0ZWQ6IGlzU2FtZURheShkYXRlLCB0aGlzLmlubmVyVmFsdWUpICYmIGlzU2FtZU1vbnRoKGRhdGUsIHRoaXMuaW5uZXJWYWx1ZSkgJiYgaXNTYW1lWWVhcihkYXRlLCB0aGlzLmlubmVyVmFsdWUpLFxuICAgICAgICBpc1NlbGVjdGFibGU6IHRoaXMuaXNEYXRlU2VsZWN0YWJsZShkYXRlKSxcbiAgICAgICAgaXNXZWVrZW5kOiB0aGlzLmlzV2Vla2VuZERheShkYXRlKSxcbiAgICAgICAgaXNIb2xpZGF5OiB0aGlzLmlzSG9saWRheShkYXRlKVxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHRtcCA9IGdldERheShzdGFydCkgLSB0aGlzLmZpcnN0Q2FsZW5kYXJEYXk7XG4gICAgY29uc3QgcHJldkRheXMgPSB0bXAgPCAwID8gNyAtIHRoaXMuZmlyc3RDYWxlbmRhckRheSA6IHRtcDtcblxuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHByZXZEYXlzOyBpKyspIHtcbiAgICAgIGNvbnN0IGRhdGUgPSBzdWJEYXlzKHN0YXJ0LCBpKTtcbiAgICAgIHRoaXMuZGF5cy51bnNoaWZ0KHtcbiAgICAgICAgZGF0ZTogZGF0ZSxcbiAgICAgICAgZGF5OiBnZXREYXRlKGRhdGUpLFxuICAgICAgICBtb250aDogZ2V0TW9udGgoZGF0ZSksXG4gICAgICAgIHllYXI6IGdldFllYXIoZGF0ZSksXG4gICAgICAgIGluVGhpc01vbnRoOiBmYWxzZSxcbiAgICAgICAgaXNUb2RheTogaXNUb2RheShkYXRlKSxcbiAgICAgICAgaXNTZWxlY3RlZDogaXNTYW1lRGF5KGRhdGUsIHRoaXMuaW5uZXJWYWx1ZSkgJiYgaXNTYW1lTW9udGgoZGF0ZSwgdGhpcy5pbm5lclZhbHVlKSAmJiBpc1NhbWVZZWFyKGRhdGUsIHRoaXMuaW5uZXJWYWx1ZSksXG4gICAgICAgIGlzU2VsZWN0YWJsZTogdGhpcy5pc0RhdGVTZWxlY3RhYmxlKGRhdGUpLFxuICAgICAgICBpc1dlZWtlbmQgOiB0aGlzLmlzV2Vla2VuZERheShkYXRlKSxcbiAgICAgICAgaXNIb2xpZGF5OiB0aGlzLmlzSG9saWRheShkYXRlKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSBmb3JtYXQodGhpcy5pbm5lclZhbHVlLCB0aGlzLmRpc3BsYXlGb3JtYXQsIHRoaXMubG9jYWxlKTtcbiAgICAgIHRoaXMuYmFyVGl0bGUgPSBmb3JtYXQoc3RhcnQsIHRoaXMuYmFyVGl0bGVGb3JtYXQsIHRoaXMubG9jYWxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSAnJztcbiAgICAgIHRoaXMuYmFyVGl0bGUgPSB0aGlzLnVzZUVtcHR5QmFyVGl0bGUgPyB0aGlzLmJhclRpdGxlSWZFbXB0eSA6IGZvcm1hdChzdGFydCwgdGhpcy5iYXJUaXRsZUZvcm1hdCwgdGhpcy5sb2NhbGUpO1xuICAgIH1cbiAgfVxuXG4gIGluaXRZZWFycygpOiB2b2lkIHtcbiAgICBjb25zdCByYW5nZSA9IHRoaXMubWF4WWVhciAtIHRoaXMubWluWWVhcjtcbiAgICB0aGlzLnllYXJzID0gQXJyYXkuZnJvbShuZXcgQXJyYXkocmFuZ2UpLCAoeCwgaSkgPT4gaSArIHRoaXMubWluWWVhcikubWFwKHllYXIgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgeWVhcjogeWVhcixcbiAgICAgICAgaXNUaGlzWWVhcjogeWVhciA9PT0gZ2V0WWVhcih0aGlzLmRhdGUpLFxuICAgICAgICBpc1RvZGF5IDogeWVhciA9PT0gZ2V0WWVhcihuZXcgRGF0ZSgpKSxcbiAgICAgICAgaXNTZWxlY3RhYmxlOiB0aGlzLmlzWWVhclNlbGVjdGFibGUoeWVhcilcbiAgICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgaXNZZWFyU2VsZWN0YWJsZShkYXRlOiBhbnkpIDogYm9vbGVhbiB7XG4gICAgIGNvbnN0IG1pbkRhdGUgPSBpc05pbCh0aGlzLm9wdGlvbnMubWluRGF0ZSkgPyBmYWxzZSA6IHRoaXMub3B0aW9ucy5taW5EYXRlO1xuICAgICBjb25zdCBtYXhEYXRlID0gaXNOaWwodGhpcy5vcHRpb25zLm1heERhdGUpID8gZmFsc2UgOiB0aGlzLm9wdGlvbnMubWF4RGF0ZTtcblxuICAgICBpZiAoIG1pbkRhdGUgJiYgbWF4RGF0ZSApIHtcbiAgICAgICByZXR1cm4gbWluRGF0ZS5nZXRGdWxsWWVhcigpIDw9IGRhdGUgJiYgZGF0ZSA8PSBtYXhEYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgIH0gZWxzZSBpZiAobWluRGF0ZSkge1xuICAgICAgIHJldHVybiAgbWluRGF0ZS5nZXRGdWxsWWVhcigpIDw9IGRhdGU7XG4gICAgIH0gZWxzZSBpZiAobWF4RGF0ZSkge1xuICAgICAgICByZXR1cm4gIGRhdGUgPD0gbWF4RGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICB9XG4gICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaW5pdERheU5hbWVzKCk6IHZvaWQge1xuICAgIHRoaXMuZGF5TmFtZXMgPSBbXTtcbiAgICBjb25zdCBzdGFydCA9IHRoaXMuZmlyc3RDYWxlbmRhckRheTtcbiAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPD0gNiArIHN0YXJ0OyBpKyspIHtcbiAgICAgIGNvbnN0IGRhdGUgPSBzZXREYXkobmV3IERhdGUoKSwgaSk7XG4gICAgICB0aGlzLmRheU5hbWVzLnB1c2goZm9ybWF0KGRhdGUsIHRoaXMuZGF5TmFtZXNGb3JtYXQsIHRoaXMubG9jYWxlKSk7XG4gICAgfVxuICB9XG5cbiAgaW5pdE1vbnRoTmFtZSgpOiB2b2lkIHtcbiAgICBsZXQgbW9udGhOYW1lcyA9IFtdO1xuICAgIGxldCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKHRoaXMuZGF0ZSk7XG4gICAgY29uc3Qgc3RhcnQgPSBzdWJZZWFycyhjdXJyZW50RGF0ZS5zZXRNb250aCgxMSksMSk7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMTIgOyBpKyspIHtcbiAgICAgIGNvbnN0IGRhdGUgPSBhZGRNb250aHMoc3RhcnQsIGkpO1xuICAgICAgbW9udGhOYW1lcy5wdXNoKHtcbiAgICAgICAgbmFtZTogZm9ybWF0KGRhdGUsIHRoaXMubW9udGhOYW1lc0Zvcm1hdCwgdGhpcy5sb2NhbGUpLFxuICAgICAgICBpc1NlbGVjdGVkOiBkYXRlLmdldE1vbnRoKCkgPT09IHRoaXMuZGF0ZS5nZXRNb250aCgpLFxuICAgICAgICBpc1RoaXNNb250aDogaXNTYW1lTW9udGgoZGF0ZSxuZXcgRGF0ZSgpKSAmJiBpc1NhbWVZZWFyKHRoaXMuZGF0ZSxuZXcgRGF0ZSgpKSxcbiAgICAgICAgaXNTZWxlY3RhYmxlOiB0aGlzLmlzTW9udGhTZWxlY3RhYmxlKGRhdGUpXG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5tb250aE5hbWVzID0gbW9udGhOYW1lcztcbiAgfVxuXG4gIHByaXZhdGUgaXNNb250aFNlbGVjdGFibGUoZGF0ZTogRGF0ZSk6IGJvb2xlYW4ge1xuXG4gICAgICBjb25zdCBtaW5EYXRlID0gaXNOaWwodGhpcy5vcHRpb25zLm1pbkRhdGUpID8gZmFsc2UgOiB0aGlzLm9wdGlvbnMubWluRGF0ZTtcbiAgICAgIGNvbnN0IG1heERhdGUgPSBpc05pbCh0aGlzLm9wdGlvbnMubWF4RGF0ZSkgPyBmYWxzZSA6IHRoaXMub3B0aW9ucy5tYXhEYXRlO1xuXG4gICAgICBpZiAoIG1pbkRhdGUgJiYgbWF4RGF0ZSApIHtcbiAgICAgICAgaWYobWluRGF0ZS5nZXRGdWxsWWVhcigpIDwgZGF0ZS5nZXRGdWxsWWVhcigpICYmIGRhdGUuZ2V0RnVsbFllYXIoKSA8IG1heERhdGUuZ2V0RnVsbFllYXIoKSl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChtaW5EYXRlLmdldEZ1bGxZZWFyKCkgPCBkYXRlLmdldEZ1bGxZZWFyKCkgJiYgZGF0ZS5nZXRGdWxsWWVhcigpID09IG1heERhdGUuZ2V0RnVsbFllYXIoKSl7XG4gICAgICAgICAgICBpZihkYXRlLmdldE1vbnRoKCkgPD0gbWF4RGF0ZS5nZXRNb250aCgpKXtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGVsc2UgeyByZXR1cm4gZmFsc2U7fVxuICAgICAgICB9IGVsc2UgaWYgKG1pbkRhdGUuZ2V0RnVsbFllYXIoKSA9PSBkYXRlLmdldEZ1bGxZZWFyKCkgJiYgZGF0ZS5nZXRGdWxsWWVhcigpIDwgbWF4RGF0ZS5nZXRGdWxsWWVhcigpKXtcbiAgICAgICAgICAgIGlmKG1pbkRhdGUuZ2V0TW9udGgoKSA8PSBkYXRlLmdldE1vbnRoKCkpe1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7IHJldHVybiBmYWxzZTt9XG4gICAgICAgIH0gZWxzZSBpZiAobWluRGF0ZS5nZXRGdWxsWWVhcigpID09IGRhdGUuZ2V0RnVsbFllYXIoKSAmJiBkYXRlLmdldEZ1bGxZZWFyKCkgPT0gbWF4RGF0ZS5nZXRGdWxsWWVhcigpKXtcbiAgICAgICAgICAgIGlmKG1pbkRhdGUuZ2V0TW9udGgoKSA8PSBkYXRlLmdldE1vbnRoKCkgJiYgZGF0ZS5nZXRNb250aCgpIDw9IG1heERhdGUuZ2V0TW9udGgoKSl7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHsgcmV0dXJuIGZhbHNlO31cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobWluRGF0ZSkge1xuICAgICAgICBpZihtaW5EYXRlLmdldEZ1bGxZZWFyKCkgPCBkYXRlLmdldEZ1bGxZZWFyKCkpe1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAobWluRGF0ZS5nZXRGdWxsWWVhcigpID09IGRhdGUuZ2V0RnVsbFllYXIoKSl7XG4gICAgICAgICAgICBpZihtaW5EYXRlLmdldE1vbnRoKCkgPD0gZGF0ZS5nZXRNb250aCgpKXtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGVsc2UgeyByZXR1cm4gZmFsc2U7fVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChtYXhEYXRlKSB7XG4gICAgICAgICBpZihkYXRlLmdldEZ1bGxZZWFyKCkgPCBtYXhEYXRlLmdldEZ1bGxZZWFyKCkpe1xuICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgfSBlbHNlIGlmIChkYXRlLmdldEZ1bGxZZWFyKCkgPT0gbWF4RGF0ZS5nZXRGdWxsWWVhcigpKXtcbiAgICAgICAgICAgICBpZihkYXRlLmdldE1vbnRoKCkgPD0gbWF4RGF0ZS5nZXRNb250aCgpKXtcbiAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgIH0gZWxzZSB7IHJldHVybiBmYWxzZTt9XG4gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICB9XG4gICAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHRvZ2dsZVZpZXcoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3ID0gdGhpcy52aWV3ID09PSAneWVhcicgPyAneWVhcnMnIDogJ3llYXInO1xuICB9XG5cbiAgdG9nZ2xlKCk6IHZvaWQge1xuICAgIHRoaXMuaXNPcGVuZWQgPSAhdGhpcy5pc09wZW5lZDtcblxuICAgIGlmICghdGhpcy5pc09wZW5lZCAmJiB0aGlzLnZpZXcgPT09ICd5ZWFycycpIHtcbiAgICAgIHRoaXMudG9nZ2xlVmlldygpO1xuICAgIH1cbiAgfVxuXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuaXNPcGVuZWQgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLnZpZXcgPT09ICd5ZWFycycpIHtcbiAgICAgIHRoaXMudG9nZ2xlVmlldygpO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0KGZpcmVWYWx1ZUNoYW5nZUV2ZW50ID0gZmFsc2UpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGUgPSBudWxsO1xuICAgIHRoaXMuaW5uZXJWYWx1ZSA9IG51bGw7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgaWYgKGZpcmVWYWx1ZUNoYW5nZUV2ZW50ICYmIHRoaXMub25DaGFuZ2VDYWxsYmFjaykge1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuaW5uZXJWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWw6IERhdGUpIHtcbiAgICBpZiAodmFsKSB7XG4gICAgICB0aGlzLmRhdGUgPSB2YWw7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2YWw7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICAgIHRoaXMuZGlzcGxheVZhbHVlID0gZm9ybWF0KHRoaXMuaW5uZXJWYWx1ZSwgdGhpcy5kaXNwbGF5Rm9ybWF0LCB0aGlzLmxvY2FsZSk7XG4gICAgICB0aGlzLmJhclRpdGxlID0gZm9ybWF0KHN0YXJ0T2ZNb250aCh2YWwpLCB0aGlzLmJhclRpdGxlRm9ybWF0LCB0aGlzLmxvY2FsZSk7XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKSBvbkJsdXIoZTogTW91c2VFdmVudCkge1xuICAgIGlmICghdGhpcy5pc09wZW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGlucHV0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5neC1tb2Rlcm5kYXRlcGlja2VyLWlucHV0Jyk7XG5cbiAgICBpZiAoaW5wdXQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlLnRhcmdldCA9PT0gaW5wdXQgfHwgaW5wdXQuY29udGFpbnMoPGFueT5lLnRhcmdldCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmd4LW1vZGVybmRhdGVwaWNrZXItY2FsZW5kYXItY29udGFpbmVyJyk7XG4gICAgaWYgKGNvbnRhaW5lciAmJiBjb250YWluZXIgIT09IGUudGFyZ2V0ICYmICFjb250YWluZXIuY29udGFpbnMoPGFueT5lLnRhcmdldCkgJiYgISg8YW55PmUudGFyZ2V0KS5jbGFzc0xpc3QuY29udGFpbnMoJ3llYXItdW5pdCcpICYmICEoPGFueT5lLnRhcmdldCkuY2xhc3NMaXN0LmNvbnRhaW5zKCdtb250aC11bml0JykpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==