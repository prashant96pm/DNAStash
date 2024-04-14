"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { handleAuth } from "@/utils/api";
import Input from "@/components/Input";
import { BiLoader } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../Context";
import { FaLink } from "react-icons/fa6";
import Image from "next/image";

const SignUp = () => {
  const [submit, setSubmit] = useState(false);
  const router = useRouter();
  const [Error, setError] = useState(null);
  const { setUser } = useUser();

  const onSubmit = async (values) => {
    setSubmit(true);
    try {
      const data = await handleAuth(values, "signup", setError);
      if (data) {
        setUser(data);
        console.log(data);
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmit(false);
    }
  };
  const { values, handleSubmit, handleBlur, handleChange, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        password: Yup.string().required("Password is required"),
      }),
      onSubmit,
    });

  useEffect(() => {
    setError(null);
  }, [values]);

  return (
    <div className=" text-white">
      <div className=" max-w-[1200px] mx-auto p-4 ">
        <Image
          src="/logo-v2.svg"
          width={100}
          className=" h-[50px] w-auto"
          height={100}
          alt=""
        />
      </div>
      <div className="  mt-[100px] text-[14px] flex items-center justify-center flex-col">
        <div className="text-2xl font-semibold">Sign Up</div>
        <form
          onSubmit={handleSubmit}
          className=" max-w-[400px] w-full p-5 grid gap-2"
        >
          <div className="grid gap-7 w-full">
            <Input
              id="email"
              label="Email"
              placeholder="Your Email "
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email?.toLowerCase()?.trim()}
              error={touched.email && errors?.email}
            />

            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={touched.password && errors?.password}
            />
            {Error && <span className="text-[12px] text-red-600">{Error}</span>}

            <div>
              <button
                type="submit"
                className="duration-150 text-[16px] bg-primary text-white
               px-7 py-2 mx-auto  flex items-center justify-center  
               w-full  p-3"
              >
                {submit ? (
                  <BiLoader
                    name="loader"
                    size={24}
                    className="animate-spin duration-150 "
                  />
                ) : (
                  `Sign up`
                )}
              </button>

              <Link href="/sign_in" className=" mt-2 flex gap-2">
                <span> Don&lsquo;t have an account? </span>{" "}
                <strong className=" text-primary hover:underline duration-200">
                  Sign-up here
                </strong>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
