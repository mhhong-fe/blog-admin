<template>
    <div class="flex flex-col gap-3">
        <div class="inline-grid gap-1 grid-rows-7 grid-flow-col">
            <div v-for="item in emptyGridList" :key="item" />
            <template v-for="item in gridCount" :key="item">
                <el-tooltip v-if="logData[item]" effect="light">
                    <template #content>
                        <div class="text-3.5">
                            <div>{{ `${item}，${logData[item].duration}min` }}</div>
                            <div v-for="recordItem in logData[item].record" :key="recordItem.category">
                                {{ `${recordItem.category} : ${recordItem.content}` }}
                            </div>
                        </div>
                    </template>
                    <div class="rd-1 w-4 h-4 gap-1" :class="getBgClass(item)" />
                </el-tooltip>
                <div v-else class="rd-1 w-4 h-4 gap-1 color-level-0" />
            </template>
        </div>
        <div>{{ month }}月</div>
    </div>
</template>

<script setup lang="ts">
import { dayjs } from 'element-plus';
import type { LogData } from '.';

const { month } = defineProps<{
    month: string;
}>();

// 本月有几天
const days = dayjs(month).endOf('month');
const dayCount = days.date();
const gridCount = Array.from({ length: dayCount }, (item, index) => {
    const day = String(index).padStart(2, 0);
    const date = `${month}-${day}`;
    return date;
});

const logData = inject('logData') as LogData;

// 本月第一天是周几
const startDayOfWeek = ref(new Date(month).getDay());
const emptyGridList = Array.from({ length: startDayOfWeek.value - 1 }, (item, index) => `empty-${index}`);

function getBgClass(date: string) {
    const level = logData[date]?.level;
    return `color-level-${level}`;
}

function getTooltipText(date: string) {
    return logData[date]?.content;
}
</script>

<style scoped>

</style>
