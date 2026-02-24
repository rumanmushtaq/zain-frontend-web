"use client";

import { useEffect } from "react";
import { toast } from "sonner";


export function ToastProvider() {

console.log("ToastProvider mounted");

  useEffect(() => {

    console.log("useEffect")
    const handleApiError = (event: any) => {
         console.log("useEffect", event)
      const { variant, title, description } = event.detail;

      toast("Event",{
        description
      });
    };

    window.addEventListener("api-error", handleApiError);

    return () => {
      window.removeEventListener("api-error", handleApiError);
    };
  }, [toast]);

  return null;
}
