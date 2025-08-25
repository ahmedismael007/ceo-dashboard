import Image from "next/image";
import React from "react";

const AuthenticationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 min-h-screen p-5">
      <div>{children}</div>
      <div className="relative w-full h-full hidden lg:block">
        <Image
          src="/images/auth/auth.webp"
          alt="Meeting"
          fill
          priority
          className="object-cover rounded-3xl"
        />
        <div className="bg-black absolute top-0 left-0 w-full h-full rounded-3xl opacity-50"></div>
        <div className="absolute top-0 left-0 w-full h-full rounded-3xl p-5">
          <h3></h3>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationLayout;
