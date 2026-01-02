"use client";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import packageService from "@/services/packages";
import { setPackages } from "@/store/slices/package";

const useDashboard = () => {
  const [loader, setLoader] = useState<{
    packages: boolean;
  }>({
    packages: false,
  });
  const dispatch = useDispatch<AppDispatch>();
  const { packages } = useSelector((state: RootState) => state.packages);

  const handleToGetAllPackages = async () => {
    setLoader((prev) => ({ ...prev, packages: true }));
    try {
      const { data } = await packageService.getAllPackages({});

      dispatch(setPackages(data?.data));
    } catch (error) {
      console.log("error:::::", error);
    } finally {
      setLoader((prev) => ({ ...prev, packages: false }));
    }
  };

  useEffect(() => {
    handleToGetAllPackages();
  }, []);
  return {packages};
};

export default useDashboard;
