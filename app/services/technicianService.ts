import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Technician, TechnicianForm } from "../types/technician";
import { uploadToImgBB } from "./imageUploadService";

export const fetchTechnicians = async (): Promise<Technician[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "technicians"));
    const techList: Technician[] = [];
    querySnapshot.forEach((doc) => {
      techList.push({ id: doc.id, ...doc.data() } as Technician);
    });
    return techList;
  } catch (error) {
    console.error("Error fetching technicians:", error);
    return [];
  }
};

export const saveTechnician = async (
  formData: TechnicianForm,
  photoFile: File | null,
  editingId: string | null
): Promise<{ success: boolean; message: string }> => {
  try {
    console.log("Saving technician with data:", formData);
    let photoURL = "";

    if (photoFile) {
      console.log("Uploading photo to ImgBB:", photoFile.name);
      const uploadResult = await uploadToImgBB(photoFile);
      
      if (uploadResult.success) {
        photoURL = uploadResult.url;
        console.log("Photo uploaded successfully:", photoURL);
      } else {
        console.error("Photo upload failed:", uploadResult.error);
        // Continue without photo if upload fails
        photoURL = "";
      }
    }

    const skillsArray = formData.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill !== "");

    if (editingId) {
      const updateData: Partial<Technician> = {
        name: formData.name,
        category: formData.category,
        location: formData.location,
        description: formData.description,
        rating: formData.rating,
        price: formData.price,
        skills: skillsArray,
        phone: formData.phone,
        email: formData.email,
        available: formData.available,
        updatedAt: new Date(),
      };

      if (photoURL) {
        updateData.photoURL = photoURL;
      }

      await updateDoc(doc(db, "technicians", editingId), updateData);
      console.log("Technician updated successfully");
      return { success: true, message: "✅ Teknisi berhasil diupdate!" };
    } else {
      const docData = {
        name: formData.name,
        category: formData.category,
        location: formData.location,
        description: formData.description,
        rating: formData.rating,
        price: formData.price,
        skills: skillsArray,
        phone: formData.phone,
        email: formData.email,
        available: formData.available,
        photoURL,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      console.log("Adding new technician:", docData);
      const docRef = await addDoc(collection(db, "technicians"), docData);
      console.log("Technician added successfully with ID:", docRef.id);
      return { success: true, message: "✅ Teknisi berhasil ditambahkan!" };
    }
  } catch (error) {
    console.error("Error saving technician:", error);
    return {
      success: false,
      message: `❌ Error: ${
        error instanceof Error ? error.message : "Gagal menyimpan teknisi"
      }`,
    };
  }
};

export const deleteTechnician = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  try {
    await deleteDoc(doc(db, "technicians", id));
    return { success: true, message: "✅ Teknisi berhasil dihapus!" };
  } catch (error) {
    console.error("Error deleting technician:", error);
    return { success: false, message: "❌ Error: Gagal menghapus teknisi" };
  }
};
