export interface HeatMapData {
    level: number;
    duration: number;
    record: { category: string; content: string }[];
}

// key是日期，值是热力图每一格的数据
export type LogData = Record<string, HeatMapData>;
