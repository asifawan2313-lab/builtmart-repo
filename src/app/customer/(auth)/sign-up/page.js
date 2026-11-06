"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Eye, EyeOff, HardHat, Mail, Building2, X } from "lucide-react";

const LOGIN_ROUTE = "/customer/login";
const TERMS_ROUTE = "/terms";
const PRIVACY_ROUTE = "/privacy";
const HOME_ROUTE = "/";

/* ============================================================
   DATA
   ============================================================ */

// Sign up with Email form
const emailFields = [
  { name: "fullName", label: "Full Name", placeholder: "Full name", half: true },
  { name: "phone", label: "WhatsApp Number", type: "tel", placeholder: "3XX-XXXXXXX", prefix: "+92", half: true },
  { name: "email", label: "Email Address", type: "email", placeholder: "name@example.com" },
  { name: "password", label: "Password", type: "password", placeholder: "Set a new password" },
  { name: "confirm", label: "Confirm Password", type: "password", placeholder: "Enter your password again" },
];

// Complete Your Profile form (Google ke baad)
const profileFields = [
  { name: "fullName", label: "Full Name", placeholder: "Full name" },
  { name: "phone", label: "Phone Number", type: "tel", placeholder: "3XX-XXXXXXX", prefix: "+92" },
];

// Har field ka validation: khali string = theek, warna error message
const rules = {
  fullName: (v) => (v.trim().length < 3 ? "Enter your full name." : ""),
  phone: (v) => (/^3\d{9}$/.test(v.replace(/\D/g, "").replace(/^0/, "")) ? "" : "Enter a valid mobile number."),
  email: (v) => (/^\S+@\S+\.\S+$/.test(v) ? "" : "Enter a valid email address."),
  password: (v) => (v.length < 8 || !/[A-Za-z]/.test(v) || !/\d/.test(v) ? "Use 8+ characters with letters and numbers." : ""),
  confirm: (v, all) => (v === all.password ? "" : "Passwords do not match."),
  terms: (v) => (v ? "" : "Please accept the Terms & Conditions."),
};

const emailKeys = ["fullName", "phone", "email", "password", "confirm", "terms"];
const profileKeys = ["fullName", "phone"];

const yellowBtn =
  "inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#FDC716] text-sm font-semibold text-[#202124] transition-colors hover:bg-[#E5B20F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#292929]";

/* ============================================================
   FORM FIELD (label + input + error, password par show/hide)
   ============================================================ */

const FormField = ({ field, value, error, onChange }) => {
  const [show, setShow] = useState(false);
  const { name, label, type = "text", placeholder, prefix, half } = field;
  const isPassword = type === "password";

  return (
    <div className={half ? "" : "sm:col-span-2"}>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-[#202124]">
        {label} <span className="text-red-600">*</span>
      </label>

      <div
        className={`flex h-11 items-center overflow-hidden rounded-lg border bg-white transition-colors focus-within:border-[#FDC716] focus-within:ring-2 focus-within:ring-[#FDC716]/40 ${
          error ? "border-red-500" : "border-[#D9E3E9]"
        }`}
      >
        {prefix && (
          <span className="flex h-full items-center border-r border-[#D9E3E9] bg-[#F4F4F2] px-3 text-sm text-[#565553]">{prefix}</span>
        )}
        <input
          id={name}
          name={name}
          type={isPassword && show ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-[#202124] outline-none placeholder:text-[#565553]/60"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="mr-1 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-[#565553] transition-colors hover:bg-[#F4F4F2] hover:text-[#202124]"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

/* ============================================================
   PAGE (step: "choose" -> "email" ya "profile")
   ============================================================ */

const SignUpPage = () => {
  const [step, setStep] = useState("choose");
  const [values, setValues] = useState({ fullName: "", phone: "", email: "", password: "", confirm: "", terms: false });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
    setErrors((er) => ({ ...er, [name]: "" }));
    setDone(false);
  };

  const handleStep = (next) => {
    setStep(next);
    setErrors({});
    setDone(false);
  };

  // DEMO: sirf validation chalti hai, koi account nahi banta aur data kahin nahi jata
  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    (step === "email" ? emailKeys : profileKeys).forEach((key) => {
      const message = rules[key](values[key], values);
      if (message) next[key] = message;
    });
    setErrors(next);
    setDone(Object.keys(next).length === 0);
  };

  const isEmail = step === "email";
  const fields = isEmail ? emailFields : profileFields;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F4F4F2] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-[#D9E3E9] bg-white p-5 shadow-sm sm:p-6">
        {/* Header: back, logo, close */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {step !== "choose" && (
              <button
                type="button"
                onClick={() => handleStep("choose")}
                aria-label="Back"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-[#F4F4F2] text-[#202124] transition-colors hover:bg-[#FDC716]"
              >
                <ChevronLeft size={18} />
              </button>
            )}
            <span className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FDC716] text-[#292929]">
                <HardHat size={20} aria-hidden="true" />
              </span>
              <span className="text-xl font-bold text-[#202124]">
                Build<span className="text-[#E5B20F]">Mart</span>
              </span>
            </span>
          </div>

          <Link
            href={HOME_ROUTE}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#565553] transition-colors hover:bg-[#F4F4F2] hover:text-[#202124]"
          >
            <X size={20} />
          </Link>
        </div>

        {/* STEP 1: choose */}
        {step === "choose" && (
          <div className="mt-6">
            <div className="flex h-40 items-center justify-center rounded-xl bg-[#F4F4F2] text-[#384452]">
              <Building2 size={64} strokeWidth={1.25} aria-hidden="true" />
            </div>

            <button type="button" onClick={() => handleStep("email")} className={`${yellowBtn} mt-6`}>
              <Mail size={18} aria-hidden="true" />
              Sign Up with Email
            </button>

            <div className="my-4 flex items-center gap-3 text-sm text-[#565553]">
              <span className="h-px flex-1 bg-[#D9E3E9]" />
              Or
              <span className="h-px flex-1 bg-[#D9E3E9]" />
            </div>

            <button
              type="button"
              onClick={() => handleStep("profile")}
              className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#D9E3E9] bg-[#F4F4F2] text-sm font-semibold text-[#202124] transition-colors hover:border-[#FDC716] hover:bg-[#FDC716]/20"
            >
              <span className="text-base font-bold" aria-hidden="true">G</span>
              Sign Up with Google
            </button>
          </div>
        )}

        {/* STEP 2 / 3: email ya profile form */}
        {step !== "choose" && (
          <form onSubmit={handleSubmit} noValidate className="mt-5">
            <h1 className="text-xl font-semibold text-[#202124]">{isEmail ? "Sign up with Email" : "Complete Your Profile"}</h1>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {fields.map((field) => (
                <FormField key={field.name} field={field} value={values[field.name]} error={errors[field.name]} onChange={handleChange} />
              ))}

              {isEmail && (
                <div className="sm:col-span-2">
                  <label className="flex cursor-pointer items-start gap-2 text-sm text-[#565553]">
                    <input
                      type="checkbox"
                      name="terms"
                      checked={values.terms}
                      onChange={handleChange}
                      className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#FDC716]"
                    />
                    <span>
                      I agree to the{" "}
                      <Link href={TERMS_ROUTE} className="font-semibold text-[#202124] underline hover:text-[#E5B20F]">
                        Terms &amp; Conditions
                      </Link>{" "}
                      and{" "}
                      <Link href={PRIVACY_ROUTE} className="font-semibold text-[#202124] underline hover:text-[#E5B20F]">
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>
                  {errors.terms && <p className="mt-1 text-xs text-red-600">{errors.terms}</p>}
                </div>
              )}
            </div>

            <button type="submit" className={`${yellowBtn} mt-5`}>
              {isEmail ? "Sign Up" : "CONTINUE"}
            </button>

            {done && (
              <p role="status" className="mt-3 text-center text-xs text-[#565553]">
                Demo only: no account was created and nothing was saved.
              </p>
            )}
          </form>
        )}

        <p className="mt-5 text-center text-sm text-[#202124]">
          Already have an account?{" "}
          <Link href={LOGIN_ROUTE} className="font-semibold underline hover:text-[#E5B20F]">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignUpPage;