// src/utils/sort.ts

import type { TClassData } from '../types/class';

const dayOrder = {
    월: 1,
    화: 2,
    수: 3,
    목: 4,
    금: 5,
    토: 6,
    일: 7,
};

export function sortClassrooms(data: Record<string, TClassData[]>) {
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

export function sortSchedules(classes: TClassData[]) {
    return classes.sort((a, b) => {
        const dayDiff = dayOrder[a.day] - dayOrder[b.day];
        if (dayDiff !== 0) return dayDiff;

        const startA = parseInt(a.time?.split('~')[0]?.replace(':', '') || '0');
        const startB = parseInt(b.time?.split('~')[0]?.replace(':', '') || '0');
        return startA - startB;
    });
}
