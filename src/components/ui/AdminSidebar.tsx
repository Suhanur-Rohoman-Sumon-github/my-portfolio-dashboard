import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { FaCog } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";

import { FaArrowLeft } from "react-icons/fa6";
import { GrProjects } from "react-icons/gr";
import { GoProjectSymlink } from "react-icons/go";
import { TbLogs } from "react-icons/tb";
import { LiaBlogSolid } from "react-icons/lia";

export function AdminSidebar() {
  return (
    <Sidebar className="w-64 bg-white text-gray-800 shadow-lg border-r border-gray-200">
      {/* Sidebar Header */}
      <SidebarHeader>
        <h1 className="text-xl font-semibold text-center py-5 tracking-wide border-b border-gray-300">
          Admin Panel
        </h1>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        {/* Dashboard Link */}
        <SidebarMenuItem>
          <Link
            href="/admin-home"
            className="flex items-center gap-3 px-5 py-3 text-gray-800 hover:bg-gray-100 rounded-md transition"
          >
            <SiGoogleanalytics className="text-blue-600" size={18} />
            <span>Dashboard</span>
          </Link>
        </SidebarMenuItem>

        {/* User Management Section */}
        <SidebarGroup>
          <h2 className="px-5 pt-6 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Project Management
          </h2>
          <SidebarMenuItem>
            <Link
              href="/all-projects"
              className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 rounded-md transition"
            >
              <GrProjects className="text-blue-500" size={18} />
              <span>All projects</span>
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Link
              href="/create-projects"
              className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 rounded-md transition"
            >
              <GoProjectSymlink className="text-yellow-500" size={18} />
              <span>Create Projects</span>
            </Link>
          </SidebarMenuItem>
        </SidebarGroup>

        {/* Product Management Section */}
        <SidebarGroup>
          <h2 className="px-5 pt-6 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Blog Management
          </h2>
          <SidebarMenuItem>
            <Link
              href="all-blogs"
              className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 rounded-md transition"
            >
              <LiaBlogSolid className="text-purple-500" size={18} />
              <span>All Blogs</span>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link
              href="/create-blogs"
              className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 rounded-md transition"
            >
              <TbLogs className="text-green-500" size={18} />
              <span>Create Blogs</span>
            </Link>
          </SidebarMenuItem>
        </SidebarGroup>

        {/* Settings Section */}
        <SidebarGroup>
          <h2 className="px-5 pt-6 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Settings
          </h2>
          <SidebarMenuItem>
            <Link
              href="/settings"
              className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 rounded-md transition"
            >
              <FaCog className="text-gray-600" size={18} />
              <span>General Settings</span>
            </Link>
          </SidebarMenuItem>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="mt-auto border-t border-gray-300">
        <Link href={"/"}>
          <button className="button-secondary">
            {" "}
            <FaArrowLeft /> back to home
          </button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
