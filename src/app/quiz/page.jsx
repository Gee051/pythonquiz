'use client';
import { useEffect, useMemo, useState } from 'react';

// ================= QUESTIONS =================

const QUESTIONS = [
  { id: 1,  prompt: 'Which keyword defines a class in Python?', options: ['object', 'class', 'def', 'new'], correctIndex: 1 },

  { id: 2,  prompt: 'Which file mode creates a new file and fails if it already exists?', options: ['w', 'a', 'x', 'r+'], correctIndex: 2 },

  { id: 3,  prompt: 'Which built-in converts the string "42" to an integer 42?', options: ['str("42")', 'float("42")', 'int("42")', 'bool("42")'], correctIndex: 2 },

  { id: 4,  prompt: 'Which of these is a valid Python naming?', options: ['first-name', '1stName', 'name_1', 'def'], correctIndex: 2 },

  { id: 5,  prompt: 'In a for–else loop, the else block runs when…', options: ['always', 'the loop did NOT break', 'a break occurred', 'an exception occurred'], correctIndex: 1 },

  { id: 6,  prompt: 'list.append([4,5]) vs list.extend([4,5]) — which is correct?', options: ['Both add 4 and 5 as two items', 'append adds one list item; extend adds elements separately', 'extend adds one list item; append adds elements separately', 'Both replace the list'], correctIndex: 1 },

  { id: 7, prompt: 'Access an instance attribute balance inside a method…', options: ['balance', 'self.balance', 'Account.balance', 'this.balance'], correctIndex: 1 },

  { id: 8,  prompt: 'What is list(zip([1,2,3],[10,20]))?', options: ['[(1,10),(2,20),(3,undefined)]', '[(1,10),(2,20)]', '[(1,10),(2,20),(3,None)]', 'Error: lengths must match'], correctIndex: 1 },

  { id: 9,  prompt: 'nums=[3,1,2]; print(nums.sort(), nums) prints…', options: ['[1,2,3] [1,2,3]', 'None [1,2,3]', 'None None', '[3,1,2] [1,2,3]'], correctIndex: 1 },

  { id: 10, prompt: 'Which mode opens a file for reading BYTES?', options: ["'r'", "'rb'", "'rt'", "'r+'"], correctIndex: 1 },

  { id: 11, prompt: 'What does __init__ do in a class?', options: ['Deletes objects', 'Initializes new objects', 'Creates modules', 'Handles printing'], correctIndex: 1 },

  { id: 12,  prompt: 'In class methods, what does the self parameter represent?', options: ['The class itself', 'The parent class', 'The current object instance', 'The module'], correctIndex: 2 },

  { id: 13, prompt: 'Safely get a missing key from dict d without KeyError:', options: ['d.key', 'd["key"]', 'd.get("key")', 'get(d,"key")'], correctIndex: 2 },

  { id: 14, prompt: 'Fix the default mutable argument trap:', options: ['Use [] as default', 'Use None then create list inside', 'Use a global list', 'Use tuple instead of list always'], correctIndex: 1 },

  { id: 15, prompt: 'Which statement is correct about "is" vs "=="?', options: ['"==" checks identity', '"is" checks identity', 'Both are identical', 'Neither works for ints'], correctIndex: 1 },

  { id: 16, prompt: 'enumerate(lst, start=1) does what?', options: ['Starts at 0', 'Starts at 1', 'Skips first item', 'Enumerates in reverse'], correctIndex: 1 },

  { id: 17, prompt: 'any([]) and all([]) evaluate to…', options: ['False and False', 'True and True', 'False and True', 'True and False'], correctIndex: 2 },

  { id: 18, prompt: 'While–else: the else block executes when…', options: ['a break occurs', 'no break occurs', 'continue is used', 'an exception occurs'], correctIndex: 1 },

  { id: 19, prompt: 'Which function PARSES a string to datetime?', options: ['strftime', 'strptime', 'timefmt', 'dateparse'], correctIndex: 1 },

  { id: 20, prompt: 'Correct structure of an if/elif/else chain?', options: ['if → else → elif', 'elif → if → else', 'if → elif → else', 'else → if → elif'], correctIndex: 2 },

  { id: 21, prompt: 'Get current working directory:', options: ['os.cwd()', 'os.curdir()', 'os.getcwd()', 'path.cwd'], correctIndex: 2 },

  { id: 22, prompt: 'with open(...) as f: guarantees…', options: ['faster I/O', 'automatic closing even on errors', 'type checking', 'thread safety'], correctIndex: 1 },

  { id: 23, prompt: 'Read an entire text file into one string:', options: ['f.readline()', 'f.read()', 'f.readlines()', 'next(f)'], correctIndex: 1 },

  { id: 24, prompt: 'Which mode both APPENDS and allows READING?', options: ["'a+'", "'w+'", "'r+'", "'x+'"], correctIndex: 0 },

  { id: 25, prompt: 'After f.read(), the file pointer is typically at…', options: ['start', 'middle', 'end of file', 'random spot'], correctIndex: 2 },

  { id: 26, prompt: 'In strings, "\\n" represents…', options: ['Tab', 'Newline', 'Backslash-n', 'Space'], correctIndex: 1 },

  { id: 27, prompt: '"Python"[1:4] evaluates to…', options: ['Pyt', 'yth', 'ytho', 'Pyth'], correctIndex: 1 },

  { id: 28, prompt: 'Why does t=([1,2],3); t[0].append(7) change the tuple content?', options: ['Tuples are mutable', 'List inside the tuple is mutable', 'append makes a new tuple', 'Python bug'], correctIndex: 1 },

  { id: 29, prompt: 'Why can’t a list be a set element?', options: ['Lists are unhashable', 'Sets accept only numbers', 'Tuples are slower', 'Lists are immutable'], correctIndex: 0 },

  { id: 30, prompt: 'In Python 3.7+, dicts preserve…', options: ['alphabetical key order', 'insertion order', 'random order', 'value order'], correctIndex: 1 },

  { id: 31, prompt: 'Which slice reverses a list?', options: ['lst[::-1]', 'lst[::-2]', 'lst[1:]', 'reversed(lst) returns a list'], correctIndex: 0 },

  { id: 32, prompt: '*args collects…', options: ['positional extras into a tuple', 'keyword extras into a dict', 'type hints', 'default args'], correctIndex: 0 },

  { id: 33, prompt: '**kwargs collects…', options: ['positional extras', 'keyword extras into a dict', 'local variables', 'environment vars'], correctIndex: 1 },

  { id: 34, prompt: 'Python’s typing is best described as…', options: ['Static & strong', 'Dynamic & strong', 'Static & weak', 'Dynamic & weak'], correctIndex: 1 },

  { id: 35, prompt: 'x=[[]]*3; x[0].append(1); print(x) results in…', options: ['[[1],[],[]]', '[[1],[1],[1]]', '[[],[],[1]]', 'TypeError'], correctIndex: 1 },

  { id: 36, prompt: 'Sort students by grade desc, then name asc:', options: [
      "sorted(stu, key=lambda s:(-s['g'], s['n']))",
      "sorted(stu, key=lambda s:(s['g'], s['n']))",
      "stu.sort(key='g')",
      "sorted(stu, reverse=True)"
    ], correctIndex: 0 },

  { id: 37, prompt: '@property is used to…', options: ['create a classmethod', 'expose a computed/controlled attribute', 'allocate memory faster', 'hide methods from dir()'], correctIndex: 1 },

  { id: 38, prompt: 'Name mangling happens for attributes named…', options: ['_attr', '__attr', 'attr__', '__attr__'], correctIndex: 1 },

  { id: 39, prompt: 'MRO: If B.speak→"B", C(B).speak→"C", then D(C,B).speak() returns…', options: ['B', 'C', 'D', 'Error'], correctIndex: 1 },

  { id: 40, prompt: 'class A: x=10; a1=A(); a2=A(); a1.x=99; print(A.x, a1.x, a2.x) →', options: ['10 99 10', '99 99 10', '99 99 99', '10 10 10'], correctIndex: 0 },

  { id: 41, prompt: 'In try/except/else/finally, the else runs…', options: ['only if no exception occurred', 'always', 'only if except ran', 'never'], correctIndex: 0 },

  { id: 42, prompt: 'Inside except, which preserves the original traceback best?', options: ['raise', 'raise e', 'both same', 'neither'], correctIndex: 0 },

  { id: 43, prompt: 'On Windows CSV, use newline="" with csv.writer to avoid…', options: ['slow writes', 'extra blank lines', 'encoding errors', 'file locks'], correctIndex: 1 },

  { id: 44, prompt: 'Open for reading & writing WITHOUT truncating (file must exist):', options: ["'w+'", "'r+'", "'a+'", "'x'"], correctIndex: 1 },

  { id: 45, prompt: 'strftime: format 27/09 06:05 from datetime(2025,9,27,6,5)', options: ['"%d/%m %H:%M"', '"%m/%d %H:%M"', '"%d-%m %I:%M %p"', '"%Y/%m/%d %H:%S"'], correctIndex: 0 },

  { id: 46, prompt: 'Passing Dog and Robot to a function that calls obj.speak() works due to…', options: ['inheritance only', 'duck typing / polymorphism', 'macros', 'operator overloading'], correctIndex: 1 },

  { id: 47, prompt: 'Format a float with 2 decimal places using f-strings:', options: ['f"{x:.2f}"', 'f"{x:2d}"', 'f"{x:%2}"', 'format(x,"2f")'], correctIndex: 0 },

  { id: 48, prompt: '(0.1 + 0.2) == 0.3 is often False because…', options: ['Division by zero', 'Binary floating precision', 'Python bug', 'Locale settings'], correctIndex: 1 },

  { id: 49, prompt: 'Which while loop runs exactly 3 times (0,1,2)?', options: [
      'i=0; while i<3: i+=1',
      'i=1; while i<=3: i+=1',
      'while i<3: print(i)',
      'for i in while(3): pass'
    ], correctIndex: 0 },

  { id: 50, prompt: 'Which file mode truncates the file on open if it exists?', options: ["'r'", "'w'", "'a'", "'r+'"], correctIndex: 1 },
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
              50 questions. You have <span className="font-semibold">25 minutes</span>.
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
