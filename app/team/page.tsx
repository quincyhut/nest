import Image from "next/image";
import Header from "../components/Header";
import ClippedImage from "../components/ClippedImage";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen md:h-screen md:overflow-hidden flex-col font-sans mx-auto pt-3 md:pt-7">
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
            className="flex-1 inline justify-center items-center flex-col max-w-full md:max-w-150 text-center md:text-right p-4 md:p-6 rounded-md md:max-h-[calc(100vh-8rem)] md:overflow-y-auto"
          >
            <h1 className="text-2xl font-bold text-[#7fa687] mb-2">
              {" "}
              חברי ההנהלה
            </h1>
          </div>

          <ClippedImage
            src="/page-5/mother.png"
            alt="Boy"
            className="w-full max-w-72 md:max-w-none md:w-160 h-fit mx-auto md:mx-0 hidden md:invisible md:block"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
