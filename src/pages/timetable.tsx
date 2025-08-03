import { useQuery } from '@tanstack/react-query';
import { getFilteredClassrooms, getNowUsing } from '../apis/class';
import { useParams } from 'react-router-dom';
import { shortTimes, times, weekdays } from '../constants/timeInfo';
import { pastelColors } from '../style/pastelColor';
import { getStableColorMap } from '../utils/getStableColorMap';
import UsingAlert from '../component/usingAlert';

const tdOptionClass =
    'max-w-[150px] w-[150px] max-h-[60px] min-h-[60px] h-[60px] border text-center align-middle whitespace-pre-line pr-1';
const thOptionClass =
    'bg-blue-50 w-[16.6666%] max-w-[16.6666%] min-w-[16.6666%] max-h-[60px] min-h-[60px] h-[60px] border text-sm text-center';

type CellInfo = {
    key: string;
    subject: string;
    professor: string;
    classNum: string;
} | null;

const Timetable = () => {
    const param = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['class', param.id!],
        queryFn: () => getFilteredClassrooms({ prefix: param.id!, day: 'ALL' }),
    });

    const { data: usingData } = useQuery({
        queryKey: ['using', param.id!],
        queryFn: () => getNowUsing(param.id!),
    });

    if (isLoading || !data) return <div>로딩 중...</div>;
    if (isError) return <div>데이터를 불러오는 데 실패했습니다.</div>;

    const classList = data[param.id!] ?? [];

    const hasSaturday = classList.some((cls) => cls.day === '토');
    const visibleWeekdays = hasSaturday ? weekdays : weekdays.slice(0, 5);
    const columnCount = visibleWeekdays.length;

    const cellData: CellInfo[][] = Array.from({ length: times.length }, () =>
        Array(columnCount).fill(null)
    );
    const rowSpanData: (number | null)[][] = Array.from(
        { length: times.length },
        () => Array(columnCount).fill(null)
    );
    const skipCell: boolean[][] = Array.from({ length: times.length }, () =>
        Array(columnCount).fill(false)
    );

    const uniqueKeys = classList.map((cls) => cls.original.SBJ_NO);
    const colorMap = getStableColorMap(uniqueKeys, pastelColors);

    classList.forEach((cls) => {
        const col = visibleWeekdays.indexOf(cls.day);
        if (col === -1 || !cls.periods || cls.periods.length === 0) return;

        const sortedPeriods = [...cls.periods].sort((a, b) => a - b);
        const start = sortedPeriods[0];
        if (start === undefined || isNaN(start)) return;

        const startRow = start - 1;
        const span = sortedPeriods.length;

        if (startRow < 0 || startRow >= times.length) return;

        cellData[startRow][col] = {
            subject: cls.subject,
            professor: cls.professor,
            classNum: (cls.original.SBJ_DIVCLS as string).split('-')[1],
            key: cls.original.SBJ_NO,
        };
        rowSpanData[startRow][col] = span;

        for (let i = 1; i < span; i++) {
            const r = startRow + i;
            if (r >= skipCell.length) continue;
            skipCell[r][col] = true;
        }
    });

    const isUsing = usingData?.inUse;

    return (
        <div className="overflow-auto w-full flex justify-center flex-col px-[10px] md:px-40 gap-4 py-[20px]">
            <div className="flex w-full justify-between">
                <h1 className="text-2xl self-center">{param.id} 강의실</h1>
                <UsingAlert isUsing={isUsing} />
            </div>

            <table className="table-fixed border-collapse">
                <thead>
                    <tr>
                        <th className="bg-blue-50 !max-w-[30px] w-[30px] whitespace-nowrap max-h-[60px] min-h-[60px] h-[60px] border text-sm text-center">
                            시간
                        </th>
                        {visibleWeekdays.map((day) => (
                            <th key={day} className={thOptionClass}>
                                {day}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {shortTimes.map((time, rowIdx) => (
                        <tr key={rowIdx}>
                            <td className="sm:text-sm !text-[10px] w-[30px] !max-w-[30px] max-h-[60px] min-h-[60px] h-[60px] border text-sm text-end align-top pl-2 pr-1 whitespace-pre-line">
                                {time}
                            </td>
                            {visibleWeekdays.map((_, colIdx) => {
                                if (skipCell[rowIdx][colIdx]) return null;

                                const cell = cellData[rowIdx][colIdx];
                                const span = rowSpanData[rowIdx][colIdx];
                                const bgColor = cell
                                    ? colorMap[cell.key]
                                    : undefined;

                                return (
                                    <td
                                        key={`${rowIdx}-${colIdx}`}
                                        rowSpan={span ?? 1}
                                        className={`${tdOptionClass} ${
                                            cell ? '!font-normal' : ''
                                        }`}
                                        style={{
                                            backgroundColor: bgColor,
                                        }}
                                    >
                                        <div className="flex flex-col h-full w-full">
                                            <span className="w-full flex font-semibold text-[12px] sm:text-[15px]">
                                                {cell?.subject || ''}
                                                {cell?.classNum && '-'}
                                                {cell?.classNum || ''}
                                            </span>
                                            <span className="font-medium text-[12px]">
                                                {cell?.professor || ''}
                                            </span>
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Timetable;
