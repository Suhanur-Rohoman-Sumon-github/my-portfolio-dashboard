"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";
import SSForm from "@/components/form/SSForm";
import SSInput from "@/components/form/SSInput";
import SSTextArea from "@/components/form/SSTextArea";

import { z } from "zod";
import { useCreateBlogMutations } from "@/hooks/blogs.hooks";

const blogValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().default(new Date().toDateString()),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().url("Image must be a valid URL"),
});

const CreateBlog = () => {
  const { mutate: handleCreateBLogs } = useCreateBlogMutations();
  const handleSubmit = (data: FieldValues): void => {
    console.log("Form Data Submitted:", data);
    handleCreateBLogs(data);
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center">
        <div className="w-full max-w-5xl p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Create Blog
          </h2>

          <SSForm
            resolver={zodResolver(blogValidationSchema)}
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SSInput label="Title" name="title" type="text" />
              <SSInput label="Image URL" name="image" type="url" />
            </div>

            <div className="mt-6">
              <SSTextArea label="Description" name="description" />
            </div>

            <div className="mt-8">
              <button
                className="w-full bg-primary text-white py-2 rounded-md"
                type="submit"
              >
                Submit
              </button>
            </div>
          </SSForm>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
