import { useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";

import { Textarea } from "../ui/textarea";
import { IInput } from "@/types";

interface IProps extends IInput {
  type?: string;
  descriptions?: string; // Keep this to pass the description
}

export default function SSTextArea({
  name,
  label,
  variant = "bordered",
  descriptions,
}: IProps) {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  // Update the value when descriptions change
  useEffect(() => {
    if (descriptions !== undefined) {
      setValue(name, descriptions);
    }
  }, [descriptions, name, setValue]);

  const currentValue = useWatch({ name });

  return (
    <div className="mb-4">
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}

      {/* Textarea */}
      <Textarea
        rows={8}
        id={name}
        {...register(name)}
        value={currentValue || descriptions || ""}
        className={`${
          variant === "bordered" ? "border rounded-md" : ""
        } w-full px-3 py-2 text-sm`}
      />

      {/* Error message */}
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
