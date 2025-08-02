// src/pages/SearchClassroom.tsx

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ClassroomCard from '../component/classroomCard';

import { getFilteredClassrooms } from '../apis/class';

const SearchClassroom = () => {
    const [searchValue, setSearchValue] = useState('');
    const [queryParam, setQueryParam] = useState('');

    const { data, isFetching, isError } = useQuery({
        queryKey: ['class', queryParam],
        queryFn: () =>
            getFilteredClassrooms({ prefix: queryParam, day: 'ALL' }),
        enabled: !!queryParam,
    });

    const handleSearch = () => {
        const trimmed = searchValue.trim();
        if (!trimmed) {
            alert('강의실 명을 입력해주세요.');
            return;
        }
        setQueryParam(trimmed);
    };

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

            {isError && (
                <div className="text-red-500 mt-10">
                    데이터를 불러오는 데 실패했습니다.
                </div>
            )}

            {isFetching && (
                <div className="h-full flex items-center mt-10">
                    로딩 중입니다...
                </div>
            )}

            {!isFetching && data && (
                <>
                    {Object.keys(data).length === 0 ? (
                        <div className="mt-10 text-gray-500">
                            해당 강의실 정보를 찾을 수 없습니다.
                        </div>
                    ) : (
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
                    )}
                </>
            )}
        </div>
    );
};

export default SearchClassroom;
