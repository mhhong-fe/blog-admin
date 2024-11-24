<template>
    <div class="m-5">
        <el-form inline>
            <el-form-item label="年份">
                <el-select v-model="year" class="w-40!" placeholder="请输入">
                    <el-option v-for="item in yearList" :key="item" :value="item" :label="item" />
                </el-select>
            </el-form-item>
            <el-form-item label="视图类型">
                <el-select v-model="viewType" class="w-40!" placeholder="请输入">
                    <el-option :value="ViewType.heatMap" label="热力图" />
                    <el-option :value="ViewType.table" label="表格" />
                </el-select>
            </el-form-item>
        </el-form>
        <HeatMap v-if="viewType === ViewType.heatMap" :year="year" :log-data="logData" />
        <el-table v-else border :data="data">
            <el-table-column label="日期" prop="date" width="200" />
            <el-table-column label="学习时长" prop="duration" width="200" />
            <el-table-column label="学习内容" prop="content">
                <template #default="{ row }">
                    <div v-for="item in row.record" :key="item.category">
                        {{ `${item.category}，${item.content}` }}
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { data } from './data.js';
import type { LogRow } from '.';
import { ViewType } from '.';
import type { HeatMapData } from '@/components/heat-map/index.ts';

const yearList = ['2024', '2025'];
const year = ref('2024');
const viewType = ref(ViewType.heatMap);

function transformData(data: LogRow[]) {
    const result = {} as Record<string, HeatMapData>;
    data.forEach((item) => {
        let level = Math.ceil(item.duration / 60);
        level = Math.min(level, 5);
        result[item.date] = {
            level,
            duration: item.duration,
            record: item.record,
        };
    });
    return result;
}

const logData = transformData(data);
provide('logData', logData);
</script>

<style scoped>

</style>
