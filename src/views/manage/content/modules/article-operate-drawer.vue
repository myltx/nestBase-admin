<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import dayjs from 'dayjs';
import { articleEditTypeOptions } from '@/constants/business';
import { createArticle, updateArticle } from '@/service/api/content';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { translateOptions } from '@/utils/common';
import { $t } from '@/locales';
import MarkdownEditor from './markdown-editor.vue';
import RichtextEditor from './richtext-editor.vue';
import UploadEditor from './upload-editor.vue';

defineOptions({
  name: 'ArticleOperateDrawer'
});

interface Props {
  operateType: NaiveUI.TableOperateType;
  rowData?: Api.SystemManage.Article | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'submitted'): void;
}>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const loading = ref(false);

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const editTypeOptions = computed(() => translateOptions(articleEditTypeOptions));

type Model = Api.SystemManage.CreateArticle & { tagIdsInput?: string };

const editorContentMap = ref<Record<Api.SystemManage.ArticleEditType, string>>({
  MARKDOWN: '',
  RICHTEXT: '',
  UPLOAD: ''
});

const model = ref<Model>(createDefaultModel());

const currentEditorContent = computed({
  get: () => editorContentMap.value[model.value.editorType] || '',
  set: val => {
    editorContentMap.value[model.value.editorType] = val;
  }
});

function createDefaultModel(): Model {
  return {
    title: '',
    slug: '',
    summary: '',
    editorType: 'MARKDOWN',
    contentMd: '',
    contentHtml: '',
    contentRaw: '',
    coverImage: '',
    categoryId: '',
    tagIds: [],
    author: '',
    publishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    isTop: false,
    isRecommend: false,
    tagIdsInput: ''
  };
}

const isEdit = computed(() => props.operateType === 'edit');

const drawerTitle = computed(() =>
  isEdit.value ? $t('page.manage.content.editArticle') : $t('page.manage.content.addArticle')
);

const rules: Record<string, App.Global.FormRule | App.Global.FormRule[]> = {
  title: defaultRequiredRule,
  summary: defaultRequiredRule,
  editorType: defaultRequiredRule,
  categoryId: defaultRequiredRule,
  author: defaultRequiredRule,
  coverImage: defaultRequiredRule
};

function closeDrawer() {
  visible.value = false;
}

function parseTagIds(input?: string) {
  if (!input) return [];
  return input
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);
}

function resetEditorContent(article?: Api.SystemManage.Article | null) {
  editorContentMap.value = {
    MARKDOWN: article?.contentMd || '',
    RICHTEXT: article?.contentHtml || '',
    UPLOAD: article?.contentRaw || ''
  };
}

function handleInitModel() {
  const article = props.rowData;
  if (article) {
    model.value = {
      title: article.title || '',
      slug: article.slug || '',
      summary: article.summary || '',
      editorType: article.editorType || 'MARKDOWN',
      contentMd: article.contentMd || '',
      contentHtml: article.contentHtml || '',
      contentRaw: article.contentRaw || '',
      coverImage: article.coverImage || '',
      categoryId: article.categoryId || '',
      tagIds: article.tagIds || [],
      author: article.author || '',
      publishTime: article.publishTime || '',
      isTop: article.isTop ?? false,
      isRecommend: article.isRecommend ?? false,
      tagIdsInput: (article.tagIds || []).join(', ')
    };
    resetEditorContent(article);
  } else {
    model.value = createDefaultModel();
    resetEditorContent(null);
  }
}

async function handleSubmit() {
  loading.value = true;
  try {
    await validate();
    const tagIds = parseTagIds(model.value.tagIdsInput);
    model.value.tagIds = tagIds;

    const payload: Api.SystemManage.CreateArticle = {
      title: model.value.title,
      slug: model.value.slug,
      summary: model.value.summary,
      editorType: model.value.editorType,
      coverImage: model.value.coverImage,
      categoryId: model.value.categoryId || '',
      tagIds,
      author: model.value.author,
      publishTime: model.value.publishTime,
      isTop: model.value.isTop,
      isRecommend: model.value.isRecommend
    };

    const contentValue = currentEditorContent.value;
    if (payload.editorType === 'MARKDOWN') {
      payload.contentMd = contentValue;
    } else if (payload.editorType === 'RICHTEXT') {
      payload.contentHtml = contentValue;
    } else {
      payload.contentRaw = contentValue;
    }

    if (isEdit.value && props.rowData) {
      await updateArticle({ ...payload, id: props.rowData.id });
      window.$message?.success($t('common.updateSuccess'));
    } else {
      await createArticle(payload);
      window.$message?.success($t('common.addSuccess'));
    }

    emit('submitted');
    closeDrawer();
  } finally {
    loading.value = false;
  }
}

watch(visible, value => {
  if (value) {
    handleInitModel();
    restoreValidation();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="520" :mask-closable="false">
    <NDrawerContent :title="drawerTitle" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules" label-placement="top">
        <NFormItem :label="$t('page.manage.content.articleTitle')" path="title">
          <NInput v-model:value="model.title" :placeholder="$t('page.manage.content.form.title')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.content.articleSlug')" path="slug">
          <NInput v-model:value="model.slug" :placeholder="$t('page.manage.content.form.slug')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.content.summary')" path="summary">
          <NInput
            v-model:value="model.summary"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            :placeholder="$t('page.manage.content.form.summary')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.manage.content.category')" path="categoryId">
          <NInput v-model:value="model.categoryId" :placeholder="$t('page.manage.content.form.category')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.content.author')" path="author">
          <NInput v-model:value="model.author" :placeholder="$t('page.manage.content.form.author')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.content.coverImage')" path="coverImage">
          <NInput v-model:value="model.coverImage" :placeholder="$t('page.manage.content.form.coverImage')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.content.tagIds')" path="tagIds">
          <NInput
            v-model:value="model.tagIdsInput"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            :placeholder="$t('page.manage.content.form.tagIds')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.manage.content.publishTime')" path="publishTime">
          <NDatePicker
            v-model:formatted-value="model.publishTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            clearable
            :placeholder="$t('page.manage.content.form.publishTime')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.manage.content.isTop')" path="isTop">
          <NSwitch v-model:value="model.isTop">
            <template #checked>{{ $t('common.yesOrNo.yes') }}</template>
            <template #unchecked>{{ $t('common.yesOrNo.no') }}</template>
          </NSwitch>
        </NFormItem>
        <NFormItem :label="$t('page.manage.content.isRecommend')" path="isRecommend">
          <NSwitch v-model:value="model.isRecommend">
            <template #checked>{{ $t('common.yesOrNo.yes') }}</template>
            <template #unchecked>{{ $t('common.yesOrNo.no') }}</template>
          </NSwitch>
        </NFormItem>
        <NFormItem :label="$t('page.manage.content.editType')" path="editorType">
          <NRadioGroup v-model:value="model.editorType">
            <NRadioButton
              v-for="item in editTypeOptions"
              :key="item.value"
              :value="item.value as Api.SystemManage.ArticleEditType"
            >
              {{ item.label }}
            </NRadioButton>
          </NRadioGroup>
        </NFormItem>
        <NFormItem :label="$t('page.manage.content.content')" path="content">
          <MarkdownEditor v-if="model.editorType === 'MARKDOWN'" v-model="currentEditorContent" />
          <RichtextEditor v-else-if="model.editorType === 'RICHTEXT'" v-model="currentEditorContent" />
          <UploadEditor v-else v-model="currentEditorContent" />
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace>
          <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" :loading="loading" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
