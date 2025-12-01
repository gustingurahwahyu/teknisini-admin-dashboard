import { useState, useEffect } from "react";
import { Technician, TechnicianForm } from "../types/technician";
import {
  fetchTechnicians,
  saveTechnician,
  deleteTechnician,
} from "../services/technicianService";

export function useTechnicians() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<TechnicianForm>({
    name: "",
    category: "Kelistrikan",
    location: "",
    description: "",
    rating: 5.0,
    price: 100000,
    skills: "",
    phone: "",
    email: "",
    available: true,
  });

  const loadTechnicians = async () => {
    const data = await fetchTechnicians();
    setTechnicians(data);
  };

  useEffect(() => {
    loadTechnicians();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? value === ""
            ? 0
            : parseFloat(value)
          : type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      console.log("Submitting data:", formData);
      const result = await saveTechnician(formData, photoFile, editingId);
      console.log("Result:", result);
      setMessage(result.message);

      if (result.success) {
        resetForm();
        await loadTechnicians();
        setShowForm(false);
      }
    } catch (error) {
      console.error("Submit error:", error);
      setMessage("❌ Error: Terjadi kesalahan saat menyimpan");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tech: Technician) => {
    setFormData({
      name: tech.name,
      category: tech.category,
      location: tech.location,
      description: tech.description,
      rating: tech.rating,
      price: tech.price,
      skills: tech.skills.join(", "),
      phone: tech.phone,
      email: tech.email,
      available: tech.available,
    });
    setEditingId(tech.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Yakin ingin menghapus teknisi ini?")) {
      const result = await deleteTechnician(id);
      setMessage(result.message);
      if (result.success) {
        await loadTechnicians();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "Kelistrikan",
      location: "",
      description: "",
      rating: 5.0,
      price: 100000,
      skills: "",
      phone: "",
      email: "",
      available: true,
    });
    setPhotoFile(null);
    const fileInput = document.getElementById("photo") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const toggleForm = () => {
    if (showForm && editingId) {
      handleCancelEdit();
    }
    setShowForm(!showForm);
  };

  return {
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
  };
}
