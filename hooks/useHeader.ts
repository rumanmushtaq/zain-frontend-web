import { AppDispatch, RootState } from "@/store/store";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/auth";

const useHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const pathname = usePathname(); // Added to track current page
  const { user } = useSelector((state: RootState) => state.auth);

  const handleToLogoutUser = async () => {
    try {
      dispatch(logout());
      router.push("/auth/login");
    } catch (error) {
      console.log("");
    }
  };

  const handleToMoveProfile = () => {
    router.push("/profile");
  };

  return {
    user,
    pathname,
    handleToLogoutUser,
    mobileOpen,
    setMobileOpen,
    handleToMoveProfile,
  };
};

export default useHeader;
