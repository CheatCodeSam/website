// Based on https://github.com/FinnRG/remark-mentions

import { findAndReplace } from "mdast-util-find-and-replace";

const userGroup = "[\\da-z][-\\da-z_]{0,38}";
const mentionRegex = new RegExp(
  "(?:^|\\s)@(" + userGroup + ")",
  "gi"
);

/**
 * Transforms mentions in the form of `@username` into links to the user's GitHub profile.
 */
export function remarkGitHubMentions() {
  // @ts-ignore
  return (tree, _file) => {
    findAndReplace(tree, [[mentionRegex, replaceMention]]);
  };

  /**
   * @param {string} value
   * @param {string} username
   */
  function replaceMention(value, username) {
    /** @type {PhrasingContent[]} */
    let whitespace = [];
    
    // Separate leading white space
    if (value.indexOf("@") > 0) {
      whitespace.push({
        type: "text",
        value: value.substring(0, value.indexOf("@")),
      });
    }

    return [
      ...whitespace,
      {
        type: "link",
        url: `https://github.com/${username}`,
        // Trim the username here
        children: [{ type: "text", value: value.trim() }],
      },
    ];
  }
}
