<script setup lang="tsx">
import { ref } from 'vue';
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { articleEditTypeRecord, articleStatusRecord } from '@/constants/business';
import { yesOrNoRecord } from '@/constants/common';
import { deleteArticle, fetchGetArticleList, updateArticleStatus, updateArticleTop } from '@/service/api/content';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { $t } from '@/locales';
import ArticleSearch from './modules/article-search.vue';
import ArticleOperateDrawer from './modules/article-operate-drawer.vue';
import ArticlePreviewDrawer from './modules/article-preview-drawer.vue';

const appStore = useAppStore();
const statusActionId = ref<number | null>(null);
const topActionId = ref<number | null>(null);
const deleteActionId = ref<number | null>(null);

const previewVisible = ref(false);
const previewArticle = ref<Api.SystemManage.Article | null>(null);
const statusTagMap: Record<Api.SystemManage.ArticleStatus, NaiveUI.ThemeColor> = {
  DRAFT: 'default',
  PUBLISHED: 'success',
  OFFLINE: 'warning'
};

const booleanTagMap: Record<CommonType.YesOrNo, NaiveUI.ThemeColor> = {
  Y: 'primary',
  N: 'default'
};

const {
  columns,
  columnChecks,
  data,
  loading,
  getData,
  getDataByPage,
  mobilePagination,
  searchParams,
  resetSearchParams
} = useTable({
  apiFn: fetchGetArticleList,
  showTotal: true,
  apiParams: {
    current: 1,
    size: 10,
    title: null,
    categoryId: null,
    status: null,
    isTop: null,
    isRecommend: null,
    editorType: null,
    dateRange: null
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'index',
      title: $t('common.index'),
      width: 64,
      align: 'center'
    },
    {
      key: 'title',
      title: $t('page.manage.content.articleTitle'),
      minWidth: 180
    },
    {
      key: 'categoryId',
      title: $t('page.manage.content.category'),
      width: 120
    },
    {
      key: 'tagIds',
      title: $t('page.manage.content.tagIds'),
      minWidth: 140,
      render: row => (row.tagIds && row.tagIds.length ? row.tagIds.join(', ') : '-')
    },
    {
      key: 'author',
      title: $t('page.manage.content.author'),
      width: 120
    },
    {
      key: 'status',
      title: $t('page.manage.content.statusTitle'),
      align: 'center',
      width: 120,
      render: row => {
        const type = statusTagMap[row.status];
        const label = $t(articleStatusRecord[row.status]);
        return <NTag type={type}>{label}</NTag>;
      }
    },
    {
      key: 'isTop',
      title: $t('page.manage.content.isTop'),
      align: 'center',
      width: 100,
      render: row => {
        const flag: CommonType.YesOrNo = row.isTop ? 'Y' : 'N';
        const label = $t(yesOrNoRecord[flag]);
        return <NTag type={booleanTagMap[flag]}>{label}</NTag>;
      }
    },
    {
      key: 'isRecommend',
      title: $t('page.manage.content.isRecommend'),
      align: 'center',
      width: 120,
      render: row => {
        const flag: CommonType.YesOrNo = row.isRecommend ? 'Y' : 'N';
        const label = $t(yesOrNoRecord[flag]);
        return <NTag type={booleanTagMap[flag]}>{label}</NTag>;
      }
    },
    {
      key: 'editorType',
      title: $t('page.manage.content.editType'),
      align: 'center',
      width: 140,
      render: row => $t(articleEditTypeRecord[row.editorType])
    },
    {
      key: 'publishTime',
      title: $t('page.manage.content.publishTime'),
      width: 180
    },
    {
      key: 'updateTime',
      title: $t('page.manage.content.updateTime'),
      width: 180
    },
    {
      key: 'viewCount',
      title: $t('page.manage.content.viewCount'),
      align: 'center',
      width: 100
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      width: 280,
      align: 'center',
      render: row => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" onClick={() => handlePreview(row)}>
            {$t('page.manage.content.preview')}
          </NButton>
          <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
            {$t('common.edit')}
          </NButton>
          <NButton
            ghost
            size="small"
            type={row.status === 'PUBLISHED' ? 'warning' : 'success'}
            loading={statusActionId.value === row.id}
            onClick={() => toggleStatus(row)}
          >
            {row.status === 'PUBLISHED' ? $t('page.manage.content.offlineAction') : $t('page.manage.content.publish')}
          </NButton>
          <NButton ghost size="small" type="info" loading={topActionId.value === row.id} onClick={() => toggleTop(row)}>
            {row.isTop ? $t('page.manage.content.cancelTop') : $t('page.manage.content.setTop')}
          </NButton>
          <NPopconfirm showIcon={false} onPositiveClick={() => handleDelete(row.id)}>
            {{
              default: () => $t('common.confirmDelete'),
              trigger: () => (
                <NButton type="error" ghost size="small" loading={deleteActionId.value === row.id}>
                  {$t('common.delete')}
                </NButton>
              )
            }}
          </NPopconfirm>
        </div>
      )
    }
  ]
});

const { drawerVisible, operateType, editingData, handleAdd, handleEdit, checkedRowKeys, onBatchDeleted, onDeleted } =
  useTableOperate(data, getData);

function handlePreview(article: Api.SystemManage.Article) {
  previewArticle.value = article;
  previewVisible.value = true;
}

async function toggleStatus(article: Api.SystemManage.Article) {
  statusActionId.value = article.id;
  const nextStatus: Api.SystemManage.ArticleStatus = article.status === 'PUBLISHED' ? 'OFFLINE' : 'PUBLISHED';

  try {
    await updateArticleStatus(article.id, nextStatus);
    window.$message?.success($t('common.updateSuccess'));
    await getData();
  } finally {
    statusActionId.value = null;
  }
}

async function toggleTop(article: Api.SystemManage.Article) {
  topActionId.value = article.id;
  try {
    await updateArticleTop(article.id, !article.isTop);
    window.$message?.success($t('common.updateSuccess'));
    await getData();
  } finally {
    topActionId.value = null;
  }
}

async function handleBatchDelete() {
  if (!checkedRowKeys.value.length) return;
  deleteActionId.value = -1;
  try {
    for (const key of checkedRowKeys.value) {
      const id = Number(key);
      await deleteArticle(id);
    }
    await onBatchDeleted();
  } finally {
    deleteActionId.value = null;
  }
}

async function handleDelete(id: number) {
  deleteActionId.value = id;
  try {
    await deleteArticle(id);
    await onDeleted();
  } finally {
    deleteActionId.value = null;
  }
}

function edit(id: number) {
  handleEdit(id);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <ArticleSearch v-model:model="searchParams" @reset="resetSearchParams" @search="() => getDataByPage(1)" />
    <NCard
      :title="$t('page.manage.content.title')"
      :bordered="false"
      size="small"
      class="card-wrapper sm:flex-1-hidden"
    >
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          @add="handleAdd"
          @delete="handleBatchDelete"
          @refresh="getData"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="1400"
        :loading="loading"
        :row-key="row => row.id"
        :pagination="mobilePagination"
        remote
        class="sm:h-full"
      />
      <ArticleOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
      <ArticlePreviewDrawer v-model:visible="previewVisible" :article="previewArticle" />
    </NCard>
  </div>
</template>

<style scoped></style>
