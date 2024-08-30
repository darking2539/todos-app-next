"use client"
import { useEffectOnce } from "@/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffectOnce(() => {
    if (localStorage.getItem("token")) {
      router.push("/todos");
    }else {
      setLoading(false);
    }
  });

  return (
    <>
      {
        !loading && (
        <>
          {children}
        </>
        )}
    </>
  );
}