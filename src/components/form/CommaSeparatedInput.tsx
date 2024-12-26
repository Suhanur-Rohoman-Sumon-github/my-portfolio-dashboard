/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useController } from "react-hook-form";

interface CommaSeparatedInputProps {
  label: string;
  name: string;
}

const CommaSeparatedInput = ({ label, name }: CommaSeparatedInputProps) => {
  const { field } = useController({ name });
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Split input into an array when a comma is entered
    if (value.includes(",")) {
      const arrayValues = value
        .split(",")
        .map((v) => v.trim())
        .filter((v) => v); // Remove empty values
      field.onChange([...field.value, ...arrayValues]);
      setInputValue(""); // Clear the input
    }
  };

  const handleRemoveItem = (index: number) => {
    const updatedArray = field.value.filter(
      (_: string, i: number) => i !== index
    );
    field.onChange(updatedArray);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="block w-full border rounded-md px-3 py-2"
        placeholder="Type and press comma to add"
      />
      <div className="mt-2 flex flex-wrap gap-2">
        {field.value &&
          field.value.map((item: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md flex items-center"
            >
              {item}
              <button
                type="button"
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={() => handleRemoveItem(index)}
              >
                &times;
              </button>
            </span>
          ))}
      </div>
    </div>
  );
};

export default CommaSeparatedInput;
