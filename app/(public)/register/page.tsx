"use client";

import React, { useState } from "react";
import { AxiosError } from "axios";
import apiClient from "@/lib/apiClient";

type RegisterRequest = {
    name: string;
    email: string;
    password: string;
};

type ErrorResponse = {
    message: string;
};

const Page = () => {
    const [form, setForm] = useState<RegisterRequest>({
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const res = await apiClient.post("/register", form);

            setSuccess(res.data.message || "User registered successfully");

            setForm({
                name: "",
                email: "",
                password: "",
            });

        } catch (err) {
            const error = err as AxiosError<ErrorResponse>;

            setError(
                error.response?.data?.message ||
                error.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            <div className="bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md border border-white/20">
                <h2 className="text-3xl font-bold text-white text-center mb-6">
                    Create Account
                </h2>

                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    {/* Full Name */}
                    <div>
                        <label className="text-sm text-white/80">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm text-white/80">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm text-white/80">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white"
                            required
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-red-300 text-sm text-center">{error}</p>
                    )}

                    {/* Success */}
                    {success && (
                        <p className="text-green-300 text-sm text-center">{success}</p>
                    )}

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 bg-white text-purple-600 font-semibold py-2 rounded-lg hover:bg-opacity-90 transition disabled:opacity-50"
                    >
                        {loading ? "Creating account..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Page;