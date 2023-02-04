<script lang="ts">
  import type { CollectionEntry } from 'astro:content';
  import { createEventDispatcher } from 'svelte';
  import TimeLabel from './TimeLabel.svelte';

  type Item = CollectionEntry<'blog'> | CollectionEntry<'projects'>;
  export let items: Item[] = [];

  const dispatch = createEventDispatcher();
  let filteredItems = items;

  let searchTerm = '';
  let selectedIndex = 0;
  let searchBarFocused = false;
  let searchBarElement: HTMLInputElement;
  let selectedElement: HTMLElement;
  let searchBoxElement: HTMLElement;

  $: {
    filteredItems = items.filter((item) => isValid(item, searchTerm));

    if (selectedIndex > filteredItems.length - 1) {
      selectedIndex = filteredItems.length - 1;
    }

    dispatch('search', filteredItems);
  }

  const getItemUrl = (item: Item) => item.data.url || `/${item.collection}/${item.slug}`;

  function isValid(item: Item, searchTerm: string): boolean {
    let slice = item.data.title?.toLowerCase();

    if (!slice) {
      return false;
    }

    for (const char of searchTerm.toLowerCase().split('')) {
      if (!slice.includes(char)) {
        return false;
      }
      slice = slice.slice(slice.indexOf(char) + 1);
    }

    return true;
  }

  function handleSearchBarKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      searchBarElement.blur();
    }

    // Scroll to make sure the selected item is visible
    if (event.key === 'ArrowUp') {
      if (selectedIndex > 0) {
        event.preventDefault();
        selectedIndex--;
      }

      let selectedTop = selectedElement.offsetTop - searchBarElement.offsetHeight;
      let scrollTarget = selectedTop - selectedElement.offsetHeight;

      if (searchBoxElement.scrollTop > scrollTarget) {
        searchBoxElement.scrollTo(0, scrollTarget);
      }
    }

    // Scroll to make sure the selected item is visible
    if (event.key === 'ArrowDown') {
      if (selectedIndex < filteredItems.length - 1) {
        event.preventDefault();
        selectedIndex++;
      }

      let boxBottom = searchBoxElement.offsetHeight;
      let selectedBottom = selectedElement.offsetTop + selectedElement.offsetHeight - searchBarElement.offsetHeight;
      let scrollTarget = selectedBottom - boxBottom + selectedElement.offsetHeight;

      if (searchBoxElement.scrollTop < scrollTarget) {
        searchBoxElement.scrollTo(0, scrollTarget);
      }
    }

    if (event.key === 'Enter') {
      window.location.pathname = getItemUrl(filteredItems[selectedIndex]) || window.location.pathname;
    }
  }
</script>

<svelte:window
  on:keydown={(event) => {
    if (event.key === 'k' && event.ctrlKey) {
      event.preventDefault();
      searchBarElement.focus();
    }
  }}
/>

<div class="search-bar">
  <input
    type="search"
    name="searchBar"
    id="searchBar"
    placeholder="Search posts and projects (Ctrl+K)"
    bind:this={searchBarElement}
    bind:value={searchTerm}
    on:keydown={handleSearchBarKeyDown}
    on:focus={(_) => (searchBarFocused = true)}
    on:focusout={(_) => (searchBarFocused = false)}
  />

  <div class="search-box" style={searchBarFocused ? 'box-shadow: 0 0 0.75rem gray;' : ''}>
    {#if searchBarFocused}
      <ul
        on:mousedown|preventDefault={(_) => {}}
        style:height={filteredItems.length > 0 ? filteredItems.length * 3 + 'rem' : '3rem'}
        bind:this={searchBoxElement}
      >
        {#each filteredItems as item, index}
          {#if selectedIndex === index}
            <li class="search-result selected" bind:this={selectedElement}>
              <a href={getItemUrl(item)}>
                <span class="search-result-title">{item.data.title}</span>

                <TimeLabel
                  className="time-label"
                  date={new Date(item.data.createdAt)}
                  yearFormat={'numeric'}
                  monthFormat={'short'}
                  dayFormat={'2-digit'}
                />
              </a>
            </li>
          {:else}
            <li class="search-result">
              <a href={getItemUrl(item)}>
                <span class="search-result-title">{item.data.title}</span>

                <TimeLabel
                  className="time-label"
                  date={new Date(item.data.createdAt)}
                  yearFormat={'numeric'}
                  monthFormat={'short'}
                  dayFormat={'2-digit'}
                />
              </a>
            </li>
          {/if}
        {/each}

        {#if filteredItems.length === 0}
          <li>No results found.</li>
        {/if}
      </ul>
    {/if}
  </div>
</div>

<style lang="scss">
  $searchBarInputHeight: 3rem;

  .search-bar {
    height: $searchBarInputHeight;
    position: relative;
    border-radius: 0.5rem;
    background-color: var(--bg-2);

    input {
      position: absolute;
      width: 100%;
      height: 100%;
      padding: 0 1rem;
      box-sizing: border-box;
      outline: none;
      border: none;
      background-color: transparent;
      font-size: 1.2em;
      font-family: monospace;
      color: var(--text-color-1);
      z-index: 1;
    }
  }

  .search-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding-top: $searchBarInputHeight;
    background-color: var(--bg-2);
    z-index: 0;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 0 0.75rem transparent;
    transition: box-shadow 100ms;

    ul {
      width: 100%;
      max-height: 21rem;
      padding: 0;
      margin: 0;
      list-style: none;
      overflow: auto;

      li.search-result {
        display: block;
        width: 100%;
        height: 3rem;
        line-height: 3rem;
        font-size: 1.1em;
        padding: 0;

        &:hover,
        &.selected {
          background-color: var(--bg-1);
        }

        a {
          width: 100%;
          padding: 0 1rem;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: var(--text-color-1);
          text-decoration: none;
        }
      }
    }
  }
</style>
