import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { slugToRoute } from '../../utils';

export const GET: APIRoute = async ({ site }) => {
    const blog = await getCollection('blog');
    const sortedBlog = blog.toSorted((a, b) => b.data.createdAt.getTime() - a.data.createdAt.getTime())
    const leanSortedBlog = sortedBlog.slice(0, 30)
    return rss({
        title: 'Joona Aalto',
        description: 'Joona Aalto\'s Personal Website',
        site: site!,
        items: leanSortedBlog.map(entry => ({
            title: entry.data.title,
            description: entry.data.description,
            pubDate: entry.data.createdAt,
            link: slugToRoute(entry.slug, entry.collection),
        })),
        customData: `<language>en-us</language>`,
    });
}
