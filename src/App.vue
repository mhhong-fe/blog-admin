<template>
    <div class="w-100vw h-100vh">
        <div v-if="!isLoginPage">
            <Header />
        </div>
        <div :class="isLoginPage ? '' : 'pt-22.5'">
            <RouterView />
        </div>
    </div>
</template>

<script setup lang="ts">
import Header from '@/components/header/index.vue';

const route = useRoute();
const isLoginPage = computed(() => route.path === '/login');
</script>
