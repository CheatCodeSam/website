export function slugToRoute(slug: string, collection: 'blog' | 'projects') {
  if (collection === 'blog') {
    const idAndTitle = slug.split('/')[1].replace(/\..*/g, '');
    const [id, titleUrl] = idAndTitle.split(/-(.*)/s); // e.g. "01-hello-world" becomes ["01", "hello-world"]
    return `/blog/${id}/${titleUrl}`;
  } else if (collection === 'projects') {
    return '/projects/' + slug;
  }
}

export function getDescriptionFromText(text: string, maxLength: number): string {
  // Return the raw text content of the page if its lenght doesn't exceed the description's max length.
  if (text.length <= maxLength) {
    return text;
  }

  // Truncate the text to the last word within the length limit and add dots to show that the text continues.
  const truncated = text.slice(0, 160);
  return truncated.substring(0, truncated.lastIndexOf(' ')) + '…';
}

export function localOrRemoteSrcToUrl(currUrl: URL, src: string) {
  return new URL(isValidUrl(src) ? src : currUrl.origin + src);
}

export function isValidUrl(str: string) {
  const urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
  return urlPattern.test(str);
}
