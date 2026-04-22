"use client";

import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/apiClient";

type ErrorResponse = {
    message: string;
};

const Page = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const payload = { email, password }
        try {
            const res = await apiClient.post("/login", payload);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            window.location.href = "/dashboard";
            router.push("/dashboard");

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
                    Welcome Back
                </h2>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    {/* Email */}
                    <div>
                        <label className="text-sm text-white/80">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setEmail(e.target.value)
                            }
                            className="w-full mt-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm text-white/80">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setPassword(e.target.value)
                            }
                            className="w-full mt-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white"
                            required
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-red-300 text-sm text-center">{error}</p>
                    )}

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 bg-white text-purple-600 font-semibold py-2 rounded-lg hover:bg-opacity-90 transition disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Page;