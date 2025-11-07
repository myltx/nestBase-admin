<script setup lang="ts">
import { computed } from 'vue';
import { articleStatusRecord } from '@/constants/business';
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

const tagList = computed(() => props.article?.tags ?? []);

const statusLabel = computed(() =>
  props.article ? $t(articleStatusRecord[props.article.status]) : '-'
);
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="520">
    <NDrawerContent
      :title="props.article?.title || $t('page.manage.content.preview')"
      :native-scrollbar="false"
      closable
    >
      <NDescriptions label-placement="top" bordered size="small">
        <NDescriptionsItem :label="$t('page.manage.content.articleTitle')">
          {{ props.article?.title || '-' }}
        </NDescriptionsItem>
        <NDescriptionsItem :label="$t('page.manage.content.articleSlug')">
          {{ props.article?.slug || '-' }}
        </NDescriptionsItem>
        <NDescriptionsItem :label="$t('page.manage.content.category')">
          {{ props.article?.category || '-' }}
        </NDescriptionsItem>
        <NDescriptionsItem :label="$t('page.manage.content.author')">
          {{ props.article?.author || '-' }}
        </NDescriptionsItem>
        <NDescriptionsItem :label="$t('page.manage.content.status')">
          {{ statusLabel }}
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
        <NDescriptionsItem :label="$t('page.manage.content.tags')">
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
            <div class="whitespace-pre-wrap">
              {{ props.article?.content || '-' }}
            </div>
          </NScrollbar>
        </NDescriptionsItem>
      </NDescriptions>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
