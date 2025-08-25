'use client';
import { useEffect, useMemo, useState } from 'react';

// ================= QUESTIONS =================
const QUESTIONS = [
  { id: 1,  prompt: 'Which literal creates a list of names?', options: ['(\'Idunnu\', \'Grace\')', '[\'Idunnu\', \'Grace\']', '{\'Idunnu\', \'Grace\'}', '<Idunnu, Grace>'], correctIndex: 1 },
  { id: 2,  prompt: 'Which literal creates a tuple?', options: ['[1, 2, 3]', '(1, 2, 3)', '{1, 2, 3}', 'tuple[1,2,3]'], correctIndex: 1 },
  { id: 3,  prompt: 'Which literal creates a set with unique names?', options: ['{"Grace", "Idunnu"}', '["Grace", "Idunnu"]', '("Grace", "Idunnu")', '{"Grace": "Idunnu"}'], correctIndex: 0 },
  { id: 4,  prompt: 'Which creates a dictionary mapping Grace → 25?', options: ['{"Grace": 25}', '["Grace"=25]', '(Grace:25)', '{25: "Grace"}'], correctIndex: 0 },
  { id: 5,  prompt: 'Which data type is immutable?', options: ['list', 'set', 'tuple', 'dict'], correctIndex: 2 },
  { id: 6,  prompt: 'Which method adds an item to the end of a list?', options: ['add()', 'push()', 'append()', 'insert()'], correctIndex: 2 },
  { id: 7,  prompt: 'Which method removes and returns the last item of a list?', options: ['remove()', 'pop()', 'delete()', 'discard()'], correctIndex: 1 },
  { id: 8,  prompt: 'Which operator checks if a key exists in a dictionary?', options: ['has', 'in', 'exists', 'contains'], correctIndex: 1 },
  { id: 9,  prompt: 'Which keyword starts a conditional block?', options: ['if', 'when', 'then', 'cond'], correctIndex: 0 },
  { id: 10, prompt: 'Fill in: if age >= 18: print("Adult") ____: print("Minor")', options: ['elseif', 'elif', 'else', 'then'], correctIndex: 2 },
  { id: 11, prompt: 'Which is correct syntax for elif?', options: ['elseif', 'elif', 'else if', 'elsif'], correctIndex: 1 },
  { id: 12, prompt: 'Given x=5, what will this run? if x==5: print("Yes") else: print("No")', options: ['Yes', 'No', 'Error', 'True'], correctIndex: 0 },
  { id: 13, prompt: 'What is wrong with: if x > 10 print("Big")', options: ['Missing colon', 'Extra colon', 'Wrong keyword', 'Nothing'], correctIndex: 0 },
  { id: 14, prompt: 'Which operator checks equality?', options: ['=', '==', '!=', '<>'], correctIndex: 1 },
  { id: 15, prompt: 'Inequality operator in Python is:', options: ['<>', '!=', '!==', '≠'], correctIndex: 1 },
  { id: 16, prompt: 'Which keyword exits a loop immediately?', options: ['stop', 'end', 'break', 'exit'], correctIndex: 2 },
  { id: 17, prompt: 'Which keyword skips to the next loop iteration?', options: ['skip', 'continue', 'pass', 'next'], correctIndex: 1 },
  { id: 18, prompt: 'Which keyword does nothing and acts as a placeholder?', options: ['null', 'pass', 'skip', 'continue'], correctIndex: 1 },
  { id: 19, prompt: 'Convert the string "123" into an integer:', options: ['str("123")', 'int("123")', 'float("123")', 'bool("123")'], correctIndex: 1 },
  { id: 20, prompt: 'Convert 99 into a string:', options: ['toString(99)', 'str(99)', 'string(99)', 'text(99)'], correctIndex: 1 },
  { id: 21, prompt: 'What will bool("") return?', options: ['True', 'False', 'None', 'Error'], correctIndex: 1 },
  { id: 22, prompt: 'What will bool([1,2,3]) return?', options: ['True', 'False', 'Error', 'None'], correctIndex: 0 },
  { id: 23, prompt: 'Which error occurs if you divide by zero?', options: ['SyntaxError', 'ZeroDivisionError', 'TypeError', 'NameError'], correctIndex: 1 },
  { id: 24, prompt: 'Which error occurs if you use a variable before defining it?', options: ['NameError', 'ValueError', 'TypeError', 'IndexError'], correctIndex: 0 },
  { id: 25, prompt: 'Which error occurs if you access nums[10] when nums=[1,2,3]?', options: ['IndexError', 'KeyError', 'ValueError', 'NameError'], correctIndex: 0 },
  { id: 26, prompt: 'Which error occurs if you run int("abc")?', options: ['SyntaxError', 'ValueError', 'TypeError', 'NameError'], correctIndex: 1 },
  { id: 27, prompt: 'Which operation raises TypeError?', options: ['"3" + 3', '3 * "3"', '"a" in "grace"', '3 ** 2'], correctIndex: 0 },
  { id: 28, prompt: 'names = ["Grace","Idunnu","Grace"]; names.count("Grace") returns:', options: ['0', '1', '2', 'Error'], correctIndex: 2 },
  { id: 29, prompt: 'Make a 1-element tuple containing 5:', options: ['(5)', '(5,)', '[5]', '{5}'], correctIndex: 1 },
  { id: 30, prompt: 'What is the output? x=-1; if x>0: print("Positive") elif x==0: print("Zero") else: print("Negative")', options: ['Positive', 'Zero', 'Negative', 'Error'], correctIndex: 2 },
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
    const t = setInterval(() => setNow(Date.now()), 2000);
    return () => clearInterval(t);
  }, [phase]);

  const remaining = useMemo(() => {
    if (!startedAt) return durationSec;
    const elapsed = Math.floor((now - startedAt) / 2000);
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
              25 questions. You have <span className="font-semibold">20 minutes</span>.
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
