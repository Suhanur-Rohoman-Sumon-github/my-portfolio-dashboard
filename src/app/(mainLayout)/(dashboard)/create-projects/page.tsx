/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateProjectsMutations } from "@/hooks/blogs.hooks";

// Validation schema using Zod
const projectsValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subTitle: z.string().min(1, "Subtitle is required"),
  descriptions: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  img: z
    .string()
    .url("Image must be a valid URL")
    .min(1, "Image URL is required"),
  technology: z.array(z.string()).min(1, "At least one technology is required"),
  category: z.string().min(1, "Category is required"),
  liveSideLink: z
    .string()
    .url("Live Site Link must be a valid URL")
    .min(1, "Live Site Link is required"),
  githubBackendLink: z
    .string()
    .url("GitHub Backend Link must be a valid URL")
    .min(1, "Backend Link is required"),
  gitHubFrontendLink: z
    .string()
    .url("GitHub Frontend Link must be a valid URL")
    .min(1, "Frontend Link is required"),
});

const CreateProject = () => {
  const { mutate: handleCreateProjects } = useCreateProjectsMutations();
  const {
    register,
    handleSubmit,

    formState: { errors },
    setValue,
    getValues,
  } = useForm<{
    title: string;
    subTitle: string;
    descriptions: string;
    img: string;
    technology: string[];
    category: string;
    liveSideLink: string;
    githubBackendLink: string;
    gitHubFrontendLink: string;
  }>({
    resolver: zodResolver(projectsValidationSchema),
    defaultValues: {
      technology: [],
    },
  });

  const onSubmit = (data: any): void => {
    handleCreateProjects(data);
  };

  const technologyOptions = [
    { label: "React", value: "react" },
    { label: "Express", value: "express" },
    { label: "MongoDB", value: "mongodb" },
    { label: "Mongoose", value: "mongoose" },
    { label: "PostgreSQL", value: "postgres" },
    { label: "Prisma", value: "prisma" },
  ];

  const handleTechnologyChange = (selectedValue: string) => {
    const currentTechnologies = getValues("technology");
    if (currentTechnologies.includes(selectedValue)) {
      const updatedTechnologies = currentTechnologies.filter(
        (tech: string) => tech !== selectedValue
      );
      setValue("technology", updatedTechnologies);
    } else {
      setValue("technology", [...currentTechnologies, selectedValue]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center">
      <div className="w-full max-w-5xl p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create Project
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="block font-medium text-gray-700">Title</label>
              <input
                {...register("title")}
                type="text"
                className="mt-2 w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Subtitle */}
            <div>
              <label className="block font-medium text-gray-700">
                Subtitle
              </label>
              <input
                {...register("subTitle")}
                type="text"
                className="mt-2 w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary"
              />
              {errors.subTitle && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subTitle.message}
                </p>
              )}
            </div>

            {/* Descriptions */}
            <div className="col-span-2">
              <label className="block font-medium text-gray-700">
                Descriptions
              </label>
              <textarea
                {...register("descriptions")}
                className="mt-2 w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary"
                rows={4}
              />
              {errors.descriptions && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.descriptions.message}
                </p>
              )}
            </div>

            {/* Technology */}
            <div className="col-span-2">
              <label className="block font-medium text-gray-700">
                Technology
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {technologyOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleTechnologyChange(option.value)}
                    className={`px-4 py-2 rounded-md ${
                      getValues("technology").includes(option.value)
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {errors.technology && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.technology?.message &&
                    String(errors.technology.message)}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block font-medium text-gray-700">
                Category
              </label>
              <input
                {...register("category")}
                type="text"
                className="mt-2 w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary"
              />
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label className="block font-medium text-gray-700">Image</label>
              <input
                {...register("img")}
                type="url"
                className="mt-2 w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary"
              />
              {errors.img && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.img.message}
                </p>
              )}
            </div>

            {/* Links */}
            <div>
              <label className="block font-medium text-gray-700">
                Live Site Link
              </label>
              <input
                {...register("liveSideLink")}
                type="url"
                className="mt-2 w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary"
              />
              {errors.liveSideLink && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.liveSideLink.message}
                </p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700">
                GitHub Backend Link
              </label>
              <input
                {...register("githubBackendLink")}
                type="url"
                className="mt-2 w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary"
              />
              {errors.githubBackendLink && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.githubBackendLink.message}
                </p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700">
                GitHub Frontend Link
              </label>
              <input
                {...register("gitHubFrontendLink")}
                type="url"
                className="mt-2 w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary"
              />
              {errors.gitHubFrontendLink && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.gitHubFrontendLink.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              className="w-full bg-primary text-white py-2 rounded-md"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
