export interface TClassData {
    subject: string; // 과목명
    professor: string; // 교수명
    day: '월' | '화' | '수' | '목' | '금' | '토' | '일'; // 요일
    periods: number[]; // 교시 번호들
    time: string; // "13:00~16:00" 형식의 시간

    original: {
        SBJ_NO: string;
        SBJ_NM: string;
        LECT_TIME_ROOM: string;
        CMP_DIV_RCD: string;
        THEO_TIME: number;
        ATTC_FILE_NO: string | null;
        DIVCLS: number;
        TLSN_RMK: string | null;
        CDT: number;
        SES_RCD: string;
        CMP_DIV_NM: string;
        CYBER_YN: 'Y' | 'N';
        CYBER_B_YN: 'Y' | 'N';
        SCH_YEAR: string;
        PRAC_TIME: number;
        CYBER_S_YN: 'Y' | 'N';
        FILE_PBY_YN: 'Y' | 'N';
        KIND_RCD: string;
        SBJ_DIVCLS: string;
        STAFF_NM: string;
        DEPT_CD: string;
        RMK: string | null;
        CYBER_E_YN: 'Y' | 'N';
        REP_STAFF_NO: string;
        EST_DEPT_INFO: string;
        SMT_RCD: string;
        CRS_SHYR: number;
        KIND_NM: string;
        BEF_CTNT_01: string | null;
        BEF_CTNT_02: string | null;
        REP_CAPB_NM: string;
    };
}
export interface FilterParams {
    room?: string;
    day?: string;
    time?: string; // 예: '15:00~17:00'
    building?: string;
}
export type TClassType = {
    SBJ_NO: string;
    SBJ_NM: string;
    LECT_TIME_ROOM: string;
    CMP_DIV_RCD: string;
    THEO_TIME: number;
    ATTC_FILE_NO: string | null;
    DIVCLS: number;
    TLSN_RMK: string | null;
    CDT: number;
    SES_RCD: string;
    CMP_DIV_NM: string;
    CYBER_YN: string;
    CYBER_B_YN: string;
    SCH_YEAR: string;
    PRAC_TIME: number;
    CYBER_S_YN: string;
    FILE_PBY_YN: string;
    KIND_RCD: string;
    SBJ_DIVCLS: string;
    STAFF_NM: string;
    DEPT_CD: string;
    RMK: string | null;
    CYBER_E_YN: string;
    REP_STAFF_NO: string;
    EST_DEPT_INFO: string;
    SMT_RCD: string;
    CRS_SHYR: number;
    KIND_NM: string;
    BEF_CTNT_02: string | null;
    REP_CAPB_NM: string;
    BEF_CTNT_01: string | null;
};
