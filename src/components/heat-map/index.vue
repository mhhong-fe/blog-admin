<template>
    <div class="flex text-3.5 mt-10">
        <div class="mr-4">
            <div v-for="item in daysInWeek" :key="item">
                {{ item }}
            </div>
        </div>
        <div class="flex gap-4">
            <Month v-for="item in monthList" :key="item.key" :month="item.month" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Month from './month.vue';

const props = defineProps<{
    year: string;
}>();

const daysInWeek = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

const monthList = computed(() => {
    return Array.from({ length: 12 }, (item, index) => {
        const monthStr = `${index + 1}`.padStart(2, 0);
        return {
            key: `${props.year}-month-${index}`,
            month: `${props.year}-${monthStr}`,
        };
    });
});
</script>

<style scoped>

</style>
