export type BuildingType =
    | 'A'
    | 'B'
    | 'C'
    | 'D'
    | 'E'
    | 'F'
    | 'G'
    | 'H'
    | 'I'
    | 'J'
    | 'K'
    | 'L'
    | 'M'
    | 'N'
    | 'O'
    | 'R'
    | 'S'
    | 'T'
    | 'U';

export const BuildingNames: Record<BuildingType, string> = {
    A: '사범대학관(A)',
    B: '미술관(B)',
    C: '가정관(C)',
    D: '생활예술관(D)',
    E: '학군단(E)',
    F: '체육관(F)',
    G: '제1공학관(G)',
    H: '학생회관(H)',
    I: '제2교수회관(I)',
    J: '대학본부(J)',
    K: '제2공학관(K)',
    L: '학술정보관(L)',
    M: '월해관(M)',
    N: '자하관(N)',
    O: '제1교수회관(O)',
    R: '미래백년관(R)',
    S: '중앙교수회관(S)',
    T: '경영경제대학관(T)',
    U: '문화예술관(U)',
};

export const KoreanToCode: Record<string, BuildingType> = Object.entries(
    BuildingNames
).reduce((acc, [key, value]) => {
    acc[value] = key as BuildingType;
    return acc;
}, {} as Record<string, BuildingType>);
