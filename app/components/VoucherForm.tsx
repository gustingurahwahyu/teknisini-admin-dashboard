"use client";

import { VoucherForm as VoucherFormType } from "../types/voucher";
import { DISCOUNT_TYPES } from "../types/voucher";

interface VoucherFormProps {
  formData: VoucherFormType;
  loading: boolean;
  editingId: string | null;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onCancelEdit: () => void;
  setFormData: (data: VoucherFormType) => void;
}

export default function VoucherForm({
  formData,
  loading,
  editingId,
  onSubmit,
  onInputChange,
  onCancelEdit,
}: VoucherFormProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {editingId ? "Edit Voucher" : "Tambah Voucher Baru"}
      </h2>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kode Voucher */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Kode Voucher <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={onInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
              placeholder="DISKON20"
            />
            <p className="text-xs text-gray-500 mt-1">
              Akan otomatis diubah menjadi huruf besar
            </p>
          </div>

          {/* Tipe Diskon */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tipe Diskon <span className="text-red-500">*</span>
            </label>
            <select
              name="discountType"
              value={formData.discountType}
              onChange={onInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {DISCOUNT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Nilai Diskon */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nilai Diskon <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="discountValue"
              value={formData.discountValue}
              onChange={onInputChange}
              required
              min="0"
              step={formData.discountType === "percentage" ? "1" : "1000"}
              max={formData.discountType === "percentage" ? "100" : undefined}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={
                formData.discountType === "percentage" ? "20" : "50000"
              }
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.discountType === "percentage"
                ? "Masukkan nilai persentase (0-100)"
                : "Masukkan nominal dalam Rupiah"}
            </p>
          </div>

          {/* Max Diskon (hanya untuk percentage) */}
          {formData.discountType === "percentage" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Maksimal Diskon (Rp)
              </label>
              <input
                type="number"
                name="maxDiscount"
                value={formData.maxDiscount}
                onChange={onInputChange}
                min="0"
                step="1000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="100000"
              />
              <p className="text-xs text-gray-500 mt-1">
                Opsional - Batas maksimal nominal diskon
              </p>
            </div>
          )}

          {/* Min Pembelian */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Minimal Pembelian (Rp) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="minPurchase"
              value={formData.minPurchase}
              onChange={onInputChange}
              required
              min="0"
              step="1000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="100000"
            />
          </div>

          {/* Limit Penggunaan */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Limit Penggunaan <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="usageLimit"
              value={formData.usageLimit}
              onChange={onInputChange}
              required
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="100"
            />
            <p className="text-xs text-gray-500 mt-1">
              Jumlah maksimal voucher dapat digunakan
            </p>
          </div>

          {/* Tanggal Mulai */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Berlaku Dari <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              name="validFrom"
              value={formData.validFrom}
              onChange={onInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Tanggal Berakhir */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Berlaku Sampai <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              name="validUntil"
              value={formData.validUntil}
              onChange={onInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Deskripsi - Full Width */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Deskripsi <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onInputChange}
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Contoh: Diskon 20% untuk semua layanan teknisi"
            />
          </div>

          {/* Status Aktif */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={onInputChange}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm font-semibold text-gray-700">
                Aktifkan Voucher
              </span>
            </label>
            <p className="text-xs text-gray-500 mt-1 ml-8">
              Voucher hanya dapat digunakan jika diaktifkan
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading
              ? "Menyimpan..."
              : editingId
              ? "Update Voucher"
              : "Tambah Voucher"}
          </button>
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-semibold"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
