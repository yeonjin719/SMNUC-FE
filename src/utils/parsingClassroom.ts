interface ParsedClassroom {
    day: string;
    times: string[];
    room: string;
}

const parsingClassroom = (LECT_TIME_ROOM: string): ParsedClassroom[] => {
    const result: ParsedClassroom[] = [];

    // 패턴: 요일+시간들(강의실)
    const regex = /([월화수목금토일])([\d,]+)\(([^)]+)\)/g;

    let match;
    while ((match = regex.exec(LECT_TIME_ROOM)) !== null) {
        const day = match[1]; // ex: '금'
        const times = match[2].split(','); // ex: ['7','8','9']
        const room = match[3]; // ex: 'M507'

        result.push({ day, times, room });
    }

    return result;
};

export default parsingClassroom;
