import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { Voucher, VoucherForm } from "../types/voucher";

export const fetchVouchers = async (): Promise<Voucher[]> => {
  try {
    const q = query(collection(db, "vouchers"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const voucherList: Voucher[] = [];
    querySnapshot.forEach((doc) => {
      voucherList.push({ id: doc.id, ...doc.data() } as Voucher);
    });
    return voucherList;
  } catch (error) {
    console.error("Error fetching vouchers:", error);
    return [];
  }
};

export const saveVoucher = async (
  formData: VoucherForm,
  editingId: string | null
): Promise<{ success: boolean; message: string }> => {
  try {
    console.log("Saving voucher with data:", formData);

    // Validasi kode voucher (uppercase, no spaces)
    const voucherCode = formData.code.toUpperCase().replace(/\s/g, "");

    if (editingId) {
      const updateData: Partial<Voucher> = {
        code: voucherCode,
        description: formData.description,
        discountType: formData.discountType,
        discountValue: formData.discountValue,
        minPurchase: formData.minPurchase,
        maxDiscount: formData.maxDiscount,
        usageLimit: formData.usageLimit,
        validFrom: new Date(formData.validFrom),
        validUntil: new Date(formData.validUntil),
        isActive: formData.isActive,
        updatedAt: new Date(),
      };

      await updateDoc(doc(db, "vouchers", editingId), updateData);
      console.log("Voucher updated successfully");
      return { success: true, message: "✅ Voucher berhasil diupdate!" };
    } else {
      const docData = {
        code: voucherCode,
        description: formData.description,
        discountType: formData.discountType,
        discountValue: formData.discountValue,
        minPurchase: formData.minPurchase,
        maxDiscount: formData.maxDiscount,
        usageLimit: formData.usageLimit,
        usageCount: 0,
        validFrom: new Date(formData.validFrom),
        validUntil: new Date(formData.validUntil),
        isActive: formData.isActive,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      console.log("Adding new voucher:", docData);
      const docRef = await addDoc(collection(db, "vouchers"), docData);
      console.log("Voucher added successfully with ID:", docRef.id);
      return { success: true, message: "✅ Voucher berhasil ditambahkan!" };
    }
  } catch (error) {
    console.error("Error saving voucher:", error);
    return {
      success: false,
      message: `❌ Error: ${
        error instanceof Error ? error.message : "Gagal menyimpan voucher"
      }`,
    };
  }
};

export const deleteVoucher = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  try {
    await deleteDoc(doc(db, "vouchers", id));
    return { success: true, message: "✅ Voucher berhasil dihapus!" };
  } catch (error) {
    console.error("Error deleting voucher:", error);
    return {
      success: false,
      message: `❌ Error: ${
        error instanceof Error ? error.message : "Gagal menghapus voucher"
      }`,
    };
  }
};
