export const getStableColorMap = (items: string[], colors: string[]) => {
    const uniqueKeys = Array.from(new Set(items)).sort(); // 고정 순서로 정렬
    const colorMap: Record<string, string> = {};

    uniqueKeys.forEach((key, idx) => {
        colorMap[key] = colors[idx % colors.length];
    });

    return colorMap;
};
