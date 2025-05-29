import { useState } from 'react';
import {
    type BuildingType,
    BuildingNames,
    KoreanToCode,
} from '../constants/building';

import { useQuery } from '@tanstack/react-query';
import { fetchClassByRoomPrefix } from '../apis/class';
import SelectBuilding from '../component/selectBuilding';
import type { ClassesByRoom } from '../types/class';
import ClassroomCard from '../component/classroomCard';

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

            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
                {Object.entries(data).map(([room, classes]) => (
                    <ClassroomCard
                        room={room}
                        classes={classes}
                    ></ClassroomCard>
                ))}
            </div>
        </div>
    );
};

export default Building;
