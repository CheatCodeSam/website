<script lang="ts">
  import { unified } from 'unified';
  import remarkParse from 'remark-parse';
  import remarkRehype from 'remark-rehype';
  import remarkMath from 'remark-math';
  import rehypeKatex from 'rehype-katex';
  import rehypeStringify from 'rehype-stringify';

  export let markdown: string;

  $: htmlContent = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(remarkMath)
    .use(rehypeKatex)
    .use(rehypeStringify)
    .processSync(markdown)
    .toString();
</script>

{@html htmlContent}
