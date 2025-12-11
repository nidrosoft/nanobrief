"use client";

import { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import { Calendar } from "iconsax-react";
import "react-datepicker/dist/react-datepicker.css";

type DatePickerProps = {
    className?: string;
    label?: string;
    selected: Date | null;
    onChange: (date: Date | null) => void;
    placeholder?: string;
    minDate?: Date;
    maxDate?: Date;
};

const CustomInput = forwardRef<
    HTMLButtonElement,
    { value?: string; onClick?: () => void; placeholder?: string }
>(({ value, onClick, placeholder }, ref) => (
    <button
        type="button"
        ref={ref}
        onClick={onClick}
        className="flex items-center gap-3 w-full h-14 px-5 bg-b-surface1 border-2 border-stroke-subtle rounded-2xl text-left transition-colors hover:border-stroke2 focus:border-primary1 focus:outline-none"
    >
        <Calendar size={20} className="text-t-tertiary" variant="Linear" />
        <span className={value ? "text-t-primary text-body" : "text-t-tertiary text-body"}>
            {value || placeholder || "Select date"}
        </span>
    </button>
));

CustomInput.displayName = "CustomInput";

const DatePicker = ({
    className,
    label,
    selected,
    onChange,
    placeholder,
    minDate,
    maxDate,
}: DatePickerProps) => {
    return (
        <div className={className}>
            {label && (
                <label className="block mb-2 text-body-bold text-t-primary">
                    {label}
                </label>
            )}
            <ReactDatePicker
                selected={selected}
                onChange={onChange}
                customInput={<CustomInput placeholder={placeholder} />}
                minDate={minDate}
                maxDate={maxDate}
                dateFormat="MMMM d, yyyy"
                popperClassName="datepicker-popper"
                calendarClassName="datepicker-calendar"
                showPopperArrow={false}
            />
        </div>
    );
};

export default DatePicker;
