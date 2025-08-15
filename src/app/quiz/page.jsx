'use client';
import { useEffect, useMemo, useState } from 'react';

// ================= QUESTIONS =================
const QUESTIONS = [
  { id: 1,  prompt: 'Which function prints text to the console in Python?', options: ['echo("Hi")', 'print("Hi")', 'Console.log("Hi")', 'out("Hi")'], correctIndex: 1 },
  { id: 2,  prompt: 'Which variable name is valid in Python?', options: ['2name', 'first-name', 'first_name', 'first name'], correctIndex: 2 },
  { id: 3,  prompt: 'What type is the value "42" (with quotes)?', options: ['int', 'float', 'str', 'bool'], correctIndex: 2 },
  { id: 4,  prompt: 'In Python 3, what is the result of 3 / 2?', options: ['1', '1.5', '1.0', '2'], correctIndex: 1 },
  { id: 5,  prompt: 'What is the result of 7 // 2?', options: ['3.5', '3', '4', 'Error'], correctIndex: 1 },
  { id: 6,  prompt: 'How do you write a single-line comment in Python?', options: ['// comment', '# comment', '<!-- comment -->', '/* comment */'], correctIndex: 1 },
  { id: 7,  prompt: 'Which converts the string "12.5" to a float?', options: ['int("12.5")', 'float("12.5")', 'str(12.5)', 'toFloat("12.5")'], correctIndex: 1 },
  { id: 8,  prompt: 'Which converts the integer 12 to a string?', options: ['string(12)', 'str(12)', 'to_string(12)', 'text(12)'], correctIndex: 1 },
  { id: 9,  prompt: 'Which is another programming language besides Python?', options: ['HTML', 'Java', 'CSS', 'SQL'], correctIndex: 1 },
  { id: 10, prompt: 'What symbol is used for modulus in Python?', options: ['%', '//', '/', 'mod'], correctIndex: 0 },
  { id: 11, prompt: 'What does 10 % 3 evaluate to?', options: ['3', '1', '0', 'Error'], correctIndex: 1 },
  { id: 12, prompt: 'Which is a syntax error?', options: ['print("Hello")', 'if 5 > 3 print("Yes")', 'x = 10', 'name = "John"'], correctIndex: 1 },
  { id: 13, prompt: 'Which is a runtime error?', options: ['x = 10 / 0', 'print("Hello")', 'y = 5 + 3', 'age = 20'], correctIndex: 0 },
  { id: 14, prompt: 'Which is a logical error?', options: ['Using wrong formula but no crash', 'Misspelling print', 'Missing colon in if', 'Unclosed string'], correctIndex: 0 },
  { id: 15, prompt: 'Which method makes a string uppercase?', options: ['toUpper()', 'upper()', 'uppercase()', 'capitalizeAll()'], correctIndex: 1 },
  { id: 16, prompt: 'Which removes leading and trailing whitespace from a string `s`?', options: ['trim(s)', 's.strip()', 's.clean()', 's.chomp()'], correctIndex: 1 },
  { id: 17, prompt: 'What keyword is used to define a function in Python?', options: ['func', 'def', 'function', 'define'], correctIndex: 1 },
  { id: 18, prompt: 'Which operator is used for exponentiation (power) in Python?', options: ['^', '**', 'pow', 'exp'], correctIndex: 1 },
  { id: 19, prompt: 'Which data type would be best for storing a whole number?', options: ['int', 'float', 'str', 'bool'], correctIndex: 0 },
  { id: 20, prompt: 'Which data type would be best for storing decimal numbers?', options: ['int', 'float', 'str', 'bool'], correctIndex: 1 },
  { id: 21, prompt: 'What is the output of: print(type(3.0))?', options: ['<class "int">', '<class "float">', '<class "str">', '<class "bool">'], correctIndex: 1 },
  { id: 22, prompt: 'Which symbol is used for single-line assignment in Python?', options: ['=', '==', ':=', '=>'], correctIndex: 0 },
  { id: 23, prompt: 'Which comparison operator checks for equality?', options: ['=', '==', '!=', '<>'], correctIndex: 1 },
  { id: 24, prompt: 'Which boolean value does bool(0) return?', options: ['True', 'False', 'None', 'Error'], correctIndex: 1 },
  { id: 25, prompt: 'What will print("Hello" + "World") output?', options: ['Hello World', 'HelloWorld', 'Hello+World', 'Error'], correctIndex: 1 },
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
  const durationSec = 600; // 10 mins

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
              25 questions. You have <span className="font-semibold">10 minutes</span>.
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
