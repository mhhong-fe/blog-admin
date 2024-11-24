export enum ViewType {
    heatMap = 1,
    table = 2,
}

export interface LogRow {
    date: string;
    // 时长
    duration: number;
    // 记录
    record: { category: string; content: string }[];
}
