"use client";
import { SignUpFormValues } from "@/types/signup";
import { Controller, useForm } from "react-hook-form";
import authService from "@/services/auth";
const useSignup = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignUpFormValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      referralCode: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: SignUpFormValues) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    try {
      const res = await authService.signupApi(data);

      // if (!res.ok) {
      //   setError("root", {
      //     type: "server",
      //     message: result.error || "Sign up failed",
      //   });
      //   return;
      // }

      // window.location.href = "/dashboard";
    } catch {
      setError("root", {
        type: "server",
        message: "An error occurred. Please try again.",
      });
    }
  };
  return {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
    onSubmit,
    password,
  };
};

export default useSignup;
