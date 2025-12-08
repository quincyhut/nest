import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import ClippedImage from "../components/ClippedImage";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen md:h-screen md:overflow-hidden flex-col font-sans mx-auto pt-3 md:pt-7">
      <Header />

      <svg
        className="fixed top-0 left-0 h-80 w-100 md:h-175 md:w-250 2xl:h-140 2xl:w-200 -z-10"
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

      <main className="w-full flex-1 pt-4 flex justify-center px-4 md:px-0">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 max-w-[60rem] justify-end w-full md:mr-8 lg:mr-16">
          <div
            dir="rtl"
            className="flex-1 flex flex-col items-center justify-center text-center md:text-right py-2 px-4 md:px-6 md:max-h-[calc(100vh-8rem)] md:overflow-y-auto"
          >
            <h1 className="text-2xl font-bold text-[#508b58] mb-6 w-full max-w-6xl">
              מסלול שותפים מקצועי
            </h1>
            <div className="grid md:grid-cols-2 gap-24 max-w-6xl w-full">
              {/* Right column */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-sm font-bold text-[#508b58] mb-1">
                    NEST ביטוח מזונות
                  </h2>
                  <p className="text-sm text-black leading-tight">
                    ההורות ממשיכה גם אחרי הפרידה. ההסכם צריך לייצר ודאות,
                    יציבות, ומנגנוני גיבוי ברורים לאורך זמן. חלוקת ההוצאות
                    בגידול הילדים היא אחד המרכיבים המרכזיים למחלוקות בין הורים
                    נפרדים. גם כאשר מגיעים להסכם מאוזן, שינוי נסיבות בלתי צפוי
                    עלול לערער אותו.{" "}
                    <span className="font-bold text-[#508b58]">
                      NEST מעניקה ללקוחותיכם רשת ביטחון כלכלית שמבטיחה את המשך
                      תשלומי המזונות
                    </span>{" "}
                    במקרה שבו ההורה המשלם אינו מסוגל לעמוד בהתחייבותו.
                  </p>
                </div>

                <div>
                  <h2 className="text-sm font-bold text-[#508b58] mb-1">
                    מהו ביטוח המזונות של NEST?
                  </h2>
                  <p className="text-sm text-black leading-tight">
                    היא פוליסה ביטוח פיננסית חדשנית. היא מבטיחה את מימוש
                    החיוביות במצבי קיצון כמו מחלה קשה, נכות מתאונה ופטירה של אחד
                    ההורים. הילדים הם המוטבים. ההסכם נשמר והוודאות ממשיכה. זהו
                    מנגנון מוגן על הילדים, ההורים וכלל המשפחה לטווח ארוך.
                  </p>
                </div>

                <div>
                  <h2 className="text-sm font-bold text-[#508b58] mb-1">
                    חדשות בדיני משפחה:
                  </h2>
                  <ul className="list-disc list-inside text-sm text-black leading-tight space-y-0.5">
                    <li>בישראל בין 18,000–15,000 זוגות נפרדים מדי שנה.</li>
                    <li>חלוקת ההוצאות היא מוקד חיכוך חוזר ונשנה.</li>
                    <li>
                      <span className="font-bold text-[#508b58]">
                        NEST מסייעת לאורחי דין ולמגשרים
                      </span>{" "}
                      להציע פתרון שמונע מחלוקות עתידיות, מחזק את ההסכם ומשפר את
                      אמינות הייצוג.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Left column */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-sm font-bold text-[#508b58] mb-1">
                    הערך ללקוחות:
                  </h2>
                  <p className="text-sm text-black leading-tight">
                    <span className="font-bold text-[#508b58]">NEST</span>{" "}
                    מעניקה לשני ההורים את מה שחשוב באמת לילדים: יציבות, ודאות
                    ושקט נפשי. הפוליסה מבטיחה שהמזונות ימשיכו להיות משולמים גם
                    כשחיים משתנים לפתע. זהו מנגנון מוגן ושקוף שמגן על שני ההורים
                    במידה שווה.{" "}
                    <span className="font-bold text-[#508b58]">
                      NEST הופכת משמעותית במיוחד
                    </span>{" "}
                    במקרים של הורות משותפת.{" "}
                    <span className="font-bold text-[#508b58]">
                      NEST מאפשרת לשני ההורים יחד לעמוד מאחורי המחויבות לילדים.
                    </span>
                  </p>
                </div>

                <div>
                  <h2 className="text-sm font-bold text-[#508b58] mb-1">
                    הערך לעורכי דין ומגשרים:
                  </h2>
                  <ul className="list-disc list-inside text-sm text-black leading-tight space-y-0.5">
                    <li>כלי אסטרטגי למ״מ מפתחת את עצמת הקונפליקט.</li>
                    <li>חיזוק משפטי של ההסכם באמצעות מנגנון חיצוני יציב.</li>
                    <li>יתרון מדמיין של שיחובים חדשים בתחום.</li>
                    <li>חיסכון בזמן התנהלות שוטפת עם תיקים.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-sm font-bold text-[#508b58] mb-1">
                    הזמנה להצטרפות כשותפים מומחים:
                  </h2>
                  <p className="text-sm text-black leading-tight">
                    <span className="font-bold text-[#508b58]">NEST</span> מקימה
                    קבוצת מצומצמת של שותפי ערך ועורכי דין ומגשרים מובילים.
                    הקבוצה תקבל גישה לכלי עבודה מקצועיים, מודל תגמול ייחודי,
                    ליווי אישי, וחשיפה במדיה ארצית. שותפי{" "}
                    <span className="font-bold text-[#508b58]">NEST</span> הם
                    אלו שמובילים את התחום.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="mt-4 inline-block bg-[#508B58] text-white px-6 py-3 text-sm hover:bg-[#3d6b43] transition-colors"
                >
                  צרו קשר
                </Link>
              </div>
            </div>
          </div>

          <ClippedImage
            clipLeft={true}
            clipType="circle"
            src="/page-7/kid.png"
            alt="Boy"
            className="hidden md:block w-140 h-fit fixed top-1/2 right-0 -translate-y-1/2 translate-x-[55%] 2xl:translate-x-[65%]"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
