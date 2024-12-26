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
import { useGetAllMyExperienceQuery } from "@/hooks/blogs.hooks";

export type TProjects = {
  _id: string;
  img: string;
  title: string;
  description: string;
  company: string;
  duration: string;
  created_at: Date;
};

const AllExperience = () => {
  const { data } = useGetAllMyExperienceQuery();

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Project Title</TableCell>
            <TableCell>project descriptions</TableCell>
            <TableCell>Project Category</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((project: TProjects) => (
            <TableRow key={project._id}>
              <TableCell>{project.title}</TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell>{project.duration}</TableCell>
              <TableCell>{project.company}</TableCell>
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

export default AllExperience;
