'use client';
import { useEffect, useMemo, useState } from 'react';

// ================= QUESTIONS =================

const QUESTIONS = [
  { id: 1,  prompt: 'open("notes.txt","x") is called but notes.txt already exists. What happens?', options: ['Opens file for writing', 'Raises FileExistsError', 'Opens in append mode', 'Creates a directory'], correctIndex: 1 },

  { id: 2,  prompt: 'After f = open("data.txt","w"); f.write("Hi"), what is stored in the file before f.close()?', options: ['Nothing until close', '"Hi" immediately (buffered)', '"Hi\\n" with newline', 'An error occurs'], correctIndex: 1 },

  { id: 3,  prompt: 'os.getcwd() returns what?', options: ['Root directory', 'Last file opened', 'Current working directory path', 'Parent directory'], correctIndex: 2 },

  { id: 4,  prompt: 'Which Windows command lists only hidden files?', options: ['dir /ah', 'dir /w', 'ls -a', 'show hidden'], correctIndex: 0 },

  { id: 5,  prompt: 'Which file mode truncates an existing file but allows reading and writing?', options: ['w+', 'a+', 'r+', 'x+'], correctIndex: 0 },

  { id: 6,  prompt: 'What does f.readline() return at EOF?', options: ['None', '"" (empty string)', 'Raises StopIteration', 'Last line again'], correctIndex: 1 },

  { id: 7,  prompt: 'os.remove("report.docx") on a missing file will...', options: ['Create empty file', 'Delete silently', 'Raise FileNotFoundError', 'Return False'], correctIndex: 2 },

  { id: 8,  prompt: 'Which bash command creates nested folders at once?', options: ['mkdir path1/path2', 'mkdir -p path1/path2', 'cd path1/path2', 'dir path1/path2'], correctIndex: 1 },

  { id: 9,  prompt: 'Which resets the file cursor to the beginning?', options: ['f.close()', 'f.flush()', 'f.seek(0)', 'f.truncate()'], correctIndex: 2 },

  { id: 10, prompt: 'Which construct ensures a file is closed automatically?', options: ['with open("log.txt") as f:', 'open("log.txt")', 'close("log.txt")', 'os.close("log.txt")'], correctIndex: 0 },

  { id: 11, prompt: 'len(f.readlines()) after opening file with "w" mode gives?', options: ['0', 'Error: not readable', 'Empty lines count', '-1'], correctIndex: 1 },

  { id: 12, prompt: 'What happens if you run del myfile.txt in Python?', options: ['Deletes the file', 'Deletes a variable (not file)', 'SyntaxError', 'Moves file to recycle bin'], correctIndex: 1 },

  { id: 13, prompt: 'Which mode allows reading and appending without truncating?', options: ['r', 'w+', 'a+', 'x+'], correctIndex: 2 },

  { id: 14, prompt: 'Which function checks if a path is a file?', options: ['os.ispath()', 'os.isfile()', 'os.path.isfile()', 'file.exists()'], correctIndex: 2 },

  { id: 15, prompt: 'f.truncate(5) on a 20-byte file will...', options: ['Delete the file', 'Reduce file to 5 bytes', 'Leave file unchanged', 'Set cursor to 5'], correctIndex: 1 },

  { id: 16, prompt: 'Which command removes a directory only if empty?', options: ['rm dir', 'rmdir dir', 'del dir', 'rm -rf dir'], correctIndex: 1 },

  { id: 17, prompt: 'os.mkdir("docs") when docs already exists will...', options: ['Create inside docs', 'Raise FileExistsError', 'Overwrite folder', 'Do nothing'], correctIndex: 1 },

  { id: 18, prompt: 'What does "b" mean in file mode "rb"?', options: ['Binary mode', 'Buffered mode', 'Big data mode', 'Background mode'], correctIndex: 0 },

  { id: 19, prompt: 'What does cd .. do in bash?', options: ['Open parent directory', 'Delete parent directory', 'Show parent name', 'Create parent directory'], correctIndex: 0 },

  { id: 20, prompt: 'Opening a file with "a" and writing "Hello" places it...', options: ['At beginning', 'Overwrites first 5 chars', 'At end of file', 'Always creates new file'], correctIndex: 2 },

  { id: 21, prompt: 'Which reads entire file content into memory?', options: ['f.readline()', 'f.read()', 'f.readlines()', 'f.readall()'], correctIndex: 1 },

  { id: 22, prompt: 'cd \\\\ in Windows CMD moves to...', options: ['Home directory', 'Root directory', 'Current folder', 'Clears directory'], correctIndex: 1 },

  { id: 23, prompt: 'open("file.txt","r") when file is missing raises...', options: ['IOError', 'OSError', 'FileNotFoundError', 'PermissionError'], correctIndex: 2 },

  { id: 24, prompt: 'Which mode prevents overwriting an existing file?', options: ['w', 'x', 'a+', 'r+'], correctIndex: 1 },

  { id: 25, prompt: 'If you open a file with "r+" and immediately call f.write("ABC"), what happens?', options: ['Writes at start, overwriting first characters', 'Appends at end', 'Raises error', 'File gets truncated'], correctIndex: 0 },

  { id: 26, prompt: 'Which mode allows read and write without truncating?', options: ['r+', 'w+', 'a', 'x+'], correctIndex: 0 },

  { id: 27, prompt: 'rm -rf * in bash will...', options: ['Delete nothing', 'Delete all files & folders recursively', 'Show files only', 'Force restart'], correctIndex: 1 },

  { id: 28, prompt: 'os.path.join("folder","file.txt") on Windows returns...', options: ['folder/file.txt', 'folder\\\\file.txt', 'folder.file.txt', 'Error'], correctIndex: 1 },

  { id: 29, prompt: 'What does f.flush() do?', options: ['Empties the file', 'Writes buffer to disk', 'Moves cursor to start', 'Deletes file handle'], correctIndex: 1 },

  { id: 30, prompt: 'Which command shows present directory in Windows CMD?', options: ['pwd', 'where', 'echo %cd%', 'dir'], correctIndex: 2 },

  { id: 31, prompt: 'Opening binary file in "r" (text mode) may...', options: ['Work fine', 'Cause decode errors', 'Read as binary', 'Raise FileError'], correctIndex: 1 },

  { id: 32, prompt: 'Which method writes list of strings at once?', options: ['f.writelines(list)', 'f.write(list)', 'f.append(list)', 'f.dump(list)'], correctIndex: 0 },

  { id: 33, prompt: 'In Windows CMD, dir /s will...', options: ['Show only system files', 'List files in current and subfolders', 'Show hidden files', 'Delete files'], correctIndex: 1 },

  { id: 34, prompt: '"rt" mode in open() means...', options: ['Read text (default)', 'Read truncated', 'Read temporary', 'Read tabular'], correctIndex: 0 },

  { id: 35, prompt: 'What does f.tell() return in Python?', options: ['File size', 'Cursor position (byte offset)', 'Line number', 'Encoding type'], correctIndex: 1 },


  { id: 36, prompt: 'What happens if you open a file with "w" and then immediately close it?', options: ['File deleted', 'File created/emptied', 'Nothing happens', 'Appended data lost'], correctIndex: 1 },

  { id: 37, prompt: 'In Python, which method reads one line at a time but allows iteration?', options: ['f.read()', 'for line in f:', 'f.readlines()', 'f.scanlines()'], correctIndex: 1 },

  { id: 38, prompt: 'What does os.path.exists("demo.txt") return if the file is missing?', options: ['None', 'False', 'Raises Error', 'True'], correctIndex: 1 },

  { id: 39, prompt: 'Which open mode allows binary writing only?', options: ['wb', 'rb', 'ab', 'rt'], correctIndex: 0 },

  { id: 40, prompt: 'In Windows CMD, what does del *.txt do?', options: ['Deletes all .txt files in folder', 'Deletes only hidden .txt files', 'Deletes txt files in subfolders too', 'Renames all .txt files'], correctIndex: 0 }
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
  const durationSec = 1500; 

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
              40 questions. You have <span className="font-semibold">20 minutes</span>.
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
