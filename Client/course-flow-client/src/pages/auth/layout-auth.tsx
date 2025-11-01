import React from "react";

export default function LayoutAuthPage({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
        }}
      />
      {children}
    </div>
  );
}
