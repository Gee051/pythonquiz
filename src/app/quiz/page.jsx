'use client';
import { useEffect, useMemo, useState } from 'react';

// ================= QUESTIONS =================
'use client';

const QUESTIONS = [
  { id: 1,  prompt: 'What does open("log.txt","a") guarantee about existing content?', options: ['It is preserved and new data goes to the end', 'It is overwritten', 'File opens read-only', 'It raises FileExistsError'], correctIndex: 0 },

  { id: 2,  prompt: 'Which call most reliably prevents extra blank lines when writing CSV on Windows?', options: ['open("scores.csv","w")', 'open("scores.csv","w",newline="")', 'open("scores.csv","w",encoding="utf-8")', 'open("scores.csv","wb")'], correctIndex: 1 },

  { id: 3,  prompt: 'open("data.txt","x") is called but data.txt already exists. What happens?', options: ['Creates empty file', 'Opens existing file for read', 'Raises FileExistsError', 'Silently switches to "w"'], correctIndex: 2 },

  { id: 4,  prompt: 'You open a huge file and do f.readlines(). What is the biggest risk?', options: ['Slow writes', 'It reads line by line lazily', 'High memory usage', 'It changes encoding'], correctIndex: 2 },

  { id: 5,  prompt: 'Which statement about with open(...) as f: is MOST accurate?', options: ['It closes file only if no errors', 'It closes file automatically even on errors', 'It never closes file automatically', 'It only works for binary mode'], correctIndex: 1 },

  { id: 6,  prompt: 'What does json.dump(obj, f, ensure_ascii=False) change compared to default?', options: ['Forces ASCII escape sequences', 'Writes Unicode characters directly (e.g., é)', 'Minifies JSON', 'Prevents writing newlines'], correctIndex: 1 },

  { id: 7,  prompt: 'Given from pathlib import Path; p = Path("notes.txt"); which checks existence?', options: ['exists(p)', 'p.is_file()', 'Path.exists("notes.txt")', 'p.exists()'], correctIndex: 3 },

  { id: 8,  prompt: 'Which mode allows reading AND writing but truncates file on open?', options: ['r+', 'a+', 'w+', 'x'], correctIndex: 2 },

  { id: 9,  prompt: 'You call f = open("report.txt","r",encoding="utf-8"); data = f.read(); Which line safely removes trailing newlines when printing each line?', options: ['print(data.rstrip("\\n"))', 'for line in data: print(line.strip())', 'for line in data.splitlines(): print(line)', 'print(data.striplines())'], correctIndex: 2 },

  { id: 10, prompt: 'Which error is MOST appropriate when open("C:/Windows") is used as a file?', options: ['FileNotFoundError', 'IsADirectoryError', 'PermissionError', 'UnicodeDecodeError'], correctIndex: 1 },

  { id: 11,  prompt: 'Which library is best for working with file paths in a cross-platform way?', options: ['os', 'pathlib', 'sys', 'shutil'], correctIndex: 1 },

  { id: 12, prompt: 'After f.read(10), the next f.read(10) will:', options: ['Re-read the same 10 bytes', 'Read the next 10 bytes', 'Raise EOFError', 'Reset pointer to start'], correctIndex: 1 },

  { id: 13, prompt: 'In Windows CMD, which actually creates a file?', options: ['touch notes.txt', 'new notes.txt', 'echo. > notes.txt', 'file create notes.txt'], correctIndex: 2 },

  { id: 14, prompt: 'In Windows CMD, which shows the current working directory?', options: ['pwd', 'where', 'cd', 'dir'], correctIndex: 2 },

  { id: 15, prompt: 'Which open mode will FAIL if the file already exists?', options: ['x', 'w', 'a', 'r+'], correctIndex: 0 },

  { id: 16, prompt: 'Which is safest for cross-platform paths?', options: ['"C:\\data\\file.txt"', 'os.path + manual joins', 'pathlib.Path join using / operator', 'Hard-coded relative strings'], correctIndex: 2 },

  { id: 17, prompt: 'You read a UTF-8 file using open(..., encoding="latin-1"). Most likely result?', options: ['UnicodeDecodeError', 'Data is garbled but no error', 'FileNotFoundError', 'IsADirectoryError'], correctIndex: 1 },

  { id: 18, prompt: 'Which MOST accurately explains open("log.txt","a+")?', options: ['Read & write; pointer at start; truncates', 'Append & read; writes go to end; file created if missing', 'Read only; pointer at end', 'Write only; pointer at end; truncates'], correctIndex: 1 },

  { id: 19, prompt: 'What does indent=2 do in json.dump(..., indent=2)?', options: ['Compresses JSON', 'Sets 2-space pretty formatting', 'Forces Windows newlines', 'Writes tabs instead of spaces'], correctIndex: 1 },

  { id: 20, prompt: 'Which loop is best for processing VERY large text files?', options: ['lines = f.readlines(); for line in lines:', 'for line in f:', 'text = f.read(); for ch in text:', 'while True: f.read()'], correctIndex: 1 },

  { id: 21, prompt: 'You need to append bytes to an image. Which mode?', options: ['"a"', '"ab"', '"wb"', '"rb+"'], correctIndex: 1 },

  { id: 22, prompt: 'What happens if you do with open("out.txt","w") as f: and never call f.close() explicitly?', options: ['File stays open', 'Data is not written', 'Context manager closes it automatically', 'Raises ResourceWarning immediately'], correctIndex: 2 },

 { id: 23, prompt: 'Which command clears the screen in Windows CMD?', options: ['cls', 'clear', 'reset', 'clean'], correctIndex: 0 },

  { id: 24, prompt: 'In Windows CMD, which removes a DIRECTORY (folder) that is empty?', options: ['del folder', 'rmdir folder', 'rm folder', 'erase folder'], correctIndex: 1 },

  { id: 25, prompt: 'Why might json.load(f) fail after you wrote JSON with the wrong encoding?', options: ['FileNotFoundError', 'IsADirectoryError', 'UnicodeDecodeError', 'KeyError'], correctIndex: 2 },

  { id: 26, prompt: 'You need to guarantee “write then replace” without partial files on most OSes. A common safe pattern is:', options: ['Open with "w+" always', 'Write to temp file then os.replace(temp, real)', 'Open in binary then text', 'Use r+ to avoid truncation'], correctIndex: 1 },

  { id: 27, prompt: 'Which MOST reliably prints the absolute path of Path("data/file.txt")?', options: ['print(Path("data/file.txt").absolute())', 'print(Path("data/file.txt").resolve())', 'print(str("data/file.txt"))', 'print(os.path.abspath())'], correctIndex: 1 },

  { id: 28, prompt: 'You open a file with open("x.txt","r"); immediately call f.write("hi"). Result?', options: ['Writes "hi"', 'Appends "hi"', 'Raises io.UnsupportedOperation (not writable)', 'Silently fails'], correctIndex: 2 },

 
  { id: 29, prompt: 'What is the purpose of newline="" when writing CSV files in Python?', options: ['Adds two new lines', 'Prevents extra blank lines on Windows', 'Forces UTF-8 encoding', 'Adds commas automatically'], correctIndex: 1 },
  { id: 30, prompt: 'Which Windows CMD command lists files (including showing if a file exists)?', options: ['ls', 'dir', 'pwd', 'where'], correctIndex: 1 },

  { id: 31, prompt: 'What happens if you use open("data.txt","x") when the file already exists?', options: ['File opens in read mode', 'File is overwritten', 'File is deleted', 'Raises FileExistsError'], correctIndex: 3 },


  { id: 32, prompt: 'Which Python command prints the current working directory?', options: ['os.getcwd()', 'os.path()', 'path.cwd()', 'dir()'], correctIndex: 0 },

  { id: 33, prompt: 'What is the default mode of open() if none is specified?', options: ['w', 'r', 'a', 'x'], correctIndex: 1 },

  { id: 34, prompt: 'Which pattern is safest for file handling?', options: ['open() then close()', 'with open(...) as f:', 'try + close()', 'file.open()'], correctIndex: 1 },

  { id: 35, prompt: 'Which is TRUE about open(..., "r") default encoding on Windows?', options: ['Always UTF-8', 'Always cp1252', 'Depends on the system default unless encoding is specified', 'Random between UTF-8 and ASCII'], correctIndex: 2 }
];





// ================= COMPONENT =================
export default function QuizPage() {
  const [phase, setPhase] = useState('setup'); // setup | play | done
  const [name, setName] = useState('');
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(-1));
  const [index, setIndex] = useState(0);
  const [startedAt, setStartedAt] = useState(null);
  const [now, setNow] = useState(Date.now());
  const [showInfo, setShowInfo] = useState(false);
  const durationSec = 2100; 

  // timer
  useEffect(() => {
    if (phase !== 'play') return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [phase]);

  const remaining = useMemo(() => {
    if (!startedAt) return durationSec;
    const elapsed = Math.floor((now - startedAt) / 1000);
    return Math.max(0, durationSec - elapsed);
  }, [now, startedAt]);

  useEffect(() => {
    if (phase === 'play' && remaining === 0) handleSubmit();
  }, [phase, remaining]);

  const handleStart = () => {
    if (!name.trim()) return alert('Enter your name');
    setStartedAt(Date.now());
    setPhase('play');
  };

  const selectOption = (optIndex) => {
    setAnswers((prev) => prev.map((v, i) => (i === index ? optIndex : v)));
  };

  const nextQ = () => setIndex((i) => Math.min(i + 1, QUESTIONS.length - 1));
  const prevQ = () => setIndex((i) => Math.max(i - 1, 0));
  const jumpQ = (i) => setIndex(i);

  const correctCount = useMemo(
    () =>
      answers.reduce(
        (acc, a, i) => acc + (a === QUESTIONS[i].correctIndex ? 1 : 0),
        0
      ),
    [answers]
  );

  const handleSubmit = () => setPhase('done');

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');
  const accuracy = Math.round((correctCount / QUESTIONS.length) * 100);

  return (
    <div className="min-h-screen bg-[#0b1020] text-[#eaf0ff]">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Python Basics Quiz</h1>
          {phase !== 'setup' && (
            <div className="text-sm rounded-full border border-indigo-700 px-3 py-1">
              ⏱️ {mm}:{ss}
            </div>
          )}
        </header>

        {/* Setup */}
        {phase === 'setup' && (
          <main className="bg-[#121833] border border-indigo-900/50 rounded-2xl p-6">
            <h2 className="text-xl font-semibold">Welcome</h2>
            <p className="text-indigo-200/80 mt-2">
              35 questions. You have <span className="font-semibold">20 minutes</span>.
            </p>
            <div className="mt-4 grid gap-3">
              <input
                className="w-full rounded-xl bg-slate-900/60 border border-indigo-900/60 px-4 py-2 outline-none focus:border-indigo-500"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button
                className="rounded-xl px-4 py-2 bg-[#8ea0ff] text-[#0b1020] font-semibold hover:brightness-110"
                onClick={handleStart}
              >
                Start Quiz
              </button>
            </div>
          </main>
        )}

        {/* Quiz */}
        {phase === 'play' && (
          <main className="grid gap-4">
            <div className="bg-[#121833] border border-indigo-900/50 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-indigo-200">
                  Question {index + 1} / {QUESTIONS.length}
                </div>
                <div className="text-sm text-indigo-200">Player: {name}</div>
              </div>
              <h3 className="text-lg font-semibold mt-2">{QUESTIONS[index].prompt}</h3>
              <div className="grid gap-3 mt-4">
                {QUESTIONS[index].options.map((opt, i) => {
                  const selected = answers[index] === i;
                  return (
                    <button
                      key={i}
                      onClick={() => selectOption(i)}
                      className={`w-full text-left rounded-xl border px-4 py-3 bg-slate-900/60 border-indigo-900/60 hover:border-indigo-600 ${
                        selected ? 'ring-2 ring-indigo-400' : ''
                      }`}
                    >
                      {String.fromCharCode(65 + i)}. {opt}
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  onClick={prevQ}
                  disabled={index === 0}
                  className="rounded-xl px-4 py-2 border border-indigo-900/60 text-indigo-300 hover:border-indigo-700 disabled:opacity-40"
                >
                  Prev
                </button>
                <button
                  onClick={nextQ}
                  disabled={index === QUESTIONS.length - 1}
                  className="rounded-xl px-4 py-2 border border-indigo-900/60 text-indigo-300 hover:border-indigo-700 disabled:opacity-40"
                >
                  Next
                </button>
                <div className="grow" />
                <button
                  onClick={handleSubmit}
                  className="rounded-xl px-4 py-2 bg-[#ff6b6b] text-white font-semibold hover:brightness-110"
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="bg-[#121833] border border-indigo-900/50 rounded-2xl p-6">
              <div className="mb-2 text-sm text-indigo-200">Quick jump</div>
              <div className="flex flex-wrap gap-2">
                {QUESTIONS.map((_, i) => {
                  const answered = answers[i] !== -1;
                  const isCurrent = i === index;
                  return (
                    <button
                      key={i}
                      onClick={() => jumpQ(i)}
                      className={`rounded-xl px-3 py-1 text-sm border ${
                        isCurrent
                          ? 'bg-[#8ea0ff] text-[#0b1020] border-transparent'
                          : 'border-indigo-900/60 text-indigo-300 hover:border-indigo-700'
                      } ${answered ? '' : 'opacity-70'}`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </main>
        )}

        {/* Results */}
        {phase === 'done' && (
          <main className="grid gap-4">
            <div className="bg-[#121833] border border-indigo-900/50 rounded-2xl p-6">
              <h2 className="text-xl font-bold">Well done, {name}!</h2>
              <div className="grid grid-cols-2 gap-3 max-w-md mt-3">
                <div className="rounded-full border border-indigo-900/60 bg-slate-900/60 px-3 py-1">✅ Correct: {correctCount}</div>
                <div className="rounded-full border border-indigo-900/60 bg-slate-900/60 px-3 py-1">❌ Wrong: {QUESTIONS.length - correctCount}</div>
                <div className="rounded-full border border-indigo-900/60 bg-slate-900/60 px-3 py-1">🎯 Accuracy: {accuracy}%</div>
                <div className="rounded-full border border-indigo-900/60 bg-slate-900/60 px-3 py-1">🧮 Total: {QUESTIONS.length}</div>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  className="rounded-xl px-4 py-2 bg-[#8ea0ff] text-[#0b1020] font-semibold hover:brightness-110"
                  onClick={() => setShowInfo((s) => !s)}
                >
                  {showInfo ? 'Hide Review' : 'Show Review'}
                </button>
                <button
                  className="rounded-xl px-4 py-2 border border-indigo-900/60 text-indigo-300 hover:border-indigo-700"
                  onClick={() => {
                    setPhase('setup');
                    setName('');
                    setAnswers(Array(QUESTIONS.length).fill(-1));
                    setIndex(0);
                    setStartedAt(null);
                    setNow(Date.now());
                    setShowInfo(false);
                  }}
                >
                  Restart
                </button>
              </div>
            </div>
            {showInfo && (
              <div className="grid gap-4">
                {QUESTIONS.map((q, i) => {
                  const your = answers[i];
                  const isCorrect = your === q.correctIndex;
                  return (
                    <div key={q.id} className="bg-[#121833] border border-indigo-900/50 rounded-2xl p-6">
                      <div className="mb-2 font-semibold">{i + 1}. {q.prompt}</div>
                      <div className="grid gap-2">
                        {q.options.map((opt, idx) => {
                          const chosen = your === idx;
                          const klass = chosen
                            ? isCorrect
                              ? 'border-green-500/70 ring-2 ring-green-400/50'
                              : 'border-red-500/70 ring-2 ring-red-400/50'
                            : '';
                          return (
                            <div key={idx} className={`w-full rounded-xl border px-4 py-3 bg-slate-900/60 border-indigo-900/60 ${klass}`}>
                              {String.fromCharCode(65 + idx)}. {opt}
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-3 text-sm">
                        <span className="inline-block mr-2 rounded-full border border-indigo-900/60 bg-slate-900/60 px-3 py-1">
                          Your answer: {your === -1 ? '—' : String.fromCharCode(65 + your)}
                        </span>
                        <span className="inline-block rounded-full border border-indigo-900/60 bg-slate-900/60 px-3 py-1">
                          Correct answer: {String.fromCharCode(65 + q.correctIndex)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        )}
      </div>
    </div>
  );
}
