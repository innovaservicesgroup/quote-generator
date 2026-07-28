import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafbfc]">
      <div className="text-center">
        <div className="text-sm font-bold text-[#006b86] tracking-wide mb-1">
          INNOVA SERVICES GROUP
        </div>
        <h1 className="text-2xl font-semibold text-[#1a1a1a] mb-6">
          Commercial Cleaning Quote Generator
        </h1>
        <Link
          href="/quote"
          className="inline-block bg-[#40aac4] text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-[#369ab3] transition-colors"
        >
          Start a new quote →
        </Link>
      </div>
    </div>
  );
}
