"use client";
import apiClient from "@/lib/apiClient";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const router = useRouter();

    const logout = async () => {
        try {
            const res = await apiClient.get("/logout");
            localStorage.clear();
            if (res.status === 200) {
                router.push("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b shadow-sm">

            {/* Logo / Title */}
            <h1 className="text-xl font-semibold text-gray-800 tracking-tight cursor-pointer">
                Dashboard
            </h1>

            {/* Right Section */}
            <div className="flex items-center gap-6">

                <Link
                    href="/settings"
                    className="text-gray-600 hover:text-black font-medium transition duration-200"
                >
                    Settings
                </Link>

                <button
                    onClick={logout}
                    className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium shadow-sm hover:bg-red-600 hover:shadow-md active:scale-95 transition duration-200"
                >
                    Logout
                </button>

            </div>
        </nav>
    );
};

export default Navbar;