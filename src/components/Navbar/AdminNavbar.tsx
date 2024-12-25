"use client";
import React from "react";
import { Input } from "../ui/input";
import { LiaSearchSolid } from "react-icons/lia";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import useContexts from "@/hooks/useContext";

const AdminNavbar = () => {
  const { user, handleLogout } = useContexts();

  console.log(user);

  const handleLogouts = () => {
    localStorage.removeItem("accessToken");

    // Remove the cookie by setting its expiration to a past date
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    handleLogout();
  };

  // Breadcrumb logic to display the current path
  const pathname = usePathname();
  const breadcrumb = pathname.split("/").filter((crumb) => crumb);

  return (
    <nav className=" border">
      <div className="container mx-auto px-6 md:px-12 py-4 flex flex-wrap justify-between items-center">
        {/* Breadcrumb */}
        <div className="hidden md:block text-sm text-gray-400 mr-8">
          {breadcrumb.length > 0 ? (
            <div className="flex items-center gap-2">
              {breadcrumb.map((crumb, index) => (
                <span key={index}>
                  <Link
                    href={`/${breadcrumb.slice(0, index + 1).join("/")}`}
                    className="hover:underline"
                  >
                    {crumb.charAt(0).toUpperCase() + crumb.slice(1)}
                  </Link>
                  {index < breadcrumb.length - 1 && (
                    <span className="mx-2 text-gray-500">/</span>
                  )}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-gray-500">Home</span>
          )}
        </div>

        {/* Search Bar */}
        <div className="flex-1 flex items-center relative mb-4 md:mb-0 md:mx-8">
          <Input
            placeholder="Search products"
            className="bg-slate-100 rounded-e-none py-2 md:py-5 text-black w-full"
          />

          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 border bg-[#f85606] px-4 py-2 md:px-8 md:py-3 text-white">
            <LiaSearchSolid className="text-lg" />
          </button>
        </div>

        {/* User Actions */}
        <div className="flex gap-4 md:gap-6 items-center">
          {user ? (
            <div className="flex items-center gap-4 md:gap-6">
              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.avatar || "https://github.com/shadcn.png"}
                    />
                    <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-white text-gray-900 shadow-lg rounded-lg">
                  <DropdownMenuItem>
                    <Link href="/account">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/orders">Order History</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogouts}
                    className="text-red-500"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <button className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="py-2 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-800">
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
