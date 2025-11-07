<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import dayjs from 'dayjs';
import { articleStatusOptions } from '@/constants/business';
import { createArticle, updateArticle } from '@/service/api/content';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { translateOptions } from '@/utils/common';
import { $t } from '@/locales';

defineOptions({
  name: 'ArticleOperateDrawer'
});

interface Props {
  /** 操作类型 */
  operateType: NaiveUI.TableOperateType;
  /** 编辑数据 */
  rowData?: Api.SystemManage.Article | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const loading = ref(false);

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const statusOptions = computed(() => translateOptions(articleStatusOptions));

type Model = Api.SystemManage.CreateArticle & { tagsInput?: string };

const model = ref<Model>(createDefaultModel());

function createDefaultModel(): Model {
  return {
    title: '',
    slug: '',
    category: '',
    summary: '',
    coverUrl: '',
    content: '',
    tags: [],
    author: '',
    publishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    isTop: false,
    status: 'DRAFT',
    tagsInput: ''
  };
}

const isEdit = computed(() => props.operateType === 'edit');

const drawerTitle = computed(() => {
  return isEdit.value ? $t('page.manage.content.editArticle') : $t('page.manage.content.addArticle');
});

const rules: Record<string, App.Global.FormRule | App.Global.FormRule[]> = {
  title: defaultRequiredRule,
  category: defaultRequiredRule,
  author: defaultRequiredRule,
  status: defaultRequiredRule
};

function closeDrawer() {
  visible.value = false;
}

function parseTags(input?: string) {
  if (!input) return [];
  return input
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);
}

function handleInitModel() {
  const defaultModel = createDefaultModel();
  const article = props.rowData;
  if (article) {
    const tags = article.tags || [];
    Object.assign(defaultModel, {
      title: article.title || '',
      slug: article.slug || '',
      category: article.category || '',
      summary: article.summary || '',
      coverUrl: article.coverUrl || '',
      content: article.content || '',
      tags,
      author: article.author || '',
      publishTime: article.publishTime || '',
      isTop: article.isTop ?? false,
      status: article.status ?? 'DRAFT',
      tagsInput: tags.join(', ')
    });
  }
  model.value = defaultModel;
}

async function handleSubmit() {
  loading.value = true;
  try {
    await validate();

    const { tagsInput, ...rest } = model.value;
    const payload: Api.SystemManage.CreateArticle = {
      ...rest,
      tags: parseTags(tagsInput)
    };
    model.value.tags = payload.tags;

    if (isEdit.value && props.rowData) {
      const params: Api.SystemManage.UpdateArticle = { ...payload, id: props.rowData.id };
      await updateArticle(params);
      window.$message?.success($t('common.updateSuccess'));
      emit('submitted');
      closeDrawer();
    } else {
      const params: Api.SystemManage.CreateArticle = payload;
      await createArticle(params);
      window.$message?.success($t('common.addSuccess'));
      emit('submitted');
      closeDrawer();
    }
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
        <NFormItem :label="$t('page.manage.content.category')" path="category">
          <NInput v-model:value="model.category" :placeholder="$t('page.manage.content.form.category')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.content.author')" path="author">
          <NInput v-model:value="model.author" :placeholder="$t('page.manage.content.form.author')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.content.statusTitle')" path="status">
          <NSelect
            v-model:value="model.status"
            :options="statusOptions"
            :placeholder="$t('page.manage.content.form.status')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.manage.content.isTop')" path="isTop">
          <NSwitch v-model:value="model.isTop">
            <template #checked>{{ $t('common.yesOrNo.yes') }}</template>
            <template #unchecked>{{ $t('common.yesOrNo.no') }}</template>
          </NSwitch>
        </NFormItem>
        <NFormItem :label="$t('page.manage.content.tags')" path="tags">
          <NInput
            v-model:value="model.tagsInput"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            :placeholder="$t('page.manage.content.form.tags')"
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
        <NFormItem :label="$t('page.manage.content.summary')" path="summary">
          <NInput
            v-model:value="model.summary"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 6 }"
            :placeholder="$t('page.manage.content.form.summary')"
          />
        </NFormItem>
        <NFormItem :label="$t('page.manage.content.coverUrl')" path="coverUrl">
          <NInput v-model:value="model.coverUrl" :placeholder="$t('page.manage.content.form.coverUrl')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.content.content')" path="content">
          <NInput
            v-model:value="model.content"
            type="textarea"
            :rows="8"
            :placeholder="$t('page.manage.content.form.content')"
          />
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
