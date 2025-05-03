"use client";

import React, { useEffect } from "react";

import Footer from "../footer/footer";
import Header from "../header/header";

import stylepages from "@/app/main.module.scss";
import { useAuthStore } from "@/provider/Store-Provider/auth-provider";
import { createClient } from "@/utils/supabase/client";

const HeaderFooterWrapper = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { setSessionUser, updateData } = useAuthStore((state) => state);

  useEffect(() => {
    const supabase = createClient();
    const { data } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (!session) {
        setSessionUser(null);
      }
    });

    updateData();

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <Header />
      <main className={stylepages.page}> {children}</main>
      <Footer />
    </div>
  );
};

export default HeaderFooterWrapper;
