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
                    <el-button link type="primary" @click="handleExport(row)">
                        导出文章
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

const exportLoading = ref(false);

async function handleDelete(id: number) {
    emit('delete', id);
}

function handleEdit(row: ArticlesRow) {
    emit('edit', row);
}

function handleExport(row: ArticlesRow) {
    exportLoading.value = true;
    // 创建一个Blob对象，将Markdown内容以UTF-8编码格式存储进去
    const blob = new Blob([row.content], { type: 'text/plain;charset=utf-8' });
    // 创建一个指向Blob对象的URL
    const url = URL.createObjectURL(blob);
    // 创建一个 <a> 标签元素，用于模拟点击下载
    const a = document.createElement('a');
    // 设置 <a> 标签的下载属性为指定的文件名（title）
    a.download = `${row.title}.md`;
    // 设置 <a> 标签的href属性为刚才创建的Blob的URL
    a.href = url;
    // 模拟点击 <a> 标签，触发下载
    a.click();
    // 释放创建的URL对象，避免内存泄漏（当不再需要时应该及时释放）
    URL.revokeObjectURL(url);
    exportLoading.value = false;
}
</script>

<style scoped>

</style>
