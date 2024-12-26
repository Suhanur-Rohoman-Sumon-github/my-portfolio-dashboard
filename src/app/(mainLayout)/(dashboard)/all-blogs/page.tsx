"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetMyBlogQuery } from "@/hooks/blogs.hooks";

export type TProjects = {
  _id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  created_at: Date;
};

const AllBlogs = () => {
  const { data } = useGetMyBlogQuery();
  console.log(data);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Blogs Title</TableCell>
            <TableCell>Blogs descriptions</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((project: TProjects) => (
            <TableRow key={project._id}>
              <TableCell>{project.title}</TableCell>
              <TableCell>{project.description}</TableCell>

              <TableCell>
                {project.created_at
                  ? new Date(project.created_at).toLocaleDateString()
                  : "N/A"}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                      Actions
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Block</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllBlogs;
