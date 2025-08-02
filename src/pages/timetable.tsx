import { useQuery } from '@tanstack/react-query';
import { getFilteredClassrooms, getNowUsing } from '../apis/class';
import { useParams } from 'react-router-dom';
import { times, weekdays } from '../constants/timeInfo';
import { pastelColors } from '../style/pastelColor';
import { getStableColorMap } from '../utils/getStableColorMap';
import UsingAlert from '../component/usingAlert';

const tdOptionClass =
    'max-w-[150px] w-[150px] max-h-[60px] min-h-[60px] h-[60px] border text-sm text-center align-middle whitespace-pre-line px-2';
const thOptionClass =
    'bg-blue-50 w-[150px] max-w-[150px] max-h-[60px] min-h-[60px] h-[60px] border text-sm text-center';

type CellInfo = {
    key: string;
    subject: string;
    professor: string;
    classNum: string;
} | null;

const Timetable = () => {
    const param = useParams();
    const cellData: CellInfo[][] = Array.from({ length: times.length }, () =>
        Array(6).fill(null)
    );
    const rowSpanData: (number | null)[][] = Array.from(
        { length: times.length },
        () => Array(6).fill(null)
    );
    const skipCell: boolean[][] = Array.from({ length: times.length }, () =>
        Array(6).fill(false)
    );

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

    const uniqueKeys = classList.map((cls) => cls.original.SBJ_NO);
    const colorMap = getStableColorMap(uniqueKeys, pastelColors);

    classList.forEach((cls) => {
        const col = weekdays.indexOf(cls.day);
        if (col === -1 || cls.periods.length === 0) return;

        const sortedPeriods = [...cls.periods].sort((a, b) => a - b);
        const startRow = sortedPeriods[0];
        const span = sortedPeriods.length;

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
        <div className="overflow-auto w-full flex justify-center flex-col px-40 gap-4 py-[40px]">
            <div className="flex w-full justify-between">
                <h1 className="text-2xl self-center">{param.id} 강의실</h1>
                <UsingAlert isUsing={isUsing}></UsingAlert>
            </div>

            <table className="table-fixed border-collapse">
                <thead>
                    <tr>
                        <th className={thOptionClass}>시간</th>
                        {weekdays.map((day) => (
                            <th key={day} className={thOptionClass}>
                                {day}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {times.map((time, rowIdx) => (
                        <tr key={rowIdx}>
                            <td className={tdOptionClass}>{time}</td>
                            {weekdays.map((_, colIdx) => {
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
                                            cell ? 'font-semibold' : ''
                                        }`}
                                        style={{
                                            backgroundColor: bgColor,
                                        }}
                                    >
                                        <div className="flex flex-col justify-center h-full">
                                            <span className="font-semibold text-[15px]">
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
