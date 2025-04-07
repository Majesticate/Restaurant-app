import { useState } from "react";
import { useRouter } from "next/router";

const ConfirmationPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal initially open
  const router = useRouter();

  // Function to handle closing the modal and redirecting
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      router.push("/"); // Redirect to home page after closing modal
    }, 500); // Small delay before redirecting to give a smooth transition
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {isModalOpen && (
        <div className="absolute inset-0 bg-black opacity-50"></div>
      )}
      <div
        className={`relative max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 space-y-6 transition-all duration-300 ${
          isModalOpen ? "scale-100" : "scale-90 opacity-0"
        }`}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Your Order is Confirmed!
        </h2>
        <p className="text-lg text-center text-gray-600">
          Your order number is: <strong>123456</strong>
        </p>
        <p className="text-lg text-center text-gray-600">
          Estimated delivery time: <strong>30 mins</strong>
        </p>
        <p className="text-lg text-center text-gray-600">
          Thank you for your order! We will deliver your items soon.
        </p>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleCloseModal}
            className="bg-yellow-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-yellow-600 transition"
          >
            Close & Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
