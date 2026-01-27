import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'flowfuse/website',
  },
  collections: {
    docs: collection({
      label: 'Handbook Pages',
      slugField: 'title',
      path: 'astro/src/content/docs/handbook/**',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        navGroup: fields.text({
          label: 'Navigation Group',
          description: 'Group label for sidebar navigation',
        }),
        content: fields.mdx({
          label: 'Content',
        }),
      },
    }),
  },
});
