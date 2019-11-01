import { Injectable, ɵɵdefineInjectable, Component, forwardRef, ElementRef, Input, HostListener, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { getYear, addYears, subYears, setYear, setMonth, getDay, isSameDay, startOfMonth, endOfMonth, eachDay, getDate, getMonth, isToday, isSameMonth, isSameYear, subDays, format, setDay, addMonths } from 'date-fns';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxModerndatepickerService {
    constructor() { }
}
NgxModerndatepickerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NgxModerndatepickerService.ctorParameters = () => [];
/** @nocollapse */ NgxModerndatepickerService.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgxModerndatepickerService_Factory() { return new NgxModerndatepickerService(); }, token: NgxModerndatepickerService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function DatepickerOptions() { }
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
class NgxModerndatepickerComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxModerndatepickerModule {
}
NgxModerndatepickerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgxModerndatepickerComponent],
                imports: [
                    CommonModule,
                    BrowserModule,
                    FormsModule
                ],
                exports: [NgxModerndatepickerComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgxModerndatepickerComponent, NgxModerndatepickerModule, NgxModerndatepickerService };
//# sourceMappingURL=ngx-moderndatepicker.js.map
