import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

/**
 * Adds a `minutesRead` property to each page's frontmatter.
 */
export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    data.astro.frontmatter.minutesRead = readingTime.minutes;
  };
}
