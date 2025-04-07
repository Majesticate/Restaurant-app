import { useState } from "react";
import emailjs from "@emailjs/browser";

const ReservationSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    people: "",
    location: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const serviceID = "service_wask2yk"; // Replace with your EmailJS service ID
    const templateID = "template_vu1qlwx"; // Replace with your EmailJS template ID
    const publicKey = "9B8k7ZASRJMEHWL06"; // Replace with your EmailJS public key

    const emailParams = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      people: formData.people,
      location: formData.location,
      to_email: "Ivan4oto22@abv.bg", // Your email
    };

    try {
      await emailjs.send(serviceID, templateID, emailParams, publicKey);
      alert("Reservation request sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send reservation request.");
    }
  };

  return (
    <div
      id="reservation"
      className="py-16 text-center px-6 relative bg-[url('/images/2.png')] bg-cover bg-center w-full h-full"
    >
      <div className="absolute inset-0 bg-black opacity-15 w-full h-full"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center">
        <img
          src="/images/reservation.jpeg"
          alt="Reservation"
          className="w-70 h-48 sm:w-70 sm:h-48 md:w-140 md:h-100 object-cover rounded-full mx-auto md:mb-6 md:mr-30"
        />

        <div className="p-6 w-full md:w-2/3 lg:w-1/2 text-white">
          <h2 className="text-4xl font-bold mb-6">Make a Reservation</h2>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="p-3 border rounded-lg text-lg"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="p-3 border rounded-lg text-lg"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="p-3 border rounded-lg text-lg"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="people"
              placeholder="Number of People"
              className="p-3 border rounded-lg text-lg"
              value={formData.people}
              onChange={handleChange}
              required
            />
            <select
              name="location"
              className="p-3 border rounded-lg text-lg"
              value={formData.location}
              onChange={handleChange}
              required
            >
              <option className="text-gray-500" value="" disabled>
                Select Restaurant Location
              </option>
              <option className="text-black">Mall of Sofia</option>
              <option className="text-black">Lozenets</option>
              <option className="text-black">Mladost</option>
              <option className="text-black">Studentski grad</option>
            </select>

            <button
              type="submit"
              className="bg-yellow-500 text-black p-2 text-sm rounded-lg font-semibold hover:bg-yellow-600 w-[250px] mx-auto"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationSection;
