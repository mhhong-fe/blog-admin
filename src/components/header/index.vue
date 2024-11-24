<template>
    <header class="position-fixed h-22.5 w-full b-b-1.5 b-b-solid b-#e2e2e3 bg-#fff flex items-center justify-center">
        <div class="flex w-80 lg:w-300 items-center justify-between">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 rd-50%">
                    <img :src="AvatarImg" class="w-12 h-12 object-cover bg-#f7f8fa rd-50%" alt="">
                </div>
                <div class="font-500 text-5">
                    博客管理
                </div>
            </div>
            <div class="gap-5 hidden lg:flex">
                <div
                    v-for="item in titleList"
                    :key="item.name" class="cursor-pointer"
                    :class="item.route === activeRoute ? 'color-#407fff' : ''" @click="handleRouteClick(item.route)"
                >
                    {{ item.name }}
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AvatarImg from '@/assets/imgs/avatar.png';

const titleList = [
    { name: '文章', route: '/article' },
    { name: '分类', route: '/category' },
    { name: '统计', route: '/time-log' },
    { name: '网站概况', route: '/data' },
];

const activeRoute = ref('/article');

const router = useRouter();
const route = useRoute();

function handleRouteClick(route: string) {
    activeRoute.value = route;
    router.push(route);
}

watch(() => route.path, () => {
    activeRoute.value = route.path;
});
</script>

<style lang="scss" module>
.searchInput {
    :global {
        .el-input__wrapper {
            border-radius: 30px;
        }
    }
}
</style>
