import { Technician } from "../types/technician";

interface TechnicianTableProps {
  technicians: Technician[];
  onEdit: (tech: Technician) => void;
  onDelete: (id: string) => void;
}

export default function TechnicianTable({
  technicians,
  onEdit,
  onDelete,
}: TechnicianTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 bg-sky-500">
        <h2 className="text-2xl font-bold text-white">Daftar Teknisi</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-sky-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                No
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                Nama
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                Kategori
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                Lokasi
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                Telepon
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                Rating
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                Harga/Jam
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                Status
              </th>
              <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {technicians.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
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
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                    <p className="text-lg font-medium">
                      Belum ada data teknisi
                    </p>
                    <p className="text-sm mt-1">
                      Klik tombol &quot;Tambah Teknisi&quot; untuk menambahkan
                      data
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              technicians.map((tech, index) => (
                <tr key={tech.id} className="hover:bg-sky-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {tech.photoURL && (
                        <img
                          src={tech.photoURL}
                          alt={tech.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <div className="font-semibold text-gray-800">
                          {tech.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {tech.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-xs font-semibold">
                      {tech.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {tech.location}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {tech.phone}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-semibold text-gray-800">
                        {tech.rating.toFixed(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                    Rp {tech.price.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        tech.available
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {tech.available ? "Tersedia" : "Tidak Tersedia"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => onEdit(tech)}
                        className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-all"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => onDelete(tech.id)}
                        className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-all"
                      >
                        🗑️ Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {technicians.length > 0 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Total:{" "}
            <span className="font-semibold text-gray-800">
              {technicians.length}
            </span>{" "}
            teknisi
          </p>
        </div>
      )}
    </div>
  );
}
