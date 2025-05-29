import type { TClassType } from '../types/class';

function isNowUsing(classes: TClassType[] | TClassType): boolean {
    const now = new Date();
    const currentDay = ['일', '월', '화', '수', '목', '금', '토'][now.getDay()];
    const currentTime = now.toTimeString().slice(0, 5); // "HH:MM"
    if (!Array.isArray(classes)) {
        classes = [classes];
    }
    const isUsed = classes.some((cls) => {
        if (cls.day !== currentDay) return false;

        const [startTime, endTime] = cls.time.split('~');
        return currentTime >= startTime && currentTime <= endTime;
    });

    return isUsed;
}

export default isNowUsing;
