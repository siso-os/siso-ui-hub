
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  UserCog, 
  Lock,
  FileUp,
  HardDrive,
  KeyRound,
  Mic,
  Shield,
  UserPlus,
  ListCheck,
  Database,
  Kanban,
  DollarSign,
  Bot,
  Receipt,
  BookOpen,
  Share2,
  HandCoins,
  Wallet,
  FileSignature,
  Gamepad2,
  RadioTower,
  Files,
  Gauge,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
  roles?: string[]; // Specific roles that can access this item
  allowCreator?: boolean; // Allow Creator role to access this item
  creatorOnly?: boolean; // Show ONLY to Creator role (hidden even from admins)
  hideForCreator?: boolean; // Hide this item for Creator role
  hideForChatter?: boolean; // Hide this item for Chatter role
  hidden?: boolean; // Hide this item completely
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

interface SidebarNavProps {
  isAdmin: boolean;
}

// Exported so the shell's breadcrumb names pages from the same data the
// sidebar renders — a crumb can then never disagree with its nav item.
export const navGroups: NavGroup[] = [
  {
    title: "Administrative Team",
    items: [
      {
        path: '/dashboard',
        label: 'OF Dashboard',
        icon: <LayoutDashboard className="size-5" />,
        allowCreator: true,
        hideForChatter: true,
      },
      {
        path: '/all-docs',
        label: 'All Docs',
        icon: <Files className="size-5" />,
        hideForCreator: true,
        hideForChatter: true,
      },
      {
        path: '/cb-marketing',
        label: 'CB Dashboard',
        icon: <RadioTower className="size-5" />,
        hideForCreator: true,
        hideForChatter: true,
      },
      {
        path: '/team',
        label: 'Staff',
        icon: <UserCog className="size-5" />,
        hideForCreator: true,
        hideForChatter: true,
      },
      {
        path: '/accounts',
        label: 'Accounts',
        icon: <KeyRound className="size-5" />,
        hideForCreator: true,
        hideForChatter: true,
      },
      {
        path: '/my-customs',
        label: 'My Customs',
        icon: <ListCheck className="size-5" />,
        allowCreator: true,
        creatorOnly: true,
      },
      {
        path: '/contracts',
        label: 'Contracts',
        icon: <FileSignature className="size-5" />,
        adminOnly: true,
      },
      {
        path: '/access-control',
        label: 'Access Control',
        icon: <Shield className="size-5" />,
        adminOnly: true,
      },
      // Moved here from Payments. Referrals is a partner/admin concern rather
      // than a payment run, so it sits with the administrative tools.
      {
        path: '/referrals',
        label: 'Referrals',
        icon: <Share2 className="size-5" />,
        adminOnly: true,
      },
    ]
  },
  {
    title: "Management Team",
    items: [
      {
        path: '/onboarding',
        label: 'Onboarding',
        icon: <ListCheck className="size-5" />,
        hideForCreator: true,
        hideForChatter: true,
      },
      {
        path: '/operator-hub',
        label: 'Operator Hub',
        icon: <Gauge className="size-5" />,
        roles: ['Manager', 'CSM'],
        hideForCreator: true,
        hideForChatter: true,
      },
      {
        path: '/shared-drive',
        label: 'Shared Drive',
        icon: <HardDrive className="size-5" />,
        allowCreator: true,
        hideForChatter: true,
      },
      {
        path: '/secure-logins',
        label: 'Secure Logins',
        icon: <Lock className="size-5" />,
        allowCreator: true,
        hideForChatter: true,
      },
      {
        path: '/creators',
        label: 'Creators',
        icon: <Users className="size-5" />,
        hideForCreator: true,
        hideForChatter: true,
      },
    ]
  },
  {
    title: "Chatting Team",
    items: [
      {
        path: '/game-board',
        label: 'Game Board',
        icon: <Gamepad2 className="size-5" />,
        hideForCreator: true,
      },
      {
        path: '/payroll',
        label: 'Payroll',
        icon: <DollarSign className="size-5" />,
        hideForCreator: true,
      },
      {
        path: '/creators-data',
        label: 'Model Profile',
        icon: <Database className="size-5" />,
        roles: ['Admin', 'VA', 'Chatter'],
      },
      {
        path: '/customs-tracker',
        label: 'Customs Tracker',
        icon: <Kanban className="size-5" />,
        hideForCreator: true,
      },
      {
        path: '/ai-voice',
        label: 'Voice Clone',
        icon: <Bot className="size-5" />,
        roles: ['Admin', 'VA', 'Chatter'],
      },
    ]
  },
  {
    title: "Payments",
    items: [
      {
        path: '/payment-log',
        label: 'Payment Log',
        icon: <BookOpen className="size-5" />,
        adminOnly: true,
      },
      {
        path: '/creator-invoicing',
        label: 'Creator Invoicing',
        icon: <Receipt className="size-5" />,
        adminOnly: true,
      },
      {
        path: '/staff-invoicing',
        label: 'Staff Invoicing',
        icon: <Wallet className="size-5" />,
        roles: ['Admin', 'HR / Work Force'],
      },
      {
        path: '/referral-invoicing',
        label: 'Referral Invoicing',
        icon: <HandCoins className="size-5" />,
        adminOnly: true,
      },
    ]
  }
];

// Hidden items not shown in any group
const hiddenItems: NavItem[] = [
  {
    path: '/messages',
    label: 'Messages',
    icon: <MessageSquare className="size-5" />,
    hideForCreator: true,
    hideForChatter: true,
    hidden: true,
  },
  {
    path: '/onboard',
    label: 'Creator Onboarding',
    icon: <UserPlus className="size-5" />,
    hidden: true,
  },
];

const SidebarNav: React.FC<SidebarNavProps> = ({ isAdmin }) => {
  const { userRole, userRoles, isCreator } = useAuth();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const location = useLocation();

  // Mirrors what NavLink computed internally before the button took over the
  // active styling: exact match for /creators (it has child routes that are
  // their own destinations), prefix match everywhere else.
  const isPathActive = (path: string) =>
    path === '/creators'
      ? location.pathname === path
      : location.pathname === path || location.pathname.startsWith(`${path}/`);

  const isGroupOpen = (groupTitle: string) => openGroups[groupTitle] ?? true;

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups((current) => ({
      ...current,
      [groupTitle]: !(current[groupTitle] ?? true),
    }));
  };
  
  const shouldShowItem = (item: NavItem): boolean => {
    // Creator-only items are hidden from everyone else, admins included — this
    // must run before the admin catch-all below or admins would see them too.
    if (item.creatorOnly && !isCreator) return false;

    // CRITICAL: Admin users can see ALL modules regardless of other restrictions
    // This must be the FIRST check and return immediately
    if (userRole === 'Admin' || userRoles?.includes('Admin')) {
      return !item.hidden; // Only skip completely hidden items
    }
    
    // Skip items that are completely hidden
    if (item.hidden) return false;
    
    // Marketing Team employees should see Marketing Files + Model Profile
    if (userRole === 'Marketing Team' || userRoles?.includes('Marketing Team')) {
      return item.path === '/shared-drive' || item.path === '/creators-data';
    }
    
    // Chatter employees should ONLY see Chatting Team items (this won't affect Admin-Chatter users)
    if (userRole === 'Chatter' || userRoles?.includes('Chatter')) {
      return item.path === '/creators-data' || item.path === '/customs-tracker' || item.path === '/payroll' || item.path === '/ai-voice' || item.path === '/game-board';
    }
    
    // VA employees should see specific items
    if (userRole === 'VA' || userRoles?.includes('VA')) {
      return item.path === '/creators-data' || item.path === '/payroll' ||
             item.path === '/shared-drive';
    }
    
    // HR / Work Force employees should see everything like Admin
    if (userRole === 'HR / Work Force' || userRoles?.includes('HR / Work Force')) {
      return !item.hidden;
    }
    
    // Skip adminOnly items if user is not admin
    if (item.adminOnly && !isAdmin) return false;
    
    // For Creator role users, only show items that explicitly allow Creator
    if (isCreator && userRole === 'Creator') {
      if (!item.allowCreator) return false;
    }
    
    // Skip items that should be hidden for creators if the user is a creator
    if (item.hideForCreator && isCreator) return false;
    
    // Check specific roles if defined
    if (item.roles) {
      const hasRequiredRole = item.roles.some(role => 
        userRole === role || (userRoles && userRoles.includes(role))
      );
      if (!hasRequiredRole) return false;
    }
    
    return true;
  };

  const shouldShowGroup = (groupTitle: string): boolean => {
    // CRITICAL: Admin users can see ALL groups - this must be first
    if (userRole === 'Admin' || userRoles?.includes('Admin')) {
      return true;
    }

    // Developer and HR / Work Force can see everything
    if (userRole === 'Developer' || userRoles?.includes('Developer') ||
        userRole === 'HR / Work Force' || userRoles?.includes('HR / Work Force')) {
      return true;
    }

    // Marketing Team employees see Shared Drive + Model Profile.
    if (userRole === 'Marketing Team' || userRoles?.includes('Marketing Team')) {
      return groupTitle === 'Management Team' || groupTitle === 'Chatting Team';
    }

    // Chatter employees only see Chatting Team category
    if (userRole === 'Chatter' || userRoles?.includes('Chatter')) {
      return groupTitle === 'Chatting Team';
    }

    // VA employees see Chatting Team + Management Team (Shared Drive is handled separately)
    if (userRole === 'VA' || userRoles?.includes('VA')) {
      return groupTitle === 'Chatting Team' || groupTitle === 'Management Team';
    }

    return true;
  };

  /**
   * Roles that reach Shared Drive but nothing else in the Management group.
   *
   * Shared Drive used to be duplicated as "Marketing Files" inside a Marketing
   * Team group, which is how Marketing staff reached it without seeing the rest
   * of the admin menu. With the duplicate gone there is one item in the
    * Management group these roles are allowed, and the group is filtered
   * down to it rather than hidden outright.
   */
  const seesOnlySharedDrive = (): boolean =>
    userRole === 'VA' || userRoles?.includes('VA') ||
    userRole === 'Marketing Team' || userRoles?.includes('Marketing Team');

  // The NavLink carries NO layout/size classes of its own. With `asChild` the
  // child's className REPLACES SidebarMenuButton's, and the button is where
  // `group-data-[collapsible=icon]:!size-8 !p-2`, `[&>svg]:size-4` and
  // `[&>span:last-child]:truncate` live. The old version set px-3 py-2.5
  // rounded-xl here, which is why collapsing to icons left wide squashed pills
  // instead of clean 32px squares: the rules that shrink the row were never on
  // the element being rendered.
  //
  // Active state moves to the button's own `isActive` prop, so it uses the
  // primitive's data-[active=true] styling hook. The HALO yellow is preserved
  // via --sidebar-primary, which is already defined for BOTH themes
  // (index.css:35 light, :72 dark) — unlike the old hardcoded `text-black`.
  const renderNavItem = (item: NavItem) => (
    <SidebarMenuItem key={item.path}>
      {/* tooltip gives the label back when the sidebar is collapsed to icons */}
      <SidebarMenuButton
        asChild
        tooltip={item.label}
        isActive={isPathActive(item.path)}
        className="data-[active=true]:bg-sidebar-primary data-[active=true]:font-semibold data-[active=true]:text-sidebar-primary-foreground"
      >
        <NavLink to={item.path} end={item.path === '/creators'}>
          {item.icon}
          <span>{item.label}</span>
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  // Check if user should get admin-style navigation with grouped categories
  const shouldShowAdminNavigation = userRole === 'Admin' || userRoles?.includes('Admin') || 
                                   userRole === 'Developer' || userRoles?.includes('Developer') ||
                                   userRole === 'HR / Work Force' || userRoles?.includes('HR / Work Force') ||
                                   isAdmin; // Use the isAdmin prop as final authority

  // For non-admin users, collect all visible items into a single group to avoid spacing issues
  if (!shouldShowAdminNavigation) {
    const allVisibleItems: NavItem[] = [];
    
    navGroups.forEach((group) => {
      if (!shouldShowGroup(group.title)) return;

      let visibleItems = group.items.filter(shouldShowItem);
      
      // VA and Marketing reach Shared Drive, but no other admin tooling.
      if (group.title === 'Management Team' && seesOnlySharedDrive()) {
        visibleItems = visibleItems.filter(item => item.path === '/shared-drive');
      } else if (group.title === 'Management Team' && (
        userRole === 'Chatter' || userRoles?.includes('Chatter')
      )) {
        // Chatters have no business in the Management group at all.
        return;
      }
      
      allVisibleItems.push(...visibleItems);
    });

    return (
      <nav className="pt-2 z-30 relative">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {allVisibleItems.map(renderNavItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </nav>
    );
  }

  // For admin/developer users, show with category titles and spacing
  return (
    <nav className="relative z-30 flex flex-col pt-2">
      {navGroups.map((group) => {
        // Check if this group should be shown for the current user
        if (!shouldShowGroup(group.title)) return null;

        let visibleItems = group.items.filter(shouldShowItem);
        
        // VA and Marketing reach Shared Drive, but no other admin tooling.
        if (group.title === 'Management Team' && seesOnlySharedDrive()) {
          visibleItems = visibleItems.filter(item => item.path === '/shared-drive');
        } else if (group.title === 'Management Team' && (
          userRole === 'Chatter' || userRoles?.includes('Chatter')
        )) {
          // Chatters have no business in the Management group at all.
          return null;
        }
        
        // Don't render the group if no items are visible
        if (visibleItems.length === 0) return null;

        const groupOpen = isGroupOpen(group.title);
        
        return (
          <SidebarGroup
            key={group.title}
            className={cn("px-2 pt-0", groupOpen ? "pb-3" : "pb-0")}
          >
            {/* `hidden` in rail mode, not just the primitive's opacity-0.
                SidebarGroupLabel is a <div> upstream, so hiding it by opacity
                is harmless there — but we put a <button> inside it, and an
                opacity-0 element is still laid out and still FOCUSABLE. In the
                collapsed rail that left an invisible full-width control in the
                tab order, with its group's items rendering behind it. Every
                sibling primitive (GroupAction, MenuAction, Badge, Skeleton,
                SubMenu) uses `:hidden` for exactly this reason. */}
            <SidebarGroupLabel
              className={cn(
                "p-0 group-data-[collapsible=icon]:hidden",
                groupOpen ? "mb-2" : "mb-0",
              )}
            >
              <button
                type="button"
                onClick={() => toggleGroup(group.title)}
                aria-expanded={groupOpen}
                className="flex h-8 w-full items-center justify-between rounded-md px-2 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <span>{group.title}</span>
                {groupOpen ? (
                  <ChevronDown className="size-4" aria-hidden="true" />
                ) : (
                  <ChevronRight className="size-4" aria-hidden="true" />
                )}
              </button>
            </SidebarGroupLabel>
            {/* `hidden` rather than an unmount, so a group the user collapsed
                does not take its icons with it when the rail collapses. The
                group trigger is hidden in rail mode (above), so an unmounted
                group would leave those routes unreachable with no affordance
                to restore them. In rail mode every group shows its icons;
                expanded, the user's own open/closed choice applies. */}
            <SidebarGroupContent
              className={cn(
                // The guide line from SidebarMenuSub (ui/sidebar.tsx:691),
                // applied here because THIS is the parent/child relationship in
                // our nav: the group header is the parent, its items are the
                // children. We never used SidebarMenuSub because no individual
                // nav item has sub-items — but the nesting the line marks is
                // real, one level up. Same recipe: a left border in
                // sidebar-border, indented, translate-x-px so it sits on the
                // pixel grid. Hidden in the icon rail, where there is no
                // hierarchy to show.
                'ml-2 min-w-0 border-l border-sidebar-border pl-2',
                'group-data-[collapsible=icon]:ml-0',
                'group-data-[collapsible=icon]:border-l-0 group-data-[collapsible=icon]:pl-0',
                groupOpen ? undefined : 'hidden group-data-[collapsible=icon]:block',
              )}
            >
              <SidebarMenu>
                {visibleItems.map(renderNavItem)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        );
      })}
    </nav>
  );
};

export default SidebarNav;
