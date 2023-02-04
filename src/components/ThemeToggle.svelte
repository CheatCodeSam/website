<script lang="ts">
  import { onMount } from 'svelte';
  import { getPreferredTheme, theme, toggleTheme } from '../stores';

  let mounted = false;
  $: currentTheme = $theme === 'auto' && mounted ? getPreferredTheme() : $theme;

  onMount(() => (mounted = true));
</script>

<button class="theme-toggle" on:click={toggleTheme}>
  <span style:filter={currentTheme !== 'light' ? 'grayscale(100%)' : ''}>☀️</span>
  <div
    class="pill"
    style:translate={currentTheme === null ? '1rem -50%' : currentTheme === 'light' ? '0 -50%' : '2rem -50%'}
    style:opacity={currentTheme === null ? '0' : '1'}
  />
  <span style:filter={currentTheme !== 'dark' ? 'grayscale(100%)' : ''}>🌙</span>
</button>

<style lang="scss">
  .theme-toggle {
    position: relative;
    min-width: 4rem;
    min-height: 2rem;
    margin: 0;
    padding: 0.2rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: none;
    outline: none;
    border-radius: 1rem;
    background-color: var(--bg-2);
    font-size: 1rem;
    transition: opacity 1s;
    cursor: pointer;

    span {
      display: flex;
      width: 1.6rem;
      height: 1.6rem;
      justify-content: center;
      align-items: center;
      z-index: 1;
    }

    .pill {
      position: absolute;
      top: 50%;
      width: 1.6rem;
      height: 1.6rem;
      background-color: rgba(var(--accent-rgb), 0.8);
      border-radius: 50%;
      z-index: 0;
      transition: opacity 200ms;
    }
  }
</style>
