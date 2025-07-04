import { useQuery } from '@tanstack/react-query';
import { fetchClassByRoomPrefix } from '../apis/class';
import type { ClassesByRoom } from '../types/class';
import { useState } from 'react';
import ClassroomCard from '../component/classroomCard';
const SearchClassroom = () => {
    const [searchValue, setSearchValue] = useState('');
    const [queryParam, setQueryParam] = useState('');

    const { data, isFetching, isError, refetch } = useQuery<ClassesByRoom>({
        queryKey: ['class', queryParam],
        queryFn: () =>
            fetchClassByRoomPrefix({ prefix: queryParam, day: 'ALL' }),
        enabled: false,
    });

    const handleSearch = async () => {
        if (!searchValue.trim()) {
            alert('강의실 명을 입력해주세요.');
            return;
        }
        await setQueryParam(searchValue);
        refetch();
    };

    if (isError) return <div>데이터를 불러오는 데 실패했습니다.</div>;

    return (
        <div className="flex flex-col items-center min-h-[80vh] h-full w-full">
            <div className="flex flex-col items-center justify-center mt-10">
                <h1 className="text-2xl font-bold mb-2">강의실 검색</h1>
                <div className="mb-4">
                    강의실 번호로 검색이 가능합니다. (ex: A103){' '}
                </div>
                <div className="flex gap-4 justify-center">
                    <input
                        value={searchValue}
                        type="text"
                        placeholder="강의실 명을 입력해주세요..."
                        className="p-2 border border-gray-300 rounded w-64"
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </div>
            {isFetching ? (
                <div className="h-full flex items-center">로딩 중입니다...</div>
            ) : data ? (
                <div
                    className={`p-6 gap-6 ${
                        Object.keys(data).length < 3
                            ? 'flex justify-center'
                            : 'grid grid-cols-1 md:grid-cols-3 '
                    }`}
                >
                    {Object.entries(data).map(([room, classes]) => (
                        <ClassroomCard
                            key={room}
                            room={room}
                            classes={classes}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    );
};
export default SearchClassroom;
