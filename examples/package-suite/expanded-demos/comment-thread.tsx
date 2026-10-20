// uihub: siso:package-workbench
// uihub: siso:package-workbench
// Hand-wired: Arc's docs example plus the state and sample data it references
import { CommentThread, type CommentThreadEvent, type ThreadComment } from "@siso/blocks/source";

const me = { id: "jordan-reyes", name: "Jordan Reyes" };

const initial: ThreadComment[] = [
  {
    id: "c-1",
    author: { id: "jasmine-brooks", name: "Jasmine Brooks" },
    body: "The new headline lands. @Daniel Kim, does the subcopy still promise the same thing?",
    createdAt: "2h",
    reactions: [{ emoji: "👍", users: ["jordan-reyes", "daniel-kim"] }],
    replies: [
      {
        id: "c-2",
        author: { id: "daniel-kim", name: "Daniel Kim" },
        body: "It drifts. I would tie the second line to the trial instead of speed.",
        createdAt: "1h",
        edited: true,
        reactions: [{ emoji: "🎉", users: ["jasmine-brooks"] }],
      },
    ],
  },
  {
    id: "c-3",
    author: { id: "ava-mitchell", name: "Ava Mitchell" },
    body: "Two alternatives by 4pm, then we pick in the standup.",
    createdAt: "40m",
  },
];

/** Stands in for the `syncComment(event)` the docs example calls. */
function syncComment(event: CommentThreadEvent) {
  console.info("Sync comment to the server", event);
}

/** Stands in for the `setThreadResolved("hero", resolved)` the docs example calls. */
function setThreadResolved(key: string, resolved: boolean) {
  console.info("Thread resolved", key, resolved);
}

export default function CommentThreadDemo() {
  return (
    <CommentThread
      title="Hero headline"
      currentUser={me}
      defaultComments={initial}
      onCommentsChange={(_, event) => syncComment(event)}
      onResolvedChange={resolved => setThreadResolved("hero", resolved)}
    />
  );
}
