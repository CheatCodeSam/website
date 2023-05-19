<script lang="ts">
  import { onMount } from "svelte";

  export let className: string = "";
  export let name: string;
  export let type: "blog" | "projects";

  let url: URL;
  let classList = ["tag", ...className.split(" ")];

  onMount(() => (url = new URL(window.location.href)));

  $: searchParams = url?.searchParams;
  $: searchParamsTags =
    url?.pathname === `/${type}` ? searchParams.getAll("tag") : [];
  $: href = url
    ? searchParamsTags.includes(name)
      ? urlWithRemovedTag()
      : urlWithAddedTag()
    : "";

  function urlWithAddedTag(): string {
    const formattedParams = searchParams.toString().replaceAll("%2F", "/");
    const paramsWithAddedTag =
      formattedParams.length > 0
        ? formattedParams + "&tag=" + name
        : "tag=" + name;
    return `/${type}?${paramsWithAddedTag.replaceAll("&&", "&")}`;
  }

  function urlWithRemovedTag(): string {
    const formattedParams = searchParams.toString().replaceAll("%2F", "/");
    const paramsWithRemovedTag = formattedParams
      .replace("&tag=" + name, "")
      .replace("tag=" + name, "");
    return `/${type}${
      paramsWithRemovedTag.toString().length > 0
        ? "?" + paramsWithRemovedTag.replaceAll("&&", "&")
        : ""
    }`.replaceAll("?&", "?");
  }
</script>

<a class={classList.join(" ")} {href}>#{name}</a>

<style lang="scss">
  .tag {
    display: inline;
    padding: 0.3em 0.45em;
    font-size: 0.8em;
    font-weight: bold;
    background: rgba(var(--accent-1-rgb), 10%);
    color: var(--accent-1);
    border-radius: 0.4rem;
    text-decoration: none;
    font-family: "Fira Code", monospace;
  }
</style>
