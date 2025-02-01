import React from "react";

const RateLimitPage = () => {
  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center text-center p-6">
      <h1 className="font-bebas-neue text-6xl font-bold text-light-100">
        Whoa, slow down!
      </h1>
      <p className="text-2xl text-light-100 mt-4 max-w-2xl">
        You&apos;ve hit the rate limit. To keep our services running smoothly,
        we need to pause requests for a bit. Please wait a moment and try again.
      </p>
      <p className="text-lg text-light-300 mt-2">
        If you think this is a mistake, please contact support.
      </p>
    </main>
  );
};

export default RateLimitPage;
