"use client";
import React, { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../Context";

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const { pending, user } = useUser();

    useLayoutEffect(() => {
      if (!pending && !user) {
        router.push("/sign_up");
      }
    }, [pending, user, router]);

    if (pending) {
      return (
        <div className=" flex items-center justify-center text-center ">
          Loading...
        </div>
      );
    }

    return user && <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
