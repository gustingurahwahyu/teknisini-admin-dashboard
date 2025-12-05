"use client";

import ProtectedLayout from "../components/ProtectedLayout";
import VoucherForm from "../components/VoucherForm";
import VoucherTable from "../components/VoucherTable";
import { useVouchers } from "../hooks/useVouchers";

export default function VouchersPage() {
  const {
    loading,
    message,
    vouchers,
    showForm,
    editingId,
    formData,
    setFormData,
    handleInputChange,
    handleSubmit,
    handleEdit,
    handleCancelEdit,
    handleDelete,
    toggleForm,
  } = useVouchers();

  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-sky-200 py-8 px-4 lg:pl-72">
        <div className="max-w-7xl mx-auto lg:ml-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  Kelola Voucher
                </h1>
                <p className="text-gray-600">
                  Kelola semua kode voucher diskon untuk pelanggan
                </p>
              </div>
              <button
                onClick={toggleForm}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-lg flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      showForm
                        ? "M6 18L18 6M6 6l12 12"
                        : "M12 6v6m0 0v6m0-6h6m-6 0H6"
                    }
                  />
                </svg>
                {showForm
                  ? "Tutup Form"
                  : editingId
                  ? "Batal Edit"
                  : "Tambah Voucher"}
              </button>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-lg shadow-md ${
                message.includes("✅")
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              {message}
            </div>
          )}

          {/* Form or Table */}
          {showForm ? (
            <VoucherForm
              formData={formData}
              loading={loading}
              editingId={editingId}
              onSubmit={handleSubmit}
              onInputChange={handleInputChange}
              onCancelEdit={handleCancelEdit}
              setFormData={setFormData}
            />
          ) : (
            <VoucherTable
              vouchers={vouchers}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </ProtectedLayout>
  );
}
