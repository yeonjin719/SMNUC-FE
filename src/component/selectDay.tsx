import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { weekdays, type weekdaysType } from '../constants/timeInfo';
import type { ExtendedWeekdaysType } from '../pages/building';
const optionClass =
    'cursor-pointer px-4 py-2 hover:bg-gray-100 transition-all border-b last:border-none text-center';
type SelectDayProps = {
    setShow: (show: boolean) => void;
    show: boolean;
    day: ExtendedWeekdaysType;
    setDay: (day: ExtendedWeekdaysType) => void;
};
const SelectDay = ({ setShow, show, day, setDay }: SelectDayProps) => {
    return (
        <div className="flex">
            <div
                onClick={() => setShow(!show)}
                className="relative border flex justify-center items-center w-[100px] h-[30px] rounded-md hover:cursor-pointer"
            >
                {day}
                {show ? (
                    <IoIosArrowUp className="absolute right-[10px]"></IoIosArrowUp>
                ) : (
                    <IoIosArrowDown className="absolute right-[10px]"></IoIosArrowDown>
                )}

                <div
                    className={`${
                        show
                            ? 'block absolute top-[30px] max-h-[400px] overflow-y-auto w-full bg-white border rounded-md shadow-lg'
                            : 'hidden'
                    }`}
                >
                    {weekdays.map((day) => (
                        <div
                            onClick={() => setDay(day as weekdaysType)}
                            className={optionClass}
                            key={day}
                        >
                            {day}
                        </div>
                    ))}
                    <div onClick={() => setDay('ALL')} className={optionClass}>
                        ALL
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SelectDay;
