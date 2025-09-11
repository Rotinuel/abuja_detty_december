"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function CountdownPage() {
  const router = useRouter();

  // Read from env
  const targetDate = new Date(process.env.NEXT_PUBLIC_LAUNCH_DATE);
  const redirectPath = process.env.NEXT_PUBLIC_REDIRECT_PATH || "/home";

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  function getTimeRemaining() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((distance / 1000 / 60) % 60),
      seconds: Math.floor((distance / 1000) % 60),
      expired: false,
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getTimeRemaining();
      setTimeLeft(remaining);

      if (remaining.expired) {
        clearInterval(interval);
        router.push(redirectPath);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  async function handleSubscribe(e) {
    e.preventDefault();
    setMessage(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message);
      if (data.success) setEmail("");
    } catch (error) {
      setMessage("Something went wrong. Try again.");
    }
  }

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <main className="flex flex-col items-center justify-center text-center min-h-screen sm:font-xs bg-gradient-to-br from-[#00AB45] via-gray-900 to-[#488D17] text-white px-4 mt-6">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold mb-10 tracking-wide"
      >
        Countdown to Abuja Detty December Launch
      </motion.h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        {timeUnits.map((unit) => (
          <div key={unit.label} className="flex flex-col items-center">
            <div className="relative w-20 h-28 bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={unit.value}
                  initial={{ rotateX: 90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  exit={{ rotateX: -90, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl font-bold"
                >
                  {unit.value}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="mt-2 text-sm uppercase tracking-wider text-gray-400">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      {/* Subscription Box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-12 w-full max-w-md"
      >
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#00AD45] hover:bg-[#488D17] transition font-semibold shadow-md"
          >
            Notify Me
          </button>
        </form>
        {message && (
          <p className="mt-3 text-center text-sm text-gray-300">{message}</p>
        )}
      </motion.div>
    </main>
  );
}
