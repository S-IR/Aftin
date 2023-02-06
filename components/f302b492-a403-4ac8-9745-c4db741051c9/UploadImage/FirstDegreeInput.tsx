import React from "react";
import { UseFormRegister } from "react-hook-form";
import { UploadImgInputs } from "../../general/UploadImageComp";

interface props {
  imgField: string | object;
  register: UseFormRegister<UploadImgInputs>;
  errors: FieldErrorsImpl<UploadImgInputs>;
  allowMultipleOptions: boolean;
}

const FirstDegreeInput = ({
  imgField,
  register,
  errors,
  allowMultipleOptions,
}: props) => {
  const inputName = Object.keys(imgField);

  if (Object.keys(imgField).length !== 1) {
    console.log(`this input field has more than 1 name`);
  }
  const firstOptions = Object.values(imgField)[0];

  return (
    <label className="inline-block w-full">
      <p>{inputName}</p>
      <select
        {...register(`${inputName}`)}
        className="bg-black"
        multiple={allowMultipleOptions}
      >
        {firstOptions.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

export default FirstDegreeInput;
