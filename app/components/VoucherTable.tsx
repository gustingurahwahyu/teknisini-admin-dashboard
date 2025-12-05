"use client";

import { Voucher } from "../types/voucher";

interface VoucherTableProps {
  vouchers: Voucher[];
  onEdit: (voucher: Voucher) => void;
  onDelete: (id: string) => void;
}

export default function VoucherTable({
  vouchers,
  onEdit,
  onDelete,
}: VoucherTableProps) {
  const formatDate = (date: any) => {
    if (!date) return "-";
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDiscount = (voucher: Voucher) => {
    if (voucher.discountType === "percentage") {
      return `${voucher.discountValue}%`;
    }
    return formatPrice(voucher.discountValue);
  };

  const isExpired = (validUntil: any) => {
    if (!validUntil) return false;
    const until = validUntil.toDate ? validUntil.toDate() : new Date(validUntil);
    return until < new Date();
  };

  const getStatusBadge = (voucher: Voucher) => {
    if (isExpired(voucher.validUntil)) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-300">
          Expired
        </span>
      );
    }
    if (!voucher.isActive) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-300">
          Nonaktif
        </span>
      );
    }
    if (voucher.usageCount >= voucher.usageLimit) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 border border-orange-300">
          Habis
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-300">
        Aktif
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-blue-600 to-blue-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Kode Voucher
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Diskon
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Min. Pembelian
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Periode Berlaku
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Penggunaan
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vouchers.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-16 h-16 text-gray-300 mb-4"
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
                    <p className="text-lg font-medium">
                      Belum ada voucher yang tersedia
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              vouchers.map((voucher) => (
                <tr
                  key={voucher.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-bold text-blue-600">
                        {voucher.code}
                      </div>
                      <div className="text-xs text-gray-500 max-w-xs truncate">
                        {voucher.description}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-green-600">
                      {formatDiscount(voucher)}
                    </div>
                    {voucher.discountType === "percentage" &&
                      voucher.maxDiscount && voucher.maxDiscount > 0 && (
                        <div className="text-xs text-gray-500">
                          Max: {formatPrice(voucher.maxDiscount)}
                        </div>
                      )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatPrice(voucher.minPurchase)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(voucher.validFrom)}
                    </div>
                    <div className="text-xs text-gray-500">
                      s/d {formatDate(voucher.validUntil)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {voucher.usageCount} / {voucher.usageLimit}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${Math.min(
                            (voucher.usageCount / voucher.usageLimit) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(voucher)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => onEdit(voucher)}
                      className="text-blue-600 hover:text-blue-900 mr-3 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(voucher.id)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
