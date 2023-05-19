<script lang="ts">
  import type { CollectionEntry } from "astro:content";
  import { getDescriptionFromText, slugToRoute } from "../utils";
  import Markdown from "./Markdown.svelte";
  import Tag from "./Tag.svelte";
  import TimeLabel from "./TimeLabel.svelte";
  import { getPreferredTheme, theme } from "../stores";
  import { onMount } from "svelte";

  export let page: CollectionEntry<"blog"> | CollectionEntry<"projects">;

  let mounted = false;
  let description =
    page.data.description ?? getDescriptionFromText(page.body, 160);
  let pageUrl = page.data.url || slugToRoute(page.slug, page.collection);

  $: currentTheme = $theme === "auto" && mounted ? getPreferredTheme() : $theme;

  onMount(() => (mounted = true));
</script>

<li class="card-container">
  <TimeLabel
    className="time-label"
    date={new Date(page.data.createdAt)}
    monthFormat={"short"}
    dayFormat={"2-digit"}
  />

  <div class="card">
    <!-- This link is enlarged to fit the whole card using an absolutely positioned pseudo element. -->
    <a
      class="card-link"
      href={pageUrl}
      aria-label={`Read blog post titled: "${page.data.title}`}
      >{page.data.title}</a
    >

    <div class="card-header">
      <h2>
        <a href={pageUrl}>{page.data.title}</a>
      </h2>

      {#if page.data.links}
        <ul class="links">
          {#each page.data.links as link}
            <li>
              <a
                href={link.url}
                title={link.text || ""}
                target="_blank"
                rel="noreferrer"
              >
                {#if link.img}
                  <img
                    src={link.img.darkThemeSrc && $theme === "dark"
                      ? link.img.darkThemeSrc
                      : link.img.src}
                    alt={link.img.alt}
                  />
                {/if}
              </a>
            </li>
          {/each}
        </ul>
      {/if}
    </div>

    <div class="card-body">
      <div class="card-content">
        {#if page.data.tags}
          <ul class="tags">
            {#each page.data.tags as tag}
              <li class="tags-item">
                <Tag name={tag} type={page.collection} />
              </li>
            {/each}
          </ul>
        {/if}

        <div class="description">
          <Markdown markdown={description} />
        </div>
      </div>

      {#if page.data.thumbnail}
        <a class="thumbnail" href={pageUrl} title={page.data.title}>
          <img
            src={page.data.thumbnail.src}
            alt={page.data.thumbnail.alt}
            width={page.data.thumbnail.width}
            height={page.data.thumbnail.height}
          />
        </a>
      {/if}
    </div>
  </div>
</li>

<style lang="scss">
  $gap: 1rem;
  $borderRadius: 0.6rem;
  $timeLabelWidth: 6ch;

  .card-container {
    position: relative;
    display: flex;
    gap: $gap;
    list-style: none;
    color: var(--text-color-1);
  }

  .card-container a {
    display: block;
    color: var(--text-color-1);
    text-decoration: none;

    &.card-link {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 0;
      color: transparent;
    }
  }

  :global(.time-label) {
    margin-top: 1rem;
    display: block;
    color: rgba(var(--text-color-2), 0.8);
    min-width: $timeLabelWidth;
  }

  .card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: calc(
      100% - $timeLabelWidth - $gap
    ); // The full width minus the width of the time label
    box-sizing: border-box;
    background-color: var(--bg-2);
    border-radius: $borderRadius;
    transition: box-shadow 200ms;
    padding: 1rem;

    &:hover {
      box-shadow: 0 0 1rem rgb(var(--accent-1-rgb), 0.25);
    }
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      margin: 0;
      padding: 0;
      font-size: 1.25rem;
    }

    .links {
      display: flex;
      list-style: none;
      padding: 0;
      margin: 0;

      a {
        z-index: 1;
        position: relative;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        gap: 0.5rem;
      }

      img {
        display: block;
        width: 2rem;
        height: 2rem;
      }
    }
  }

  .card-body {
    flex: 1;
    display: flex;
    gap: 1rem;
  }

  .card-content {
    flex: 1;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    transition: box-shadow 200ms;

    div.description {
      margin: 0;
      box-sizing: border-box;
    }
  }

  ul.tags {
    display: flex;
    padding: 0;
    margin: 0.25rem 0;
    gap: 0.3rem 0.5rem;
    flex-wrap: wrap;

    li.tags-item {
      list-style: none;
      padding: 0;
      margin: 0;
      z-index: 1;
    }
  }

  div.description :global(:last-child) {
    margin-bottom: 0;
  }

  div.description {
    :global(*),
    :global(.katex),
    :global(.katex > .katex-html) {
      display: inline;
      font-size: 1em;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    :global(h1)::before {
      content: "# ";
    }

    :global(h2)::before {
      content: "## ";
    }

    :global(h3)::before {
      content: "### ";
    }

    :global(li)::before {
      content: "- ";
    }

    :global(img) {
      display: none;
    }

    :global(a) {
      z-index: 1;
      position: relative;
    }
  }

  a.thumbnail {
    max-width: calc(50% - $gap / 2); // Half of the parent's size
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: $borderRadius;

    :global(img) {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 16rem;
      margin: 0;
      padding: 0;
      border-radius: $borderRadius;
    }
  }

  @media only screen and (max-width: 640px) {
    .card-body {
      flex-direction: column;
    }

    a.thumbnail {
      max-width: 100%;
      height: auto;

      :global(img) {
        max-width: 100%;
        max-height: 16rem;
      }
    }
  }
</style>
