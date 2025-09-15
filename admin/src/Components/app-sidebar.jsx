import {
  Calendar,
  Home,
  Users,
  Search,
  Settings,
  UserPlus,
  Mail,
  BarChart3,
  Briefcase,
  DollarSign,
  Clock,
  CheckCircle,
  TrendingUp,
  FileText,
  Bell,
  GraduationCap,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronUp, User2 } from "lucide-react";
import { Link } from "react-router-dom";

// Menu items based on Home.jsx structure
const mainMenuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Alumni Directory",
    url: "/alumni-list",
    icon: Users,
  },
  {
    title: "Pending Approvals",
    url: "/pending-approvals",
    icon: Clock,
  },
  {
    title: "Events",
    url: "/events",
    icon: Calendar,
  },
  {
    title: "Job Portal",
    url: "/jobs",
    icon: Briefcase,
  },
  {
    title: "Donations",
    url: "/donations",
    icon: DollarSign,
  },
];

const quickActions = [
  {
    title: "Add Alumni",
    url: "/add-alumni",
    icon: UserPlus,
  },
  {
    title: "Manage Events",
    url: "/manage-events",
    icon: Calendar,
  },
  {
    title: "Send Notifications",
    url: "/notifications",
    icon: Bell,
  },
  {
    title: "View Reports",
    url: "/reports",
    icon: BarChart3,
  },
  {
    title: "Search Alumni",
    url: "/search",
    icon: Search,
  },
];

const systemItems = [
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: TrendingUp,
  },
];

export function AppSidebar() {

     

  return (
    <Sidebar collapsible="icon" className="font-['Inter']" variant="floating">
      <SidebarHeader className="border-b border-gray-200 p-4 group-data-[collapsible=icon]:p-2">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-semibold text-gray-900 font-['Inter']">
              AlmaSphere
            </span>
            <span className="text-xs text-gray-500 font-['Inter']">
              Alumni Management
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider font-['Inter']">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="group hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                  >
                    <Link
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg font-['Inter']"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider font-['Inter']">
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {quickActions.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="group hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
                  >
                    <Link
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg font-['Inter']"
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="font-medium text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider font-['Inter']">
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="group hover:bg-gray-50 hover:text-gray-700 transition-colors duration-200"
                  >
                    <Link
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg font-['Inter']"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 p-4 group-data-[collapsible=icon]:p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full justify-between hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                      <User2 className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium text-sm font-['Inter']">
                        Admin User
                      </span>
                      <span className="text-xs text-gray-500 font-['Inter']">
                        admin@almasphere.com
                      </span>
                    </div>
                  </div>
                  <ChevronUp className="w-4 h-4 text-gray-400 " />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width] font-['Inter']"
              >
                <DropdownMenuItem className="hover:bg-blue-50 cursor-pointer">
                  <User2 className="w-4 h-4 mr-2" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-blue-50 cursor-pointer">
                  <Settings className="w-4 h-4 mr-2" />
                  <span>Account Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-blue-50 cursor-pointer">
                  <FileText className="w-4 h-4 mr-2" />
                  <span>Documentation</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-red-50 text-red-600 cursor-pointer">
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>

        
      </SidebarFooter>
    </Sidebar>
  );
}
