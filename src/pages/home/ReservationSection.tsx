import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";

const ReservationSection = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    people: "",
    location: "",
    date: new Date().toISOString().split("T")[0], // Default to today's date in the correct format
    time: "",
  });

  const [loading, setLoading] = useState(false); // Track loading state
  const [success, setSuccess] = useState(""); // Track success message
  const [error, setError] = useState(""); // Track error message

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true); // Show loading state

    const serviceID = "service_wask2yk";
    const templateID = "template_vu1qlwx";
    const publicKey = "9B8k7ZASRJMEHWL06";

    const emailParams = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      people: formData.people,
      location: formData.location,
      date: formData.date,
      time: formData.time,
      to_email: "Ivan4oto22@abv.bg",
    };

    try {
      await emailjs.send(serviceID, templateID, emailParams, publicKey);
      setSuccess(t("reservation.success")); // Show success message
      setError(""); // Clear any previous error message
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        people: "",
        location: "",
        date: "",
        time: "",
      }); // Reset form
      // window.scrollTo(0, 0); // Scroll to top of the page
    } catch (error) {
      setError(t("reservation.error")); // Show error message
      setSuccess(""); // Clear success message
    } finally {
      setLoading(false); // Hide loading state
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
          <h2 className="text-4xl font-bold mb-6">{t("reservation.title")}</h2>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder={t("reservation.fullName")}
              className="p-3 border rounded-lg text-lg"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder={t("reservation.email")}
              className="p-3 border rounded-lg text-lg"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder={t("reservation.phone")}
              className="p-3 border rounded-lg text-lg"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="people"
              placeholder={t("reservation.people")}
              className="p-3 border rounded-lg text-lg"
              value={formData.people}
              onChange={handleChange}
              required
            />
            <select
              name="location"
              className="p-3 border rounded-lg text-lg text-black"
              value={formData.location}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                {t("reservation.location")}
              </option>
              <option>{t("reservation.locations.mall")}</option>
              <option>{t("reservation.locations.lozenets")}</option>
              <option>{t("reservation.locations.mladost")}</option>
              <option>{t("reservation.locations.studentski")}</option>
            </select>
            <input
              type="date"
              name="date"
              className="p-3 border rounded-lg text-lg text-black"
              value={formData.date}
              onChange={handleChange}
              required
              placeholder={t("reservation.date")} // This will display the translated 'Select Date' or 'Изберете дата'
            />
            <select
              name="time"
              className="p-3 border rounded-lg text-lg text-black"
              value={formData.time}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                {t("reservation.time")}
              </option>
              {[
                "12:00",
                "12:30",
                "13:00",
                "13:30",
                "14:00",
                "14:30",
                "15:00",
                "15:30",
                "16:00",
                "16:30",
                "17:00",
                "17:30",
                "18:00",
                "18:30",
                "19:00",
                "19:30",
                "20:00",
                "20:30",
                "21:00",
              ].map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>

            {loading ? (
              <div className="text-yellow-500 p-2">
                Please wait, sending your reservation...
              </div>
            ) : (
              <button
                type="submit"
                className="bg-yellow-500 text-black p-2 text-sm rounded-lg font-semibold hover:bg-yellow-600 w-[250px] mx-auto"
              >
                {t("reservation.button")}
              </button>
            )}

            {success && <div className="text-green-500 mt-4">{success}</div>}
            {error && <div className="text-red-500 mt-4">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationSection;
