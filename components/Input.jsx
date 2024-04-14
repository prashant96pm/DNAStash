import { useState } from "react";

import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Input = ({ error, label, type, ...input }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="grid text-[14px] text-white relative text-base w-full ">
      {label ? (
        <label className="font-bold" htmlFor={label}>
          {label}
        </label>
      ) : (
        <span className=" flex w-[2px] h-[1px] "></span>
      )}

      {type === "password" ? (
        <div
          className={`  flex items-center w-full border p-2 h-[40px] ${
            error ? "border-red-600 " : " border-[#828282]"
          }`}
        >
          <input
            type={showPassword ? "text" : type}
            className={`w-full bg-transparent flex-1 focus:outline-none placeholder:text-[14px] placeholder:text-gray-200 `}
            autoComplete="off"
            {...input}
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="flex items-center  gap-1"
          >
            {showPassword ? (
              <AiOutlineEye name="Eye" size={20} />
            ) : (
              <AiOutlineEyeInvisible name="EyeInvisible" size={20} />
            )}
          </div>
        </div>
      ) : (
        <input
          type={type}
          className={`  w-full bg-transparent focus:outline-none placeholder:text-[14px] placeholder:text-gray-200  border p-2 h-[40px] ${
            error ? "border-red-600 " : " border-[#828282]"
          }`}
          {...input}
        />
      )}
      <div className=" flex relative">
        {error && (
          <span className=" absolute top-0  text-[12px] text-red-600">
            {error}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
