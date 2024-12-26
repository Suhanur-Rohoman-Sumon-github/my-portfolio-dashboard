/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBlogs, createExperience, createMyProjects, getAllExperience, getMyBlogs, getMyProjects } from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useCreateProjectsMutations = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["create-product"],
    mutationFn: async (productData) => {
      await createMyProjects(productData); 
    },
    onSuccess: () => {
      toast.success("Product created successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create product.");
    },
  });
};


export const useMyProjectQuery = () => {
    
  
  const { data, refetch, isLoading, isError } = useQuery<any, Error>({
       queryKey: ["get-my-projects"],
    queryFn: async () => {
      const data = await getMyProjects();

      return data;
    },
  });

  return { data, refetch, isLoading, isError };
};
export const useCreateBlogMutations = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["create-product"],
    mutationFn: async (blogData) => {
      await createBlogs(blogData); 
    },
    onSuccess: () => {
      toast.success("Blogs created successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create product.");
    },
  });
};


export const useGetMyBlogQuery = () => {
    
  
  const { data, refetch, isLoading, isError } = useQuery<any, Error>({
       queryKey: ["get-my-Blogs"],
    queryFn: async () => {
      const data = await getMyBlogs();

      return data;
    },
  });

  return { data, refetch, isLoading, isError };
};
export const useCreateMyExperienceMutations = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["create-experience"],
    mutationFn: async (experienceData) => {
      await createExperience(experienceData); 
    },
    onSuccess: () => {
      toast.success("Experience created successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create product.");
    },
  });
};


export const useGetAllMyExperienceQuery = () => {
    
  
  const { data, refetch, isLoading, isError } = useQuery<any, Error>({
       queryKey: ["get-my-experience"],
    queryFn: async () => {
      const data = await getAllExperience();

      return data;
    },
  });

  return { data, refetch, isLoading, isError };
};