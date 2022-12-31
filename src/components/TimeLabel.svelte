<script lang="ts">
  interface Props {
    className?: string;
    date?: Date;
    yearFormat?: 'numeric' | '2-digit';
    monthFormat?: 'short' | 'long' | 'numeric' | '2-digit' | 'narrow';
    dayFormat?: 'numeric' | '2-digit';
  }

  export let { className, date, yearFormat, monthFormat, dayFormat }: Props = {};

  $: formattedDate = date?.toLocaleDateString('en-US', {
    year: yearFormat,
    month: monthFormat,
    day: dayFormat,
  });
</script>

<time class={className} datetime={date?.toString()}>{formattedDate}</time>

<style lang="scss">
  time {
    font-size: 1.2em;
    opacity: 0.5;
    font-family: monospace;
  }
</style>
