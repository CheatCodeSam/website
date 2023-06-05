<script lang="ts">
  interface Props {
    className?: string;
    date?: Date;
    yearFormat?: "numeric" | "2-digit";
    monthFormat?: "short" | "long" | "numeric" | "2-digit" | "narrow";
    dayFormat?: "numeric" | "2-digit";
    prefix?: string;
  }

  export let {
    className,
    date,
    yearFormat,
    monthFormat,
    dayFormat,
    prefix = "",
  }: Props = {};

  $: formattedDate = date?.toLocaleDateString("en-US", {
    year: yearFormat,
    month: monthFormat,
    day: dayFormat,
  });
</script>

<time class={className} datetime={date?.toString()}
  >{prefix}{formattedDate}</time
>

<style lang="scss">
  time {
    margin: 0;
  }
</style>
