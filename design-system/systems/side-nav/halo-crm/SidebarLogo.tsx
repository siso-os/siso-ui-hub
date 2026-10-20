import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronsUpDown, MessagesSquare, Plus, UsersRound } from 'lucide-react';
import HaloBrandMark from '@/components/branding/HaloBrandMark';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/context/AuthContext';
import { useDashboardCreatorFilter } from '@/hooks/useDashboardCreatorFilter';
import { ALL_CREATOR_TEAMS_ID } from '@/context/DashboardCreatorFilterContext';

/**
 * The sidebar header, as sidebar-07's `team-switcher`: the active team IS the
 * header, and switching happens here rather than in the account menu.
 *
 * Teams used to live in the FOOTER dropdown alongside the account, which put
 * two of the block's components into one menu — the header was then a dead
 * link and the account menu carried work that was not its own. Splitting them
 * is what the block actually does: team-switcher on top, nav-user underneath.
 */
const SidebarLogo: React.FC = () => {
  const navigate = useNavigate();
  const { userRole, userRoles } = useAuth();
  const { teams, activeTeamId, setActiveTeamId } = useDashboardCreatorFilter();
  const { isMobile } = useSidebar();

  const canManageTeams = userRole === 'Admin' || userRoles?.includes('Admin');
  const activeTeam = teams?.find((team) => team.id === activeTeamId);
  const activeName = activeTeam?.name ?? 'All creators';
  const activeColor = activeTeam?.color ?? '#facc15';

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <HaloBrandMark className="size-5" imageClassName="scale-[1.04]" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">HALO</span>
                <span className="truncate text-xs text-muted-foreground">{activeName}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            {/* Agency chat lived in a full-width row under the header on every
                route. It is a destination, not a page action, so it belongs
                with the other places you can go. */}
            <DropdownMenuItem className="gap-2 p-2" onClick={() => navigate('/agency-chat')}>
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <MessagesSquare className="size-4 shrink-0" />
              </div>
              <span className="flex-1 truncate">Chat rooms</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuLabel className="text-xs text-muted-foreground">Teams</DropdownMenuLabel>

            <DropdownMenuItem className="gap-2 p-2" onClick={() => setActiveTeamId(ALL_CREATOR_TEAMS_ID)}>
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <UsersRound className="size-4 shrink-0" />
              </div>
              <span className="flex-1 truncate">All creators</span>
              {activeTeamId === ALL_CREATOR_TEAMS_ID && <Check className="size-4" />}
            </DropdownMenuItem>

            {teams?.map((team) => (
              <DropdownMenuItem key={team.id} className="gap-2 p-2" onClick={() => setActiveTeamId(team.id)}>
                <div
                  className="flex size-6 items-center justify-center rounded-sm border"
                  style={{ borderColor: `${team.color ?? '#facc15'}66`, color: team.color ?? '#facc15' }}
                >
                  <UsersRound className="size-4 shrink-0" />
                </div>
                <span className="flex-1 truncate">{team.name}</span>
                {team.id === activeTeamId && <Check className="size-4" />}
              </DropdownMenuItem>
            ))}

            {canManageTeams && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2" onClick={() => navigate('/team/manage')}>
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4" />
                  </div>
                  <div className="font-medium text-muted-foreground">Manage teams</div>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarLogo;
