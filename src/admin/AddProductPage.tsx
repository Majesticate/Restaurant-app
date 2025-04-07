import { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category, setCategory] = useState(""); // For multiple categories, this will be a comma-separated string
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form fields
    if (!name || !category || !description || !price || !image) {
      setError("All fields are required");
      return;
    }

    const parsedPrice = parseFloat(price); // Convert price to a number

    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setError("Price must be a positive number");
      return;
    }

    // Convert comma-separated categories to an array
    const categoryArray = category.split(",").map((cat) => cat.trim());

    try {
      // Add new product to Firestore
      await addDoc(collection(db, "menuItems"), {
        name,
        category: categoryArray, // Store categories as an array
        description,
        price: parsedPrice, // Store price as a number
        image,
      });

      // Redirect to the menu page after successful submission
      navigate("/menu");
    } catch (error: unknown) {
      // Type assertion to 'Error'
      if (error instanceof Error) {
        setError("Error adding product: " + error.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[url('/images/2.png')] bg-cover bg-center pb-100">
      <h2 className="text-3xl font-bold mb-6">Add New Product</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-medium">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full sm:w-[250px] md:w-[400px] lg:w-[500px] p-2 mt-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium">
            Category (comma-separated)
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full sm:w-[250px] md:w-[400px] lg:w-[500px] p-2 mt-2 border border-gray-300 rounded-lg"
            placeholder="e.g. Appetizer, Main Course"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full sm:w-[250px] md:w-[400px] lg:w-[500px] p-2 mt-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium">Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full sm:w-[250px] md:w-[400px] lg:w-[500px] p-2 mt-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full sm:w-[250px] md:w-[400px] lg:w-[500px] p-2 mt-2 border border-gray-300 rounded-lg"
          />
        </div>

        <button type="submit" className="bg-blue-500 p-2 rounded-lg text-white">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
