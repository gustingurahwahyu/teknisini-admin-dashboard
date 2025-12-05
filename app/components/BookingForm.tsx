"use client";

import { BookingForm as BookingFormType } from "../types/booking";
import { BOOKING_STATUS } from "../types/booking";

interface BookingFormProps {
  formData: BookingFormType;
  loading: boolean;
  editingId: string | null;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onCancelEdit: () => void;
  setFormData: (data: BookingFormType) => void;
}

export default function BookingForm({
  formData,
  loading,
  editingId,
  onSubmit,
  onInputChange,
  onCancelEdit,
}: BookingFormProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {editingId ? "Edit Booking" : "Tambah Booking Baru"}
      </h2>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User ID */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              User ID
            </label>
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={onInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan ID user"
            />
          </div>

          {/* Technician ID */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Technician ID
            </label>
            <input
              type="text"
              name="technicianId"
              value={formData.technicianId}
              onChange={onInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan ID teknisi"
            />
          </div>

          {/* Technician Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nama Teknisi
            </label>
            <input
              type="text"
              name="technicianName"
              value={formData.technicianName}
              onChange={onInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan nama teknisi"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Kategori
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={onInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Kelistrikan, Elektronik, dll"
            />
          </div>

          {/* Scheduled Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Jadwal
            </label>
            <input
              type="datetime-local"
              name="scheduledDate"
              value={formData.scheduledDate}
              onChange={onInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={onInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {BOOKING_STATUS.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          {/* Total Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Total Harga (Rp)
            </label>
            <input
              type="number"
              name="totalPrice"
              value={formData.totalPrice}
              onChange={onInputChange}
              required
              min="0"
              step="1000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="100000"
            />
          </div>

          {/* Address - Full Width */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Alamat
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={onInputChange}
              required
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan alamat lengkap"
            />
          </div>

          {/* Notes - Full Width */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Catatan (Opsional)
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={onInputChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tambahkan catatan tambahan..."
            />
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
              ? "Update Booking"
              : "Tambah Booking"}
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
