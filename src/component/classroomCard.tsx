import { useNavigate } from 'react-router-dom';
import type { TClassType } from '../types/class';
import ClassCard from './classCard';
import isNowUsing from '../utils/isNowUsing';
import UsingAlert from './usingAlert';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useState } from 'react';
const ClassroomCard = ({
    room,
    classes,
}: {
    room: string;
    classes: TClassType[];
}) => {
    const isUsing = isNowUsing(classes);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div
            key={room}
            className="bg-white shadow rounded-xl p-4 w-[300px] h-fit"
        >
            <div className="flex justify-between">
                <div className="flex gap-4 items-center ">
                    <div onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? (
                            <IoIosArrowDown></IoIosArrowDown>
                        ) : (
                            <IoIosArrowUp></IoIosArrowUp>
                        )}
                    </div>

                    <h2
                        className="text-xl font-bold hover:cursor-pointer"
                        onClick={() => navigate(`/classroom/${room}`)}
                    >
                        {room}
                    </h2>
                </div>

                <UsingAlert isUsing={isUsing}></UsingAlert>
            </div>
            {isOpen && (
                <ul className="space-y-3 mt-4">
                    {classes.map((cls, idx) => (
                        <ClassCard key={idx} idx={idx} cls={cls}></ClassCard>
                    ))}
                </ul>
            )}
        </div>
    );
};
export default ClassroomCard;
