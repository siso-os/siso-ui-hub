// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/blog/topics.ts)
import type { CSSProperties } from 'react';
import { posts, type SisoBlogPost } from './posts';

export const topics = [
  { id: 'ui-hub', name: 'UI Hub', color: '#1f69ff', glyph: 'ui-hub', family: 'ui-hub' },
  { id: 'library', name: 'Great Library', color: '#7540b7', glyph: 'library', family: 'library' },
  { id: 'agent-base', name: 'Agent Base', color: '#ed615a', glyph: 'os', family: 'os' },
  { id: 'voice', name: 'Voice', color: '#e0336a', glyph: 'voice', family: 'voice' },
  { id: 'agency', name: 'Agency', color: '#00a879', glyph: 'agency', family: 'agency' },
  { id: 'research', name: 'Research', color: '#41567a', glyph: 'research', family: 'research' },
  { id: 'skills', name: 'Skills', color: '#ff6a1a', glyph: 'all', family: 'warm' },
] as const;
export type BlogTopic = typeof topics[number];
export function postTopic(post: SisoBlogPost): BlogTopic {
  return topics.find(t => t.id === post.topic || t.name === post.category || (post.category === 'The Library' && t.id === 'library')) ?? topics[5];
}
export const activeTopics = topics.filter(t => posts.some(p => postTopic(p).id === t.id));
export function topicStyle(topic: BlogTopic): CSSProperties { return { '--topic': topic.color } as CSSProperties; }
export function formatDate(date: string) { return new Date(`${date}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }); }
