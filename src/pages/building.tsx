import { useState, useMemo } from 'react';
import {
    type BuildingType,
    BuildingNames,
    KoreanToCode,
} from '../constants/building';

import { useQuery } from '@tanstack/react-query';
import { getClassesByBuilding } from '../apis/class';
import SelectBuilding from '../component/selectBuilding';

import ClassroomCard from '../component/classroomCard';
import Masonry from 'react-masonry-css';
import { type weekdaysType } from '../constants/timeInfo';
import SelectDay from '../component/selectDay';
import Loading from './loading';
import Error from './error';
import type { TClassData } from '../types/class';

const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    640: 1,
};

export type ExtendedWeekdaysType = weekdaysType | 'ALL';

const Building = () => {
    const [building, setBuilding] = useState<BuildingType>(
        BuildingNames.A as BuildingType
    );
    const [day, setDay] = useState<ExtendedWeekdaysType>(
        'ALL' as ExtendedWeekdaysType
    );
    const [show, setShow] = useState<boolean>(false);
    const [dayShow, setDayShow] = useState<boolean>(false);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['class', building, day],
        queryFn: () => getClassesByBuilding(KoreanToCode[building]),
    });

    const classroomCards = useMemo(() => {
        if (!data) return null;
        return (
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex gap-6"
                columnClassName="space-y-6"
            >
                {Object.entries(data).map(([room, classes]) => (
                    <ClassroomCard
                        key={room}
                        room={room}
                        classes={classes as TClassData[]}
                    />
                ))}
            </Masonry>
        );
    }, [data]);

    if (isLoading || !data) return <Loading />;
    if (isError) return <Error />;

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-between w-full gap-2">
                <div></div>
                <SelectBuilding
                    building={building}
                    setBuilding={setBuilding}
                    setShow={setShow}
                    show={show}
                />
                <SelectDay
                    setDay={setDay}
                    day={day}
                    show={dayShow}
                    setShow={setDayShow}
                />
            </div>

            {classroomCards}
        </div>
    );
};

export default Building;
