type ClassCardProps = {
    idx: number;
    subject: string;
    professor: string;
    day: string;
    time: string;
};

const ClassCard = ({ idx, subject, professor, day, time }: ClassCardProps) => {
    return (
        <li
            key={idx}
            className="border p-3 rounded hover:bg-gray-50 transition"
        >
            <div className="font-semibold">{subject}</div>
            <div className="text-sm text-gray-700">
                교수: {professor} | 요일: {day} | 시간: {time}
            </div>
        </li>
    );
};

export default ClassCard;
