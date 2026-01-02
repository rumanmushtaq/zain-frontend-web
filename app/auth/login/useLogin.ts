"use client";
import { LoginFormValues } from "@/types/login";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import authService from "@/services/auth";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { loginSuccess, setUser } from "@/store/slices/auth";

const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await authService.loginApi(data);
      if (!res?.data?.success) {
        setError("root", {
          type: "server",
          message: res.error || "Login failed",
        });
        return;
      }

      console.log("res",res)
      if (res?.data?.success) {
        // ✅ Save to cookies
        document.cookie = `access_token=${res?.data?.access_token}; path=/; max-age=3600`; // 1 hour
        document.cookie = `refresh_token=${
          res?.data?.refresh_token
        }; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days

        dispatch(
          loginSuccess({
            accessToken: res?.data?.access_token,
            refreshToken: res?.data?.refresh_token,
          })
        );
        dispatch(setUser({ user: res?.data?.user }));
        window.location.href = "/dashboard";
      }

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
    formState: { errors, isSubmitting },
    setError,
    onSubmit,
  };
};

export default useLogin;
