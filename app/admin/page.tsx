"use client";

import { useState } from "react";
import ProtectedLayout from "../components/ProtectedLayout";
import { db } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function AdminUtilsPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [stats, setStats] = useState<{
    total: number;
    fixed: number;
    errors: number;
  }>({ total: 0, fixed: 0, errors: 0 });

  const fixBookingPrices = async () => {
    if (!confirm("Apakah Anda yakin ingin memperbaiki semua harga booking yang invalid?")) {
      return;
    }

    setLoading(true);
    setMessage("");
    setStats({ total: 0, fixed: 0, errors: 0 });

    try {
      const querySnapshot = await getDocs(collection(db, "bookings"));
      const total = querySnapshot.size;
      let fixed = 0;
      let errors = 0;

      for (const docSnap of querySnapshot.docs) {
        const data = docSnap.data();
        const currentPrice = data.price;

        // Check if price is invalid (undefined, null, NaN, or not a number)
        if (
          currentPrice === undefined ||
          currentPrice === null ||
          typeof currentPrice !== "number" ||
          isNaN(currentPrice)
        ) {
          try {
            // Update with default value 0
            await updateDoc(doc(db, "bookings", docSnap.id), {
              price: 0,
              updatedAt: new Date(),
            });
            fixed++;
            console.log(`Fixed booking ${docSnap.id}: ${currentPrice} -> 0`);
          } catch (error) {
            errors++;
            console.error(`Error fixing booking ${docSnap.id}:`, error);
          }
        }
      }

      setStats({ total, fixed, errors });
      setMessage(
        `✅ Selesai! Total: ${total} booking, Diperbaiki: ${fixed}, Error: ${errors}`
      );
    } catch (error) {
      console.error("Error fixing booking prices:", error);
      setMessage(
        `❌ Error: ${error instanceof Error ? error.message : "Terjadi kesalahan"}`
      );
    } finally {
      setLoading(false);
    }
  };

  const checkBookingPrices = async () => {
    setLoading(true);
    setMessage("");
    setStats({ total: 0, fixed: 0, errors: 0 });

    try {
      const querySnapshot = await getDocs(collection(db, "bookings"));
      const total = querySnapshot.size;
      let invalid = 0;

      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const currentPrice = data.price;

        if (
          currentPrice === undefined ||
          currentPrice === null ||
          typeof currentPrice !== "number" ||
          isNaN(currentPrice)
        ) {
          invalid++;
          console.log(
            `Invalid booking ${docSnap.id}:`,
            data.technicianName,
            "- Price:",
            currentPrice
          );
        }
      });

      setStats({ total, fixed: invalid, errors: 0 });
      setMessage(
        `📊 Total: ${total} booking, Invalid: ${invalid}, Valid: ${total - invalid}`
      );
    } catch (error) {
      console.error("Error checking booking prices:", error);
      setMessage(
        `❌ Error: ${error instanceof Error ? error.message : "Terjadi kesalahan"}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-sky-200 py-8 px-4 lg:pl-72">
        <div className="max-w-4xl mx-auto lg:ml-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Admin Utilities
            </h1>
            <p className="text-gray-600">
              Tools untuk memperbaiki dan maintain data
            </p>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-lg shadow-md ${
                message.includes("✅") || message.includes("📊")
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              {message}
            </div>
          )}

          {/* Stats */}
          {stats.total > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="text-sm text-gray-600 mb-1">Total Bookings</div>
                <div className="text-2xl font-bold text-gray-800">
                  {stats.total}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="text-sm text-gray-600 mb-1">
                  Fixed/Invalid
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {stats.fixed}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="text-sm text-gray-600 mb-1">Errors</div>
                <div className="text-2xl font-bold text-red-600">
                  {stats.errors}
                </div>
              </div>
            </div>
          )}

          {/* Tools */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Fix Booking Prices
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ Warning:</strong> Tool ini akan memperbaiki semua
                  harga booking yang bernilai NaN, undefined, atau null menjadi
                  Rp 0. Anda bisa edit manual setelahnya untuk mengisi harga
                  yang benar.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={checkBookingPrices}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {loading ? "Checking..." : "Check Invalid Prices"}
                </button>
                <button
                  onClick={fixBookingPrices}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {loading ? "Fixing..." : "Fix Invalid Prices"}
                </button>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">
                Cara Menggunakan:
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                <li>Klik "Check Invalid Prices" untuk melihat berapa booking yang bermasalah</li>
                <li>Klik "Fix Invalid Prices" untuk memperbaiki semua harga invalid menjadi Rp 0</li>
                <li>Buka halaman Kelola Bookings untuk edit harga yang benar secara manual</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}
