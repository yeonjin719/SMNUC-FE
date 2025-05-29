import type { TClassType } from '../types/class';
import isNowUsing from '../utils/isNowUsing';

type ClassCardProps = {
    idx: number;
    cls: TClassType;
};

const ClassCard = ({ idx, cls }: ClassCardProps) => {
    const isUsing = isNowUsing(cls);
    return (
        <li
            key={idx}
            className={`border p-3 rounded transition ${
                isUsing ? 'bg-blue-100 hover:bg-blue-200' : 'hover:bg-gray-50'
            }`}
        >
            <div className="font-bold">{cls.subject}</div>
            <div className="text-sm text-gray-700">
                교수: {cls.professor} | 요일: {cls.day} | 시간: {cls.time}
            </div>
        </li>
    );
};

export default ClassCard;
