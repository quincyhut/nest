import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
          Services
        </h1>
        {/* Your content here */}
      </main>
      <Footer />
    </div>
  );
}
