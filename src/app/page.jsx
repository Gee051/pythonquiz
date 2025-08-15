// app/page.jsx
export default function HomePage() {
  return (
    <main className="bg-[#121833] border border-indigo-900/50 rounded-2xl p-6">
      <h2 className="text-xl font-semibold">Welcome</h2>
      <p className="text-indigo-200/80 mt-2">
        Your first quiz set for this python class
      </p>
      <a
        href="/quiz"
        className="inline-flex items-center justify-center mt-4 rounded-xl px-4 py-2 bg-[#8ea0ff] text-[#0b1020] font-semibold hover:brightness-110"
      >
        Go to Quiz
      </a>
      <p className="text-xs text-indigo-300 mt-3">
        Tip: You’ll enter your name on the quiz page before starting.
      </p>
    </main>
  );
}
