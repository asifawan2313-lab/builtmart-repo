"use client";

import { useState } from "react";
import { HardHat, Eye, EyeOff } from "lucide-react";

// 1) Demo accounts ka simple data (har item ka unique id)
//    Yeh sirf demo ke liye hai, asli project mein yeh box hata dein.
const BM_DEMO_ACCOUNTS = [
  { id: 1, label: "Demo:", login: "admin@buildmart.pk / admin123" },
  { id: 2, label: "Sub-admin:", login: "maria@buildmart.pk / maria123" },
];

export default function BmAdminLogin() {
  // Password nazar aaye ya chhupa rahe
  const [showPassword, setShowPassword] = useState(false);

  // 2) Buttons ke simple handlers
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
  };

  const handleSignIn = (e) => {
    e.preventDefault(); // page reload na ho
    console.log("Sign in clicked");
  };

  return (
    <main className="bm-adminLogin-root grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* ============ Left: dark brand panel ============ */}
      <section className="bm-adminLogin-brand flex flex-col justify-between gap-10 bg-[var(--charcoal-black)] px-6 pt-8 pb-8 text-[color:var(--white-cards)] sm:px-10 lg:min-h-screen lg:px-[60px] lg:pt-[60px] lg:pb-[60px]">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)] 2xl:h-[60px] 2xl:w-[60px]">
            <HardHat size={28} />
          </span>
          <span className="text-2xl leading-none font-[family-name:Baloo2-Bold] 2xl:text-3xl">
            BuildMart
          </span>
        </div>

        {/* Bari heading + detail */}
        <div>
          <h1 className="text-4xl leading-tight sm:text-5xl lg:text-6xl 2xl:text-7xl">
            Run the whole
            <span className="block text-[color:var(--primary-yellow)]">
              material market.
            </span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-[color:var(--border-color)] opacity-80 lg:text-lg 2xl:text-xl 2xl:leading-8">
            Verify suppliers, moderate listings, track deliveries and settle
            disputes — from one place.
          </p>
        </div>

        {/* Neeche: peeli tirchi patti (hazard stripe) */}
        <div className="h-4 w-full bg-[repeating-linear-gradient(115deg,var(--primary-yellow)_0,var(--primary-yellow)_22px,transparent_22px,transparent_51px)]" />
      </section>

      {/* ============ Right: login card ============ */}
      <section className="bm-adminLogin-form flex items-center justify-center bg-[var(--off-white-background)] px-4 py-10 sm:px-6 lg:py-16">
        <form
          onSubmit={handleSignIn}
          className="w-full max-w-[576px] rounded-xl border border-[color:var(--border-color)] bg-[var(--white-cards)] p-6 shadow-sm sm:p-12"
        >
          <h2 className="text-3xl text-[color:var(--primary-text)] sm:text-4xl">
            Admin login
          </h2>
          <p className="mt-1 text-base text-[color:var(--secondary-text)] sm:text-lg">
            Admin accounts only. No public signup.
          </p>

          {/* Email or username */}
          <div className="mt-8">
            <label
              htmlFor="bm-admin-email"
              className="mb-2 block text-base font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]"
            >
              Email or username
            </label>
            <input
              id="bm-admin-email"
              type="text"
              name="email"
              autoComplete="username"
              defaultValue="admin@buildmart.pk"
              className="bm-adminLogin-input w-full rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-3.5 text-base text-[color:var(--secondary-text)] outline-none focus:border-[color:var(--charcoal-black)] sm:text-lg"
            />
          </div>

          {/* Password + eye icon */}
          <div className="mt-6">
            <label
              htmlFor="bm-admin-password"
              className="mb-2 block text-base font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="bm-admin-password"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                className="bm-adminLogin-input w-full rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-3.5 pr-14 text-base text-[color:var(--primary-text)] outline-none focus:border-[color:var(--charcoal-black)] sm:text-lg"
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-[color:var(--primary-text)] hover:opacity-70"
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="mt-6 text-right">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-base font-[family-name:Poppins-Medium] text-[color:var(--primary-text)] hover:underline sm:text-lg"
            >
              Forgot password?
            </button>
          </div>

          {/* Sign in */}
          <button
            type="submit"
            className="bm-adminLogin-signin-btn mt-6 w-full rounded-lg bg-[var(--primary-yellow)] py-3.5 text-base font-[family-name:Poppins-Medium] text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)] sm:text-lg"
          >
            Sign in
          </button>

          {/* Demo box */}
          <div className="mt-6 rounded-lg border border-[color:var(--border-color)] bg-[var(--off-white-background)] p-4 text-sm leading-6 text-[color:var(--secondary-text)] sm:text-base">
            {BM_DEMO_ACCOUNTS.map((item) => (
              <p key={item.id}>
                {item.label}{" "}
                <strong className="font-[family-name:Poppins-Medium] text-[color:var(--primary-text)]">
                  {item.login}
                </strong>
              </p>
            ))}
          </div>
        </form>
      </section>
    </main>
  );
}