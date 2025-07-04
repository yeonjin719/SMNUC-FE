export type TClassType = {
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
    subject: string;
    professor: string;
    day: string;
    periods: number[];
    time: string;
};
export type ClassesByRoom = {
    [room: string]: TClassType[];
};

export type TUsingClassroom = {
    inUse: boolean;
    room: string;
};
