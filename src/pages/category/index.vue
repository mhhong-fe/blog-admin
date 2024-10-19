<template>
    <div class="p-4">
        <div class="mb-3">
            <el-button type="primary" @click="search">
                查询
            </el-button>
            <el-button type="primary" @click="openAddDialog">
                新增
            </el-button>
        </div>
        <el-table v-loading="loading" border stripe :data="list" class="table-cutstom-1">
            <el-table-column label="分类名称" prop="categoryName" />
            <el-table-column label="描述" prop="categoryDesc" />
            <el-table-column label="创建时间" prop="createTime">
                <template #default="{ row }">
                    {{ dayjs(row.createTime).format('YYYY-MM-DD    HH:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column label="操作" prop="operate">
                <template #default="{ row }">
                    <el-button link type="primary" @click="openEditDialog(row)">
                        编辑
                    </el-button>
                    <el-popconfirm title="是否确认删除？" width="200" confirm-button-text="确认" cancel-button-text="取消" @confirm="handleDelete(row.id)">
                        <template #reference>
                            <el-button link type="primary">
                                删除
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <Dialog v-if="dialogVisible" v-model:visible="dialogVisible" :row="selectedRow" @refresh="search" />
    </div>
</template>

<script setup lang="ts">
import { dayjs } from 'element-plus';
import Dialog from './dialog.vue';
import { API_GET_CATEGORY_LIST, type CategoryRow } from '~/api/config/common';

const list = ref([] as CategoryRow[]);
const dialogVisible = ref(false);
const loading = ref(false);

async function search() {
    loading.value = true;
    const res = await request(API_GET_CATEGORY_LIST());
    list.value = res.data.data;
    loading.value = false;
}

const selectedRow = ref({} as CategoryRow);

function openAddDialog() {
    selectedRow.value = {} as CategoryRow;

    dialogVisible.value = true;
}

async function handleDelete(id: number) {
    await request(API_CATEGORY_DELETE(id));
    search();
}

function openEditDialog(row: CategoryRow) {
    dialogVisible.value = true;
    selectedRow.value = row;
};

onMounted(() => {
    search();
});
</script>

<style scoped>

</style>
