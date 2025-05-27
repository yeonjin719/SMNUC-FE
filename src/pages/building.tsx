import { useState } from 'react';
import {
    type BuildingType,
    BuildingNames,
    KoreanToCode,
} from '../constants/building';

import { useQuery } from '@tanstack/react-query';
import { fetchClassByRoomPrefix } from '../apis/class';
import SelectBuilding from '../component/selectBuilding';
import ClassCard from '../component/classCard';
import type { ClassesByRoom } from '../types/class';

const Building = () => {
    const [building, setBuilding] = useState<BuildingType>(
        BuildingNames.A as BuildingType
    );
    const [show, setShow] = useState<boolean>(false);

    const { data, isLoading, isError } = useQuery<ClassesByRoom>({
        queryKey: ['class', building],
        queryFn: () => fetchClassByRoomPrefix(KoreanToCode[building]),
    });

    if (isLoading || !data) return <div>로딩 중...</div>;

    if (isError) return <div>데이터를 불러오는 데 실패했습니다.</div>;

    return (
        <div className="flex flex-col items-center">
            <SelectBuilding
                building={building}
                setBuilding={setBuilding}
                setShow={setShow}
                show={show}
            ></SelectBuilding>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(data).map(([room, classes]) => (
                    <div key={room} className="bg-white shadow rounded-xl p-4">
                        <h2 className="text-xl font-bold mb-4">{room}</h2>
                        <ul className="space-y-3">
                            {classes.map((cls, idx) => (
                                <ClassCard
                                    key={idx}
                                    idx={idx}
                                    subject={cls.subject}
                                    professor={cls.professor}
                                    day={cls.day}
                                    time={cls.time}
                                ></ClassCard>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Building;
