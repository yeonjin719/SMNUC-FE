// src/utils/checkUsage.ts

import type { TClassData } from '../types/class';

export function isRoomInUse(classList: TClassData[]): boolean {
    const now = new Date();
    const day = now.toLocaleDateString('ko-KR', { weekday: 'short' }); // "월"

    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    return classList.some((cls) => {
        if (cls.day !== day || !cls.time) return false;
        const [startStr, endStr] = cls.time.split('~').map((t) => t.trim());
        if (!startStr || !endStr) return false;

        const [startHour, startMin] = startStr.split(':').map(Number);
        const [endHour, endMin] = endStr.split(':').map(Number);

        const startMinutes = startHour * 60 + startMin;
        const endMinutes = endHour * 60 + endMin;

        return startMinutes <= currentMinutes && currentMinutes <= endMinutes;
    });
}
