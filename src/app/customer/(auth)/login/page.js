"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";

const SIGNUP_ROUTE = "/customer/sign-up";
const FORGOT_ROUTE = "#"; // Forgot Password page banne par yahan route likhein

/* ============================================================
   VALIDATION (khali string = theek, warna error message)
   ============================================================ */

const rules = {
  email: (v) => (/^\S+@\S+\.\S+$/.test(v) ? "" : "Enter a valid email address."),
  password: (v) => (v ? "" : "Enter your password."),
};

/* ============================================================
   PAGE
   ============================================================ */

const CustomerLoginPage = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);

  const inputClass = (name) =>
    `h-11 w-full rounded-lg border bg-white pl-10 text-sm text-[#202124] outline-none transition-colors placeholder:text-[#565553]/60 focus:border-[#FDC716] focus:ring-2 focus:ring-[#FDC716]/40 ${
      errors[name] ? "border-red-500" : "border-[#D9E3E9]"
    }`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((er) => ({ ...er, [name]: "" }));
    setDone(false);
  };

  const handleToggle = () => setShow((s) => !s);

  // DEMO: sirf validation chalti hai, koi asli login ya data save nahi hota
  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    Object.keys(rules).forEach((key) => {
      const message = rules[key](values[key]);
      if (message) next[key] = message;
    });
    setErrors(next);
    setDone(Object.keys(next).length === 0);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F4F4F2] px-4 py-10">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#D9E3E9] bg-white shadow-sm">
        <div className="h-1.5 bg-[#FDC716]" />

        <div className="p-5 sm:p-8">
          {/* Heading */}
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FDC716] text-[#292929]">
              <LogIn size={22} aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-xl font-extrabold text-[#202124] sm:text-2xl">Customer Login</h1>
              <p className="text-xs text-[#565553] sm:text-sm">Welcome back to BuildMart Gujranwala.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-1 block text-xs font-semibold text-[#202124]">
                Email Address <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#565553]" aria-hidden="true" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  className={`${inputClass("email")} pr-3`}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            {/* Password (show/hide) */}
            <div>
              <label htmlFor="password" className="mb-1 block text-xs font-semibold text-[#202124]">
                Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#565553]" aria-hidden="true" />
                <input
                  id="password"
                  name="password"
                  type={show ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  aria-invalid={Boolean(errors.password)}
                  className={`${inputClass("password")} pr-11`}
                />
                <button
                  type="button"
                  onClick={handleToggle}
                  aria-label={show ? "Hide password" : "Show password"}
                  className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-[#565553] transition-colors hover:bg-[#F4F4F2] hover:text-[#202124]"
                >
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}

              <div className="mt-2 text-right">
                <Link href={FORGOT_ROUTE} className="text-xs font-semibold text-[#202124] underline hover:text-[#E5B20F]">
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#FDC716] text-sm font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#292929]"
            >
              <LogIn size={16} aria-hidden="true" />
              Login
            </button>

            {done && (
              <p role="status" className="flex items-start gap-2 rounded-lg bg-[#F4F4F2] p-3 text-xs text-[#202124]">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-600" aria-hidden="true" />
                Form is valid. This is a demo login, so no one was signed in and no data was sent.
              </p>
            )}
          </form>

          <p className="mt-5 text-center text-sm text-[#565553]">
            Don&apos;t have an account?{" "}
            <Link href={SIGNUP_ROUTE} className="font-semibold text-[#202124] underline hover:text-[#E5B20F]">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default CustomerLoginPage;