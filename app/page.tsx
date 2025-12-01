"use client";

import ProtectedLayout from "./components/ProtectedLayout";
import DashboardHeader from "./components/DashboardHeader";
import TechnicianForm from "./components/TechnicianForm";
import TechnicianTable from "./components/TechnicianTable";
import { useTechnicians } from "./hooks/useTechnicians";

export default function Home() {
  const {
    loading,
    message,
    technicians,
    showForm,
    editingId,
    formData,
    setFormData,
    handleInputChange,
    handlePhotoChange,
    handleSubmit,
    handleEdit,
    handleCancelEdit,
    handleDelete,
    toggleForm,
  } = useTechnicians();

  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-sky-200 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <DashboardHeader
            showForm={showForm}
            editingId={editingId}
            onToggleForm={toggleForm}
            onCancelEdit={handleCancelEdit}
          />

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

          {showForm ? (
            <TechnicianForm
              formData={formData}
              loading={loading}
              editingId={editingId}
              onSubmit={handleSubmit}
              onInputChange={handleInputChange}
              onPhotoChange={handlePhotoChange}
              onCancelEdit={handleCancelEdit}
              setFormData={setFormData}
            />
          ) : (
            <TechnicianTable
              technicians={technicians}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </ProtectedLayout>
  );
}
