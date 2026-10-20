import {
  AlarmClockOffIcon,
  BotIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EllipsisIcon,
  EyeIcon,
  EyeOffIcon,
  FolderIcon,
  FolderInputIcon,
  PencilIcon,
  PinIcon,
  PinOffIcon,
  Trash2Icon,
  Undo2Icon,
} from "lucide-react";
import { MenuButton, load, save, useOutsideClose, type MenuItem } from "@siso/shell";
import {
  ProjectGroup,
  Shelf,
  SideNav,
  SideSection,
  SortableItem,
  SortableRail,
  ThreadRow,
  formatAge,
  type ThreadMark,
} from "@siso/side-nav";
import { useMemo, useRef, useState, type ReactNode } from "react";
import { Icon } from "../lib/Icon";
import {
  type Agent,
  type Org,
  type OrgClient,
  type OrgOp,
  type OrgProject,
  type RegistryEdit,
  type RowAction,
  type Team,
  formatWake,
  hiddenClients,
  isUnseenDone,
  layout,
} from "../lib/agents";
import { AgentFace, faceFor } from "../lib/face";
import { hoverAgent, useHubAgents } from "../lib/hub";
import { AgentHoverCard } from "./AgentHoverCard";
import { WorkerFold } from "./WorkerFold";

/** The one mark a row shows: the turning ring while working, a dot for needs you, done or failed, nothing when quiet. */
export function markOf(a: Agent): ThreadMark {
  if (a.status === "working") return "working";
  if (a.status === "needs") return "needs";
  if (a.status === "failed") return "failed";
  if (isUnseenDone(a)) return "done";
  return "quiet";
}
export const WORD: Record<ThreadMark, string> = {
  working: "Working",
  needs: "Needs you",
  failed: "Failed",
  done: "Done",
  quiet: "Idle",
};

/** A lead shows the loudest mark of its team, so a crew member waiting on him is never lost in the list. */
const LOUD: ThreadMark[] = ["needs", "failed", "done", "working", "quiet"];
const teamMark = (t: Team): ThreadMark =>
  [t.lead, ...t.crew]
    .map(markOf)
    .sort((x, y) => LOUD.indexOf(x) - LOUD.indexOf(y))[0];

/**
 * Screen 1's side nav, option B (2 Oct): the space switcher (the SISO mark, Agent Base ▾), his pinned agents, then each
 * domain as a folder that opens and closes, each lead with its crew under it, then the shelves. Machines have their own
 * rail page (ServersSpace) since he asked for "servers … its own icon". Hover gives ⋯: Pin, Move to… (the domains), Settle.
 */
export function Sidebar(props: {
  agents: Agent[] | null;
  domains: string[];
  error: string | null;
  activeId: string | null;
  onOpen: (a: Agent) => void;
  onAct: (id: string, action: RowAction, until?: number) => void;
  onEdit: (e: RegistryEdit) => void;
  onReorder: (ids: string[]) => void;
  /** His order of the project folders. */
  onReorderProjects: (projects: string[]) => void;
  /** Summary-card worker action, kept for callers that open that panel. */
  onWorkers: (owner: Agent) => void;
  /** Rename: opens the agent with its name ready to edit. */
  onRename: (a: Agent) => void;
  /** A0's unseen announcements: a count on Agent Zero's row that opens his page. */
  zeroBadge?: number;
  onZeroPage?: (a: Agent) => void;
  /** The org tree (three groups → projects → owners) and his changes to it. */
  org: Org | null;
  onOrg: (op: OrgOp) => void;
  /** A group's or a project's dashboard in the main area. */
  onPage: (p: { group: string } | { project: string }) => void;
  /** The pages list (hub-11: Home, Tasks, Stats, Starred, Org chart) under the brand. */
  nav?: ReactNode;
}) {
  const { agents, domains, error, activeId, onOpen, onAct, onEdit } = props;
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const hub = useHubAgents();
  const l = useMemo(() => layout(agents ?? [], domains), [agents, domains]);
  // Each owner's team (its workers), by name, for the org's rows; anything the org does not place stays "Unsorted".
  const teamOf = useMemo(() => new Map([...l.pinned, ...l.sections.flatMap((s) => s.teams)].map((t) => [t.lead.name, t])), [l]);
  const placed = useMemo(() => {
    const org = props.org;
    if (!org) return null;
    return new Set([...org.top, ...org.bottom, ...org.groups.flatMap((g) => g.projects.flatMap((p) => p.owners))].map((o) => o.name));
  }, [props.org]);
  const unsorted = placed ? l.sections.flatMap((s) => s.teams).filter((t) => !placed.has(t.lead.name)) : [];
  const health = props.org?.bottom.map((o) => (agents ?? []).find((a) => a.name === o.name)).filter((a): a is Agent => !!a) ?? [];
  // No owner renders twice (2 Oct): with the org on, Pinned keeps only agents the org does not already place.
  const pinnedShown = placed ? l.pinned.filter((t) => !placed.has(t.lead.name)) : l.pinned;
  const needsYou = (agents ?? []).filter(
    (a) => a.row === "live" && a.status === "needs",
  ).length;

  // Dragging reorders leads inside one list; the saved order is every list's leads, top to bottom, then all crew.
  const lists = [l.pinned, ...l.sections.map((s) => s.teams)];
  const reorderIn = (which: Team[], ids: string[]) =>
    props.onReorder([
      ...lists.flatMap((t) => (t === which ? ids : t.map((x) => x.lead.id))),
      ...lists.flat().flatMap((t) => t.crew.map((c) => c.id)),
    ]);

  const menu = (a: Agent, extra: MenuItem[] = []): MenuItem[] => [
    a.pinned
      ? {
          key: "unpin",
          icon: <PinOffIcon />,
          label: "Unpin",
          onSelect: () => onEdit({ op: "unpin", name: a.name }),
        }
      : {
          key: "pin",
          icon: <PinIcon />,
          label: "Pin to the top",
          onSelect: () => onEdit({ op: "pin", name: a.name }),
        },
    {
      key: "move",
      icon: <FolderInputIcon />,
      label: "Move to…",
      items: domains.map((d) => ({
        key: d,
        icon: <FolderIcon />,
        label: d,
        current: d === a.project,
        onSelect: () => onEdit({ op: "move", name: a.name, project: d }),
      })),
    },
    {
      key: "rename",
      icon: <PencilIcon />,
      label: "Rename",
      onSelect: () => props.onRename(a),
    },
    ...(a.project && props.org
      ? [{ key: "page", icon: <FolderIcon />, label: `Open the ${props.org.groups.flatMap((g) => g.projects).find((p) => p.owners.some((o) => o.name === a.name))?.name ?? a.project} page`, onSelect: () => props.onPage({ project: props.org!.groups.flatMap((g) => g.projects).find((p) => p.owners.some((o) => o.name === a.name))?.id ?? a.project! }) }]
      : []),
    ...extra,
    {
      key: "settle",
      icon: <CheckIcon />,
      label: "Settle",
      onSelect: () => onAct(a.id, "settle"),
    },
  ];

  const row = (
    a: Agent,
    /** `label`: what the row says when it stands for its project (a one-owner project shows the project's name). */
    opts: { team?: Team; crew?: boolean; shelf?: boolean; label?: string; menu?: MenuItem[] } = {},
  ) => {
    const mark = opts.shelf
      ? "quiet"
      : opts.team
        ? teamMark(opts.team)
        : markOf(a);
    const own = opts.shelf ? "quiet" : markOf(a);
    const timed = own === "working" || own === "needs";
    const snoozedRow = a.row === "snoozed";
    const actions = opts.shelf ? (
      <button
        type="button"
        aria-label={snoozedRow ? "Wake now" : "Un-settle"}
        title={snoozedRow ? "Wake now" : "Un-settle"}
        onClick={(e) => {
          e.stopPropagation();
          onAct(a.id, snoozedRow ? "unsnooze" : "unsettle");
        }}
      >
        {snoozedRow ? <AlarmClockOffIcon /> : <Undo2Icon />}
      </button>
    ) : (
      <MenuButton
        label="More"
        onOpenChange={(o) => setMenuFor(o ? a.id : null)}
        menuClassName="siso-rail-menu"
        items={() => menu(a, opts.menu)}
      >
        <EllipsisIcon />
      </MenuButton>
    );
    const time = opts.shelf
      ? snoozedRow && a.snoozedUntil
        ? formatWake(a.snoozedUntil)
        : formatAge(a.settledAt ?? a.since)
      : formatAge(a.since);
    const crewCount = opts.team?.crew.length ?? 0;
    const hasCrew = crewCount > 0;
    const working = opts.team?.crew.filter((c) => c.status === "working").length ?? 0;
    const where = [
      [a.project ?? "Unsorted", a.domain].filter(Boolean).join(" › "),
      a.lead && `works for ${a.lead}`,
      crewCount > 0 && `${crewCount} ${crewCount === 1 ? "worker" : "workers"}`,
    ]
      .filter(Boolean)
      .join(" · ");
    // Hovering a row opens its card (hub-5), in place of the old text tooltip.
    const renderThread = (fold?: { open: boolean; count: number; onToggle: () => void }) => (
      <AgentHoverCard key={a.id} agent={hoverAgent(a, hub)} row>
      <ThreadRow
        id={a.id}
        name={opts.label ?? a.name}
        mark={mark}
        lead={
          opts.crew ? (
            <span className={`ab-worker-face is-${own}`}>
              <AgentFace {...faceFor(a)} size={16} />
              <i className="ab-worker-face__state" aria-hidden="true" />
            </span>
          ) : (
            <AgentFace {...faceFor(a)} size={20} />
          )
        }
        since={timed && !hasCrew ? a.since : undefined}
        time={hasCrew ? undefined : time}
        active={a.id === activeId}
        dim={opts.shelf || mark === "quiet"}
        crew={opts.crew}
        badge={
          a.zero && props.zeroBadge
            ? { label: `${props.zeroBadge} new`, live: true, title: "Agent Zero's announcements you have not seen", onClick: () => props.onZeroPage?.(a) }
            : crewCount > 0
            ? {
                label: `${crewCount} ●${working}`,
                live: working > 0,
                title: `${a.name}'s workers: ${opts.team!.crew.map((c) => `${c.name} (${WORD[markOf(c)].toLowerCase()})`).join(", ")}`,
                onClick: () => fold?.onToggle(),
              }
            : undefined
        }
        fold={fold}
        actions={actions}
        holdActions={menuFor === a.id}
        onOpen={() => onOpen(a)}
        ariaLabel={`${opts.label ?? a.name}, ${WORD[mark]}, ${where}`}
      />
      </AgentHoverCard>
    );
    if (opts.team && opts.team.crew.length > 0) {
      return (
        <WorkerFold
          owner={a.name}
          count={crewCount}
          renderOwner={(fold) => renderThread(fold)}
        >
          {[...opts.team.crew]
            .sort((x, y) => Number(y.status === "working") - Number(x.status === "working"))
            .map((worker) => row(worker, { crew: true }))}
        </WorkerFold>
      );
    }
    return renderThread();
  };

  // One pane per thing: a crew row opens that agent as the chat, like any other row.
  const teams = (list: Team[]) => (
    <SortableRail
      ids={list.map((t) => t.lead.id)}
      onReorder={(ids) => reorderIn(list, ids)}
    >
      {/* Worker rows stay nested under their owner and appear when that owner is unfolded. */}
      {list.map((t) => (
        <div key={t.lead.id}>{row(t.lead, { team: t })}</div>
      ))}
    </SortableRail>
  );

  return (
    <SideNav
      label="Agents"
      storeKey="sidebar-width"
      header={
        // The space switcher with the SISO mark (Shaan, 2 Oct: "you got rid of the SISO agency drop down … I like that").
        <div className="siso-headstack">
        <MenuButton
          label="Switch space"
          align="left"
          menuClassName="siso-rail-menu"
          className="siso-brand"
          items={[
            {
              key: "ab",
              label: "Agent Base",
              icon: <BotIcon />,
              current: true,
            },
            {
              key: "agency",
              label: "Agency Base · later",
              icon: <FolderIcon />,
              disabled: true,
            },
            {
              key: "library",
              label: "Library · later",
              icon: <FolderIcon />,
              disabled: true,
            },
          ]}
        >
          <img src="/siso-mark.png" alt="" />
          <span className="siso-sidenav__title">Agent Base</span>
          <ChevronDownIcon size={14} className="opacity-50" />
        </MenuButton>
          {props.nav}
          {/* Agent Zero has a fixed slot at the very top (it never scrolls away), as HEALTH has at the bottom. */}
          {l.zero && <div className="siso-zero">{row(l.zero)}</div>}
        </div>
      }
      footer={
        <>
          {/* HEALTH has a fixed slot at the bottom, as Agent Zero has at the top (2 Oct 14:45). */}
          {props.org && props.org.bottom.length > 0 && (
            <div className="siso-health">
              <InfraEntry trio={props.org.bottom} agents={agents ?? []} onOpen={onOpen} />
            </div>
          )}
          {!props.org && health.length > 0 && <div className="siso-health">{health.map((a) => row(a))}</div>}
          {error && (
          <div
            role="status"
            className="mx-3 mb-3 rounded-[9px] border border-failed/25 bg-failed/10 px-2.5 py-1.5 text-[11px] text-failed"
          >
            herdr is not answering; retrying.
          </div>
          )}
        </>
      }
    >
      {agents === null && !error && (
        <div className="px-2.5 py-2 text-[12.5px] text-muted-foreground">
          Reading herdr…
        </div>
      )}

      {pinnedShown.length > 0 && (
        <SideSection
          title="Pinned"
          note={
            needsYou > 0 ? (
              <span className="text-needs">{needsYou} need you</span>
            ) : undefined
          }
        >
          {teams(pinnedShown)}
        </SideSection>
      )}
      {props.org ? (
        props.org.groups.map((g) => (
          <OrgGroupBlock key={g.id} g={g} hidden={g.id === "agency" ? hiddenClients(props.org!) : []} teamOf={teamOf} row={row} onOrg={props.onOrg} onPage={props.onPage} onReorder={props.onReorder} />
        ))
      ) : (
        l.sections.length > 0 && (
          <SideSection title="Projects">
            {l.sections.map((s) => (
              <ProjectGroup key={s.domain} id={`project:${s.domain}`} name={s.domain} count={s.teams.length}>
                {teams(s.teams)}
              </ProjectGroup>
            ))}
          </SideSection>
        )
      )}
      {unsorted.length > 0 && <SideSection title="Unsorted">{teams(unsorted)}</SideSection>}
      {agents !== null && !l.zero && l.pinned.length + l.sections.length === 0 && (
        <div className="px-2.5 py-2 text-[12.5px] text-muted-foreground">
          No live agents.
        </div>
      )}
      <Shelf title="Snoozed" count={l.snoozed.length} storeKey="shelf-snoozed">
        {l.snoozed.map((a) => row(a, { shelf: true }))}
      </Shelf>
      <Shelf title="Settled" count={l.settled.length} storeKey="shelf-settled">
        {l.settled.map((a) => row(a, { shelf: true }))}
      </Shelf>
    </SideNav>
  );
}

/**
 * One of the three groups (SIDENAV-GROUPS.md): its header (caret folds, name opens its dashboard), its projects in his
 * dragged order, and for the agency "+ N more clients", a list he ticks to show or hide. A project with one owner is one
 * row opening that owner's chat; with two or more it is a folder of owner rows; an owner not started yet is a dim ○ row.
 */
function OrgGroupBlock({
  g,
  hidden,
  teamOf,
  row,
  onOrg,
  onPage,
  onReorder,
}: {
  g: Org["groups"][number];
  hidden: OrgClient[];
  teamOf: Map<string, Team>;
  row: (a: Agent, opts?: { team?: Team; crew?: boolean; shelf?: boolean; label?: string; menu?: MenuItem[] }) => React.ReactNode;
  onOrg: (op: OrgOp) => void;
  onPage: (p: { group: string } | { project: string }) => void;
  onReorder: (ids: string[]) => void;
}) {
  const [open, setOpen] = useState(() => load(`group-open:${g.id}`, true));
  const [more, setMore] = useState(false);
  const [hiddenOpen, setHiddenOpen] = useState(false);
  const hiddenRows = g.hiddenRows ?? [];
  const hide = (p: OrgProject): MenuItem => ({ key: "hide", icon: <EyeOffIcon />, label: `Hide ${p.name}`, onSelect: () => onOrg({ op: "hide", id: p.id }) });
  const projectMenu = (p: OrgProject): MenuItem[] => [
    { key: "page", icon: <FolderIcon />, label: "Open its page", onSelect: () => onPage({ project: p.id }) },
    {
      key: "rename",
      icon: <PencilIcon />,
      label: "Rename",
      onSelect: () => {
        const to = window.prompt(`Rename ${p.name} to`, p.name);
        if (to && to.trim() && to.trim() !== p.name) onOrg({ op: "rename", id: p.id, to: to.trim() });
      },
    },
    ...(g.id === "agency" ? [hide(p)] : []),
    { key: "remove", icon: <Trash2Icon />, label: p.owners.length ? "Remove (only when empty)" : "Remove", danger: true, disabled: p.owners.length > 0, onSelect: () => onOrg({ op: "remove", id: p.id }) },
  ];
  const owner = (o: OrgProject["owners"][number], label?: string, extra?: MenuItem[]) => {
    const t = teamOf.get(o.name);
    if (o.state === "planned" || !t) {
      return (
        <div key={o.name} className="siso-planned" title={`${o.name}${o.domain ? ` · ${o.domain}` : ""}: not started`}>
          <i aria-hidden />
          <span>{label ?? o.name}</span>
          <span>not started</span>
        </div>
      );
    }
    return <div key={o.name}>{row(t.lead, { team: t, label, menu: extra })}</div>;
  };
  return (
    <div className="siso-group">
      <div className="siso-group__head">
        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? `Fold ${g.name}` : `Open ${g.name}`}
          onClick={() => {
            setOpen(!open);
            save(`group-open:${g.id}`, !open);
          }}
        >
          {open ? <ChevronDownIcon className="siso-group__caret" /> : <ChevronRightIcon className="siso-group__caret" />}
        </button>
        <button type="button" onClick={() => onPage({ group: g.id })} title={`${g.name}: its dashboard`}>
          <Icon name={g.icon} size={16} /> {g.name}
        </button>
      </div>
      {open && (
        <>
          <SortableRail ids={g.projects.map((p) => `project:${p.id}`)} onReorder={(ids) => onOrg({ op: "order", id: g.id, to: ids.map((i) => i.slice(8)) })}>
            {g.projects.map((p) =>
              p.owners.length === 1 ? (
                // One owner: the project is one row, its name, opening that owner's chat.
                <SortableItem key={p.id} id={`project:${p.id}`}>
                  {/* Its ⋯ carries Hide too, so a one-owner agency row hides like a folder does. */}
                  {owner(p.owners[0], p.name, g.id === "agency" ? [hide(p)] : undefined)}
                </SortableItem>
              ) : (
                <ProjectGroup
                  key={p.id}
                  id={`project:${p.id}`}
                  name={p.name}
                  count={p.owners.length}
                  onName={() => onPage({ project: p.id })}
                  actions={
                    <MenuButton label="More" menuClassName="siso-rail-menu" items={() => projectMenu(p)}>
                      <EllipsisIcon />
                    </MenuButton>
                  }
                >
                  {/* Owners drag inside their project, kept in his agent order. */}
                  <SortableRail ids={p.owners.map((o) => teamOf.get(o.name)?.lead.id ?? `planned:${o.name}`)} onReorder={(ids) => onReorder(ids.filter((i) => !i.startsWith("planned:")))}>
                    {p.owners.map((o) => owner(o))}
                  </SortableRail>
                </ProjectGroup>
              ),
            )}
          </SortableRail>
          {hiddenRows.length > 0 && (
            <>
              <button type="button" className="siso-group__more" aria-expanded={hiddenOpen} onClick={() => setHiddenOpen(!hiddenOpen)}>
                + {hiddenRows.length} hidden
              </button>
              {hiddenOpen && (
                <div className="siso-group__list" role="group" aria-label={`Hidden in ${g.name}`}>
                  {hiddenRows.map((h) => (
                    <button key={h.id} type="button" className="siso-group__unhide" onClick={() => onOrg({ op: "show", id: h.id })}>
                      <EyeIcon aria-hidden />
                      <span>{h.name}</span>
                      <small>Unhide</small>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
          {g.id === "agency" && hidden.length > 0 && (
            <>
              <button type="button" className="siso-group__more" aria-expanded={more} onClick={() => setMore(!more)}>
                + {hidden.length} more {hidden.length === 1 ? "client" : "clients"}
              </button>
              {more && (
                <div className="siso-group__list" role="group" aria-label="Clients to show">
                  {hidden.map((c) => (
                    <label key={c.id} title={c.line}>
                      <input type="checkbox" checked={false} onChange={() => onOrg({ op: "show", id: c.id })} />
                      <span>
                        {c.name}
                        {c.status && <small>{c.status}</small>}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

/**
 * The side nav's bottom slot, "Agent Infrastructure" (ab-148; Shaan, 2 Oct 15:24): one entry with a dot each for HEALTH
 * (machines), EFFICIENCY (the agent stack) and ESTATE (where everything lives). Hover or click opens a popover listing
 * the three; each opens its agent's chat.
 */
function InfraEntry({ trio, agents, onOpen }: { trio: Org["bottom"]; agents: Agent[]; onOpen: (a: Agent) => void }) {
  // Hover opens at once and closes only after 300 ms off it (a bridge spans the gap to the popover), so moving the
  // mouse onto it never loses it; a click pins it open until a click outside (2 Oct 15:33: "hard to click").
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const timer = useRef(0);
  const box = useRef<HTMLDivElement>(null);
  useOutsideClose(box, pinned, () => {
    setPinned(false);
    setOpen(false);
  });
  const enter = () => {
    window.clearTimeout(timer.current);
    setOpen(true);
  };
  const leave = () => {
    if (pinned) return;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(false), 300);
  };
  const word = (s?: string | null) => (s === "working" ? "working" : s === "needs" ? "needs you" : s ? "idle" : "not running");
  return (
    <div ref={box} className="siso-infra" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        type="button"
        className="siso-infra__entry"
        aria-expanded={open}
        onClick={() => {
          const next = !pinned;
          setPinned(next);
          setOpen(next);
        }}
      >
        <span>Agent Infrastructure</span>
        <span className="siso-infra__dots">
          {trio.map((t) => (
            <i key={t.name} className={`is-${t.status ?? "off"}`} title={`${t.name}: ${word(t.status)}`} />
          ))}
        </span>
      </button>
      {open && (
        <div className="siso-infra__pop" role="menu" aria-label="Agent Infrastructure">
          {trio.map((t) => {
            const a = agents.find((x) => x.name === t.name);
            return (
              <button key={t.name} type="button" role="menuitem" disabled={!a} onClick={() => a && onOpen(a)}>
                <AgentFace {...faceFor({ name: t.name, project: a?.project, status: (t.status ?? "offline") as Agent["status"] })} size={20} />
                <b>{t.name}</b>
                <span>{t.domain}</span>
                <em>{word(t.status)}</em>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
