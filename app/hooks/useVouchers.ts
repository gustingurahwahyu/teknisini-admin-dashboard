import { useState, useEffect } from "react";
import { Voucher, VoucherForm } from "../types/voucher";
import {
  fetchVouchers,
  saveVoucher,
  deleteVoucher,
} from "../services/voucherService";

export function useVouchers() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Set default dates (today to 30 days from now)
  const today = new Date().toISOString().slice(0, 16);
  const thirtyDaysLater = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 16);

  const [formData, setFormData] = useState<VoucherForm>({
    code: "",
    description: "",
    discountType: "percentage",
    discountValue: 0,
    minPurchase: 0,
    maxDiscount: 0,
    usageLimit: 100,
    validFrom: today,
    validUntil: thirtyDaysLater,
    isActive: true,
  });

  const loadVouchers = async () => {
    const data = await fetchVouchers();
    setVouchers(data);
  };

  useEffect(() => {
    loadVouchers();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      console.log("Submitting data:", formData);
      const result = await saveVoucher(formData, editingId);
      console.log("Result:", result);
      setMessage(result.message);

      if (result.success) {
        resetForm();
        await loadVouchers();
        setShowForm(false);
      }
    } catch (error) {
      console.error("Submit error:", error);
      setMessage("❌ Error: Terjadi kesalahan saat menyimpan");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (voucher: Voucher) => {
    setFormData({
      code: voucher.code,
      description: voucher.description,
      discountType: voucher.discountType,
      discountValue: voucher.discountValue,
      minPurchase: voucher.minPurchase,
      maxDiscount: voucher.maxDiscount || 0,
      usageLimit: voucher.usageLimit,
      validFrom: voucher.validFrom?.toDate
        ? voucher.validFrom.toDate().toISOString().slice(0, 16)
        : "",
      validUntil: voucher.validUntil?.toDate
        ? voucher.validUntil.toDate().toISOString().slice(0, 16)
        : "",
      isActive: voucher.isActive,
    });
    setEditingId(voucher.id);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    resetForm();
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus voucher ini?")) {
      setLoading(true);
      const result = await deleteVoucher(id);
      setMessage(result.message);
      if (result.success) {
        await loadVouchers();
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
    const today = new Date().toISOString().slice(0, 16);
    const thirtyDaysLater = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 16);

    setFormData({
      code: "",
      description: "",
      discountType: "percentage",
      discountValue: 0,
      minPurchase: 0,
      maxDiscount: 0,
      usageLimit: 100,
      validFrom: today,
      validUntil: thirtyDaysLater,
      isActive: true,
    });
    setEditingId(null);
  };

  return {
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
  };
}
