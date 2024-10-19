<template>
    <div>
        <el-table border stripe :data="list" class="table-cutstom-1">
            <el-table-column label="文章标题" prop="title" />
            <el-table-column label="文章分类" prop="categoryName" width="140" />
            <el-table-column label="文章描述" prop="articleDesc" />
            <el-table-column label="创建时间">
                <template #default="{ row }">
                    {{ dayjs(row.createdTime).format('YYYY-MM-DD HH:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column label="更新时间">
                <template #default="{ row }">
                    {{ dayjs(row.updatedTime).format('YYYY-MM-DD HH:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-button link type="primary">
                        查看详情
                    </el-button>
                    <el-button link type="primary" @click="handleEdit(row)">
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
    </div>
</template>

<script setup lang="ts">
import { dayjs } from 'element-plus';
import type { ArticlesRow } from '~/api/config/common';

const { list } = defineProps<{
    list: ArticlesRow[];
}>();

const emit = defineEmits<{
    delete: [id: number];
    edit: [row: ArticlesRow];
}>();

async function handleDelete(id: number) {
    emit('delete', id);
}

function handleEdit(row: ArticlesRow) {
    emit('edit', row);
}
</script>

<style scoped>

</style>
