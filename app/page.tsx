import React from "react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold">TodoApp</h1>

        <div className="flex gap-4">
          <Link href="/login">
            <button className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="px-4 py-2 rounded-lg bg-white text-purple-600 font-semibold hover:bg-opacity-90 transition">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center px-6 py-24 max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold leading-tight">
          Organize Your Life <br /> One Task at a Time
        </h2>

        <p className="mt-6 text-lg text-white/80">
          A simple, fast and beautiful todo app to manage your daily tasks,
          boost productivity and stay focused.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/register">
            <button className="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:scale-105 transition">
              Start for Free
            </button>
          </Link>

          <Link href="/login">
            <button className="px-6 py-3 border border-white/40 rounded-xl hover:bg-white/20 transition">
              Login
            </button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto pb-24">

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-lg">
          <h3 className="text-xl font-semibold mb-2">⚡ Fast & Simple</h3>
          <p className="text-white/70">
            Quickly add, update, and delete tasks without any clutter.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-lg">
          <h3 className="text-xl font-semibold mb-2">📱 Responsive</h3>
          <p className="text-white/70">
            Works perfectly on mobile, tablet, and desktop devices.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-lg">
          <h3 className="text-xl font-semibold mb-2">🔐 Secure</h3>
          <p className="text-white/70">
            Your data is محفوظ and protected with authentication.
          </p>
        </div>

      </section>

      {/* CTA */}
      <section className="text-center pb-20 px-6">
        <h3 className="text-3xl font-bold">
          Ready to get productive?
        </h3>
        <p className="text-white/70 mt-3">
          Join now and start managing your tasks efficiently.
        </p>

        <Link href="/register">
          <button className="mt-6 px-8 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:scale-105 transition">
            Create Account
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-white/60 text-sm">
        © {new Date().getFullYear()} TodoApp — All rights reserved.
      </footer>
    </div>
  );
};

export default Page;