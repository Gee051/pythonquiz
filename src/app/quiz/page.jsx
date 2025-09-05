'use client';
import { useEffect, useMemo, useState } from 'react';

// ================= QUESTIONS =================
const QUESTIONS = [
  // === Functions ===
  { id: 1, prompt: 'Which keyword is used to define a function in Python?', options: ['func', 'def', 'function', 'fn'], correctIndex: 1 },
  { id: 2, prompt: 'What does a function return if no return statement is provided?', options: ['0', 'None', 'Error', 'Empty string'], correctIndex: 1 },
  { id: 3, prompt: 'Which is a correct function definition?', options: ['function add(x,y): return x+y', 'def add(x,y) return x+y', 'def add(x,y): return x+y', 'func add(x,y): return x+y'], correctIndex: 2 },
  { id: 4, prompt: 'What will print_result(5) output if the function is defined as def print_result(x): print(x*2)?', options: ['5', '10', 'Error', 'None'], correctIndex: 1 },

  // === Error Handling ===
  { id: 5, prompt: 'Which block always runs whether or not an exception occurs?', options: ['try', 'except', 'else', 'finally'], correctIndex: 3 },
  { id: 6, prompt: 'Which error occurs if you try to divide 5 by 0?', options: ['TypeError', 'ValueError', 'ZeroDivisionError', 'IndexError'], correctIndex: 2 },
  { id: 7, prompt: 'Which error occurs if you access a dictionary key that does not exist?', options: ['NameError', 'KeyError', 'IndexError', 'ValueError'], correctIndex: 1 },
  { id: 8, prompt: 'What does this code print? try: print(int("abc")) except ValueError: print("Error")', options: ['abc', 'Error', '0', 'None'], correctIndex: 1 },

  // === Git ===
  { id: 9, prompt: 'Which command shows the installed version of Git?', options: ['git -v', 'git version', 'git --version', 'git check'], correctIndex: 2 },
  { id: 10, prompt: 'What does the error "git is not recognized" usually mean?', options: ['Git is broken', 'Git is not installed or not in PATH', 'Wrong repository', 'Network error'], correctIndex: 1 },
  { id: 11, prompt: 'Which command initializes a new Git repository?', options: ['git start', 'git init', 'git new', 'git repo'], correctIndex: 1 },
  { id: 12, prompt: 'Which command stages all files for commit?', options: ['git commit all', 'git add *', 'git add .', 'git stage'], correctIndex: 2 },
  { id: 13, prompt: 'Which Git command shows the current branch?', options: ['git branch', 'git status', 'git show', 'git current'], correctIndex: 0 },
  { id: 14, prompt: 'What does "src refspec main does not match any" mean?', options: ['No commits yet or wrong branch name', 'Network error', 'GitHub down', 'Invalid repo'], correctIndex: 0 },
  { id: 15, prompt: 'Which command sets your global Git username?', options: ['git set name', 'git config name', 'git config --global user.name "Name"', 'git username'], correctIndex: 2 },

  // === Nested Lists ===
  { id: 16, prompt: 'Which accesses the number 5 in [[1,2,3],[4,5,6],[7,8,9]]?', options: ['matrix[2][1]', 'matrix[1][1]', 'matrix[1][2]', 'matrix[0][2]'], correctIndex: 1 },
  { id: 17, prompt: 'Which prints the second column from matrix=[[1,2,3],[4,5,6],[7,8,9]]?', options: ['[row[1] for row in matrix]', '[matrix[1] for row in matrix]', 'matrix[1][*]', 'matrix[:][1]'], correctIndex: 0 },
  { id: 18, prompt: 'What does sum([row[0] for row in [[1,2],[3,4],[5,6]]]) return?', options: ['9', '6', '15', '10'], correctIndex: 2 },

  // === Nested Dicts ===
  { id: 19, prompt: 'How do you access Grace’s math score in {"Grace": {"math": 85, "english": 90}}?', options: ['scores["Grace"].math', 'scores["Grace"]["math"]', 'scores.math["Grace"]', 'scores["math"]["Grace"]'], correctIndex: 1 },
  { id: 20, prompt: 'Which loop prints all keys and values in a dict?', options: ['for k in dict: print(k)', 'for k,v in dict.items(): print(k,v)', 'for v in dict.values(): print(v)', 'for dict in k: print(k)'], correctIndex: 1 },
  { id: 21, prompt: 'Which finds the most expensive product in products={"Phone":{"price":500},"Laptop":{"price":1000}}?', options: ['max(products)', 'max(products.values())', 'max(products, key=lambda x: products[x]["price"])', 'products["Laptop"]["price"]'], correctIndex: 2 },

  // === Sets ===
  { id: 22, prompt: 'Which creates a set with unique names?', options: ['["Grace","Idunnu"]', '{"Grace","Idunnu"}', '("Grace","Idunnu")', '{"Grace": "Idunnu"}'], correctIndex: 1 },
  { id: 23, prompt: 'What is the result of {"a","b"} | {"b","c"}?', options: ['{"b"}', '{"a","c"}', '{"a","b","c"}', '{"a","b"}'], correctIndex: 2 },
  { id: 24, prompt: 'What is the result of {"a","b"} & {"b","c"}?', options: ['{"a"}', '{"c"}', '{"b"}', '{}'], correctIndex: 2 },
  { id: 25, prompt: 'What does {"a","b"} - {"b"} return?', options: ['{"a"}', '{"b"}', '{}', '{"a","b"}'], correctIndex: 0 },

  // === Functions + Errors Combo ===
  { id: 26, prompt: 'What happens if a function does not handle a ZeroDivisionError?', options: ['Ignores it', 'Crashes program', 'Returns None', 'Prints 0'], correctIndex: 1 },
  { id: 27, prompt: 'Which defines a function that raises ValueError?', options: ['def f(): raise ValueError("Bad")', 'def f(): error ValueError', 'function f(): ValueError', 'def f(): return ValueError'], correctIndex: 0 },

  // === Git + Error Handling ===
  { id: 28, prompt: 'If git commit says "identity unknown", what should you set?', options: ['user.id', 'git identity', 'user.name and user.email', 'branch.name'], correctIndex: 2 },

  // === Mixed Python Logic ===
  { id: 29, prompt: 'Which error is raised by list=[1,2,3]; print(list[5])?', options: ['KeyError', 'IndexError', 'TypeError', 'NameError'], correctIndex: 1 },
  { id: 30, prompt: 'Which error is raised by print(1+"2")?', options: ['ValueError', 'TypeError', 'SyntaxError', 'IndexError'], correctIndex: 1 },
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
  const durationSec = 900; 

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
              30 questions. You have <span className="font-semibold">15 minutes</span>.
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
