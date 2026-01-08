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
  getDoc,
} from "firebase/firestore";
import { Booking, BookingForm } from "../types/booking";

export const fetchBookings = async (): Promise<Booking[]> => {
  try {
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const bookingList: Booking[] = [];
    
    // Fetch all bookings with user email and phone data
    for (const docSnapshot of querySnapshot.docs) {
      const data = docSnapshot.data();
      
      // Fetch user email and phone from users collection
      let userEmail = "";
      let userPhone = "";
      if (data.userId) {
        try {
          const userDoc = await getDoc(doc(db, "users", data.userId));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            userEmail = userData.email || "";
            userPhone = userData.phone || "";
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      
      const booking: Booking = {
        id: docSnapshot.id,
        ...data,
        userEmail,
        userPhone,
        price: typeof data.price === 'number' && !isNaN(data.price) 
          ? data.price 
          : 0,
      } as Booking;
      bookingList.push(booking);
    }
    
    return bookingList;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
};

export const saveBooking = async (
  formData: BookingForm,
  editingId: string | null
): Promise<{ success: boolean; message: string }> => {
  try {
    console.log("Saving booking with data:", formData);

    if (editingId) {
      const updateData: Partial<Booking> = {
        userId: formData.userId,
        technicianId: formData.technicianId,
        technicianName: formData.technicianName,
        category: formData.category,
        address: formData.address,
        scheduledDate: new Date(formData.scheduledDate),
        status: formData.status,
        notes: formData.notes,
        price: formData.price,
        updatedAt: new Date(),
      };

      await updateDoc(doc(db, "bookings", editingId), updateData);
      console.log("Booking updated successfully");
      return { success: true, message: "✅ Booking berhasil diupdate!" };
    } else {
      const docData = {
        userId: formData.userId,
        technicianId: formData.technicianId,
        technicianName: formData.technicianName,
        category: formData.category,
        address: formData.address,
        scheduledDate: new Date(formData.scheduledDate),
        status: formData.status,
        notes: formData.notes,
        price: formData.price,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      console.log("Adding new booking:", docData);
      const docRef = await addDoc(collection(db, "bookings"), docData);
      console.log("Booking added successfully with ID:", docRef.id);
      return { success: true, message: "✅ Booking berhasil ditambahkan!" };
    }
  } catch (error) {
    console.error("Error saving booking:", error);
    return {
      success: false,
      message: `❌ Error: ${
        error instanceof Error ? error.message : "Gagal menyimpan booking"
      }`,
    };
  }
};

export const deleteBooking = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  try {
    await deleteDoc(doc(db, "bookings", id));
    return { success: true, message: "✅ Booking berhasil dihapus!" };
  } catch (error) {
    console.error("Error deleting booking:", error);
    return {
      success: false,
      message: `❌ Error: ${
        error instanceof Error ? error.message : "Gagal menghapus booking"
      }`,
    };
  }
};
