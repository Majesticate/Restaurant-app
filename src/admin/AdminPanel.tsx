import { useState } from "react";
import { db, storage } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AdminPanel = () => {
  const [dish, setDish] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    location: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageUpload = async (file: File) => {
    const storageRef = ref(storage, `dishes/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageURL = "";

      if (imageFile) {
        imageURL = await handleImageUpload(imageFile);
      }

      await addDoc(collection(db, "menuItems"), {
        ...dish,
        price: parseFloat(dish.price), // Ensure price is stored as a number
        imageURL,
      });

      alert("Dish added successfully!");

      // Reset form
      setDish({
        name: "",
        description: "",
        price: "",
        category: "",
        location: "",
      });
      setImageFile(null);
    } catch (error) {
      console.error("Error adding dish:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Dish Name"
        value={dish.name}
        onChange={(e) => setDish({ ...dish, name: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={dish.description}
        onChange={(e) => setDish({ ...dish, description: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={dish.price}
        onChange={(e) => setDish({ ...dish, price: e.target.value })}
        required
      />
      <select
        value={dish.category}
        onChange={(e) => setDish({ ...dish, category: e.target.value })}
        required
      >
        <option value="">Select Category</option>
        <option value="Pizza">Pizza</option>
        <option value="Burger">Burger</option>
      </select>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
      />
      <button type="submit">Add Dish</button>
    </form>
  );
};

export default AdminPanel;
