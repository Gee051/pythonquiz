'use client';
import { useEffect, useMemo, useState } from 'react';

// ================= QUESTIONS =================
const QUESTIONS = [
  { id: 1,  prompt: 'Which literal creates a tuple?', options: ['[1,2,3]', '(1,2,3)', '{1,2,3}', '{"a":1}'], correctIndex: 1 },
  { id: 2,  prompt: 'Which keyword is Python’s "else if"?', options: ['elseif', 'elif', 'else if', 'elsif'], correctIndex: 1 },
  { id: 3,  prompt: 'Which data structure removes duplicates automatically?', options: ['list', 'tuple', 'set', 'dict'], correctIndex: 2 },
  { id: 4,  prompt: 'What will this output? for i in range(5): if i==3: break; print(i)', options: ['0 1 2', '0 1 2 3', '0 1 2 3 4', 'Error'], correctIndex: 0 },
  { id: 5,  prompt: 'Which keyword starts a conditional block?', options: ['if', 'when', 'then', 'cond'], correctIndex: 0 },
  { id: 6,  prompt: 'What type is the value 42?', options: ['int', 'float', 'str', 'bool'], correctIndex: 0 },
  { id: 7,  prompt: 'Which programming language is mostly used for front-end web development?', options: ['Python', 'C++', 'JavaScript', 'Java'], correctIndex: 2 },
  { id: 8,  prompt: 'Which operator checks equality?', options: ['=', '==', '!=', '<>'], correctIndex: 1 },
  { id: 9,  prompt: 'Which list method removes the last item?', options: ['pop()', 'remove()', 'delete()', 'discard()'], correctIndex: 0 },
  { id: 10, prompt: 'Which keyword does nothing and acts as a placeholder?', options: ['skip', 'continue', 'pass', 'halt'], correctIndex: 2 },
  { id: 11, prompt: 'What error occurs for int("abc")?', options: ['ValueError', 'TypeError', 'SyntaxError', 'KeyError'], correctIndex: 0 },
  { id: 12, prompt: 'What is the result of 2 ** 3?', options: ['5', '6', '8', '9'], correctIndex: 2 },
  { id: 13, prompt: 'Which literal creates a list?', options: ['(1,2,3)', '[1,2,3]', '{1,2,3}', 'list(1,2,3)'], correctIndex: 1 },
  { id: 14, prompt: '"notes.txt".endswith(".txt") returns...', options: ['True', 'False', 'Error', 'None'], correctIndex: 0 },
  { id: 15, prompt: 'Which keyword skips the current loop iteration?', options: ['skip', 'continue', 'pass', 'ignore'], correctIndex: 1 },
  { id: 16, prompt: 'Which error occurs if you use a variable before defining it?', options: ['NameError', 'TypeError', 'ValueError', 'IndexError'], correctIndex: 0 },
  { id: 17, prompt: 'If x=5; x+=2 → x becomes?', options: ['5', '6', '7', '8'], correctIndex: 2 },
  { id: 18, prompt: 'Which stores key-value pairs?', options: ['list', 'tuple', 'dict', 'set'], correctIndex: 2 },
  { id: 19, prompt: 'Which error occurs if you type: if x>5 print("Hi")', options: ['SyntaxError', 'NameError', 'TypeError', 'ValueError'], correctIndex: 0 },
  { id: 20, prompt: 'What is the output of: for i in range(3): print(i)', options: ['1 2 3', '0 1 2', '0 1 2 3', 'Error'], correctIndex: 1 },
  { id: 21, prompt: 'Which assignment operator means "add and assign"?', options: ['=+', '+=', '-=', '*='], correctIndex: 1 },
  { id: 22, prompt: 'Which string method removes spaces from both ends?', options: ['trim()', 'strip()', 'clean()', 'cut()'], correctIndex: 1 },
  { id: 23, prompt: 'Which variable name is valid?', options: ['2name', 'first-name', 'first_name', 'first name'], correctIndex: 2 },
  { id: 24, prompt: 'Which statement ends a loop immediately?', options: ['exit', 'break', 'stop', 'halt'], correctIndex: 1 },
  { id: 25, prompt: 'Which literal creates a one-element tuple?', options: ['(5)', '(5,)', '[5]', '{5}'], correctIndex: 1 },
  { id: 26, prompt: 'Which comment style is correct in Python?', options: ['// comment', '# comment', '/* comment */', '<!-- comment -->'], correctIndex: 1 },
  { id: 27, prompt: 'What is 7//2?', options: ['3.5', '3', '4', 'Error'], correctIndex: 1 },
  { id: 28, prompt: '"Python" in "I love Python" returns...', options: ['True', 'False', 'None', 'Error'], correctIndex: 0 },
  { id: 29, prompt: 'What is the remainder of 10 % 3?', options: ['0', '1', '3', 'Error'], correctIndex: 1 },
  { id: 30, prompt: 'Which block runs only if all previous conditions fail?', options: ['last', 'final', 'else', 'default'], correctIndex: 2 },
  { id: 31, prompt: 'Which error occurs for nums[10] when nums=[1,2,3]?', options: ['IndexError', 'KeyError', 'TypeError', 'ValueError'], correctIndex: 0 },
  { id: 32, prompt: 'Which list method adds item at the end?', options: ['push()', 'append()', 'add()', 'insertEnd()'], correctIndex: 1 },
  { id: 33, prompt: 'What is the type of 3.14?', options: ['int', 'float', 'str', 'list'], correctIndex: 1 },
  { id: 34, prompt: 'Which keyword is used to skip one round and move on?', options: ['skip', 'continue', 'next', 'pass'], correctIndex: 1 },
  { id: 35, prompt: 'What is the output? for i in range(5): if i==3: continue; print(i)', options: ['0 1 2 4', '0 1 2 3 4', '0 1 2', 'Error'], correctIndex: 0 },
  { id: 36, prompt: 'Which built-in function checks the type of a variable?', options: ['datatype()', 'type()', 'typeof()', 'class()'], correctIndex: 1 },
  { id: 37, prompt: 'Which error occurs for x="3"; y=3; print(x+y)?', options: ['TypeError', 'ValueError', 'IndexError', 'SyntaxError'], correctIndex: 0 },
  { id: 38, prompt: 'Which is the correct keyword for an else if in Python?', options: ['elseif', 'elif', 'else-if', 'elsif'], correctIndex: 1 },
  { id: 39, prompt: 'What will bool("") return?', options: ['True', 'False', 'None', 'Error'], correctIndex: 1 },
  { id: 40, prompt: 'Which operator checks if an item exists in a list?', options: ['contains()', 'in', 'exists', 'has'], correctIndex: 1 },
  { id: 41, prompt: 'Which programming language is used for backend in Ruby on Rails?', options: ['Ruby', 'JavaScript', 'Python', 'C'], correctIndex: 0 },
  { id: 42, prompt: 'Which statement is only a placeholder that does nothing?', options: ['pass', 'continue', 'skip', 'return'], correctIndex: 0 },
  { id: 43, prompt: 'Which string method converts to uppercase?', options: ['upper()', 'uppercase()', 'toUpper()', 'capitalizeAll()'], correctIndex: 0 },
  { id: 44, prompt: 'What will len({"a":1, "b":2, "c":3}) return?', options: ['2', '3', '4', 'Error'], correctIndex: 1 },
  { id: 45, prompt: 'What will this run? x=7; if x%2==0: print("Even") else: print("Odd")', options: ['Even', 'Odd', 'Error', 'None'], correctIndex: 1 },
  { id: 46, prompt: 'Which loop is used when you don’t know repetitions in advance?', options: ['for', 'while', 'loop', 'next'], correctIndex: 1 },
  { id: 47, prompt: 'Which method safely gets a dict value with a default?', options: ['dict.fetch()', 'dict.get()', 'dict.value()', 'dict.lookup()'], correctIndex: 1 },
  { id: 48, prompt: 'Which statement about tuples is true?', options: ['Tuples are mutable', 'Tuples are immutable', 'Tuples are unordered', 'Tuples can only hold numbers'], correctIndex: 1 },
  { id: 49, prompt: 'Which error occurs if you divide by zero?', options: ['ZeroDivisionError', 'SyntaxError', 'TypeError', 'NameError'], correctIndex: 0 },
  { id: 50, prompt: 'Which literal creates a set?', options: ['[1,2,3]', '{1,2,3}', '(1,2,3)', '{"a":1}'], correctIndex: 1 }
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
