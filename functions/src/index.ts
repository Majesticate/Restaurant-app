import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";

// Admin email where reservations will be sent
const ADMIN_EMAIL = "Ivan4oto22@abv.bg";

// Nodemailer transporter setup (secure way)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Set in Firebase environment variables
    pass: process.env.EMAIL_PASS, // Set in Firebase environment variables
  },
});

// Define expected data structure
interface ReservationData {
  fullName: string;
  email: string;
  phone: string;
  people: string;
  location: string;
}

// Cloud Function to send reservation email
export const sendReservationEmail = functions.https.onCall(
  async (data: functions.https.CallableRequest<ReservationData>) => {
    const reservation = data.data; // Correct way to access the received data

    // Validate required fields
    if (
      !reservation.fullName ||
      !reservation.email ||
      !reservation.phone ||
      !reservation.people ||
      !reservation.location
    ) {
      return { success: false, message: "All fields are required." };
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: ADMIN_EMAIL,
      subject: `New Reservation from ${reservation.fullName}`,
      text: `
        Name: ${reservation.fullName}
        Email: ${reservation.email}
        Phone: ${reservation.phone}
        People: ${reservation.people}
        Location: ${reservation.location}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      return { success: true, message: "Reservation email sent successfully!" };
    } catch (error) {
      console.error("Error sending email:", error);

      // ✅ Fix: Explicitly cast `error` as an Error object before accessing `message`
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";

      return { success: false, message: `Failed to send reservation email. Error: ${errorMessage}` };
    }
  }
);
