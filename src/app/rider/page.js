import { redirect } from "next/navigation";

// /rider khola jaye to seedha dashboard par bhej do
export default function RiderPage() {
  redirect("/rider/dashboard");
}