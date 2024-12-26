import { Controller, useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"; // Ensure these imports match your `ui/select` library

interface IProps {
  options: { key: string; label: string }[]; // Array of options with `key` as the value
  name: string; // Name of the field (used in react-hook-form)
  label: string; // Label to display for the select input
  disabled?: boolean; // Disable the select input
}

export default function PSelect({ options, name, label, disabled }: IProps) {
  const { control } = useFormContext(); // Access react-hook-form's context

  return (
    <div className="space-y-2">
      {/* Label for the Select */}
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      {/* Controlled Select Input */}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
          
            value={field.value} // Bind react-hook-form value
            onValueChange={(value) => field.onChange(value)} // Update value on change
            disabled={disabled}
          >
            <SelectTrigger className="w-full">
              {/* Display selected value or placeholder */}
              <SelectValue placeholder={`Select ${label}`} />
            </SelectTrigger>

            {/* Options rendered dynamically */}
            <SelectContent className="bg-white shadow-lg rounded-md mt-1">
              {options.map((option) => (
                <SelectItem key={option.key} value={option.key}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}
