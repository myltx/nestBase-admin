<script setup lang="ts">
import { computed } from 'vue';
import { articleStatusRecord, articleEditTypeRecord } from '@/constants/business';
import { $t } from '@/locales';

defineOptions({
  name: 'ArticlePreviewDrawer'
});

interface Props {
  article?: Api.SystemManage.Article | null;
}

const props = defineProps<Props>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const tagList = computed(() => props.article?.tagIds ?? []);

const statusLabel = computed(() =>
  props.article ? $t(articleStatusRecord[props.article.status]) : '-'
);

const editTypeLabel = computed(() =>
  props.article ? $t(articleEditTypeRecord[props.article.editorType]) : '-'
);

const previewContent = computed(() => {
  if (!props.article) return '';
  if (props.article.editorType === 'RICHTEXT') {
    return props.article.contentHtml || '';
  }
  if (props.article.editorType === 'UPLOAD') {
    return props.article.contentRaw || '';
  }
  return props.article.contentMd || '';
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="520">
    <NDrawerContent
      :title="props.article?.title || $t('page.manage.content.preview')"
      :native-scrollbar="false"
      closable
    >
      <div v-if="props.article?.coverImage" class="mb-12px">
        <img :src="props.article?.coverImage" alt="" class="max-h-200px w-full rounded-6px object-cover" />
      </div>
      <NDescriptions label-placement="top" bordered size="small">
        <NDescriptionsItem :label="$t('page.manage.content.articleTitle')">
          {{ props.article?.title || '-' }}
        </NDescriptionsItem>
        <NDescriptionsItem :label="$t('page.manage.content.articleSlug')">
          {{ props.article?.slug || '-' }}
        </NDescriptionsItem>
        <NDescriptionsItem :label="$t('page.manage.content.category')">
          {{ props.article?.categoryId || '-' }}
        </NDescriptionsItem>
        <NDescriptionsItem :label="$t('page.manage.content.author')">
          {{ props.article?.author || '-' }}
        </NDescriptionsItem>
        <NDescriptionsItem :label="$t('page.manage.content.statusTitle')">
          {{ statusLabel }}
        </NDescriptionsItem>
        <NDescriptionsItem :label="$t('page.manage.content.editType')">
          {{ editTypeLabel }}
        </NDescriptionsItem>
        <NDescriptionsItem :label="$t('page.manage.content.isTop')">
          {{ props.article?.isTop ? $t('common.yesOrNo.yes') : $t('common.yesOrNo.no') }}
        </NDescriptionsItem>
        <NDescriptionsItem :label="$t('page.manage.content.isRecommend')">
          {{ props.article?.isRecommend ? $t('common.yesOrNo.yes') : $t('common.yesOrNo.no') }}
        </NDescriptionsItem>
        <NDescriptionsItem :label="$t('page.manage.content.publishTime')">
          {{ props.article?.publishTime || '-' }}
        </NDescriptionsItem>
        <NDescriptionsItem :label="$t('page.manage.content.updateTime')">
          {{ props.article?.updateTime || '-' }}
        </NDescriptionsItem>
        <NDescriptionsItem :label="$t('page.manage.content.viewCount')">
          {{ props.article?.viewCount ?? 0 }}
        </NDescriptionsItem>
        <NDescriptionsItem :label="$t('page.manage.content.tagIds')">
          <NTag v-for="tag in tagList" :key="tag" type="info" class="mr-8px mb-8px">
            {{ tag }}
          </NTag>
          <span v-if="tagList.length === 0">-</span>
        </NDescriptionsItem>
        <NDescriptionsItem :label="$t('page.manage.content.summary')">
          <NScrollbar style="max-height: 160px">
            {{ props.article?.summary || '-' }}
          </NScrollbar>
        </NDescriptionsItem>
        <NDescriptionsItem :label="$t('page.manage.content.content')">
          <NScrollbar style="max-height: 240px">
            <div v-if="props.article?.editorType === 'RICHTEXT'" v-html="previewContent" class="richtext-view" />
            <div v-else class="whitespace-pre-wrap">
              {{ previewContent || '-' }}
            </div>
          </NScrollbar>
        </NDescriptionsItem>
      </NDescriptions>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped>
.richtext-view :deep(p) {
  margin: 0;
}
</style>
