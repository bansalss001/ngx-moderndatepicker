import { OnInit, SimpleChanges, ElementRef } from '@angular/core';
export declare type AddClass = string | string[] | {
    [k: string]: boolean;
} | null;
export interface DatepickerOptions {
    minYear?: number;
    maxYear?: number;
    displayFormat?: string;
    barTitleFormat?: string;
    dayNamesFormat?: string;
    monthNamesFormat?: string;
    barTitleIfEmpty?: string;
    firstCalendarDay?: number;
    locale?: object;
    minDate?: Date;
    maxDate?: Date;
    /** Placeholder for the input field */
    placeholder?: string;
    /** [ngClass] to add to the input field */
    addClass?: AddClass;
    /** [ngStyle] to add to the input field */
    addStyle?: {
        [k: string]: any;
    } | null;
    /** ID to assign to the input field */
    fieldId?: string;
    /** If false, barTitleIfEmpty will be disregarded and a date will always be shown. Default: true */
    useEmptyBarTitle?: boolean;
    weekendsDay?: number[];
    /** Sunday is 0 , Highlights the weekends with gray background**/
    holidayList?: Array<Date>;
}
export declare class NgxModerndatepickerComponent implements OnInit {
    private elementRef;
    options: DatepickerOptions;
    /**
     * Disable datepicker's input
     */
    headless: boolean;
    /**
     * Set datepicker's visibility state
     */
    isOpened: boolean;
    /**
     * Datepicker dropdown position
     */
    position: string;
    private positions;
    innerValue: Date;
    displayValue: string;
    displayFormat: string;
    date: Date;
    barTitle: string;
    barTitleFormat: string;
    barTitleIfEmpty: string;
    minYear: number;
    maxYear: number;
    firstCalendarDay: number;
    view: string;
    years: {
        year: number;
        isThisYear: boolean;
    }[];
    dayNames: string[];
    monthNames: Array<any>;
    dayNamesFormat: string;
    monthNamesFormat: string;
    scrollOptions: any;
    days: {
        date: Date;
        day: number;
        month: number;
        year: number;
        inThisMonth: boolean;
        isToday: boolean;
        isSelected: boolean;
        isSelectable: boolean;
        isWeekend: boolean;
        isHoliday: boolean;
    }[];
    locale: object;
    placeholder: string;
    addClass: AddClass;
    addStyle: {
        [k: string]: any;
    } | null;
    fieldId: string;
    useEmptyBarTitle: boolean;
    disabled: boolean;
    private onTouchedCallback;
    private onChangeCallback;
    setDisabledState(isDisabled: boolean): void;
    value: Date;
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    readonly defaultFieldId: string;
    setOptions(): void;
    nextYear(): void;
    prevYear(): void;
    setDate(i: number): void;
    setYear(i: number): void;
    selectMonth(i: number): void;
    /**
     * Checks if specified date is in range of min and max dates
     * @param date
     */
    private isDateSelectable;
    private isWeekendDay;
    private isHoliday;
    init(): void;
    initYears(): void;
    private isYearSelectable;
    initDayNames(): void;
    initMonthName(): void;
    private isMonthSelectable;
    toggleView(): void;
    toggle(): void;
    close(): void;
    reset(fireValueChangeEvent?: boolean): void;
    writeValue(val: Date): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    onBlur(e: MouseEvent): void;
}
