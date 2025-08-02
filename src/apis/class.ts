// src/utils/classroomUtils.ts

import type { TClassData } from '../types/class';

type AllClassrooms = Record<string, TClassData[]>;

const dayOrder: Record<string, number> = {
    월: 1,
    화: 2,
    수: 3,
    목: 4,
    금: 5,
    토: 6,
    일: 7,
};

const dayMap: Record<string, string> = {
    Mon: '월',
    Tue: '화',
    Wed: '수',
    Thu: '목',
    Fri: '금',
    Sat: '토',
    Sun: '일',
};

let cachedData: AllClassrooms | null = null;

export async function loadData(): Promise<AllClassrooms> {
    if (cachedData) return cachedData;
    const res = await fetch('/output.json');
    const json = await res.json();
    cachedData = json;
    return json;
}

export function sortSchedules(classes: TClassData[]): TClassData[] {
    return classes.sort((a, b) => {
        const dayDiff = dayOrder[a.day] - dayOrder[b.day];
        if (dayDiff !== 0) return dayDiff;

        const startA = parseInt(a.time?.split('~')[0]?.replace(':', '') || '0');
        const startB = parseInt(b.time?.split('~')[0]?.replace(':', '') || '0');
        return startA - startB;
    });
}

export function sortClassrooms(data: AllClassrooms): AllClassrooms {
    return Object.fromEntries(
        Object.entries(data)
            .sort(([roomA], [roomB]) => {
                const getNumber = (room: string) =>
                    parseInt(room.match(/\d+/)?.[0] || '0');
                const getPrefix = (room: string) =>
                    room.match(/[A-Z]+/)?.[0] || '';

                const prefixA = getPrefix(roomA);
                const prefixB = getPrefix(roomB);
                const numA = getNumber(roomA);
                const numB = getNumber(roomB);

                if (prefixA !== prefixB) return prefixA.localeCompare(prefixB);
                return numA - numB;
            })
            .map(([room, classes]) => [room, sortSchedules(classes)])
    );
}

export async function getRoomData(room: string): Promise<TClassData[]> {
    const data = await loadData();
    return sortSchedules(data[room] || []);
}

export async function getFilteredClassrooms(params: {
    prefix?: string;
    day?: string; // 영어 요일 ex) 'Mon'
}): Promise<AllClassrooms> {
    const { prefix, day } = params;
    const data = await loadData();
    const targetDay = !day || day === 'ALL' ? null : dayMap[day] || null;

    const filtered: AllClassrooms = {};

    Object.entries(data).forEach(([room, classes]) => {
        if (prefix && !room.toLowerCase().startsWith(prefix.toLowerCase()))
            return;

        const filteredClasses = targetDay
            ? classes.filter((cls) => cls.day === targetDay)
            : classes;

        if (filteredClasses.length > 0) {
            filtered[room] = sortSchedules(filteredClasses);
        }
    });

    return sortClassrooms(filtered);
}

export async function getClassesByBuilding(
    building: string
): Promise<AllClassrooms> {
    const data = await loadData();
    const filtered: AllClassrooms = {};

    Object.entries(data).forEach(([room, classes]) => {
        if (room.startsWith(building)) {
            filtered[room] = sortSchedules(classes);
        }
    });

    return sortClassrooms(filtered);
}

export async function getNowUsing(
    room: string
): Promise<{ room: string; inUse: boolean }> {
    const data = await loadData();
    const classes = data[room];
    if (!classes) return { room, inUse: false };

    const now = new Date();
    const currentDay = now.toLocaleDateString('ko-KR', { weekday: 'short' });
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const inUse = classes.some((cls) => {
        if (cls.day !== currentDay || !cls.time) return false;

        const [startStr, endStr] = cls.time.split('~').map((t) => t.trim());
        if (!startStr || !endStr) return false;

        const [sh, sm] = startStr.split(':').map(Number);
        const [eh, em] = endStr.split(':').map(Number);

        const start = sh * 60 + sm;
        const end = eh * 60 + em;

        return start <= currentMinutes && currentMinutes <= end;
    });

    return { room, inUse };
}
