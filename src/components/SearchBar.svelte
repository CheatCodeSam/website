<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { SearchEntry } from "../types";

  export let entries: SearchEntry[] = [];

  const dispatch = createEventDispatcher();
  let filteredItems = entries;

  let searchTerm = "";
  let selectedIndex = 0;
  let searchBarFocused = false;
  let searchBarElement: HTMLInputElement;
  let selectedElement: HTMLElement;
  let searchBoxElement: HTMLElement;
  let windowWidth: number;
  let searchOpen = false;
  $: smallLayout = !windowWidth || windowWidth <= 640;

  $: {
    filteredItems = entries.filter((item) => isValid(item, searchTerm));

    if (selectedIndex > filteredItems.length - 1) {
      selectedIndex = filteredItems.length - 1;
    }

    dispatch("search", filteredItems);
  }

  function isValid(item: SearchEntry, searchTerm: string): boolean {
    let slice = item.title.toLowerCase();

    if (!slice) {
      return false;
    }

    for (const char of searchTerm.toLowerCase().split("")) {
      if (!slice.includes(char)) {
        return false;
      }
      slice = slice.slice(slice.indexOf(char) + 1);
    }

    return true;
  }

  function handleSearchBarKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      searchBarElement.blur();
      searchOpen = false;
    }

    let selectedHeight = selectedElement.offsetHeight;

    let boxTop = searchBoxElement.scrollTop;
    let selectedTop = selectedElement.offsetTop;
    let selectedTopScrollPos = selectedTop - searchBarElement.offsetHeight;

    let boxBottom = searchBoxElement.scrollTop + searchBoxElement.clientHeight;
    let selectedBottom =
      selectedElement.offsetTop + selectedElement.offsetHeight;
    let selectedBottomScrollPos =
      selectedBottom -
      searchBoxElement.clientHeight -
      searchBarElement.offsetHeight;

    // Scroll to make sure the selected item is visible
    if (event.key === "ArrowUp") {
      if (selectedIndex > 0) {
        event.preventDefault();
        selectedIndex--;
      }

      // Selected entry above view
      if (boxTop + selectedHeight > selectedTopScrollPos) {
        searchBoxElement.scrollTo(0, selectedTopScrollPos - selectedHeight);
      }

      if (boxBottom + selectedHeight < selectedBottom) {
        searchBoxElement.scrollTo(0, selectedBottomScrollPos - selectedHeight);
      }
    }

    // Scroll to make sure the selected item is visible
    if (event.key === "ArrowDown") {
      if (selectedIndex < filteredItems.length - 1) {
        event.preventDefault();
        selectedIndex++;
      }

      if (boxBottom < selectedBottom) {
        searchBoxElement.scrollTo(0, selectedBottomScrollPos + selectedHeight);
      }

      // Selected entry above view
      if (boxTop > selectedTopScrollPos) {
        searchBoxElement.scrollTo(0, selectedTopScrollPos + selectedHeight);
      }
    }

    if (event.key === "Enter") {
      window.location.href = filteredItems[selectedIndex].href;
    }
  }
</script>

<svelte:window
  on:keydown={(event) => {
    if (event.key === "k" && event.ctrlKey) {
      event.preventDefault();
      searchOpen = true;
      searchBarElement.focus();
    }
  }}
  bind:innerWidth={windowWidth}
/>

<button class="search-button" on:click={() => (searchOpen = true)}>🔍</button>

<div
  class="search-bar"
  style:display={!smallLayout || searchOpen ? "flex" : ""}
>
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

  <button
    class="close-search-button"
    on:click={() => (searchOpen = false)}
    style:display={smallLayout && searchOpen ? "flex" : ""}>x</button
  >

  <div
    class="search-box"
    style:display={searchBarFocused || searchOpen ? "block" : ""}
  >
    <hr />
    <ul
      on:mousedown|preventDefault={(_) => {}}
      style:height={smallLayout
        ? "100%"
        : filteredItems.length > 0
        ? filteredItems.length * 2.5 + "rem"
        : "2.5rem"}
      bind:this={searchBoxElement}
    >
      {#each filteredItems as item, index}
        {#if selectedIndex === index}
          <li class={"search-result selected"} bind:this={selectedElement}>
            <a href={item.href}>
              <span class="search-result-type">{item.type}</span>
              <span class="search-result-title">{item.title}</span>
            </a>
          </li>
        {:else}
          <li class={"search-result"}>
            <a href={item.href}>
              <span class="search-result-type">{item.type}</span>
              <span class="search-result-title">{item.title}</span>
            </a>
          </li>
        {/if}
      {/each}

      {#if filteredItems.length === 0}
        <li class="no-results">No results found.</li>
      {/if}
    </ul>
  </div>
</div>

<style lang="scss">
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    padding: 0;
    font-size: 1rem;
    border: none;
    border-radius: 50%;
    outline: none;
    background-color: var(--bg-2);
    color: var(--text-color-1);
    cursor: pointer;
  }

  .search-button {
    display: none;
  }

  .search-bar {
    --search-bar-input-height: 2.5rem;
    width: 100%;
    height: 2.5rem;
    position: relative;
    background-color: var(--bg-1);
    outline: 2px solid var(--bg-2);
    box-sizing: border-box;
    border-radius: 0.5rem;
    z-index: 2;

    button {
      position: absolute;
      top: calc(var(--search-bar-input-height) / 4);
      right: 1.5rem;
      z-index: 2;
    }

    .close-search-button {
      display: none;
    }

    input {
      position: absolute;
      width: 100%;
      height: var(--search-bar-input-height);
      padding: 0 1rem;
      box-sizing: border-box;
      outline: none;
      border: none;
      border-radius: 0.5rem;
      background-color: transparent;
      font-size: 1em;
      font-family: system-ui, -apple-system, sans-serif;
      color: var(--text-color-1);
      z-index: 1;
    }
  }

  .search-box {
    position: absolute;
    display: none;
    top: 0;
    left: 0;
    width: 100%;
    padding-top: var(--search-bar-input-height);
    background-color: var(--bg-1);
    z-index: 0;
    outline: 2px solid var(--bg-2);
    box-sizing: border-box;
    border-radius: 0.5rem;
    overflow: hidden;

    hr {
      position: absolute;
      top: var(--search-bar-input-height);
      width: 100%;
      height: 2px;
      color: var(--bg-2);
      background-color: var(--bg-2);
      margin: 0;
    }

    ul {
      width: 100%;
      max-height: calc(6 * 2.5rem);
      padding: 0;
      margin: 0;
      list-style: none;
      overflow: auto;

      li {
        width: 100%;
        height: 2.5rem;
        padding: 0 1rem;
        line-height: 2.5rem;
        font-size: 1.1em;
        box-sizing: border-box;
        white-space: nowrap;

        &:not(.no-results):hover,
        &.selected {
          background-color: var(--bg-2);
        }

        a {
          width: 100%;
          display: flex;
          gap: 1rem;
          overflow: hidden;
          color: var(--text-color-1);
          text-decoration: none;
        }

        .search-result-type {
          display: block;
          min-width: 3rem;
          color: var(--text-color-2);
        }
      }
    }
  }

  @media only screen and (max-width: 640px) {
    .search-bar {
      --search-bar-input-height: 4rem;
      width: 100vw;
      height: 4rem;
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      border-radius: 0;
    }

    .search-button {
      display: flex;
    }

    .search-box {
      height: 100vh;
      border: none;
      border-radius: 0;
    }

    .search-bar .search-box ul {
      max-height: calc(100vh - var(--search-bar-input-height));
    }
  }
</style>
