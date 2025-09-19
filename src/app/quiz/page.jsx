'use client';
import { useEffect, useMemo, useState } from 'react';

// ================= QUESTIONS =================

const QUESTIONS = [
  { id: 1,  prompt: 'Which keyword is used to define a class in Python?', options: ['object', 'class', 'def', 'method'], correctIndex: 1 },

  { id: 2,  prompt: 'What does the __init__ method do?', options: ['Deletes objects', 'Initializes new objects', 'Defines private variables', 'Creates a module'], correctIndex: 1 },

  { id: 3,  prompt: 'In class methods, what does the self parameter represent?', options: ['The class itself', 'The parent class', 'The current object instance', 'The module'], correctIndex: 2 },

  { id: 4,  prompt: 'Which is the correct way to define a Person class with a name attribute?', options: ['class Person: def __init__(name): self.name = name', 'class Person: def __init__(self, name): self.name = name', 'def Person(self, name): self.name = name', 'class Person(self, name): self.name = name'], correctIndex: 1 },

  { id: 5,  prompt: 'What will print(type(Student)) output if Student is a class?', options: ["<class 'object'>", "<class 'Student'>", "'Student'", "'object'"], correctIndex: 0 },

  { id: 6,  prompt: 'What is an instance attribute?', options: ['A variable shared by all objects', 'A variable unique to each object', 'A constant in a class', 'A method'], correctIndex: 1 },

  { id: 7,  prompt: 'What is a class attribute?', options: ['Variable shared by all instances of the class', 'Variable unique to one object', 'Only private attributes', 'A method inside the class'], correctIndex: 0 },

  { id: 8,  prompt: 'Which of these creates a private attribute?', options: ['balance', '_balance', '__balance', 'private balance'], correctIndex: 2 },

  { id: 9,  prompt: 'What does encapsulation mean in OOP?', options: ['Hiding implementation details', 'Sharing variables across classes', 'Using multiple constructors', 'Defining functions outside a class'], correctIndex: 0 },

  { id: 10, prompt: 'Which special method is automatically called when printing an object?', options: ['__init__', '__print__', '__str__', '__start__'], correctIndex: 2 },

  { id: 11, prompt: 'Which special method is used to give a formal debug string representation?', options: ['__show__', '__debug__', '__repr__', '__str__'], correctIndex: 2 },

  { id: 12, prompt: 'What is inheritance in Python OOP?', options: ['Ability to hide variables', 'Creating new classes from existing ones', 'Overloading operators', 'Running multiple classes at once'], correctIndex: 1 },

  { id: 13, prompt: 'Which function is used to call the parent class constructor?', options: ['base()', 'super()', 'parent()', 'extend()'], correctIndex: 1 },

  { id: 14, prompt: 'What is method overriding?', options: ['Using the same variable in two classes', 'Child class redefining a parent class method', 'Calling methods with different names', 'Private method duplication'], correctIndex: 1 },

  { id: 15, prompt: 'Polymorphism in OOP means?', options: ['Same method name with different implementations', 'Hiding attributes', 'Multiple parent classes only', 'Static methods'], correctIndex: 0 },

  { id: 16, prompt: 'Which keyword defines a subclass from a parent?', options: ['extends', 'inherits', 'class Child(Parent)', 'superclass'], correctIndex: 2 },

  { id: 17, prompt: 'What happens if a class has no __init__ method defined?', options: ['It cannot be instantiated', 'Python provides a default constructor', 'It raises an error', 'Attributes are auto-created'], correctIndex: 1 },

  { id: 18, prompt: 'Which built-in function checks if an object is an instance of a class?', options: ['typeof()', 'classof()', 'isinstance()', 'object()'], correctIndex: 2 },

  { id: 19, prompt: 'Which built-in function lists all attributes and methods of an object?', options: ['methods()', 'dir()', 'vars()', 'inspect()'], correctIndex: 1 },

  { id: 20, prompt: 'What will hasattr(obj, "name") return if obj has attribute name?', options: ['Error', 'False always', 'True', 'The attribute value'], correctIndex: 2 },

  { id: 21, prompt: 'What decorator is used for class-level methods that access cls?', options: ['@staticmethod', '@classmethod', '@class', '@property'], correctIndex: 1 },

  { id: 22, prompt: 'Which decorator makes a method belong to the class but not access self or cls?', options: ['@staticmethod', '@classmethod', '@property', '@method'], correctIndex: 0 },

  { id: 23, prompt: 'What does @property decorator do?', options: ['Makes a method behave like an attribute', 'Makes an attribute private', 'Defines a static method', 'Overloads operators'], correctIndex: 0 },

  { id: 24, prompt: 'Multiple inheritance in Python is resolved using?', options: ['Order of definition only', 'Method Resolution Order (MRO)', 'Parent class priority', 'Alphabetical order'], correctIndex: 1 },

  { id: 25, prompt: 'Which dunder method checks equality with == ?', options: ['__eq__', '__cmp__', '__same__', '__equal__'], correctIndex: 0 },

  { id: 26, prompt: 'What is composition in OOP?', options: ['Using multiple parent classes', 'A class containing objects of other classes', 'Child overriding parent', 'Sharing class attributes'], correctIndex: 1 },

  { id: 27, prompt: 'What does super() return inside a child class?', options: ['A reference to parent class', 'The current object', 'A private attribute', 'The module name'], correctIndex: 0 },

  { id: 28, prompt: 'If class Student(Person): pass is defined, what happens?', options: ['Student inherits from Person', 'Error: syntax invalid', 'Empty class', 'Person inherits from Student'], correctIndex: 0 },

  { id: 29, prompt: 'What is the purpose of __del__ method?', options: ['Called when object is destroyed', 'Called on printing object', 'Called on inheritance', 'Creates a destructor manually'], correctIndex: 0 },

  { id: 30, prompt: 'What is the main difference between __str__ and __repr__?', options: ['__str__ is user-friendly, __repr__ is developer/debugging', '__str__ is faster', 'They are identical', '__repr__ is only for inheritance'], correctIndex: 0 }
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
