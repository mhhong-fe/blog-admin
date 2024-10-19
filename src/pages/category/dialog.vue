<template>
    <el-dialog v-model="dialogVisible" :title="title" width="500">
        <el-form ref="formRef" :rules="formRules" :model="formData" :hide-required-asterisk="true">
            <el-form-item label="名称" prop="categoryName">
                <el-input v-model="formData.categoryName" class="w-100" />
            </el-form-item>
            <el-form-item label="描述" prop="categoryDesc">
                <el-input v-model="formData.categoryDesc" class="w-100" type="textarea" :rows="3" show-word-limit />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">
                    取消
                </el-button>
                <el-button type="primary" @click="handleConfirm">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import type { CategoryRow } from '~/api/config/common';

const props = defineProps<{
    row: CategoryRow;
}>();
const emit = defineEmits<{
    refresh: [];
}>();
const dialogVisible = defineModel('visible');

const formData = reactive({
    categoryName: '',
    categoryDesc: '',
});

const title = computed(() => props.row.id ? '编辑分类' : '添加分类');

const formRules = reactive({
    categoryName: [
        {
            required: true,
            message: '请输入分类名称',
            trigger: 'blur',
        },
    ],
    categoryDesc: [
        {
            required: true,
            message: '请输入分类描述',
            trigger: 'blur',
        },
    ],
});
const formRef = ref();

async function handleConfirm() {
    await formRef.value.validate();
    if (props.row.id) {
        await request(API_CATEGORY_EDIT({
            categoryName: formData.categoryName,
            categoryDesc: formData.categoryDesc,
        }));
    }
    else {
        await request(API_CATEGORY_ADD({
            categoryName: formData.categoryName,
            categoryDesc: formData.categoryDesc,
        }));
    }

    emit('refresh');
    dialogVisible.value = false;
}

onMounted(() => {
    if (props.row.id) {
        formData.categoryDesc = props.row.categoryDesc;
        formData.categoryName = props.row.categoryName;
    }
});
</script>

<style scoped>

</style>
