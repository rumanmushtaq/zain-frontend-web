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
      acceptTerms : false
    },
  });

  const password = watch("password");

  const onSubmit = async (data: SignUpFormValues) => {
    if (!data.acceptTerms) {
      setError("acceptTerms", {
        type: "manual",
        message: "You must accept the Terms & Conditions",
      });
      return;
    }

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
