'use client';

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import dynamic from 'next/dynamic';

const Preloader = dynamic(() => import('./components/Preloader'), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-white z-50" />
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" />
        ) : (
          <div key="content" className="relative">
            {children}
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
