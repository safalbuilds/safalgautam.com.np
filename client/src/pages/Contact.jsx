import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// const API = import.meta.env.VITE_API_URL;
const API = import.meta.env.VITE_API_URL_LOCAL;


export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formSubmission = async (e) => {
    e.preventDefault();

    const submittedData = { ...formData };

    setFormData({
      name: "",
      email: "",
      message: "",
    });

    try {
      await axios.post(API + "/submit", submittedData);
      toast.success("Contact form submitted successfully ");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit form ");
    }
  };

  return (
    <section id="contact" className="flex items-center flex-col">
      <Toaster position="top-center" />
      <div>
        <h2 className="text-center text-3xl font-bold">Contact Me</h2>
        <p className="text-center text-gray-500 italic">
          Let’s build something amazing together. <br />
          Reach out via email below or connect with me on GitHub.
        </p>
      </div>

      <form
        onSubmit={formSubmission}
        className="flex flex-col items-center gap-4 m-10  border border-gray-500 p-6 md:w-100 w-80 rounded-lg justify-around border-r-4 border-b-4 "
      >
        <div className="inputs">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="border-2 border-gray-400 p-2 rounded"
            required
            autoComplete="name"
          />
        </div>

        <div className="inputs">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="border-2 border-gray-400 p-2 rounded"
            required
            autoComplete="email"
          />
        </div>

        <div className="inputs">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            className="border-2 border-gray-400 p-2 rounded resize-none min-h-35"
            rows="5"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-(--primary) w-70 rounded p-2.5 font-bold mt-5 hover:-translate-y-1 text-[#fafafa] hover:bg-amber-700"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};
