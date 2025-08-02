import { useNavigate } from 'react-router-dom';

import ClassCard from './classCard';
import UsingAlert from './usingAlert';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useState, useMemo, memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getNowUsing } from '../apis/class';
import type { TClassData } from '../types/class';

const ClassroomCard = memo(
    ({ room, classes }: { room: string; classes: TClassData[] }) => {
        const { data } = useQuery({
            queryKey: ['using', room],
            queryFn: () => getNowUsing(room),
        });
        const isUsing = data?.inUse;
        const navigate = useNavigate();
        const [isOpen, setIsOpen] = useState(false);

        const toggleOpen = () => setIsOpen((prev) => !prev);

        const classList = useMemo(() => {
            return classes.map((cls, idx) => (
                <ClassCard
                    key={idx}
                    idx={idx}
                    cls={cls}
                    isUsing={data?.inUse}
                ></ClassCard>
            ));
        }, [classes, data?.inUse]);

        return (
            <div
                key={room}
                className="bg-white shadow rounded-xl p-4 w-[300px] h-fit"
            >
                <div className="flex justify-between">
                    <div className="flex gap-4 items-center ">
                        <div onClick={toggleOpen}>
                            {isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
                        </div>

                        <h2
                            className="text-xl font-bold hover:cursor-pointer"
                            onClick={() => navigate(`/classroom/${room}`)}
                        >
                            {room}
                        </h2>
                    </div>

                    <UsingAlert isUsing={isUsing} />
                </div>
                {isOpen && <ul className="space-y-3 mt-4">{classList}</ul>}
            </div>
        );
    }
);

export default ClassroomCard;
