"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProtectedLayout from "./components/ProtectedLayout";
import { fetchTechnicians } from "./services/technicianService";
import { fetchBookings } from "./services/bookingService";
import { fetchVouchers } from "./services/voucherService";

export default function Home() {
  const [stats, setStats] = useState({
    totalTechnicians: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    totalVouchers: 0,
    activeVouchers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [technicians, bookings, vouchers] = await Promise.all([
          fetchTechnicians(),
          fetchBookings(),
          fetchVouchers(),
        ]);

        const activeVouchers = vouchers.filter((v) => {
          const now = new Date();
          const validUntil = v.validUntil?.toDate
            ? v.validUntil.toDate()
            : new Date(v.validUntil);
          return v.isActive && validUntil >= now;
        });

        setStats({
          totalTechnicians: technicians.length,
          totalBookings: bookings.length,
          pendingBookings: bookings.filter((b) => b.status === "pending")
            .length,
          completedBookings: bookings.filter((b) => b.status === "completed")
            .length,
          totalVouchers: vouchers.length,
          activeVouchers: activeVouchers.length,
        });
      } catch (error) {
        console.error("Error loading stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const statCards = [
    {
      title: "Total Teknisi",
      value: stats.totalTechnicians,
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      color: "from-blue-500 to-blue-600",
      link: "/technicians",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      color: "from-purple-500 to-purple-600",
      link: "/bookings",
    },
    {
      title: "Booking Pending",
      value: stats.pendingBookings,
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "from-yellow-500 to-yellow-600",
      link: "/bookings",
    },
    {
      title: "Booking Selesai",
      value: stats.completedBookings,
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "from-green-500 to-green-600",
      link: "/bookings",
    },
    {
      title: "Total Vouchers",
      value: stats.totalVouchers,
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
          />
        </svg>
      ),
      color: "from-pink-500 to-pink-600",
      link: "/vouchers",
    },
    {
      title: "Voucher Aktif",
      value: stats.activeVouchers,
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
      color: "from-teal-500 to-teal-600",
      link: "/vouchers",
    },
  ];

  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-sky-200 py-8 px-4 lg:pl-72">
        <div className="max-w-7xl mx-auto lg:ml-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600">
              Selamat datang di Dashboard Admin TeknisiNi
            </p>
          </div>

          {/* Stats Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {statCards.map((stat, index) => (
                <Link key={index} href={stat.link}>
                  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 cursor-pointer transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white`}
                      >
                        {stat.icon}
                      </div>
                    </div>
                    <h3 className="text-gray-600 text-sm font-medium mb-1">
                      {stat.title}
                    </h3>
                    <p className="text-3xl font-bold text-gray-800">
                      {stat.value}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Akses Cepat
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/technicians">
                <button className="w-full flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-lg">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Kelola Teknisi
                </button>
              </Link>
              <Link href="/bookings">
                <button className="w-full flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-semibold shadow-lg">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Kelola Bookings
                </button>
              </Link>
              <Link href="/vouchers">
                <button className="w-full flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-lg hover:from-pink-700 hover:to-pink-800 transition-all duration-200 font-semibold shadow-lg">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Kelola Vouchers
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
