<template>
    <el-drawer v-model="visible" :title="title" size="1000">
        <el-form ref="formRef" :rules="formRules" :model="formData" :hide-required-asterisk="true">
            <el-form-item label="标题" maxlength="20" prop="title">
                <el-input v-model="formData.title" placeholder="请输入标题" maxlength="20" show-word-limit />
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <el-input v-model="formData.content" placeholder="请输入内容" type="textarea" :rows="20" show-word-limit maxlength="20000" />
            </el-form-item>
            <el-form-item label="描述" prop="articleDesc">
                <el-input v-model="formData.articleDesc" placeholder="请输入描述" maxlength="50" show-word-limit />
            </el-form-item>
            <el-form-item label="分类" prop="categoryId">
                <el-select v-model="formData.categoryId" class="w-50!" placeholder="请选择分类">
                    <el-option v-for="item in categoryList" :key="item.id" :label="item.categoryName" :value="item.id" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="visible = false">
                取消
            </el-button>
            <el-button type="primary" @click="handleConfirm">
                确认
            </el-button>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
import type { ArticlesRow, CategoryRow, EditArticlesPayload } from '~/api/config/common';

const { selectedRow } = defineProps<{
    selectedRow?: ArticlesRow;
}>();
const emit = defineEmits<{
    refresh: [];
}>();
const visible = defineModel('visible');

const formData = reactive({
    title: '',
    content: '',
    articleDesc: '',
    categoryId: undefined,
} as unknown as EditArticlesPayload);

const categoryList = ref([] as CategoryRow[]);

const formRef = ref();
const formRules = ref({
    title: [
        {
            required: true,
            message: '请输入文章标题',
            trigger: 'blur',
        },
    ],
    content: [
        {
            required: true,
            message: '请输入文章内容',
            trigger: 'blur',
        },
    ],
    articleDesc: [
        {
            required: true,
            message: '请输入文章描述',
            trigger: 'blur',
        },
    ],
    categoryId: [
        {
            required: true,
            message: '请选择分类',
            trigger: 'change',
        },
    ],
});

const loading = ref(false);
const title = computed(() => selectedRow ? '编辑文章' : '新增文章');
async function handleConfirm() {
    try {
        loading.value = true;
        await formRef.value.validate();
        if (selectedRow) {
            await request(API_ARTICLES_EDIT({ ...formData }));
        }
        else {
            await request(API_ARTICLES_ADD({ ...formData }));
        }
        emit('refresh');
        visible.value = false;
    }
    finally {
        loading.value = false;
    }
}

onMounted(async () => {
    if (selectedRow) {
        Object.assign(formData, selectedRow);
    }
    const res = await request(API_GET_CATEGORY_LIST());
    categoryList.value = res.data.data;
});
</script>

<style scoped>

</style>
