import { useState, useEffect } from "react";
import { Booking, BookingForm } from "../types/booking";
import {
  fetchBookings,
  saveBooking,
  deleteBooking,
} from "../services/bookingService";

export function useBookings() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<BookingForm>({
    userId: "",
    technicianId: "",
    technicianName: "",
    category: "",
    address: "",
    scheduledDate: "",
    status: "pending",
    notes: "",
    price: 0,
  });

  const loadBookings = async () => {
    const data = await fetchBookings();
    setBookings(data);
  };

  useEffect(() => {
    loadBookings();
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
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      console.log("Submitting data:", formData);
      const result = await saveBooking(formData, editingId);
      console.log("Result:", result);
      setMessage(result.message);

      if (result.success) {
        resetForm();
        await loadBookings();
        setShowForm(false);
      }
    } catch (error) {
      console.error("Submit error:", error);
      setMessage("❌ Error: Terjadi kesalahan saat menyimpan");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (booking: Booking) => {
    setFormData({
      userId: booking.userId,
      technicianId: booking.technicianId,
      technicianName: booking.technicianName,
      category: booking.category,
      address: booking.address,
      scheduledDate: booking.scheduledDate?.toDate
        ? booking.scheduledDate.toDate().toISOString().slice(0, 16)
        : "",
      status: booking.status,
      notes: booking.notes || "",
      price: typeof booking.price === 'number' && !isNaN(booking.price)
        ? booking.price
        : 0,
    });
    setEditingId(booking.id);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    resetForm();
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus booking ini?")) {
      setLoading(true);
      const result = await deleteBooking(id);
      setMessage(result.message);
      if (result.success) {
        await loadBookings();
      }
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (!showForm) {
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      userId: "",
      technicianId: "",
      technicianName: "",
      category: "",
      address: "",
      scheduledDate: "",
      status: "pending",
      notes: "",
      price: 0,
    });
    setEditingId(null);
  };

  return {
    loading,
    message,
    bookings,
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
  };
}
