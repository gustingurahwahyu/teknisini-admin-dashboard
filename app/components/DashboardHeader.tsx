import { useAuth } from "../contexts/AuthContext";

interface DashboardHeaderProps {
  showForm: boolean;
  editingId: string | null;
  onToggleForm: () => void;
  onCancelEdit: () => void;
}

export default function DashboardHeader({
  showForm,
  editingId,
  onToggleForm,
  onCancelEdit,
}: DashboardHeaderProps) {
  const { logout } = useAuth();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            Dashboard TeknisiNi
          </h1>
          <p className="text-gray-600">Kelola Data Teknisi</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              if (showForm && editingId) {
                onCancelEdit();
              }
              onToggleForm();
            }}
            className="px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-semibold transition-all shadow-md"
          >
            {showForm ? "Lihat Daftar" : "➕ Tambah Teknisi"}
          </button>
          <button
            onClick={logout}
            className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all shadow-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
