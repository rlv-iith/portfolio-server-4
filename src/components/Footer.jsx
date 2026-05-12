export default function Footer() {
  return (
    <footer className="z-10 w-full border-t border-white/10 bg-black/90 backdrop-blur-xl px-6 py-5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-xs font-mono text-gray-600">
          © 2025–{new Date().getFullYear()} Ramuni Lalith Vishnu. All rights reserved.
        </p>
        <p className="text-xs font-mono text-gray-700 text-center md:text-right">
          This site logs visit &amp; interaction data privately for analytics. Not shared with third parties.
        </p>
      </div>
    </footer>
  );
}
