<template>
    <div class="p-4">
        <el-form inline>
            <el-form-item>
                <el-button type="primary" @click="search">
                    查询
                </el-button>
                <el-button type="primary" @click="handleAdd">
                    新增
                </el-button>
            </el-form-item>
        </el-form>
        <Table v-loading="loading" :list="list" @delete="handleDelete" @edit="handleEdit" />
        <el-pagination
            v-model:current-page="pageDto.pageNum"
            v-model:page-size="pageDto.pageSize"
            class="mr-4 mt-4 justify-end"
            background
            size="small"
            layout="total, prev, pager, next, sizes"
            :page-sizes="[10, 50, 100]"
            :total="pageDto.total"
        />
        <EditDrawer v-if="drawerVisible" v-model:visible="drawerVisible" :selected-row="selectedRow" @refresh="search" />
    </div>
</template>

<script setup lang="ts">
import Table from './table.vue';
import EditDrawer from './edit-drawer.vue';
import type { ArticlesRow } from '~/api/config/common';

const pageDto = ref({
    pageNum: 1,
    pageSize: 10,
    total: 10,
});

const drawerVisible = ref(false);
const list = ref([] as ArticlesRow[]);
const loading = ref(false);

const selectedRow = ref({} as (ArticlesRow | undefined));
function handleAdd() {
    selectedRow.value = undefined;
    drawerVisible.value = true;
}

async function search() {
    try {
        loading.value = true;
        const res = await request(API_GET_ARTICLE_LIST({
            pageNum: pageDto.value.pageNum,
            pageSize: pageDto.value.pageSize,
        }));
        list.value = res.data.data.sort((prev, next) => next.updatedTime - prev.updatedTime);
        pageDto.value.total = res.data.pageDto?.total as number;
    }
    finally {
        loading.value = false;
    }
}

async function handleDelete(id: number) {
    await request(API_ARTICLES_DELETE(id));
    await search();
}

function handleEdit(row: ArticlesRow) {
    selectedRow.value = row;
    drawerVisible.value = true;
}

onMounted(() => {
    search();
});
</script>

<style scoped>

</style>
