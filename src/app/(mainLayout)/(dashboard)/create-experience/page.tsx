"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useCreateMyExperienceMutations } from "@/hooks/blogs.hooks";

import SSForm from "@/components/form/SSForm";
import SSInput from "@/components/form/SSInput";
import SSTextArea from "@/components/form/SSTextArea";

const experienceSchema = z.object({
  title: z.string().min(1, "Title is required"),

  description: z.string().min(10, "Description must be at least 10 characters"),
  img: z.string().url("Image must be a valid URL"),
  duration: z.string().min(1, "duration is required"),
  company: z.string().min(1, "Company is required"),
});

type TExperienceData = {
  title: string;
  date: string;
  description: string;
  image: string;
  experience: string;
  company: string;
};

const CreateExperience = () => {
  const { mutate: handleCreateExperience } = useCreateMyExperienceMutations();

  const handleSubmit: SubmitHandler<TExperienceData> = (data) => {
    console.log("Form Data Submitted:", data);
    handleCreateExperience(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center">
      <div className="w-full max-w-5xl p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create Blog
        </h2>

        <SSForm
          resolver={zodResolver(experienceSchema)}
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SSInput label="Title" name="title" type="text" />
            <SSInput label="Image URL" name="img" type="url" />
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <SSInput label="Experience" name="duration" type="text" />
            <SSInput label="Company" name="company" type="text" />
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
  );
};

export default CreateExperience;
