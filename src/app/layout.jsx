// app/layout.jsx
import './globals.css';

export const metadata = {
  title: 'Python Quiz',
  description: '25-question Python basics quiz with a 10-minute timer',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0b1020] text-[#eaf0ff]">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Python Basics Quiz</h1>
            <a
              href="/quiz"
              className="text-sm rounded-full border border-indigo-700 px-3 py-1 hover:border-indigo-500"
            >
              Start / Resume
            </a>
          </header>
          {children}
          <footer className="mt-10 text-center text-sm text-indigo-500">
            ALL THE BEST
          </footer>
        </div>
      </body>
    </html>
  );
}
