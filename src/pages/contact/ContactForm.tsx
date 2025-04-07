import { useState, useEffect } from "react";
import { auth } from "../../firebaseConfig";
import {
  FaFacebook,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState({ success: false, error: "" });

  // Fetch logged-in user's email when component mounts
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        email: user.email || "",
      }));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      setStatus({ success: false, error: "All fields are required!" });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus({ success: false, error: "Invalid email format!" });
      return;
    }

    if (!/^\d{7,15}$/.test(formData.phone)) {
      setStatus({
        success: false,
        error: "Enter a valid phone number (7-15 digits)!",
      });
      return;
    }

    const serviceID = "service_wask2yk"; // Your EmailJS service ID
    const templateID = "template_vu1qlwx"; // Your EmailJS template ID for the contact form
    const publicKey = "9B8k7ZASRJMEHWL06"; // Your EmailJS public key

    const emailParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      to_email: "Ivan4oto22@abv.bg", // This should match the EmailJS template variable
    };

    try {
      await emailjs.send(serviceID, templateID, emailParams, publicKey);
      setStatus({ success: true, error: "" });
      alert("Message sent successfully!");
      setFormData({ name: "", email: formData.email, phone: "", message: "" }); // Keep email, reset others
    } catch (error) {
      setStatus({ success: false, error: "Failed to send message!" });
      console.error(error);
    }
  };

  return (
    <div className="relative py-16 px-6 bg-[url('/images/2.png')] bg-cover bg-center h-full w-full flex flex-col items-center">
      {/* Overlay for better visibility */}
      <div className="absolute inset-0 bg-black opacity-0"></div>

      {/* Contact & Location Section */}
      <div className="relative max-w-4xl w-full absolute inset-0 bg-black opacity-60 text-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div>
            {status.success && (
              <p className="text-green-400 text-center mb-4">
                Message sent successfully!
              </p>
            )}
            {status.error && (
              <p className="text-red-400 text-center mb-4">{status.error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:border-yellow-500"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:border-yellow-500"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:border-yellow-500"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:border-yellow-500 h-32"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Find Us & Social Media */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-yellow-500 text-2xl" />
              <p className="text-lg">123 Main Street, Dubai, UAE</p>
            </div>

            <div className="flex items-center space-x-4">
              <FaPhone className="text-yellow-500 text-2xl" />
              <p className="text-lg">+971 50 123 4567</p>
            </div>

            <div className="flex space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-3xl text-yellow-500 hover:text-yellow-600 transition" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-3xl text-yellow-500 hover:text-yellow-600 transition" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
