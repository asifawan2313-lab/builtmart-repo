"use client";

import Link from "next/link";

const roles = [
  { value: "customer", label: "Customer" },
  { value: "supplier", label: "Supplier" },
  { value: "labour", label: "Labour Professional" },
  { value: "admin", label: "Administrator" },
];

export default function LoginForm() {
  function handleSubmit(e) {
    e.preventDefault();
    // Authentication add hone par yahan login logic aayegi
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        aria-label="Email"
        required
        className="w-full h-11 border border-[#E2E4E7] rounded-lg px-3 placeholder:text-[#A7ADB4] focus:outline-none focus:border-[#45484D]"
      />

      <input
        type="password"
        placeholder="Password"
        aria-label="Password"
        required
        className="w-full h-11 border border-[#E2E4E7] rounded-lg px-3 placeholder:text-[#A7ADB4] focus:outline-none focus:border-[#45484D]"
      />

      <fieldset>
        <legend className="text-sm font-medium mb-2">Log in as</legend>
        <div className="grid grid-cols-2 gap-2">
          {roles.map((role, i) => (
            <label key={role.value} className="cursor-pointer">
              <input
                type="radio"
                name="role"
                value={role.value}
                defaultChecked={i === 0}
                className="peer sr-only"
              />
              <span className="block text-center text-sm font-semibold border border-[#E2E4E7] rounded-lg py-2.5 peer-checked:bg-[#202124] peer-checked:text-white peer-checked:border-[#202124] peer-focus-visible:ring-2 peer-focus-visible:ring-[#A7ADB4]">
                {role.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        className="w-full bg-[#202124] text-white font-semibold rounded-lg py-3 hover:bg-[#45484D]"
      >
        Login
      </button>

      <p className="text-sm text-[#45484D] text-center pt-2">
        No account?{" "}
        <Link href="/signup" className="font-semibold text-[#202124] hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}