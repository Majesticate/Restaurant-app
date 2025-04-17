import { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // 🔄 New loading state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return; // Prevent multiple rapid clicks

    if (!name || !category || !description || !price || !image) {
      setError("All fields are required");
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setError("Price must be a positive number");
      return;
    }

    const categoryArray = category.split(",").map((cat) => cat.trim());
    setLoading(true); // Start loading

    try {
      await addDoc(collection(db, "menuItems"), {
        name,
        category: categoryArray,
        description,
        price: parsedPrice,
        image,
      });

      navigate("/menu");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("Error adding product: " + error.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false); // Stop loading
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

        <button
          type="submit"
          className={`p-2 rounded-lg text-white w-full sm:w-auto ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
          }`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
