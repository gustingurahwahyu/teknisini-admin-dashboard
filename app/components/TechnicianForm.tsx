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
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {editingId ? "Edit Teknisi" : "Tambah Teknisi Baru"}
        </h2>
        {editingId && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all"
          >
            Batal Edit
          </button>
        )}
      </div>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nama Teknisi *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            placeholder="Contoh: Mahendra Saputra"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Kategori *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={onInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Lokasi *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={onInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            placeholder="Contoh: Denpasar, Bali"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nomor Telepon
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              placeholder="08123456789"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              placeholder="email@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Rating (0-5)
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating || 0}
              onChange={onInputChange}
              min="0"
              max="5"
              step="0.1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Harga per Jam (Rp)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price || 0}
              onChange={onInputChange}
              min="0"
              step="1000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Keahlian (pisahkan dengan koma) *
          </label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={onInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            placeholder="Contoh: Instalasi Listrik, Perbaikan Panel, Maintenance"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Deskripsi *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={onInputChange}
            required
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            placeholder="Deskripsi singkat tentang teknisi..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Foto Profil
          </label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={onPhotoChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
          <p className="mt-1 text-sm text-gray-500">
            Opsional - Upload foto profil teknisi
          </p>
        </div>

        <div className="flex items-center">
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
            className="w-5 h-5 text-sky-500 border-gray-300 rounded focus:ring-sky-500"
          />
          <label className="ml-3 text-sm font-semibold text-gray-700">
            Tersedia untuk menerima pesanan
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-lg font-semibold text-white text-lg transition-all shadow-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-sky-500 hover:bg-sky-600 active:scale-95"
          }`}
        >
          {loading
            ? "Menyimpan..."
            : editingId
            ? "💾 Update Teknisi"
            : "💾 Simpan Teknisi"}
        </button>
      </form>
    </div>
  );
}
