import { useQuery } from '@tanstack/react-query';
import type { ClassesByRoom } from '../types/class';
import { fetchClassByRoomPrefix } from '../apis/class';
import { useParams } from 'react-router-dom';
import { times, weekdays } from '../constants/timeInfo';
import { pastelColors } from '../style/pastelColor';
import { getStableColorMap } from '../utils/getStableColorMap';
import UsingAlert from '../component/usingAlert';
import isNowUsing from '../utils/isNowUsing';

const tdOptionClass =
    'max-w-[150px] w-[150px] h-[40px] border text-sm text-center align-middle whitespace-pre-line';
const thOptionClass =
    'bg-blue-50 w-[150px] max-w-[150px] h-[40px] border text-sm text-center';

type CellInfo = {
    key: string;
    subject: string;
    professor: string;
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

    const { data, isLoading, isError } = useQuery<ClassesByRoom>({
        queryKey: ['class', param.id!],
        queryFn: () => fetchClassByRoomPrefix(param.id!),
    });

    if (isLoading || !data) return <div>로딩 중...</div>;
    if (isError) return <div>데이터를 불러오는 데 실패했습니다.</div>;

    const classList = data[param.id!] ?? [];

    // 색상 매핑용 키 생성: 과목번호 기준
    const uniqueKeys = classList.map((cls) => cls.original.SBJ_NO);
    const colorMap = getStableColorMap(uniqueKeys, pastelColors);

    classList.forEach((cls) => {
        const col = weekdays.indexOf(cls.day);
        if (col === -1 || cls.periods.length === 0) return;

        const sortedPeriods = [...cls.periods].sort((a, b) => a - b);
        const startRow = sortedPeriods[0];
        const span = sortedPeriods.length;

        cellData[startRow][col] = {
            subject: `${cls.subject}`,
            professor: `${cls.professor}`,
            key: cls.original.SBJ_NO,
        };
        rowSpanData[startRow][col] = span;

        for (let i = 1; i < span; i++) {
            const r = startRow + i;
            if (r >= skipCell.length) continue;
            skipCell[r][col] = true;
        }
    });

    const isUsing = isNowUsing(data[param.id!]);

    return (
        <div className="overflow-auto w-full flex justify-center flex-col px-40 gap-4">
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
                                        <span className="font-black text-[15px]">
                                            {cell?.subject || ''}
                                        </span>
                                        <br />
                                        <span>{cell?.professor || ''}</span>
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
