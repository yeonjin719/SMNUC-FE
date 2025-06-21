// 📁 src/api/getRoomData.ts
import axios from 'axios';

export interface FilterParams {
    room?: string;
    day?: string;
    time?: string; // 예: '15:00~17:00'
    building?: string;
}

export const getRoomData = async (roomId: string) => {
    try {
        const response = await axios.get(
            `http://localhost:3000/api/rooms/${roomId}`
        );
        return response.data;
    } catch (error) {
        console.error('❌ 강의실 데이터 요청 실패:', error);
        throw error;
    }
};

export const getFilteredClasses = async (params: FilterParams) => {
    const res = await axios.get('http://localhost:3000/classes', {
        params,
    });
    return res.data;
};

export const fetchClassByRoomPrefix = async ({
    prefix,
    day,
}: {
    prefix: string;
    day: string;
}) => {
    try {
        const res = await axios.get('http://localhost:3000/api/classrooms', {
            params: { room: prefix, day },
        });
        return res.data;
    } catch (err) {
        console.error('에러:', err);
    }
};

export const getNowUsing = async (roomId: string) => {
    try {
        const response = await axios.get(
            `http://localhost:3000/api/nowUsing/${roomId}`
        );
        return response.data;
    } catch (error) {
        console.error('❌ 현재 사용 중인 강의실 데이터 요청 실패:', error);
        throw error;
    }
};
