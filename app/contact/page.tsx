"use client";

import { useState } from "react";
import Header from "../components/Header";
import ClippedImage from "../components/ClippedImage";
import Footer from "../components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    userType: "",
    message: "",
    officeName: "",
    mainField: "",
    mainArea: "",
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const showProfessionalFields =
    formData.userType === "lawyer" || formData.userType === "mediator";

  const isFormValid =
    formData.fullName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.userType !== "";

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch(
        "https://nest-api.prod.nestinsure.co.il/api/v1/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            targetEmail:
              formData.userType === "lawyer" || formData.userType === "mediator"
                ? "partners"
                : "info",
          }),
        }
      );

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          userType: "",
          message: "",
          officeName: "",
          mainField: "",
          mainArea: "",
          consent: false,
        });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col font-sans mx-auto pt-3 md:pt-7">
      <Header />
      <svg
        className="fixed bottom-0 right-0 h-40 w-36 md:h-62.5 md:w-56.5 -z-10"
        xmlns="http://www.w3.org/2000/svg"
        width="290"
        height="350"
        viewBox="0 0 290 350"
        fill="none"
      >
        <path
          opacity="0.330002"
          d="M1192.21 295.967V295.965C1192.21 132.508 1059.7 0 896.242 0H295.962C132.507 0 0 132.508 0 295.965V295.967C0 625.187 266.885 892.07 596.104 892.07C925.324 892.07 1192.21 625.187 1192.21 295.967ZM70.885 515.93C71.073 515.988 71.219 516.096 71.41 516.151C71.321 516.404 71.351 516.611 71.267 516.862C70.935 516.659 70.489 516.389 70.489 516.389C70.489 516.389 70.767 516.068 70.885 515.93Z"
          fill="#508B58"
        />
      </svg>

      <svg
        className="fixed top-0 left-0 h-80 w-100 md:h-175 md:w-250 -z-10"
        xmlns="http://www.w3.org/2000/svg"
        width="1209"
        height="926"
        viewBox="0 0 1209 926"
        fill="none"
      >
        <path
          d="M1208.79 206.815V206.812C1208.79 9.84705 1049.12 -149.825 852.148 -149.825H128.81C-68.152 -149.825 -227.825 9.84705 -227.825 206.812V206.815C-227.825 603.525 93.772 925.12 490.481 925.12C887.191 925.12 1208.79 603.525 1208.79 206.815ZM-142.408 471.871C-142.18 471.94 -142.005 472.071 -141.775 472.136C-141.882 472.442 -141.846 472.691 -141.947 472.993C-142.348 472.748 -142.884 472.423 -142.884 472.423C-142.884 472.423 -142.55 472.037 -142.408 471.871Z"
          fill="#EDF2EC"
        />
      </svg>

      <svg
        className="fixed top-0 right-0 h-32 w-44 md:h-60 md:w-88 -z-10"
        xmlns="http://www.w3.org/2000/svg"
        width="453"
        height="338"
        viewBox="0 0 453 338"
        fill="none"
      >
        <path
          d="M1192.21 -258.888V-258.89C1192.21 -422.346 1059.7 -554.855 896.242 -554.855H295.962C132.507 -554.855 0 -422.346 0 -258.89V-258.888C0 70.3321 266.885 337.215 596.104 337.215C925.324 337.215 1192.21 70.3321 1192.21 -258.888ZM70.885 -38.9249C71.073 -38.8669 71.219 -38.7589 71.41 -38.7039C71.321 -38.4509 71.351 -38.2439 71.267 -37.9929C70.935 -38.1959 70.489 -38.4659 70.489 -38.4659C70.489 -38.4659 70.767 -38.7869 70.885 -38.9249Z"
          fill="#EDF2EC"
        />
      </svg>

      <main className="w-full flex-1 pt-4 flex justify-center px-4 md:px-0">
        <div className="flex flex-col-reverse md:flex-row gap-6 md:gap-8 max-w-[75rem] justify-end w-full">
          <div
            dir="rtl"
            className="flex-1 flex flex-col max-w-full md:max-w-150 text-center md:text-right p-4 md:p-6"
          >
            <h1 className="text-2xl font-bold text-[#508b58] mb-2">צרו קשר</h1>

            <p className="text-base text-black mb-6">
              צוות <span className="font-brand font-bold text-black">NEST</span>{" "}
              זמין לשאלות, לייעוץ ולהצטרפות. מלאו פרטים ונשוב אליכם או צרו קשר:
              <br />
              פניות מעורכי דין/מגשרים:{" "}
              <a
                href="mailto:partners@nestinsure.co.il"
                className="text-[#508b58] underline"
              >
                partners@nestinsure.co.il
              </a>
              <br />
              פניות כלליות:{" "}
              <a
                href="mailto:info@nestinsure.co.il"
                className="text-[#508b58] underline"
              >
                info@nestinsure.co.il
              </a>
            </p>

            {/* Success Popup Modal */}
            {submitStatus === "success" && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div
                  dir="rtl"
                  className="bg-white p-6 max-w-sm mx-4 relative text-center shadow-lg"
                >
                  <button
                    onClick={() => setSubmitStatus("idle")}
                    className="absolute top-2 left-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
                    aria-label="סגור"
                  >
                    ✕
                  </button>
                  <p className="text-base text-black mt-4">
                    הפרטים נשלחו בהצלחה, ניצור עמכם קשר בהקדם.
                    <br />
                    תודה, צוות{" "}
                    <span className="font-brand font-bold">NEST</span>.
                  </p>
                </div>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 text-base">
                אירעה שגיאה בשליחת ההודעה. אנא נסו שוב או צרו קשר ישירות במייל.
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1">
                <label htmlFor="fullName" className="text-base text-black">
                  שם מלא <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 px-4 py-2 text-base focus:outline-none focus:border-[#508B58]"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-base text-black">
                  דוא&quot;ל <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 px-4 py-2 text-base focus:outline-none focus:border-[#508B58]"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1">
                <label htmlFor="phone" className="text-base text-black">
                  טלפון <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 px-4 py-2 text-base focus:outline-none focus:border-[#508B58]"
                />
              </div>

              {/* User Type */}
              <div className="flex flex-col gap-1">
                <label htmlFor="userType" className="text-base text-black">
                  בחרו <span className="text-red-500">*</span>
                </label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 px-4 py-2 text-base focus:outline-none focus:border-[#508B58] bg-white"
                >
                  <option value="">בחרו...</option>
                  <option value="lawyer">עו&quot;ד</option>
                  <option value="mediator">מגשרים</option>
                  <option value="parent">הורים</option>
                  <option value="other">אחר</option>
                </select>
              </div>

              {/* Professional Fields - shown only for lawyers/mediators */}
              {showProfessionalFields && (
                <div className="flex flex-col gap-4 border-r-2 border-[#508B58] pr-4 mr-2">
                  {/* Office Name */}
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="officeName"
                      className="text-base text-black"
                    >
                      שם המשרד
                    </label>
                    <input
                      type="text"
                      id="officeName"
                      name="officeName"
                      value={formData.officeName}
                      onChange={handleInputChange}
                      className="border border-gray-300 px-4 py-2 text-base focus:outline-none focus:border-[#508B58]"
                    />
                  </div>

                  {/* Main Field */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="mainField" className="text-base text-black">
                      תחום עיסוק עיקרי
                    </label>
                    <select
                      id="mainField"
                      name="mainField"
                      value={formData.mainField}
                      onChange={handleInputChange}
                      className="border border-gray-300 px-4 py-2 text-base focus:outline-none focus:border-[#508B58] bg-white"
                    >
                      <option value="">בחרו...</option>
                      <option value="family-law">דיני משפחה וגירושין</option>
                      <option value="family-mediation">גישור משפחתי</option>
                      <option value="other">אחר</option>
                    </select>
                  </div>

                  {/* Main Area */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="mainArea" className="text-base text-black">
                      אזור פעילות עיקרי
                    </label>
                    <select
                      id="mainArea"
                      name="mainArea"
                      value={formData.mainArea}
                      onChange={handleInputChange}
                      className="border border-gray-300 px-4 py-2 text-base focus:outline-none focus:border-[#508B58] bg-white"
                    >
                      <option value="">בחרו...</option>
                      <option value="tel-aviv">תל אביב והמרכז</option>
                      <option value="sharon">השרון</option>
                      <option value="jerusalem">ירושלים</option>
                      <option value="haifa">חיפה והצפון</option>
                      <option value="south">דרום</option>
                      <option value="nationwide">כלל־ארצי</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Message */}
              <div className="flex flex-col gap-1">
                <label htmlFor="message" className="text-base text-black">
                  הודעה
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="border border-gray-300 px-4 py-2 text-base focus:outline-none focus:border-[#508B58] resize-none"
                />
              </div>

              {/* Consent text and Submit */}
              <div className="flex flex-col gap-3 mt-2">
                <p className="text-xs text-black leading-tight">
                  אני מאשר/ת ל-NEST ליצור איתי קשר ולשלוח אליי מידע מקצועי
                  ועדכונים לגבי שיתוף פעולה.
                </p>

                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`px-6 py-3 text-base mt-2 transition-colors ${
                    isFormValid && !isSubmitting
                      ? "bg-[#508B58] text-white hover:bg-[#3d6b43] cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? "שולח..." : "אישור ושליחה"}
                </button>
              </div>
            </form>
          </div>

          <ClippedImage
            src="/page-5/mother.png"
            alt="Mother"
            className="w-full max-w-72 md:max-w-none md:w-160 h-fit mx-auto md:mx-0 hidden md:block"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
