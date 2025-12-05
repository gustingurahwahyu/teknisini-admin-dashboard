import { TechnicianForm, CATEGORIES } from "../types/technician";

interface TechnicianFormComponentProps {
  formData: TechnicianForm;
  loading: boolean;
  editingId: string | null;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancelEdit: () => void;
  setFormData: React.Dispatch<React.SetStateAction<TechnicianForm>>;
}

export default function TechnicianFormComponent({
  formData,
  loading,
  editingId,
  onSubmit,
  onInputChange,
  onPhotoChange,
  onCancelEdit,
  setFormData,
}: TechnicianFormComponentProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {editingId ? "Edit Teknisi" : "Tambah Teknisi Baru"}
      </h2>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nama Teknisi */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nama Teknisi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Contoh: Mahendra Saputra"
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Kategori <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={onInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Lokasi */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
            Lokasi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={onInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Contoh: Denpasar, Bali"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="email@example.com"
            />
          </div>

          {/* Nomor Telepon */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nomor Telepon <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="08123456789"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Rating (0-5) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating || 0}
              onChange={onInputChange}
              required
              min="0"
              max="5"
              step="0.1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Harga per Jam */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Harga per Jam (Rp) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price || 0}
              onChange={onInputChange}
              required
              min="0"
              step="1000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="100000"
            />
          </div>

          {/* Keahlian - Full Width */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Keahlian (pisahkan dengan koma) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={onInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Contoh: Instalasi Listrik, Perbaikan Panel, Maintenance"
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
              placeholder="Deskripsi singkat tentang teknisi..."
            />
          </div>

          {/* Foto - Full Width */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Foto Profil
            </label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={onPhotoChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="mt-1 text-xs text-gray-500">
              Opsional - Upload foto profil teknisi
            </p>
          </div>

          {/* Status Tersedia */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    available: e.target.checked,
                  }))
                }
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm font-semibold text-gray-700">
                Tersedia untuk menerima pesanan
              </span>
            </label>
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
              ? "Update Teknisi"
              : "Tambah Teknisi"}
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
