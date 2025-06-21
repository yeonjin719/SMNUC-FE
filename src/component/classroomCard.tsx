import { useNavigate } from 'react-router-dom';
import type { TClassType, TUsingClassroom } from '../types/class';
import ClassCard from './classCard';
import UsingAlert from './usingAlert';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useState, useMemo, memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getNowUsing } from '../apis/class';

const areEqual = (
    prevProps: { room: string; classes: TClassType[] },
    nextProps: { room: string; classes: TClassType[] }
): boolean => {
    return (
        prevProps.room === nextProps.room &&
        JSON.stringify(prevProps.classes) === JSON.stringify(nextProps.classes)
    );
};

const ClassroomCard = memo(
    ({ room, classes }: { room: string; classes: TClassType[] }) => {
        const { data } = useQuery<TUsingClassroom>({
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
    },
    areEqual
);

export default ClassroomCard;
