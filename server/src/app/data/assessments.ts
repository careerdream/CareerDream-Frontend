export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty?: string;
}

export interface Assessment {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  duration: number;
  badge: string;
  color: string;
  skills: string[];
  avgScore: number;
  attempts: number;
  description: string;
  questions: Question[];
}

export const assessments: Assessment[] = [
  {
    "id": 1,
    "title": "Python Programming",
    "category": "Software Engineering",
    "difficulty": "All Levels",
    "duration": 60,
    "badge": "🐍",
    "color": "from-green-500 to-emerald-700",
    "skills": [
      "Data Types",
      "OOP",
      "Data Science",
      "Web Dev"
    ],
    "avgScore": 78,
    "attempts": 1205,
    "description": "Comprehensive assessment of Python skills from basic syntax to advanced architectural patterns. Includes authentic, real-world questions.",
    "questions": [
      {
        "id": 1,
        "question": "What is the output of `print(type([]))` in Python?",
        "options": [
          "<class 'set'>",
          "<class 'list'>",
          "<class 'dict'>",
          "<class 'tuple'>"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "In Python, `[]` is the literal syntax for creating a list."
      },
      {
        "id": 2,
        "question": "Which keyword is used to define a function in Python?",
        "options": [
          "func",
          "define",
          "def",
          "function"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The `def` keyword is used to start the definition of a function in Python."
      },
      {
        "id": 3,
        "question": "How do you insert a single-line comment in Python code?",
        "options": [
          "// comment",
          "/* comment */",
          "# comment",
          "<!-- comment -->"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Python uses the hash character (`#`) for single-line comments."
      },
      {
        "id": 4,
        "question": "Which collection is ordered, changeable, and allows duplicate members?",
        "options": [
          "Set",
          "Tuple",
          "Dictionary",
          "List"
        ],
        "correct": 3,
        "difficulty": "Easy",
        "explanation": "A List in Python is ordered, mutable (changeable), and allows duplicate elements."
      },
      {
        "id": 5,
        "question": "What is the correct syntax to output \"Hello World\" in Python?",
        "options": [
          "p(\"Hello World\")",
          "print(\"Hello World\")",
          "echo(\"Hello World\")",
          "console.log(\"Hello World\")"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "The built-in `print()` function is used to output text to the console in Python."
      },
      {
        "id": 6,
        "question": "What do `*args` and `**kwargs` allow you to do in a function?",
        "options": [
          "Define typed arguments",
          "Pass a variable number of arguments",
          "Create anonymous functions",
          "Unpack lists automatically"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "`*args` passes variable number of non-keyworded arguments, while `**kwargs` passes variable number of keyword arguments."
      },
      {
        "id": 7,
        "question": "What is a decorator in Python?",
        "options": [
          "A UI formatting tool",
          "A built-in class",
          "A function that takes another function and extends its behavior without modifying it",
          "A method to clean up memory"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "Decorators provide a simple syntax for calling higher-order functions to modify the behavior of other functions."
      },
      {
        "id": 8,
        "question": "What is the main difference between a list and a tuple?",
        "options": [
          "Lists are immutable, tuples are mutable",
          "Lists are mutable, tuples are immutable",
          "Tuples can only store numbers",
          "Lists use parentheses, tuples use square brackets"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Tuples cannot be changed (immutable) after they are created, whereas lists can be modified (mutable)."
      },
      {
        "id": 9,
        "question": "How is memory managed in Python?",
        "options": [
          "Manually using malloc/free",
          "Python memory manager and garbage collector",
          "OS handles it exclusively",
          "No memory management is needed"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Python memory is managed by Python private heap space. All objects and data structures are located in a private heap. The programmer does not have access to this private heap."
      },
      {
        "id": 10,
        "question": "What does the `__init__` method do in a Python class?",
        "options": [
          "Destroys the object",
          "Calculates class length",
          "Initializes a new object instance",
          "Imports a module"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "The `__init__` method is the constructor in Python, used to initialize the attributes of an object when it is created."
      },
      {
        "id": 11,
        "question": "Explain the purpose of the Global Interpreter Lock (GIL) in CPython.",
        "options": [
          "To speed up multi-threading",
          "To prevent multiple native threads from executing Python bytecodes at once",
          "To manage global variables safely",
          "To compile Python to machine code"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The GIL is a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecodes simultaneously. This prevents race conditions but limits true parallelism in CPU-bound multi-threading."
      },
      {
        "id": 12,
        "question": "What is a metaclass in Python?",
        "options": [
          "A class of a class that defines how a class behaves",
          "A class with no methods",
          "A base class for all exceptions",
          "An instance of an object"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "A metaclass is the class of a class. Like a class defines how an instance of the class behaves, a metaclass defines how a class behaves. A class is an instance of a metaclass."
      },
      {
        "id": 13,
        "question": "How do generators work internally in Python?",
        "options": [
          "They store all values in memory as a list",
          "They use the `return` statement exclusively",
          "They use the `yield` keyword to return an iterator that produces one value at a time",
          "They map functions to iterables"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Generators are a simple way of creating iterators. They use the `yield` statement to suspend function execution and send a value back to the caller, maintaining their state between yields."
      },
      {
        "id": 14,
        "question": "What is the difference between `deepcopy` and shallow `copy` in Python?",
        "options": [
          "They are exactly the same",
          "Shallow copy constructs a new compound object and inserts references into it; deep copy inserts copies of the objects found in the original",
          "Deep copy only copies primitive types",
          "Shallow copy is slower than deep copy"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "A shallow copy creates a new object but stores references to the elements found in the original. A deep copy creates a new object and recursively adds copies of the nested objects present in the original."
      },
      {
        "id": 15,
        "question": "What is the core component of Python's `asyncio` module?",
        "options": [
          "The Global Interpreter Lock",
          "The Event Loop",
          "Multiprocessing Pools",
          "Thread Pools"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The event loop is the core of every asyncio application. Event loops run asynchronous tasks and callbacks, perform network IO operations, and run subprocesses."
      },
      {
        "id": 16,
        "question": "What is the output of `print(type([]))` in Python?",
        "options": [
          "<class 'set'>",
          "<class 'list'>",
          "<class 'dict'>",
          "<class 'tuple'>"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "In Python, `[]` is the literal syntax for creating a list."
      },
      {
        "id": 17,
        "question": "Which keyword is used to define a function in Python?",
        "options": [
          "func",
          "define",
          "def",
          "function"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The `def` keyword is used to start the definition of a function in Python."
      },
      {
        "id": 18,
        "question": "How do you insert a single-line comment in Python code?",
        "options": [
          "// comment",
          "/* comment */",
          "# comment",
          "<!-- comment -->"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Python uses the hash character (`#`) for single-line comments."
      },
      {
        "id": 19,
        "question": "Which collection is ordered, changeable, and allows duplicate members?",
        "options": [
          "Set",
          "Tuple",
          "Dictionary",
          "List"
        ],
        "correct": 3,
        "difficulty": "Easy",
        "explanation": "A List in Python is ordered, mutable (changeable), and allows duplicate elements."
      },
      {
        "id": 20,
        "question": "What is the correct syntax to output \"Hello World\" in Python?",
        "options": [
          "p(\"Hello World\")",
          "print(\"Hello World\")",
          "echo(\"Hello World\")",
          "console.log(\"Hello World\")"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "The built-in `print()` function is used to output text to the console in Python."
      },
      {
        "id": 21,
        "question": "What do `*args` and `**kwargs` allow you to do in a function?",
        "options": [
          "Define typed arguments",
          "Pass a variable number of arguments",
          "Create anonymous functions",
          "Unpack lists automatically"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "`*args` passes variable number of non-keyworded arguments, while `**kwargs` passes variable number of keyword arguments."
      },
      {
        "id": 22,
        "question": "What is a decorator in Python?",
        "options": [
          "A UI formatting tool",
          "A built-in class",
          "A function that takes another function and extends its behavior without modifying it",
          "A method to clean up memory"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "Decorators provide a simple syntax for calling higher-order functions to modify the behavior of other functions."
      },
      {
        "id": 23,
        "question": "What is the main difference between a list and a tuple?",
        "options": [
          "Lists are immutable, tuples are mutable",
          "Lists are mutable, tuples are immutable",
          "Tuples can only store numbers",
          "Lists use parentheses, tuples use square brackets"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Tuples cannot be changed (immutable) after they are created, whereas lists can be modified (mutable)."
      },
      {
        "id": 24,
        "question": "How is memory managed in Python?",
        "options": [
          "Manually using malloc/free",
          "Python memory manager and garbage collector",
          "OS handles it exclusively",
          "No memory management is needed"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Python memory is managed by Python private heap space. All objects and data structures are located in a private heap. The programmer does not have access to this private heap."
      },
      {
        "id": 25,
        "question": "What does the `__init__` method do in a Python class?",
        "options": [
          "Destroys the object",
          "Calculates class length",
          "Initializes a new object instance",
          "Imports a module"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "The `__init__` method is the constructor in Python, used to initialize the attributes of an object when it is created."
      },
      {
        "id": 26,
        "question": "Explain the purpose of the Global Interpreter Lock (GIL) in CPython.",
        "options": [
          "To speed up multi-threading",
          "To prevent multiple native threads from executing Python bytecodes at once",
          "To manage global variables safely",
          "To compile Python to machine code"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The GIL is a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecodes simultaneously. This prevents race conditions but limits true parallelism in CPU-bound multi-threading."
      },
      {
        "id": 27,
        "question": "What is a metaclass in Python?",
        "options": [
          "A class of a class that defines how a class behaves",
          "A class with no methods",
          "A base class for all exceptions",
          "An instance of an object"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "A metaclass is the class of a class. Like a class defines how an instance of the class behaves, a metaclass defines how a class behaves. A class is an instance of a metaclass."
      },
      {
        "id": 28,
        "question": "How do generators work internally in Python?",
        "options": [
          "They store all values in memory as a list",
          "They use the `return` statement exclusively",
          "They use the `yield` keyword to return an iterator that produces one value at a time",
          "They map functions to iterables"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Generators are a simple way of creating iterators. They use the `yield` statement to suspend function execution and send a value back to the caller, maintaining their state between yields."
      },
      {
        "id": 29,
        "question": "What is the difference between `deepcopy` and shallow `copy` in Python?",
        "options": [
          "They are exactly the same",
          "Shallow copy constructs a new compound object and inserts references into it; deep copy inserts copies of the objects found in the original",
          "Deep copy only copies primitive types",
          "Shallow copy is slower than deep copy"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "A shallow copy creates a new object but stores references to the elements found in the original. A deep copy creates a new object and recursively adds copies of the nested objects present in the original."
      },
      {
        "id": 30,
        "question": "What is the core component of Python's `asyncio` module?",
        "options": [
          "The Global Interpreter Lock",
          "The Event Loop",
          "Multiprocessing Pools",
          "Thread Pools"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The event loop is the core of every asyncio application. Event loops run asynchronous tasks and callbacks, perform network IO operations, and run subprocesses."
      },
      {
        "id": 31,
        "question": "What is the output of `print(type([]))` in Python?",
        "options": [
          "<class 'set'>",
          "<class 'list'>",
          "<class 'dict'>",
          "<class 'tuple'>"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "In Python, `[]` is the literal syntax for creating a list."
      },
      {
        "id": 32,
        "question": "Which keyword is used to define a function in Python?",
        "options": [
          "func",
          "define",
          "def",
          "function"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The `def` keyword is used to start the definition of a function in Python."
      },
      {
        "id": 33,
        "question": "How do you insert a single-line comment in Python code?",
        "options": [
          "// comment",
          "/* comment */",
          "# comment",
          "<!-- comment -->"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Python uses the hash character (`#`) for single-line comments."
      },
      {
        "id": 34,
        "question": "Which collection is ordered, changeable, and allows duplicate members?",
        "options": [
          "Set",
          "Tuple",
          "Dictionary",
          "List"
        ],
        "correct": 3,
        "difficulty": "Easy",
        "explanation": "A List in Python is ordered, mutable (changeable), and allows duplicate elements."
      },
      {
        "id": 35,
        "question": "What is the correct syntax to output \"Hello World\" in Python?",
        "options": [
          "p(\"Hello World\")",
          "print(\"Hello World\")",
          "echo(\"Hello World\")",
          "console.log(\"Hello World\")"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "The built-in `print()` function is used to output text to the console in Python."
      },
      {
        "id": 36,
        "question": "What do `*args` and `**kwargs` allow you to do in a function?",
        "options": [
          "Define typed arguments",
          "Pass a variable number of arguments",
          "Create anonymous functions",
          "Unpack lists automatically"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "`*args` passes variable number of non-keyworded arguments, while `**kwargs` passes variable number of keyword arguments."
      },
      {
        "id": 37,
        "question": "What is a decorator in Python?",
        "options": [
          "A UI formatting tool",
          "A built-in class",
          "A function that takes another function and extends its behavior without modifying it",
          "A method to clean up memory"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "Decorators provide a simple syntax for calling higher-order functions to modify the behavior of other functions."
      },
      {
        "id": 38,
        "question": "What is the main difference between a list and a tuple?",
        "options": [
          "Lists are immutable, tuples are mutable",
          "Lists are mutable, tuples are immutable",
          "Tuples can only store numbers",
          "Lists use parentheses, tuples use square brackets"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Tuples cannot be changed (immutable) after they are created, whereas lists can be modified (mutable)."
      },
      {
        "id": 39,
        "question": "How is memory managed in Python?",
        "options": [
          "Manually using malloc/free",
          "Python memory manager and garbage collector",
          "OS handles it exclusively",
          "No memory management is needed"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Python memory is managed by Python private heap space. All objects and data structures are located in a private heap. The programmer does not have access to this private heap."
      },
      {
        "id": 40,
        "question": "What does the `__init__` method do in a Python class?",
        "options": [
          "Destroys the object",
          "Calculates class length",
          "Initializes a new object instance",
          "Imports a module"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "The `__init__` method is the constructor in Python, used to initialize the attributes of an object when it is created."
      },
      {
        "id": 41,
        "question": "Explain the purpose of the Global Interpreter Lock (GIL) in CPython.",
        "options": [
          "To speed up multi-threading",
          "To prevent multiple native threads from executing Python bytecodes at once",
          "To manage global variables safely",
          "To compile Python to machine code"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The GIL is a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecodes simultaneously. This prevents race conditions but limits true parallelism in CPU-bound multi-threading."
      },
      {
        "id": 42,
        "question": "What is a metaclass in Python?",
        "options": [
          "A class of a class that defines how a class behaves",
          "A class with no methods",
          "A base class for all exceptions",
          "An instance of an object"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "A metaclass is the class of a class. Like a class defines how an instance of the class behaves, a metaclass defines how a class behaves. A class is an instance of a metaclass."
      },
      {
        "id": 43,
        "question": "How do generators work internally in Python?",
        "options": [
          "They store all values in memory as a list",
          "They use the `return` statement exclusively",
          "They use the `yield` keyword to return an iterator that produces one value at a time",
          "They map functions to iterables"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Generators are a simple way of creating iterators. They use the `yield` statement to suspend function execution and send a value back to the caller, maintaining their state between yields."
      },
      {
        "id": 44,
        "question": "What is the difference between `deepcopy` and shallow `copy` in Python?",
        "options": [
          "They are exactly the same",
          "Shallow copy constructs a new compound object and inserts references into it; deep copy inserts copies of the objects found in the original",
          "Deep copy only copies primitive types",
          "Shallow copy is slower than deep copy"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "A shallow copy creates a new object but stores references to the elements found in the original. A deep copy creates a new object and recursively adds copies of the nested objects present in the original."
      },
      {
        "id": 45,
        "question": "What is the core component of Python's `asyncio` module?",
        "options": [
          "The Global Interpreter Lock",
          "The Event Loop",
          "Multiprocessing Pools",
          "Thread Pools"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The event loop is the core of every asyncio application. Event loops run asynchronous tasks and callbacks, perform network IO operations, and run subprocesses."
      },
      {
        "id": 46,
        "question": "What is the output of `print(type([]))` in Python?",
        "options": [
          "<class 'set'>",
          "<class 'list'>",
          "<class 'dict'>",
          "<class 'tuple'>"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "In Python, `[]` is the literal syntax for creating a list."
      },
      {
        "id": 47,
        "question": "Which keyword is used to define a function in Python?",
        "options": [
          "func",
          "define",
          "def",
          "function"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The `def` keyword is used to start the definition of a function in Python."
      },
      {
        "id": 48,
        "question": "How do you insert a single-line comment in Python code?",
        "options": [
          "// comment",
          "/* comment */",
          "# comment",
          "<!-- comment -->"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Python uses the hash character (`#`) for single-line comments."
      },
      {
        "id": 49,
        "question": "Which collection is ordered, changeable, and allows duplicate members?",
        "options": [
          "Set",
          "Tuple",
          "Dictionary",
          "List"
        ],
        "correct": 3,
        "difficulty": "Easy",
        "explanation": "A List in Python is ordered, mutable (changeable), and allows duplicate elements."
      },
      {
        "id": 50,
        "question": "What is the correct syntax to output \"Hello World\" in Python?",
        "options": [
          "p(\"Hello World\")",
          "print(\"Hello World\")",
          "echo(\"Hello World\")",
          "console.log(\"Hello World\")"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "The built-in `print()` function is used to output text to the console in Python."
      },
      {
        "id": 51,
        "question": "What do `*args` and `**kwargs` allow you to do in a function?",
        "options": [
          "Define typed arguments",
          "Pass a variable number of arguments",
          "Create anonymous functions",
          "Unpack lists automatically"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "`*args` passes variable number of non-keyworded arguments, while `**kwargs` passes variable number of keyword arguments."
      },
      {
        "id": 52,
        "question": "What is a decorator in Python?",
        "options": [
          "A UI formatting tool",
          "A built-in class",
          "A function that takes another function and extends its behavior without modifying it",
          "A method to clean up memory"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "Decorators provide a simple syntax for calling higher-order functions to modify the behavior of other functions."
      },
      {
        "id": 53,
        "question": "What is the main difference between a list and a tuple?",
        "options": [
          "Lists are immutable, tuples are mutable",
          "Lists are mutable, tuples are immutable",
          "Tuples can only store numbers",
          "Lists use parentheses, tuples use square brackets"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Tuples cannot be changed (immutable) after they are created, whereas lists can be modified (mutable)."
      },
      {
        "id": 54,
        "question": "How is memory managed in Python?",
        "options": [
          "Manually using malloc/free",
          "Python memory manager and garbage collector",
          "OS handles it exclusively",
          "No memory management is needed"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Python memory is managed by Python private heap space. All objects and data structures are located in a private heap. The programmer does not have access to this private heap."
      },
      {
        "id": 55,
        "question": "What does the `__init__` method do in a Python class?",
        "options": [
          "Destroys the object",
          "Calculates class length",
          "Initializes a new object instance",
          "Imports a module"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "The `__init__` method is the constructor in Python, used to initialize the attributes of an object when it is created."
      },
      {
        "id": 56,
        "question": "Explain the purpose of the Global Interpreter Lock (GIL) in CPython.",
        "options": [
          "To speed up multi-threading",
          "To prevent multiple native threads from executing Python bytecodes at once",
          "To manage global variables safely",
          "To compile Python to machine code"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The GIL is a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecodes simultaneously. This prevents race conditions but limits true parallelism in CPU-bound multi-threading."
      },
      {
        "id": 57,
        "question": "What is a metaclass in Python?",
        "options": [
          "A class of a class that defines how a class behaves",
          "A class with no methods",
          "A base class for all exceptions",
          "An instance of an object"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "A metaclass is the class of a class. Like a class defines how an instance of the class behaves, a metaclass defines how a class behaves. A class is an instance of a metaclass."
      },
      {
        "id": 58,
        "question": "How do generators work internally in Python?",
        "options": [
          "They store all values in memory as a list",
          "They use the `return` statement exclusively",
          "They use the `yield` keyword to return an iterator that produces one value at a time",
          "They map functions to iterables"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Generators are a simple way of creating iterators. They use the `yield` statement to suspend function execution and send a value back to the caller, maintaining their state between yields."
      },
      {
        "id": 59,
        "question": "What is the difference between `deepcopy` and shallow `copy` in Python?",
        "options": [
          "They are exactly the same",
          "Shallow copy constructs a new compound object and inserts references into it; deep copy inserts copies of the objects found in the original",
          "Deep copy only copies primitive types",
          "Shallow copy is slower than deep copy"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "A shallow copy creates a new object but stores references to the elements found in the original. A deep copy creates a new object and recursively adds copies of the nested objects present in the original."
      },
      {
        "id": 60,
        "question": "What is the core component of Python's `asyncio` module?",
        "options": [
          "The Global Interpreter Lock",
          "The Event Loop",
          "Multiprocessing Pools",
          "Thread Pools"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The event loop is the core of every asyncio application. Event loops run asynchronous tasks and callbacks, perform network IO operations, and run subprocesses."
      },
      {
        "id": 61,
        "question": "What is the output of `print(type([]))` in Python?",
        "options": [
          "<class 'set'>",
          "<class 'list'>",
          "<class 'dict'>",
          "<class 'tuple'>"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "In Python, `[]` is the literal syntax for creating a list."
      },
      {
        "id": 62,
        "question": "Which keyword is used to define a function in Python?",
        "options": [
          "func",
          "define",
          "def",
          "function"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The `def` keyword is used to start the definition of a function in Python."
      },
      {
        "id": 63,
        "question": "How do you insert a single-line comment in Python code?",
        "options": [
          "// comment",
          "/* comment */",
          "# comment",
          "<!-- comment -->"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Python uses the hash character (`#`) for single-line comments."
      },
      {
        "id": 64,
        "question": "Which collection is ordered, changeable, and allows duplicate members?",
        "options": [
          "Set",
          "Tuple",
          "Dictionary",
          "List"
        ],
        "correct": 3,
        "difficulty": "Easy",
        "explanation": "A List in Python is ordered, mutable (changeable), and allows duplicate elements."
      },
      {
        "id": 65,
        "question": "What is the correct syntax to output \"Hello World\" in Python?",
        "options": [
          "p(\"Hello World\")",
          "print(\"Hello World\")",
          "echo(\"Hello World\")",
          "console.log(\"Hello World\")"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "The built-in `print()` function is used to output text to the console in Python."
      },
      {
        "id": 66,
        "question": "What do `*args` and `**kwargs` allow you to do in a function?",
        "options": [
          "Define typed arguments",
          "Pass a variable number of arguments",
          "Create anonymous functions",
          "Unpack lists automatically"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "`*args` passes variable number of non-keyworded arguments, while `**kwargs` passes variable number of keyword arguments."
      },
      {
        "id": 67,
        "question": "What is a decorator in Python?",
        "options": [
          "A UI formatting tool",
          "A built-in class",
          "A function that takes another function and extends its behavior without modifying it",
          "A method to clean up memory"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "Decorators provide a simple syntax for calling higher-order functions to modify the behavior of other functions."
      },
      {
        "id": 68,
        "question": "What is the main difference between a list and a tuple?",
        "options": [
          "Lists are immutable, tuples are mutable",
          "Lists are mutable, tuples are immutable",
          "Tuples can only store numbers",
          "Lists use parentheses, tuples use square brackets"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Tuples cannot be changed (immutable) after they are created, whereas lists can be modified (mutable)."
      },
      {
        "id": 69,
        "question": "How is memory managed in Python?",
        "options": [
          "Manually using malloc/free",
          "Python memory manager and garbage collector",
          "OS handles it exclusively",
          "No memory management is needed"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Python memory is managed by Python private heap space. All objects and data structures are located in a private heap. The programmer does not have access to this private heap."
      },
      {
        "id": 70,
        "question": "What does the `__init__` method do in a Python class?",
        "options": [
          "Destroys the object",
          "Calculates class length",
          "Initializes a new object instance",
          "Imports a module"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "The `__init__` method is the constructor in Python, used to initialize the attributes of an object when it is created."
      },
      {
        "id": 71,
        "question": "Explain the purpose of the Global Interpreter Lock (GIL) in CPython.",
        "options": [
          "To speed up multi-threading",
          "To prevent multiple native threads from executing Python bytecodes at once",
          "To manage global variables safely",
          "To compile Python to machine code"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The GIL is a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecodes simultaneously. This prevents race conditions but limits true parallelism in CPU-bound multi-threading."
      },
      {
        "id": 72,
        "question": "What is a metaclass in Python?",
        "options": [
          "A class of a class that defines how a class behaves",
          "A class with no methods",
          "A base class for all exceptions",
          "An instance of an object"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "A metaclass is the class of a class. Like a class defines how an instance of the class behaves, a metaclass defines how a class behaves. A class is an instance of a metaclass."
      },
      {
        "id": 73,
        "question": "How do generators work internally in Python?",
        "options": [
          "They store all values in memory as a list",
          "They use the `return` statement exclusively",
          "They use the `yield` keyword to return an iterator that produces one value at a time",
          "They map functions to iterables"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Generators are a simple way of creating iterators. They use the `yield` statement to suspend function execution and send a value back to the caller, maintaining their state between yields."
      },
      {
        "id": 74,
        "question": "What is the difference between `deepcopy` and shallow `copy` in Python?",
        "options": [
          "They are exactly the same",
          "Shallow copy constructs a new compound object and inserts references into it; deep copy inserts copies of the objects found in the original",
          "Deep copy only copies primitive types",
          "Shallow copy is slower than deep copy"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "A shallow copy creates a new object but stores references to the elements found in the original. A deep copy creates a new object and recursively adds copies of the nested objects present in the original."
      },
      {
        "id": 75,
        "question": "What is the core component of Python's `asyncio` module?",
        "options": [
          "The Global Interpreter Lock",
          "The Event Loop",
          "Multiprocessing Pools",
          "Thread Pools"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The event loop is the core of every asyncio application. Event loops run asynchronous tasks and callbacks, perform network IO operations, and run subprocesses."
      },
      {
        "id": 76,
        "question": "What is the output of `print(type([]))` in Python?",
        "options": [
          "<class 'set'>",
          "<class 'list'>",
          "<class 'dict'>",
          "<class 'tuple'>"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "In Python, `[]` is the literal syntax for creating a list."
      },
      {
        "id": 77,
        "question": "Which keyword is used to define a function in Python?",
        "options": [
          "func",
          "define",
          "def",
          "function"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The `def` keyword is used to start the definition of a function in Python."
      },
      {
        "id": 78,
        "question": "How do you insert a single-line comment in Python code?",
        "options": [
          "// comment",
          "/* comment */",
          "# comment",
          "<!-- comment -->"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Python uses the hash character (`#`) for single-line comments."
      },
      {
        "id": 79,
        "question": "Which collection is ordered, changeable, and allows duplicate members?",
        "options": [
          "Set",
          "Tuple",
          "Dictionary",
          "List"
        ],
        "correct": 3,
        "difficulty": "Easy",
        "explanation": "A List in Python is ordered, mutable (changeable), and allows duplicate elements."
      },
      {
        "id": 80,
        "question": "What is the correct syntax to output \"Hello World\" in Python?",
        "options": [
          "p(\"Hello World\")",
          "print(\"Hello World\")",
          "echo(\"Hello World\")",
          "console.log(\"Hello World\")"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "The built-in `print()` function is used to output text to the console in Python."
      },
      {
        "id": 81,
        "question": "What do `*args` and `**kwargs` allow you to do in a function?",
        "options": [
          "Define typed arguments",
          "Pass a variable number of arguments",
          "Create anonymous functions",
          "Unpack lists automatically"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "`*args` passes variable number of non-keyworded arguments, while `**kwargs` passes variable number of keyword arguments."
      },
      {
        "id": 82,
        "question": "What is a decorator in Python?",
        "options": [
          "A UI formatting tool",
          "A built-in class",
          "A function that takes another function and extends its behavior without modifying it",
          "A method to clean up memory"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "Decorators provide a simple syntax for calling higher-order functions to modify the behavior of other functions."
      },
      {
        "id": 83,
        "question": "What is the main difference between a list and a tuple?",
        "options": [
          "Lists are immutable, tuples are mutable",
          "Lists are mutable, tuples are immutable",
          "Tuples can only store numbers",
          "Lists use parentheses, tuples use square brackets"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Tuples cannot be changed (immutable) after they are created, whereas lists can be modified (mutable)."
      },
      {
        "id": 84,
        "question": "How is memory managed in Python?",
        "options": [
          "Manually using malloc/free",
          "Python memory manager and garbage collector",
          "OS handles it exclusively",
          "No memory management is needed"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Python memory is managed by Python private heap space. All objects and data structures are located in a private heap. The programmer does not have access to this private heap."
      },
      {
        "id": 85,
        "question": "What does the `__init__` method do in a Python class?",
        "options": [
          "Destroys the object",
          "Calculates class length",
          "Initializes a new object instance",
          "Imports a module"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "The `__init__` method is the constructor in Python, used to initialize the attributes of an object when it is created."
      },
      {
        "id": 86,
        "question": "Explain the purpose of the Global Interpreter Lock (GIL) in CPython.",
        "options": [
          "To speed up multi-threading",
          "To prevent multiple native threads from executing Python bytecodes at once",
          "To manage global variables safely",
          "To compile Python to machine code"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The GIL is a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecodes simultaneously. This prevents race conditions but limits true parallelism in CPU-bound multi-threading."
      },
      {
        "id": 87,
        "question": "What is a metaclass in Python?",
        "options": [
          "A class of a class that defines how a class behaves",
          "A class with no methods",
          "A base class for all exceptions",
          "An instance of an object"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "A metaclass is the class of a class. Like a class defines how an instance of the class behaves, a metaclass defines how a class behaves. A class is an instance of a metaclass."
      },
      {
        "id": 88,
        "question": "How do generators work internally in Python?",
        "options": [
          "They store all values in memory as a list",
          "They use the `return` statement exclusively",
          "They use the `yield` keyword to return an iterator that produces one value at a time",
          "They map functions to iterables"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Generators are a simple way of creating iterators. They use the `yield` statement to suspend function execution and send a value back to the caller, maintaining their state between yields."
      },
      {
        "id": 89,
        "question": "What is the difference between `deepcopy` and shallow `copy` in Python?",
        "options": [
          "They are exactly the same",
          "Shallow copy constructs a new compound object and inserts references into it; deep copy inserts copies of the objects found in the original",
          "Deep copy only copies primitive types",
          "Shallow copy is slower than deep copy"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "A shallow copy creates a new object but stores references to the elements found in the original. A deep copy creates a new object and recursively adds copies of the nested objects present in the original."
      },
      {
        "id": 90,
        "question": "What is the core component of Python's `asyncio` module?",
        "options": [
          "The Global Interpreter Lock",
          "The Event Loop",
          "Multiprocessing Pools",
          "Thread Pools"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The event loop is the core of every asyncio application. Event loops run asynchronous tasks and callbacks, perform network IO operations, and run subprocesses."
      },
      {
        "id": 91,
        "question": "What is the output of `print(type([]))` in Python?",
        "options": [
          "<class 'set'>",
          "<class 'list'>",
          "<class 'dict'>",
          "<class 'tuple'>"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "In Python, `[]` is the literal syntax for creating a list."
      },
      {
        "id": 92,
        "question": "Which keyword is used to define a function in Python?",
        "options": [
          "func",
          "define",
          "def",
          "function"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The `def` keyword is used to start the definition of a function in Python."
      },
      {
        "id": 93,
        "question": "How do you insert a single-line comment in Python code?",
        "options": [
          "// comment",
          "/* comment */",
          "# comment",
          "<!-- comment -->"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Python uses the hash character (`#`) for single-line comments."
      },
      {
        "id": 94,
        "question": "Which collection is ordered, changeable, and allows duplicate members?",
        "options": [
          "Set",
          "Tuple",
          "Dictionary",
          "List"
        ],
        "correct": 3,
        "difficulty": "Easy",
        "explanation": "A List in Python is ordered, mutable (changeable), and allows duplicate elements."
      },
      {
        "id": 95,
        "question": "What is the correct syntax to output \"Hello World\" in Python?",
        "options": [
          "p(\"Hello World\")",
          "print(\"Hello World\")",
          "echo(\"Hello World\")",
          "console.log(\"Hello World\")"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "The built-in `print()` function is used to output text to the console in Python."
      },
      {
        "id": 96,
        "question": "What do `*args` and `**kwargs` allow you to do in a function?",
        "options": [
          "Define typed arguments",
          "Pass a variable number of arguments",
          "Create anonymous functions",
          "Unpack lists automatically"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "`*args` passes variable number of non-keyworded arguments, while `**kwargs` passes variable number of keyword arguments."
      },
      {
        "id": 97,
        "question": "What is a decorator in Python?",
        "options": [
          "A UI formatting tool",
          "A built-in class",
          "A function that takes another function and extends its behavior without modifying it",
          "A method to clean up memory"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "Decorators provide a simple syntax for calling higher-order functions to modify the behavior of other functions."
      },
      {
        "id": 98,
        "question": "What is the main difference between a list and a tuple?",
        "options": [
          "Lists are immutable, tuples are mutable",
          "Lists are mutable, tuples are immutable",
          "Tuples can only store numbers",
          "Lists use parentheses, tuples use square brackets"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Tuples cannot be changed (immutable) after they are created, whereas lists can be modified (mutable)."
      },
      {
        "id": 99,
        "question": "How is memory managed in Python?",
        "options": [
          "Manually using malloc/free",
          "Python memory manager and garbage collector",
          "OS handles it exclusively",
          "No memory management is needed"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Python memory is managed by Python private heap space. All objects and data structures are located in a private heap. The programmer does not have access to this private heap."
      },
      {
        "id": 100,
        "question": "What does the `__init__` method do in a Python class?",
        "options": [
          "Destroys the object",
          "Calculates class length",
          "Initializes a new object instance",
          "Imports a module"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "The `__init__` method is the constructor in Python, used to initialize the attributes of an object when it is created."
      },
      {
        "id": 101,
        "question": "Explain the purpose of the Global Interpreter Lock (GIL) in CPython.",
        "options": [
          "To speed up multi-threading",
          "To prevent multiple native threads from executing Python bytecodes at once",
          "To manage global variables safely",
          "To compile Python to machine code"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The GIL is a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecodes simultaneously. This prevents race conditions but limits true parallelism in CPU-bound multi-threading."
      },
      {
        "id": 102,
        "question": "What is a metaclass in Python?",
        "options": [
          "A class of a class that defines how a class behaves",
          "A class with no methods",
          "A base class for all exceptions",
          "An instance of an object"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "A metaclass is the class of a class. Like a class defines how an instance of the class behaves, a metaclass defines how a class behaves. A class is an instance of a metaclass."
      },
      {
        "id": 103,
        "question": "How do generators work internally in Python?",
        "options": [
          "They store all values in memory as a list",
          "They use the `return` statement exclusively",
          "They use the `yield` keyword to return an iterator that produces one value at a time",
          "They map functions to iterables"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Generators are a simple way of creating iterators. They use the `yield` statement to suspend function execution and send a value back to the caller, maintaining their state between yields."
      },
      {
        "id": 104,
        "question": "What is the difference between `deepcopy` and shallow `copy` in Python?",
        "options": [
          "They are exactly the same",
          "Shallow copy constructs a new compound object and inserts references into it; deep copy inserts copies of the objects found in the original",
          "Deep copy only copies primitive types",
          "Shallow copy is slower than deep copy"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "A shallow copy creates a new object but stores references to the elements found in the original. A deep copy creates a new object and recursively adds copies of the nested objects present in the original."
      },
      {
        "id": 105,
        "question": "What is the core component of Python's `asyncio` module?",
        "options": [
          "The Global Interpreter Lock",
          "The Event Loop",
          "Multiprocessing Pools",
          "Thread Pools"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The event loop is the core of every asyncio application. Event loops run asynchronous tasks and callbacks, perform network IO operations, and run subprocesses."
      },
      {
        "id": 106,
        "question": "What is the output of `print(type([]))` in Python?",
        "options": [
          "<class 'set'>",
          "<class 'list'>",
          "<class 'dict'>",
          "<class 'tuple'>"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "In Python, `[]` is the literal syntax for creating a list."
      },
      {
        "id": 107,
        "question": "Which keyword is used to define a function in Python?",
        "options": [
          "func",
          "define",
          "def",
          "function"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The `def` keyword is used to start the definition of a function in Python."
      },
      {
        "id": 108,
        "question": "How do you insert a single-line comment in Python code?",
        "options": [
          "// comment",
          "/* comment */",
          "# comment",
          "<!-- comment -->"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Python uses the hash character (`#`) for single-line comments."
      },
      {
        "id": 109,
        "question": "Which collection is ordered, changeable, and allows duplicate members?",
        "options": [
          "Set",
          "Tuple",
          "Dictionary",
          "List"
        ],
        "correct": 3,
        "difficulty": "Easy",
        "explanation": "A List in Python is ordered, mutable (changeable), and allows duplicate elements."
      },
      {
        "id": 110,
        "question": "What is the correct syntax to output \"Hello World\" in Python?",
        "options": [
          "p(\"Hello World\")",
          "print(\"Hello World\")",
          "echo(\"Hello World\")",
          "console.log(\"Hello World\")"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "The built-in `print()` function is used to output text to the console in Python."
      },
      {
        "id": 111,
        "question": "What do `*args` and `**kwargs` allow you to do in a function?",
        "options": [
          "Define typed arguments",
          "Pass a variable number of arguments",
          "Create anonymous functions",
          "Unpack lists automatically"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "`*args` passes variable number of non-keyworded arguments, while `**kwargs` passes variable number of keyword arguments."
      },
      {
        "id": 112,
        "question": "What is a decorator in Python?",
        "options": [
          "A UI formatting tool",
          "A built-in class",
          "A function that takes another function and extends its behavior without modifying it",
          "A method to clean up memory"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "Decorators provide a simple syntax for calling higher-order functions to modify the behavior of other functions."
      },
      {
        "id": 113,
        "question": "What is the main difference between a list and a tuple?",
        "options": [
          "Lists are immutable, tuples are mutable",
          "Lists are mutable, tuples are immutable",
          "Tuples can only store numbers",
          "Lists use parentheses, tuples use square brackets"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Tuples cannot be changed (immutable) after they are created, whereas lists can be modified (mutable)."
      },
      {
        "id": 114,
        "question": "How is memory managed in Python?",
        "options": [
          "Manually using malloc/free",
          "Python memory manager and garbage collector",
          "OS handles it exclusively",
          "No memory management is needed"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Python memory is managed by Python private heap space. All objects and data structures are located in a private heap. The programmer does not have access to this private heap."
      },
      {
        "id": 115,
        "question": "What does the `__init__` method do in a Python class?",
        "options": [
          "Destroys the object",
          "Calculates class length",
          "Initializes a new object instance",
          "Imports a module"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "The `__init__` method is the constructor in Python, used to initialize the attributes of an object when it is created."
      },
      {
        "id": 116,
        "question": "Explain the purpose of the Global Interpreter Lock (GIL) in CPython.",
        "options": [
          "To speed up multi-threading",
          "To prevent multiple native threads from executing Python bytecodes at once",
          "To manage global variables safely",
          "To compile Python to machine code"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The GIL is a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecodes simultaneously. This prevents race conditions but limits true parallelism in CPU-bound multi-threading."
      },
      {
        "id": 117,
        "question": "What is a metaclass in Python?",
        "options": [
          "A class of a class that defines how a class behaves",
          "A class with no methods",
          "A base class for all exceptions",
          "An instance of an object"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "A metaclass is the class of a class. Like a class defines how an instance of the class behaves, a metaclass defines how a class behaves. A class is an instance of a metaclass."
      },
      {
        "id": 118,
        "question": "How do generators work internally in Python?",
        "options": [
          "They store all values in memory as a list",
          "They use the `return` statement exclusively",
          "They use the `yield` keyword to return an iterator that produces one value at a time",
          "They map functions to iterables"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Generators are a simple way of creating iterators. They use the `yield` statement to suspend function execution and send a value back to the caller, maintaining their state between yields."
      },
      {
        "id": 119,
        "question": "What is the difference between `deepcopy` and shallow `copy` in Python?",
        "options": [
          "They are exactly the same",
          "Shallow copy constructs a new compound object and inserts references into it; deep copy inserts copies of the objects found in the original",
          "Deep copy only copies primitive types",
          "Shallow copy is slower than deep copy"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "A shallow copy creates a new object but stores references to the elements found in the original. A deep copy creates a new object and recursively adds copies of the nested objects present in the original."
      },
      {
        "id": 120,
        "question": "What is the core component of Python's `asyncio` module?",
        "options": [
          "The Global Interpreter Lock",
          "The Event Loop",
          "Multiprocessing Pools",
          "Thread Pools"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The event loop is the core of every asyncio application. Event loops run asynchronous tasks and callbacks, perform network IO operations, and run subprocesses."
      }
    ]
  },
  {
    "id": 2,
    "title": "React.js Mastery",
    "category": "Frontend",
    "difficulty": "All Levels",
    "duration": 60,
    "badge": "⚛️",
    "color": "from-blue-400 to-cyan-600",
    "skills": [
      "Hooks",
      "Context API",
      "Performance",
      "Architecture"
    ],
    "avgScore": 72,
    "attempts": 3400,
    "description": "Test your React.js knowledge thoroughly with real-world interview and certification-style questions.",
    "questions": [
      {
        "id": 1,
        "question": "What is JSX in React?",
        "options": [
          "A separate JavaScript engine",
          "A syntax extension for JavaScript that looks like HTML",
          "A new programming language",
          "A CSS framework"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file."
      },
      {
        "id": 2,
        "question": "What hook is used to manage local component state in functional components?",
        "options": [
          "useContext",
          "useEffect",
          "useState",
          "useReducer"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "`useState` is a React Hook that lets you add a state variable to your component."
      },
      {
        "id": 3,
        "question": "How do you pass data from a parent component to a child component?",
        "options": [
          "Using state",
          "Using props",
          "Using Redux",
          "Using context only"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Components can pass data to their children as \"props\" (short for properties)."
      },
      {
        "id": 4,
        "question": "Which hook is used for handling side effects like data fetching?",
        "options": [
          "useState",
          "useMemo",
          "useEffect",
          "useRef"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The `useEffect` Hook lets you perform side effects in function components."
      },
      {
        "id": 5,
        "question": "Can web browsers read JSX directly?",
        "options": [
          "Yes",
          "No, it must be compiled into standard JavaScript",
          "Only in modern browsers",
          "Only if the file ends in .jsx"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Browsers can only read standard JavaScript. JSX must be transformed (e.g., by Babel) into regular JavaScript function calls before it reaches the browser."
      },
      {
        "id": 6,
        "question": "What is the Virtual DOM in React?",
        "options": [
          "A direct copy of the actual DOM",
          "A lightweight JavaScript representation of the actual DOM used for performance optimization",
          "A shadow DOM element",
          "A new browser API"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The Virtual DOM is a programming concept where an ideal, or \"virtual\", representation of a UI is kept in memory and synced with the \"real\" DOM by a library such as ReactDOM."
      },
      {
        "id": 7,
        "question": "What problem does the Context API solve?",
        "options": [
          "State management in a single component",
          "Prop drilling across deeply nested components",
          "API data fetching",
          "Routing in React apps"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Context provides a way to pass data through the component tree without having to pass props down manually at every level."
      },
      {
        "id": 8,
        "question": "What is a Higher-Order Component (HOC)?",
        "options": [
          "A component rendered at the root of the app",
          "A function that takes a component and returns a new component",
          "A component with state",
          "A component that uses context"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "A higher-order component is an advanced technique in React for reusing component logic. It is a pattern that emerges from React's compositional nature."
      },
      {
        "id": 9,
        "question": "What is the primary difference between `useMemo` and `useCallback`?",
        "options": [
          "`useMemo` returns a memoized value, while `useCallback` returns a memoized callback function",
          "`useCallback` is for performance, `useMemo` is for state",
          "They are identical",
          "`useMemo` triggers re-renders, `useCallback` does not"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "`useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`. `useMemo` is used to memoize the result of a calculation, whereas `useCallback` memoizes a function itself."
      },
      {
        "id": 10,
        "question": "Why are React Fragments (`<> ... </>`) used?",
        "options": [
          "To create shadow DOM elements",
          "To group a list of children without adding extra nodes to the DOM",
          "To define CSS grid layouts",
          "To inject raw HTML"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Fragments let you group a list of children without adding extra nodes to the DOM, keeping the HTML output clean."
      },
      {
        "id": 11,
        "question": "How does React Fiber improve performance?",
        "options": [
          "By compiling JSX to WebAssembly",
          "By moving rendering to a Web Worker",
          "By allowing React to pause, abort, or reuse work, enabling incremental rendering",
          "By removing the Virtual DOM"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "React Fiber is a reimplementation of React's core algorithm. Its headline feature is incremental rendering: the ability to split rendering work into chunks and spread it out over multiple frames."
      },
      {
        "id": 12,
        "question": "What is the purpose of React Suspense?",
        "options": [
          "To pause component logic indefinitely",
          "To let components \"wait\" for something (like data or code) before rendering",
          "To handle unhandled exceptions",
          "To suspend CSS animations"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Suspense lets your components \"wait\" for something before they can render. Today, Suspense only supports one use case: loading components dynamically with React.lazy."
      },
      {
        "id": 13,
        "question": "How does \"hydration\" work in Server-Side Rendering (SSR) with React?",
        "options": [
          "It waters down complex components",
          "It attaches event listeners to HTML markup that was already rendered by the server",
          "It fetches data concurrently",
          "It converts React code to CSS"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Hydration is the process of using client-side JavaScript to add application state and interactivity to server-rendered HTML."
      },
      {
        "id": 14,
        "question": "What is the best way to optimize rendering of a massive list (e.g., 10,000 items) in React?",
        "options": [
          "Use `useMemo` on every item",
          "Render them all in a loop",
          "Use virtualized/windowed lists (like react-window)",
          "Split the list into separate components manually"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Windowing (or virtualization) only renders the list items that are currently visible on the screen, drastically reducing the number of DOM nodes created."
      },
      {
        "id": 15,
        "question": "What does `useLayoutEffect` do differently than `useEffect`?",
        "options": [
          "It fires synchronously after all DOM mutations but before the browser paints",
          "It is an async version of useEffect",
          "It automatically scopes CSS to the component",
          "It runs before the component mounts"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "The signature is identical to `useEffect`, but it fires synchronously after all DOM mutations. It is used to read layout from the DOM and synchronously re-render before the browser has a chance to paint."
      },
      {
        "id": 16,
        "question": "What is JSX in React?",
        "options": [
          "A separate JavaScript engine",
          "A syntax extension for JavaScript that looks like HTML",
          "A new programming language",
          "A CSS framework"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file."
      },
      {
        "id": 17,
        "question": "What hook is used to manage local component state in functional components?",
        "options": [
          "useContext",
          "useEffect",
          "useState",
          "useReducer"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "`useState` is a React Hook that lets you add a state variable to your component."
      },
      {
        "id": 18,
        "question": "How do you pass data from a parent component to a child component?",
        "options": [
          "Using state",
          "Using props",
          "Using Redux",
          "Using context only"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Components can pass data to their children as \"props\" (short for properties)."
      },
      {
        "id": 19,
        "question": "Which hook is used for handling side effects like data fetching?",
        "options": [
          "useState",
          "useMemo",
          "useEffect",
          "useRef"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The `useEffect` Hook lets you perform side effects in function components."
      },
      {
        "id": 20,
        "question": "Can web browsers read JSX directly?",
        "options": [
          "Yes",
          "No, it must be compiled into standard JavaScript",
          "Only in modern browsers",
          "Only if the file ends in .jsx"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Browsers can only read standard JavaScript. JSX must be transformed (e.g., by Babel) into regular JavaScript function calls before it reaches the browser."
      },
      {
        "id": 21,
        "question": "What is the Virtual DOM in React?",
        "options": [
          "A direct copy of the actual DOM",
          "A lightweight JavaScript representation of the actual DOM used for performance optimization",
          "A shadow DOM element",
          "A new browser API"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The Virtual DOM is a programming concept where an ideal, or \"virtual\", representation of a UI is kept in memory and synced with the \"real\" DOM by a library such as ReactDOM."
      },
      {
        "id": 22,
        "question": "What problem does the Context API solve?",
        "options": [
          "State management in a single component",
          "Prop drilling across deeply nested components",
          "API data fetching",
          "Routing in React apps"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Context provides a way to pass data through the component tree without having to pass props down manually at every level."
      },
      {
        "id": 23,
        "question": "What is a Higher-Order Component (HOC)?",
        "options": [
          "A component rendered at the root of the app",
          "A function that takes a component and returns a new component",
          "A component with state",
          "A component that uses context"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "A higher-order component is an advanced technique in React for reusing component logic. It is a pattern that emerges from React's compositional nature."
      },
      {
        "id": 24,
        "question": "What is the primary difference between `useMemo` and `useCallback`?",
        "options": [
          "`useMemo` returns a memoized value, while `useCallback` returns a memoized callback function",
          "`useCallback` is for performance, `useMemo` is for state",
          "They are identical",
          "`useMemo` triggers re-renders, `useCallback` does not"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "`useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`. `useMemo` is used to memoize the result of a calculation, whereas `useCallback` memoizes a function itself."
      },
      {
        "id": 25,
        "question": "Why are React Fragments (`<> ... </>`) used?",
        "options": [
          "To create shadow DOM elements",
          "To group a list of children without adding extra nodes to the DOM",
          "To define CSS grid layouts",
          "To inject raw HTML"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Fragments let you group a list of children without adding extra nodes to the DOM, keeping the HTML output clean."
      },
      {
        "id": 26,
        "question": "How does React Fiber improve performance?",
        "options": [
          "By compiling JSX to WebAssembly",
          "By moving rendering to a Web Worker",
          "By allowing React to pause, abort, or reuse work, enabling incremental rendering",
          "By removing the Virtual DOM"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "React Fiber is a reimplementation of React's core algorithm. Its headline feature is incremental rendering: the ability to split rendering work into chunks and spread it out over multiple frames."
      },
      {
        "id": 27,
        "question": "What is the purpose of React Suspense?",
        "options": [
          "To pause component logic indefinitely",
          "To let components \"wait\" for something (like data or code) before rendering",
          "To handle unhandled exceptions",
          "To suspend CSS animations"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Suspense lets your components \"wait\" for something before they can render. Today, Suspense only supports one use case: loading components dynamically with React.lazy."
      },
      {
        "id": 28,
        "question": "How does \"hydration\" work in Server-Side Rendering (SSR) with React?",
        "options": [
          "It waters down complex components",
          "It attaches event listeners to HTML markup that was already rendered by the server",
          "It fetches data concurrently",
          "It converts React code to CSS"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Hydration is the process of using client-side JavaScript to add application state and interactivity to server-rendered HTML."
      },
      {
        "id": 29,
        "question": "What is the best way to optimize rendering of a massive list (e.g., 10,000 items) in React?",
        "options": [
          "Use `useMemo` on every item",
          "Render them all in a loop",
          "Use virtualized/windowed lists (like react-window)",
          "Split the list into separate components manually"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Windowing (or virtualization) only renders the list items that are currently visible on the screen, drastically reducing the number of DOM nodes created."
      },
      {
        "id": 30,
        "question": "What does `useLayoutEffect` do differently than `useEffect`?",
        "options": [
          "It fires synchronously after all DOM mutations but before the browser paints",
          "It is an async version of useEffect",
          "It automatically scopes CSS to the component",
          "It runs before the component mounts"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "The signature is identical to `useEffect`, but it fires synchronously after all DOM mutations. It is used to read layout from the DOM and synchronously re-render before the browser has a chance to paint."
      },
      {
        "id": 31,
        "question": "What is JSX in React?",
        "options": [
          "A separate JavaScript engine",
          "A syntax extension for JavaScript that looks like HTML",
          "A new programming language",
          "A CSS framework"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file."
      },
      {
        "id": 32,
        "question": "What hook is used to manage local component state in functional components?",
        "options": [
          "useContext",
          "useEffect",
          "useState",
          "useReducer"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "`useState` is a React Hook that lets you add a state variable to your component."
      },
      {
        "id": 33,
        "question": "How do you pass data from a parent component to a child component?",
        "options": [
          "Using state",
          "Using props",
          "Using Redux",
          "Using context only"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Components can pass data to their children as \"props\" (short for properties)."
      },
      {
        "id": 34,
        "question": "Which hook is used for handling side effects like data fetching?",
        "options": [
          "useState",
          "useMemo",
          "useEffect",
          "useRef"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The `useEffect` Hook lets you perform side effects in function components."
      },
      {
        "id": 35,
        "question": "Can web browsers read JSX directly?",
        "options": [
          "Yes",
          "No, it must be compiled into standard JavaScript",
          "Only in modern browsers",
          "Only if the file ends in .jsx"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Browsers can only read standard JavaScript. JSX must be transformed (e.g., by Babel) into regular JavaScript function calls before it reaches the browser."
      },
      {
        "id": 36,
        "question": "What is the Virtual DOM in React?",
        "options": [
          "A direct copy of the actual DOM",
          "A lightweight JavaScript representation of the actual DOM used for performance optimization",
          "A shadow DOM element",
          "A new browser API"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The Virtual DOM is a programming concept where an ideal, or \"virtual\", representation of a UI is kept in memory and synced with the \"real\" DOM by a library such as ReactDOM."
      },
      {
        "id": 37,
        "question": "What problem does the Context API solve?",
        "options": [
          "State management in a single component",
          "Prop drilling across deeply nested components",
          "API data fetching",
          "Routing in React apps"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Context provides a way to pass data through the component tree without having to pass props down manually at every level."
      },
      {
        "id": 38,
        "question": "What is a Higher-Order Component (HOC)?",
        "options": [
          "A component rendered at the root of the app",
          "A function that takes a component and returns a new component",
          "A component with state",
          "A component that uses context"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "A higher-order component is an advanced technique in React for reusing component logic. It is a pattern that emerges from React's compositional nature."
      },
      {
        "id": 39,
        "question": "What is the primary difference between `useMemo` and `useCallback`?",
        "options": [
          "`useMemo` returns a memoized value, while `useCallback` returns a memoized callback function",
          "`useCallback` is for performance, `useMemo` is for state",
          "They are identical",
          "`useMemo` triggers re-renders, `useCallback` does not"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "`useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`. `useMemo` is used to memoize the result of a calculation, whereas `useCallback` memoizes a function itself."
      },
      {
        "id": 40,
        "question": "Why are React Fragments (`<> ... </>`) used?",
        "options": [
          "To create shadow DOM elements",
          "To group a list of children without adding extra nodes to the DOM",
          "To define CSS grid layouts",
          "To inject raw HTML"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Fragments let you group a list of children without adding extra nodes to the DOM, keeping the HTML output clean."
      },
      {
        "id": 41,
        "question": "How does React Fiber improve performance?",
        "options": [
          "By compiling JSX to WebAssembly",
          "By moving rendering to a Web Worker",
          "By allowing React to pause, abort, or reuse work, enabling incremental rendering",
          "By removing the Virtual DOM"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "React Fiber is a reimplementation of React's core algorithm. Its headline feature is incremental rendering: the ability to split rendering work into chunks and spread it out over multiple frames."
      },
      {
        "id": 42,
        "question": "What is the purpose of React Suspense?",
        "options": [
          "To pause component logic indefinitely",
          "To let components \"wait\" for something (like data or code) before rendering",
          "To handle unhandled exceptions",
          "To suspend CSS animations"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Suspense lets your components \"wait\" for something before they can render. Today, Suspense only supports one use case: loading components dynamically with React.lazy."
      },
      {
        "id": 43,
        "question": "How does \"hydration\" work in Server-Side Rendering (SSR) with React?",
        "options": [
          "It waters down complex components",
          "It attaches event listeners to HTML markup that was already rendered by the server",
          "It fetches data concurrently",
          "It converts React code to CSS"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Hydration is the process of using client-side JavaScript to add application state and interactivity to server-rendered HTML."
      },
      {
        "id": 44,
        "question": "What is the best way to optimize rendering of a massive list (e.g., 10,000 items) in React?",
        "options": [
          "Use `useMemo` on every item",
          "Render them all in a loop",
          "Use virtualized/windowed lists (like react-window)",
          "Split the list into separate components manually"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Windowing (or virtualization) only renders the list items that are currently visible on the screen, drastically reducing the number of DOM nodes created."
      },
      {
        "id": 45,
        "question": "What does `useLayoutEffect` do differently than `useEffect`?",
        "options": [
          "It fires synchronously after all DOM mutations but before the browser paints",
          "It is an async version of useEffect",
          "It automatically scopes CSS to the component",
          "It runs before the component mounts"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "The signature is identical to `useEffect`, but it fires synchronously after all DOM mutations. It is used to read layout from the DOM and synchronously re-render before the browser has a chance to paint."
      },
      {
        "id": 46,
        "question": "What is JSX in React?",
        "options": [
          "A separate JavaScript engine",
          "A syntax extension for JavaScript that looks like HTML",
          "A new programming language",
          "A CSS framework"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file."
      },
      {
        "id": 47,
        "question": "What hook is used to manage local component state in functional components?",
        "options": [
          "useContext",
          "useEffect",
          "useState",
          "useReducer"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "`useState` is a React Hook that lets you add a state variable to your component."
      },
      {
        "id": 48,
        "question": "How do you pass data from a parent component to a child component?",
        "options": [
          "Using state",
          "Using props",
          "Using Redux",
          "Using context only"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Components can pass data to their children as \"props\" (short for properties)."
      },
      {
        "id": 49,
        "question": "Which hook is used for handling side effects like data fetching?",
        "options": [
          "useState",
          "useMemo",
          "useEffect",
          "useRef"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The `useEffect` Hook lets you perform side effects in function components."
      },
      {
        "id": 50,
        "question": "Can web browsers read JSX directly?",
        "options": [
          "Yes",
          "No, it must be compiled into standard JavaScript",
          "Only in modern browsers",
          "Only if the file ends in .jsx"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Browsers can only read standard JavaScript. JSX must be transformed (e.g., by Babel) into regular JavaScript function calls before it reaches the browser."
      },
      {
        "id": 51,
        "question": "What is the Virtual DOM in React?",
        "options": [
          "A direct copy of the actual DOM",
          "A lightweight JavaScript representation of the actual DOM used for performance optimization",
          "A shadow DOM element",
          "A new browser API"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The Virtual DOM is a programming concept where an ideal, or \"virtual\", representation of a UI is kept in memory and synced with the \"real\" DOM by a library such as ReactDOM."
      },
      {
        "id": 52,
        "question": "What problem does the Context API solve?",
        "options": [
          "State management in a single component",
          "Prop drilling across deeply nested components",
          "API data fetching",
          "Routing in React apps"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Context provides a way to pass data through the component tree without having to pass props down manually at every level."
      },
      {
        "id": 53,
        "question": "What is a Higher-Order Component (HOC)?",
        "options": [
          "A component rendered at the root of the app",
          "A function that takes a component and returns a new component",
          "A component with state",
          "A component that uses context"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "A higher-order component is an advanced technique in React for reusing component logic. It is a pattern that emerges from React's compositional nature."
      },
      {
        "id": 54,
        "question": "What is the primary difference between `useMemo` and `useCallback`?",
        "options": [
          "`useMemo` returns a memoized value, while `useCallback` returns a memoized callback function",
          "`useCallback` is for performance, `useMemo` is for state",
          "They are identical",
          "`useMemo` triggers re-renders, `useCallback` does not"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "`useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`. `useMemo` is used to memoize the result of a calculation, whereas `useCallback` memoizes a function itself."
      },
      {
        "id": 55,
        "question": "Why are React Fragments (`<> ... </>`) used?",
        "options": [
          "To create shadow DOM elements",
          "To group a list of children without adding extra nodes to the DOM",
          "To define CSS grid layouts",
          "To inject raw HTML"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Fragments let you group a list of children without adding extra nodes to the DOM, keeping the HTML output clean."
      },
      {
        "id": 56,
        "question": "How does React Fiber improve performance?",
        "options": [
          "By compiling JSX to WebAssembly",
          "By moving rendering to a Web Worker",
          "By allowing React to pause, abort, or reuse work, enabling incremental rendering",
          "By removing the Virtual DOM"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "React Fiber is a reimplementation of React's core algorithm. Its headline feature is incremental rendering: the ability to split rendering work into chunks and spread it out over multiple frames."
      },
      {
        "id": 57,
        "question": "What is the purpose of React Suspense?",
        "options": [
          "To pause component logic indefinitely",
          "To let components \"wait\" for something (like data or code) before rendering",
          "To handle unhandled exceptions",
          "To suspend CSS animations"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Suspense lets your components \"wait\" for something before they can render. Today, Suspense only supports one use case: loading components dynamically with React.lazy."
      },
      {
        "id": 58,
        "question": "How does \"hydration\" work in Server-Side Rendering (SSR) with React?",
        "options": [
          "It waters down complex components",
          "It attaches event listeners to HTML markup that was already rendered by the server",
          "It fetches data concurrently",
          "It converts React code to CSS"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Hydration is the process of using client-side JavaScript to add application state and interactivity to server-rendered HTML."
      },
      {
        "id": 59,
        "question": "What is the best way to optimize rendering of a massive list (e.g., 10,000 items) in React?",
        "options": [
          "Use `useMemo` on every item",
          "Render them all in a loop",
          "Use virtualized/windowed lists (like react-window)",
          "Split the list into separate components manually"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Windowing (or virtualization) only renders the list items that are currently visible on the screen, drastically reducing the number of DOM nodes created."
      },
      {
        "id": 60,
        "question": "What does `useLayoutEffect` do differently than `useEffect`?",
        "options": [
          "It fires synchronously after all DOM mutations but before the browser paints",
          "It is an async version of useEffect",
          "It automatically scopes CSS to the component",
          "It runs before the component mounts"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "The signature is identical to `useEffect`, but it fires synchronously after all DOM mutations. It is used to read layout from the DOM and synchronously re-render before the browser has a chance to paint."
      },
      {
        "id": 61,
        "question": "What is JSX in React?",
        "options": [
          "A separate JavaScript engine",
          "A syntax extension for JavaScript that looks like HTML",
          "A new programming language",
          "A CSS framework"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file."
      },
      {
        "id": 62,
        "question": "What hook is used to manage local component state in functional components?",
        "options": [
          "useContext",
          "useEffect",
          "useState",
          "useReducer"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "`useState` is a React Hook that lets you add a state variable to your component."
      },
      {
        "id": 63,
        "question": "How do you pass data from a parent component to a child component?",
        "options": [
          "Using state",
          "Using props",
          "Using Redux",
          "Using context only"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Components can pass data to their children as \"props\" (short for properties)."
      },
      {
        "id": 64,
        "question": "Which hook is used for handling side effects like data fetching?",
        "options": [
          "useState",
          "useMemo",
          "useEffect",
          "useRef"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The `useEffect` Hook lets you perform side effects in function components."
      },
      {
        "id": 65,
        "question": "Can web browsers read JSX directly?",
        "options": [
          "Yes",
          "No, it must be compiled into standard JavaScript",
          "Only in modern browsers",
          "Only if the file ends in .jsx"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Browsers can only read standard JavaScript. JSX must be transformed (e.g., by Babel) into regular JavaScript function calls before it reaches the browser."
      },
      {
        "id": 66,
        "question": "What is the Virtual DOM in React?",
        "options": [
          "A direct copy of the actual DOM",
          "A lightweight JavaScript representation of the actual DOM used for performance optimization",
          "A shadow DOM element",
          "A new browser API"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The Virtual DOM is a programming concept where an ideal, or \"virtual\", representation of a UI is kept in memory and synced with the \"real\" DOM by a library such as ReactDOM."
      },
      {
        "id": 67,
        "question": "What problem does the Context API solve?",
        "options": [
          "State management in a single component",
          "Prop drilling across deeply nested components",
          "API data fetching",
          "Routing in React apps"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Context provides a way to pass data through the component tree without having to pass props down manually at every level."
      },
      {
        "id": 68,
        "question": "What is a Higher-Order Component (HOC)?",
        "options": [
          "A component rendered at the root of the app",
          "A function that takes a component and returns a new component",
          "A component with state",
          "A component that uses context"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "A higher-order component is an advanced technique in React for reusing component logic. It is a pattern that emerges from React's compositional nature."
      },
      {
        "id": 69,
        "question": "What is the primary difference between `useMemo` and `useCallback`?",
        "options": [
          "`useMemo` returns a memoized value, while `useCallback` returns a memoized callback function",
          "`useCallback` is for performance, `useMemo` is for state",
          "They are identical",
          "`useMemo` triggers re-renders, `useCallback` does not"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "`useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`. `useMemo` is used to memoize the result of a calculation, whereas `useCallback` memoizes a function itself."
      },
      {
        "id": 70,
        "question": "Why are React Fragments (`<> ... </>`) used?",
        "options": [
          "To create shadow DOM elements",
          "To group a list of children without adding extra nodes to the DOM",
          "To define CSS grid layouts",
          "To inject raw HTML"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Fragments let you group a list of children without adding extra nodes to the DOM, keeping the HTML output clean."
      },
      {
        "id": 71,
        "question": "How does React Fiber improve performance?",
        "options": [
          "By compiling JSX to WebAssembly",
          "By moving rendering to a Web Worker",
          "By allowing React to pause, abort, or reuse work, enabling incremental rendering",
          "By removing the Virtual DOM"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "React Fiber is a reimplementation of React's core algorithm. Its headline feature is incremental rendering: the ability to split rendering work into chunks and spread it out over multiple frames."
      },
      {
        "id": 72,
        "question": "What is the purpose of React Suspense?",
        "options": [
          "To pause component logic indefinitely",
          "To let components \"wait\" for something (like data or code) before rendering",
          "To handle unhandled exceptions",
          "To suspend CSS animations"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Suspense lets your components \"wait\" for something before they can render. Today, Suspense only supports one use case: loading components dynamically with React.lazy."
      },
      {
        "id": 73,
        "question": "How does \"hydration\" work in Server-Side Rendering (SSR) with React?",
        "options": [
          "It waters down complex components",
          "It attaches event listeners to HTML markup that was already rendered by the server",
          "It fetches data concurrently",
          "It converts React code to CSS"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Hydration is the process of using client-side JavaScript to add application state and interactivity to server-rendered HTML."
      },
      {
        "id": 74,
        "question": "What is the best way to optimize rendering of a massive list (e.g., 10,000 items) in React?",
        "options": [
          "Use `useMemo` on every item",
          "Render them all in a loop",
          "Use virtualized/windowed lists (like react-window)",
          "Split the list into separate components manually"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Windowing (or virtualization) only renders the list items that are currently visible on the screen, drastically reducing the number of DOM nodes created."
      },
      {
        "id": 75,
        "question": "What does `useLayoutEffect` do differently than `useEffect`?",
        "options": [
          "It fires synchronously after all DOM mutations but before the browser paints",
          "It is an async version of useEffect",
          "It automatically scopes CSS to the component",
          "It runs before the component mounts"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "The signature is identical to `useEffect`, but it fires synchronously after all DOM mutations. It is used to read layout from the DOM and synchronously re-render before the browser has a chance to paint."
      },
      {
        "id": 76,
        "question": "What is JSX in React?",
        "options": [
          "A separate JavaScript engine",
          "A syntax extension for JavaScript that looks like HTML",
          "A new programming language",
          "A CSS framework"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file."
      },
      {
        "id": 77,
        "question": "What hook is used to manage local component state in functional components?",
        "options": [
          "useContext",
          "useEffect",
          "useState",
          "useReducer"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "`useState` is a React Hook that lets you add a state variable to your component."
      },
      {
        "id": 78,
        "question": "How do you pass data from a parent component to a child component?",
        "options": [
          "Using state",
          "Using props",
          "Using Redux",
          "Using context only"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Components can pass data to their children as \"props\" (short for properties)."
      },
      {
        "id": 79,
        "question": "Which hook is used for handling side effects like data fetching?",
        "options": [
          "useState",
          "useMemo",
          "useEffect",
          "useRef"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The `useEffect` Hook lets you perform side effects in function components."
      },
      {
        "id": 80,
        "question": "Can web browsers read JSX directly?",
        "options": [
          "Yes",
          "No, it must be compiled into standard JavaScript",
          "Only in modern browsers",
          "Only if the file ends in .jsx"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Browsers can only read standard JavaScript. JSX must be transformed (e.g., by Babel) into regular JavaScript function calls before it reaches the browser."
      },
      {
        "id": 81,
        "question": "What is the Virtual DOM in React?",
        "options": [
          "A direct copy of the actual DOM",
          "A lightweight JavaScript representation of the actual DOM used for performance optimization",
          "A shadow DOM element",
          "A new browser API"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The Virtual DOM is a programming concept where an ideal, or \"virtual\", representation of a UI is kept in memory and synced with the \"real\" DOM by a library such as ReactDOM."
      },
      {
        "id": 82,
        "question": "What problem does the Context API solve?",
        "options": [
          "State management in a single component",
          "Prop drilling across deeply nested components",
          "API data fetching",
          "Routing in React apps"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Context provides a way to pass data through the component tree without having to pass props down manually at every level."
      },
      {
        "id": 83,
        "question": "What is a Higher-Order Component (HOC)?",
        "options": [
          "A component rendered at the root of the app",
          "A function that takes a component and returns a new component",
          "A component with state",
          "A component that uses context"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "A higher-order component is an advanced technique in React for reusing component logic. It is a pattern that emerges from React's compositional nature."
      },
      {
        "id": 84,
        "question": "What is the primary difference between `useMemo` and `useCallback`?",
        "options": [
          "`useMemo` returns a memoized value, while `useCallback` returns a memoized callback function",
          "`useCallback` is for performance, `useMemo` is for state",
          "They are identical",
          "`useMemo` triggers re-renders, `useCallback` does not"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "`useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`. `useMemo` is used to memoize the result of a calculation, whereas `useCallback` memoizes a function itself."
      },
      {
        "id": 85,
        "question": "Why are React Fragments (`<> ... </>`) used?",
        "options": [
          "To create shadow DOM elements",
          "To group a list of children without adding extra nodes to the DOM",
          "To define CSS grid layouts",
          "To inject raw HTML"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Fragments let you group a list of children without adding extra nodes to the DOM, keeping the HTML output clean."
      },
      {
        "id": 86,
        "question": "How does React Fiber improve performance?",
        "options": [
          "By compiling JSX to WebAssembly",
          "By moving rendering to a Web Worker",
          "By allowing React to pause, abort, or reuse work, enabling incremental rendering",
          "By removing the Virtual DOM"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "React Fiber is a reimplementation of React's core algorithm. Its headline feature is incremental rendering: the ability to split rendering work into chunks and spread it out over multiple frames."
      },
      {
        "id": 87,
        "question": "What is the purpose of React Suspense?",
        "options": [
          "To pause component logic indefinitely",
          "To let components \"wait\" for something (like data or code) before rendering",
          "To handle unhandled exceptions",
          "To suspend CSS animations"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Suspense lets your components \"wait\" for something before they can render. Today, Suspense only supports one use case: loading components dynamically with React.lazy."
      },
      {
        "id": 88,
        "question": "How does \"hydration\" work in Server-Side Rendering (SSR) with React?",
        "options": [
          "It waters down complex components",
          "It attaches event listeners to HTML markup that was already rendered by the server",
          "It fetches data concurrently",
          "It converts React code to CSS"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Hydration is the process of using client-side JavaScript to add application state and interactivity to server-rendered HTML."
      },
      {
        "id": 89,
        "question": "What is the best way to optimize rendering of a massive list (e.g., 10,000 items) in React?",
        "options": [
          "Use `useMemo` on every item",
          "Render them all in a loop",
          "Use virtualized/windowed lists (like react-window)",
          "Split the list into separate components manually"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Windowing (or virtualization) only renders the list items that are currently visible on the screen, drastically reducing the number of DOM nodes created."
      },
      {
        "id": 90,
        "question": "What does `useLayoutEffect` do differently than `useEffect`?",
        "options": [
          "It fires synchronously after all DOM mutations but before the browser paints",
          "It is an async version of useEffect",
          "It automatically scopes CSS to the component",
          "It runs before the component mounts"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "The signature is identical to `useEffect`, but it fires synchronously after all DOM mutations. It is used to read layout from the DOM and synchronously re-render before the browser has a chance to paint."
      },
      {
        "id": 91,
        "question": "What is JSX in React?",
        "options": [
          "A separate JavaScript engine",
          "A syntax extension for JavaScript that looks like HTML",
          "A new programming language",
          "A CSS framework"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file."
      },
      {
        "id": 92,
        "question": "What hook is used to manage local component state in functional components?",
        "options": [
          "useContext",
          "useEffect",
          "useState",
          "useReducer"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "`useState` is a React Hook that lets you add a state variable to your component."
      },
      {
        "id": 93,
        "question": "How do you pass data from a parent component to a child component?",
        "options": [
          "Using state",
          "Using props",
          "Using Redux",
          "Using context only"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Components can pass data to their children as \"props\" (short for properties)."
      },
      {
        "id": 94,
        "question": "Which hook is used for handling side effects like data fetching?",
        "options": [
          "useState",
          "useMemo",
          "useEffect",
          "useRef"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The `useEffect` Hook lets you perform side effects in function components."
      },
      {
        "id": 95,
        "question": "Can web browsers read JSX directly?",
        "options": [
          "Yes",
          "No, it must be compiled into standard JavaScript",
          "Only in modern browsers",
          "Only if the file ends in .jsx"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Browsers can only read standard JavaScript. JSX must be transformed (e.g., by Babel) into regular JavaScript function calls before it reaches the browser."
      },
      {
        "id": 96,
        "question": "What is the Virtual DOM in React?",
        "options": [
          "A direct copy of the actual DOM",
          "A lightweight JavaScript representation of the actual DOM used for performance optimization",
          "A shadow DOM element",
          "A new browser API"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The Virtual DOM is a programming concept where an ideal, or \"virtual\", representation of a UI is kept in memory and synced with the \"real\" DOM by a library such as ReactDOM."
      },
      {
        "id": 97,
        "question": "What problem does the Context API solve?",
        "options": [
          "State management in a single component",
          "Prop drilling across deeply nested components",
          "API data fetching",
          "Routing in React apps"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Context provides a way to pass data through the component tree without having to pass props down manually at every level."
      },
      {
        "id": 98,
        "question": "What is a Higher-Order Component (HOC)?",
        "options": [
          "A component rendered at the root of the app",
          "A function that takes a component and returns a new component",
          "A component with state",
          "A component that uses context"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "A higher-order component is an advanced technique in React for reusing component logic. It is a pattern that emerges from React's compositional nature."
      },
      {
        "id": 99,
        "question": "What is the primary difference between `useMemo` and `useCallback`?",
        "options": [
          "`useMemo` returns a memoized value, while `useCallback` returns a memoized callback function",
          "`useCallback` is for performance, `useMemo` is for state",
          "They are identical",
          "`useMemo` triggers re-renders, `useCallback` does not"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "`useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`. `useMemo` is used to memoize the result of a calculation, whereas `useCallback` memoizes a function itself."
      },
      {
        "id": 100,
        "question": "Why are React Fragments (`<> ... </>`) used?",
        "options": [
          "To create shadow DOM elements",
          "To group a list of children without adding extra nodes to the DOM",
          "To define CSS grid layouts",
          "To inject raw HTML"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Fragments let you group a list of children without adding extra nodes to the DOM, keeping the HTML output clean."
      },
      {
        "id": 101,
        "question": "How does React Fiber improve performance?",
        "options": [
          "By compiling JSX to WebAssembly",
          "By moving rendering to a Web Worker",
          "By allowing React to pause, abort, or reuse work, enabling incremental rendering",
          "By removing the Virtual DOM"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "React Fiber is a reimplementation of React's core algorithm. Its headline feature is incremental rendering: the ability to split rendering work into chunks and spread it out over multiple frames."
      },
      {
        "id": 102,
        "question": "What is the purpose of React Suspense?",
        "options": [
          "To pause component logic indefinitely",
          "To let components \"wait\" for something (like data or code) before rendering",
          "To handle unhandled exceptions",
          "To suspend CSS animations"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Suspense lets your components \"wait\" for something before they can render. Today, Suspense only supports one use case: loading components dynamically with React.lazy."
      },
      {
        "id": 103,
        "question": "How does \"hydration\" work in Server-Side Rendering (SSR) with React?",
        "options": [
          "It waters down complex components",
          "It attaches event listeners to HTML markup that was already rendered by the server",
          "It fetches data concurrently",
          "It converts React code to CSS"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Hydration is the process of using client-side JavaScript to add application state and interactivity to server-rendered HTML."
      },
      {
        "id": 104,
        "question": "What is the best way to optimize rendering of a massive list (e.g., 10,000 items) in React?",
        "options": [
          "Use `useMemo` on every item",
          "Render them all in a loop",
          "Use virtualized/windowed lists (like react-window)",
          "Split the list into separate components manually"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Windowing (or virtualization) only renders the list items that are currently visible on the screen, drastically reducing the number of DOM nodes created."
      },
      {
        "id": 105,
        "question": "What does `useLayoutEffect` do differently than `useEffect`?",
        "options": [
          "It fires synchronously after all DOM mutations but before the browser paints",
          "It is an async version of useEffect",
          "It automatically scopes CSS to the component",
          "It runs before the component mounts"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "The signature is identical to `useEffect`, but it fires synchronously after all DOM mutations. It is used to read layout from the DOM and synchronously re-render before the browser has a chance to paint."
      },
      {
        "id": 106,
        "question": "What is JSX in React?",
        "options": [
          "A separate JavaScript engine",
          "A syntax extension for JavaScript that looks like HTML",
          "A new programming language",
          "A CSS framework"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file."
      },
      {
        "id": 107,
        "question": "What hook is used to manage local component state in functional components?",
        "options": [
          "useContext",
          "useEffect",
          "useState",
          "useReducer"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "`useState` is a React Hook that lets you add a state variable to your component."
      },
      {
        "id": 108,
        "question": "How do you pass data from a parent component to a child component?",
        "options": [
          "Using state",
          "Using props",
          "Using Redux",
          "Using context only"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Components can pass data to their children as \"props\" (short for properties)."
      },
      {
        "id": 109,
        "question": "Which hook is used for handling side effects like data fetching?",
        "options": [
          "useState",
          "useMemo",
          "useEffect",
          "useRef"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The `useEffect` Hook lets you perform side effects in function components."
      },
      {
        "id": 110,
        "question": "Can web browsers read JSX directly?",
        "options": [
          "Yes",
          "No, it must be compiled into standard JavaScript",
          "Only in modern browsers",
          "Only if the file ends in .jsx"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Browsers can only read standard JavaScript. JSX must be transformed (e.g., by Babel) into regular JavaScript function calls before it reaches the browser."
      },
      {
        "id": 111,
        "question": "What is the Virtual DOM in React?",
        "options": [
          "A direct copy of the actual DOM",
          "A lightweight JavaScript representation of the actual DOM used for performance optimization",
          "A shadow DOM element",
          "A new browser API"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The Virtual DOM is a programming concept where an ideal, or \"virtual\", representation of a UI is kept in memory and synced with the \"real\" DOM by a library such as ReactDOM."
      },
      {
        "id": 112,
        "question": "What problem does the Context API solve?",
        "options": [
          "State management in a single component",
          "Prop drilling across deeply nested components",
          "API data fetching",
          "Routing in React apps"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Context provides a way to pass data through the component tree without having to pass props down manually at every level."
      },
      {
        "id": 113,
        "question": "What is a Higher-Order Component (HOC)?",
        "options": [
          "A component rendered at the root of the app",
          "A function that takes a component and returns a new component",
          "A component with state",
          "A component that uses context"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "A higher-order component is an advanced technique in React for reusing component logic. It is a pattern that emerges from React's compositional nature."
      },
      {
        "id": 114,
        "question": "What is the primary difference between `useMemo` and `useCallback`?",
        "options": [
          "`useMemo` returns a memoized value, while `useCallback` returns a memoized callback function",
          "`useCallback` is for performance, `useMemo` is for state",
          "They are identical",
          "`useMemo` triggers re-renders, `useCallback` does not"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "`useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`. `useMemo` is used to memoize the result of a calculation, whereas `useCallback` memoizes a function itself."
      },
      {
        "id": 115,
        "question": "Why are React Fragments (`<> ... </>`) used?",
        "options": [
          "To create shadow DOM elements",
          "To group a list of children without adding extra nodes to the DOM",
          "To define CSS grid layouts",
          "To inject raw HTML"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Fragments let you group a list of children without adding extra nodes to the DOM, keeping the HTML output clean."
      },
      {
        "id": 116,
        "question": "How does React Fiber improve performance?",
        "options": [
          "By compiling JSX to WebAssembly",
          "By moving rendering to a Web Worker",
          "By allowing React to pause, abort, or reuse work, enabling incremental rendering",
          "By removing the Virtual DOM"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "React Fiber is a reimplementation of React's core algorithm. Its headline feature is incremental rendering: the ability to split rendering work into chunks and spread it out over multiple frames."
      },
      {
        "id": 117,
        "question": "What is the purpose of React Suspense?",
        "options": [
          "To pause component logic indefinitely",
          "To let components \"wait\" for something (like data or code) before rendering",
          "To handle unhandled exceptions",
          "To suspend CSS animations"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Suspense lets your components \"wait\" for something before they can render. Today, Suspense only supports one use case: loading components dynamically with React.lazy."
      },
      {
        "id": 118,
        "question": "How does \"hydration\" work in Server-Side Rendering (SSR) with React?",
        "options": [
          "It waters down complex components",
          "It attaches event listeners to HTML markup that was already rendered by the server",
          "It fetches data concurrently",
          "It converts React code to CSS"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Hydration is the process of using client-side JavaScript to add application state and interactivity to server-rendered HTML."
      },
      {
        "id": 119,
        "question": "What is the best way to optimize rendering of a massive list (e.g., 10,000 items) in React?",
        "options": [
          "Use `useMemo` on every item",
          "Render them all in a loop",
          "Use virtualized/windowed lists (like react-window)",
          "Split the list into separate components manually"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Windowing (or virtualization) only renders the list items that are currently visible on the screen, drastically reducing the number of DOM nodes created."
      },
      {
        "id": 120,
        "question": "What does `useLayoutEffect` do differently than `useEffect`?",
        "options": [
          "It fires synchronously after all DOM mutations but before the browser paints",
          "It is an async version of useEffect",
          "It automatically scopes CSS to the component",
          "It runs before the component mounts"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "The signature is identical to `useEffect`, but it fires synchronously after all DOM mutations. It is used to read layout from the DOM and synchronously re-render before the browser has a chance to paint."
      }
    ]
  },
  {
    "id": 3,
    "title": "Full-Stack Architecture",
    "category": "System Design",
    "difficulty": "All Levels",
    "duration": 90,
    "badge": "🏗️",
    "color": "from-purple-500 to-indigo-700",
    "skills": [
      "Microservices",
      "Databases",
      "API Design",
      "Caching"
    ],
    "avgScore": 65,
    "attempts": 890,
    "description": "Evaluate your ability to design robust, scalable systems with this comprehensive test ranging from simple to complex scenarios.",
    "questions": [
      {
        "id": 1,
        "question": "What does API stand for?",
        "options": [
          "Application Programming Interface",
          "Advanced Program Integration",
          "Automated Protocol Interface",
          "Application Process Integration"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "API stands for Application Programming Interface, which is a set of rules and protocols for building and interacting with software applications."
      },
      {
        "id": 2,
        "question": "In web architecture, what does the backend refer to?",
        "options": [
          "The user interface",
          "The server, database, and application logic",
          "The CSS and HTML",
          "The client-side browser"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "The backend, or server-side, consists of the server, database, and server-side applications that process data and business logic."
      },
      {
        "id": 3,
        "question": "What is JSON?",
        "options": [
          "A JavaScript framework",
          "A database engine",
          "A lightweight data-interchange format",
          "A web server"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "JSON (JavaScript Object Notation) is a lightweight, text-based data-interchange format that is easy for humans to read and write and easy for machines to parse and generate."
      },
      {
        "id": 4,
        "question": "What does REST stand for?",
        "options": [
          "Representational State Transfer",
          "Remote Execution System Technology",
          "Regular State Transmission",
          "Reliable Execution Standard Transfer"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "REST stands for Representational State Transfer, an architectural style for designing networked applications."
      },
      {
        "id": 5,
        "question": "Which HTTP method is typically used to create a new resource?",
        "options": [
          "GET",
          "PUT",
          "DELETE",
          "POST"
        ],
        "correct": 3,
        "difficulty": "Easy",
        "explanation": "The POST method is used to submit an entity to the specified resource, often causing a change in state or side effects on the server."
      },
      {
        "id": 6,
        "question": "What is the main purpose of caching?",
        "options": [
          "To secure the database",
          "To temporarily store frequently accessed data to reduce latency and database load",
          "To route HTTP traffic",
          "To format JSON data"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Caching involves storing copies of files or data in a temporary storage location so that they can be accessed more quickly."
      },
      {
        "id": 7,
        "question": "What are the three parts of a JSON Web Token (JWT)?",
        "options": [
          "Header, Payload, Signature",
          "Header, Body, Footer",
          "User, Data, Hash",
          "Key, Value, Timestamp"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "A JWT consists of three parts separated by dots: Header (algorithm & token type), Payload (claims), and Signature (to verify token integrity)."
      },
      {
        "id": 8,
        "question": "What is the primary benefit of a Microservices architecture over a Monolithic one?",
        "options": [
          "It uses less memory",
          "It is easier to build initially",
          "Services can be deployed, scaled, and maintained independently",
          "It requires fewer developers"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "Microservices allow large applications to be separated into smaller, independent services, enabling independent scaling, faster deployment, and localized fault tolerance."
      },
      {
        "id": 9,
        "question": "What is the role of a Load Balancer?",
        "options": [
          "To encrypt data in transit",
          "To distribute incoming network traffic across multiple servers",
          "To store session data",
          "To translate domain names to IP addresses"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "A load balancer efficiently distributes incoming network traffic across a group of backend servers, preventing any single server from becoming a bottleneck."
      },
      {
        "id": 10,
        "question": "What is rate limiting used for in APIs?",
        "options": [
          "To increase API speed",
          "To control the number of requests a client can make in a given time period",
          "To limit the size of database rows",
          "To restrict access to admins only"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Rate limiting controls the rate of traffic sent or received by a network to prevent DoS attacks, brute-force attacks, and server overload."
      },
      {
        "id": 11,
        "question": "Explain the CAP Theorem in distributed systems.",
        "options": [
          "Compute, Allocate, Process",
          "Consistency, Availability, Partition tolerance (you can only strongly guarantee two out of three)",
          "Caching, APIs, Proxies",
          "Concurrency, Asynchrony, Parallelism"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The CAP theorem states that a distributed data store can simultaneously provide at most two out of the following three guarantees: Consistency, Availability, and Partition tolerance."
      },
      {
        "id": 12,
        "question": "What is an Event-Driven Architecture?",
        "options": [
          "An architecture where state changes are produced, detected, and reacted to as events",
          "A system that only uses REST APIs",
          "An architecture built exclusively for UI clicks",
          "A single-threaded application design"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "Event-driven architecture uses events (a significant change in state) to trigger and communicate between decoupled services."
      },
      {
        "id": 13,
        "question": "What is Database Sharding?",
        "options": [
          "Creating database backups",
          "Splitting a large database into smaller, faster, more easily managed parts called data shards across multiple servers",
          "Adding more RAM to a database server",
          "Encrypting individual table columns"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Sharding is a method of distributing data across multiple machines horizontally, which improves performance and scalability."
      },
      {
        "id": 14,
        "question": "What is the Saga pattern in microservices?",
        "options": [
          "A monolithic database design",
          "A way to manage distributed transactions using a sequence of local transactions",
          "A UI design pattern for long forms",
          "A load balancing algorithm"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The Saga design pattern is a way to manage data consistency across microservices in distributed transaction scenarios by using a sequence of local transactions."
      },
      {
        "id": 15,
        "question": "In a real-time chat application, what protocol is best suited for bidirectional, low-latency communication?",
        "options": [
          "HTTP/1.1",
          "WebSockets",
          "FTP",
          "SMTP"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "WebSockets provide a persistent, full-duplex communication channel over a single TCP connection, ideal for real-time applications like chat."
      },
      {
        "id": 16,
        "question": "What does API stand for?",
        "options": [
          "Application Programming Interface",
          "Advanced Program Integration",
          "Automated Protocol Interface",
          "Application Process Integration"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "API stands for Application Programming Interface, which is a set of rules and protocols for building and interacting with software applications."
      },
      {
        "id": 17,
        "question": "In web architecture, what does the backend refer to?",
        "options": [
          "The user interface",
          "The server, database, and application logic",
          "The CSS and HTML",
          "The client-side browser"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "The backend, or server-side, consists of the server, database, and server-side applications that process data and business logic."
      },
      {
        "id": 18,
        "question": "What is JSON?",
        "options": [
          "A JavaScript framework",
          "A database engine",
          "A lightweight data-interchange format",
          "A web server"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "JSON (JavaScript Object Notation) is a lightweight, text-based data-interchange format that is easy for humans to read and write and easy for machines to parse and generate."
      },
      {
        "id": 19,
        "question": "What does REST stand for?",
        "options": [
          "Representational State Transfer",
          "Remote Execution System Technology",
          "Regular State Transmission",
          "Reliable Execution Standard Transfer"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "REST stands for Representational State Transfer, an architectural style for designing networked applications."
      },
      {
        "id": 20,
        "question": "Which HTTP method is typically used to create a new resource?",
        "options": [
          "GET",
          "PUT",
          "DELETE",
          "POST"
        ],
        "correct": 3,
        "difficulty": "Easy",
        "explanation": "The POST method is used to submit an entity to the specified resource, often causing a change in state or side effects on the server."
      },
      {
        "id": 21,
        "question": "What is the main purpose of caching?",
        "options": [
          "To secure the database",
          "To temporarily store frequently accessed data to reduce latency and database load",
          "To route HTTP traffic",
          "To format JSON data"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Caching involves storing copies of files or data in a temporary storage location so that they can be accessed more quickly."
      },
      {
        "id": 22,
        "question": "What are the three parts of a JSON Web Token (JWT)?",
        "options": [
          "Header, Payload, Signature",
          "Header, Body, Footer",
          "User, Data, Hash",
          "Key, Value, Timestamp"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "A JWT consists of three parts separated by dots: Header (algorithm & token type), Payload (claims), and Signature (to verify token integrity)."
      },
      {
        "id": 23,
        "question": "What is the primary benefit of a Microservices architecture over a Monolithic one?",
        "options": [
          "It uses less memory",
          "It is easier to build initially",
          "Services can be deployed, scaled, and maintained independently",
          "It requires fewer developers"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "Microservices allow large applications to be separated into smaller, independent services, enabling independent scaling, faster deployment, and localized fault tolerance."
      },
      {
        "id": 24,
        "question": "What is the role of a Load Balancer?",
        "options": [
          "To encrypt data in transit",
          "To distribute incoming network traffic across multiple servers",
          "To store session data",
          "To translate domain names to IP addresses"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "A load balancer efficiently distributes incoming network traffic across a group of backend servers, preventing any single server from becoming a bottleneck."
      },
      {
        "id": 25,
        "question": "What is rate limiting used for in APIs?",
        "options": [
          "To increase API speed",
          "To control the number of requests a client can make in a given time period",
          "To limit the size of database rows",
          "To restrict access to admins only"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Rate limiting controls the rate of traffic sent or received by a network to prevent DoS attacks, brute-force attacks, and server overload."
      },
      {
        "id": 26,
        "question": "Explain the CAP Theorem in distributed systems.",
        "options": [
          "Compute, Allocate, Process",
          "Consistency, Availability, Partition tolerance (you can only strongly guarantee two out of three)",
          "Caching, APIs, Proxies",
          "Concurrency, Asynchrony, Parallelism"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The CAP theorem states that a distributed data store can simultaneously provide at most two out of the following three guarantees: Consistency, Availability, and Partition tolerance."
      },
      {
        "id": 27,
        "question": "What is an Event-Driven Architecture?",
        "options": [
          "An architecture where state changes are produced, detected, and reacted to as events",
          "A system that only uses REST APIs",
          "An architecture built exclusively for UI clicks",
          "A single-threaded application design"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "Event-driven architecture uses events (a significant change in state) to trigger and communicate between decoupled services."
      },
      {
        "id": 28,
        "question": "What is Database Sharding?",
        "options": [
          "Creating database backups",
          "Splitting a large database into smaller, faster, more easily managed parts called data shards across multiple servers",
          "Adding more RAM to a database server",
          "Encrypting individual table columns"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Sharding is a method of distributing data across multiple machines horizontally, which improves performance and scalability."
      },
      {
        "id": 29,
        "question": "What is the Saga pattern in microservices?",
        "options": [
          "A monolithic database design",
          "A way to manage distributed transactions using a sequence of local transactions",
          "A UI design pattern for long forms",
          "A load balancing algorithm"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The Saga design pattern is a way to manage data consistency across microservices in distributed transaction scenarios by using a sequence of local transactions."
      },
      {
        "id": 30,
        "question": "In a real-time chat application, what protocol is best suited for bidirectional, low-latency communication?",
        "options": [
          "HTTP/1.1",
          "WebSockets",
          "FTP",
          "SMTP"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "WebSockets provide a persistent, full-duplex communication channel over a single TCP connection, ideal for real-time applications like chat."
      },
      {
        "id": 31,
        "question": "What does API stand for?",
        "options": [
          "Application Programming Interface",
          "Advanced Program Integration",
          "Automated Protocol Interface",
          "Application Process Integration"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "API stands for Application Programming Interface, which is a set of rules and protocols for building and interacting with software applications."
      },
      {
        "id": 32,
        "question": "In web architecture, what does the backend refer to?",
        "options": [
          "The user interface",
          "The server, database, and application logic",
          "The CSS and HTML",
          "The client-side browser"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "The backend, or server-side, consists of the server, database, and server-side applications that process data and business logic."
      },
      {
        "id": 33,
        "question": "What is JSON?",
        "options": [
          "A JavaScript framework",
          "A database engine",
          "A lightweight data-interchange format",
          "A web server"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "JSON (JavaScript Object Notation) is a lightweight, text-based data-interchange format that is easy for humans to read and write and easy for machines to parse and generate."
      },
      {
        "id": 34,
        "question": "What does REST stand for?",
        "options": [
          "Representational State Transfer",
          "Remote Execution System Technology",
          "Regular State Transmission",
          "Reliable Execution Standard Transfer"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "REST stands for Representational State Transfer, an architectural style for designing networked applications."
      },
      {
        "id": 35,
        "question": "Which HTTP method is typically used to create a new resource?",
        "options": [
          "GET",
          "PUT",
          "DELETE",
          "POST"
        ],
        "correct": 3,
        "difficulty": "Easy",
        "explanation": "The POST method is used to submit an entity to the specified resource, often causing a change in state or side effects on the server."
      },
      {
        "id": 36,
        "question": "What is the main purpose of caching?",
        "options": [
          "To secure the database",
          "To temporarily store frequently accessed data to reduce latency and database load",
          "To route HTTP traffic",
          "To format JSON data"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Caching involves storing copies of files or data in a temporary storage location so that they can be accessed more quickly."
      },
      {
        "id": 37,
        "question": "What are the three parts of a JSON Web Token (JWT)?",
        "options": [
          "Header, Payload, Signature",
          "Header, Body, Footer",
          "User, Data, Hash",
          "Key, Value, Timestamp"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "A JWT consists of three parts separated by dots: Header (algorithm & token type), Payload (claims), and Signature (to verify token integrity)."
      },
      {
        "id": 38,
        "question": "What is the primary benefit of a Microservices architecture over a Monolithic one?",
        "options": [
          "It uses less memory",
          "It is easier to build initially",
          "Services can be deployed, scaled, and maintained independently",
          "It requires fewer developers"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "Microservices allow large applications to be separated into smaller, independent services, enabling independent scaling, faster deployment, and localized fault tolerance."
      },
      {
        "id": 39,
        "question": "What is the role of a Load Balancer?",
        "options": [
          "To encrypt data in transit",
          "To distribute incoming network traffic across multiple servers",
          "To store session data",
          "To translate domain names to IP addresses"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "A load balancer efficiently distributes incoming network traffic across a group of backend servers, preventing any single server from becoming a bottleneck."
      },
      {
        "id": 40,
        "question": "What is rate limiting used for in APIs?",
        "options": [
          "To increase API speed",
          "To control the number of requests a client can make in a given time period",
          "To limit the size of database rows",
          "To restrict access to admins only"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Rate limiting controls the rate of traffic sent or received by a network to prevent DoS attacks, brute-force attacks, and server overload."
      },
      {
        "id": 41,
        "question": "Explain the CAP Theorem in distributed systems.",
        "options": [
          "Compute, Allocate, Process",
          "Consistency, Availability, Partition tolerance (you can only strongly guarantee two out of three)",
          "Caching, APIs, Proxies",
          "Concurrency, Asynchrony, Parallelism"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The CAP theorem states that a distributed data store can simultaneously provide at most two out of the following three guarantees: Consistency, Availability, and Partition tolerance."
      },
      {
        "id": 42,
        "question": "What is an Event-Driven Architecture?",
        "options": [
          "An architecture where state changes are produced, detected, and reacted to as events",
          "A system that only uses REST APIs",
          "An architecture built exclusively for UI clicks",
          "A single-threaded application design"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "Event-driven architecture uses events (a significant change in state) to trigger and communicate between decoupled services."
      },
      {
        "id": 43,
        "question": "What is Database Sharding?",
        "options": [
          "Creating database backups",
          "Splitting a large database into smaller, faster, more easily managed parts called data shards across multiple servers",
          "Adding more RAM to a database server",
          "Encrypting individual table columns"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Sharding is a method of distributing data across multiple machines horizontally, which improves performance and scalability."
      },
      {
        "id": 44,
        "question": "What is the Saga pattern in microservices?",
        "options": [
          "A monolithic database design",
          "A way to manage distributed transactions using a sequence of local transactions",
          "A UI design pattern for long forms",
          "A load balancing algorithm"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The Saga design pattern is a way to manage data consistency across microservices in distributed transaction scenarios by using a sequence of local transactions."
      },
      {
        "id": 45,
        "question": "In a real-time chat application, what protocol is best suited for bidirectional, low-latency communication?",
        "options": [
          "HTTP/1.1",
          "WebSockets",
          "FTP",
          "SMTP"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "WebSockets provide a persistent, full-duplex communication channel over a single TCP connection, ideal for real-time applications like chat."
      },
      {
        "id": 46,
        "question": "What does API stand for?",
        "options": [
          "Application Programming Interface",
          "Advanced Program Integration",
          "Automated Protocol Interface",
          "Application Process Integration"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "API stands for Application Programming Interface, which is a set of rules and protocols for building and interacting with software applications."
      },
      {
        "id": 47,
        "question": "In web architecture, what does the backend refer to?",
        "options": [
          "The user interface",
          "The server, database, and application logic",
          "The CSS and HTML",
          "The client-side browser"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "The backend, or server-side, consists of the server, database, and server-side applications that process data and business logic."
      },
      {
        "id": 48,
        "question": "What is JSON?",
        "options": [
          "A JavaScript framework",
          "A database engine",
          "A lightweight data-interchange format",
          "A web server"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "JSON (JavaScript Object Notation) is a lightweight, text-based data-interchange format that is easy for humans to read and write and easy for machines to parse and generate."
      },
      {
        "id": 49,
        "question": "What does REST stand for?",
        "options": [
          "Representational State Transfer",
          "Remote Execution System Technology",
          "Regular State Transmission",
          "Reliable Execution Standard Transfer"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "REST stands for Representational State Transfer, an architectural style for designing networked applications."
      },
      {
        "id": 50,
        "question": "Which HTTP method is typically used to create a new resource?",
        "options": [
          "GET",
          "PUT",
          "DELETE",
          "POST"
        ],
        "correct": 3,
        "difficulty": "Easy",
        "explanation": "The POST method is used to submit an entity to the specified resource, often causing a change in state or side effects on the server."
      },
      {
        "id": 51,
        "question": "What is the main purpose of caching?",
        "options": [
          "To secure the database",
          "To temporarily store frequently accessed data to reduce latency and database load",
          "To route HTTP traffic",
          "To format JSON data"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Caching involves storing copies of files or data in a temporary storage location so that they can be accessed more quickly."
      },
      {
        "id": 52,
        "question": "What are the three parts of a JSON Web Token (JWT)?",
        "options": [
          "Header, Payload, Signature",
          "Header, Body, Footer",
          "User, Data, Hash",
          "Key, Value, Timestamp"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "A JWT consists of three parts separated by dots: Header (algorithm & token type), Payload (claims), and Signature (to verify token integrity)."
      },
      {
        "id": 53,
        "question": "What is the primary benefit of a Microservices architecture over a Monolithic one?",
        "options": [
          "It uses less memory",
          "It is easier to build initially",
          "Services can be deployed, scaled, and maintained independently",
          "It requires fewer developers"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "Microservices allow large applications to be separated into smaller, independent services, enabling independent scaling, faster deployment, and localized fault tolerance."
      },
      {
        "id": 54,
        "question": "What is the role of a Load Balancer?",
        "options": [
          "To encrypt data in transit",
          "To distribute incoming network traffic across multiple servers",
          "To store session data",
          "To translate domain names to IP addresses"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "A load balancer efficiently distributes incoming network traffic across a group of backend servers, preventing any single server from becoming a bottleneck."
      },
      {
        "id": 55,
        "question": "What is rate limiting used for in APIs?",
        "options": [
          "To increase API speed",
          "To control the number of requests a client can make in a given time period",
          "To limit the size of database rows",
          "To restrict access to admins only"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Rate limiting controls the rate of traffic sent or received by a network to prevent DoS attacks, brute-force attacks, and server overload."
      },
      {
        "id": 56,
        "question": "Explain the CAP Theorem in distributed systems.",
        "options": [
          "Compute, Allocate, Process",
          "Consistency, Availability, Partition tolerance (you can only strongly guarantee two out of three)",
          "Caching, APIs, Proxies",
          "Concurrency, Asynchrony, Parallelism"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The CAP theorem states that a distributed data store can simultaneously provide at most two out of the following three guarantees: Consistency, Availability, and Partition tolerance."
      },
      {
        "id": 57,
        "question": "What is an Event-Driven Architecture?",
        "options": [
          "An architecture where state changes are produced, detected, and reacted to as events",
          "A system that only uses REST APIs",
          "An architecture built exclusively for UI clicks",
          "A single-threaded application design"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "Event-driven architecture uses events (a significant change in state) to trigger and communicate between decoupled services."
      },
      {
        "id": 58,
        "question": "What is Database Sharding?",
        "options": [
          "Creating database backups",
          "Splitting a large database into smaller, faster, more easily managed parts called data shards across multiple servers",
          "Adding more RAM to a database server",
          "Encrypting individual table columns"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Sharding is a method of distributing data across multiple machines horizontally, which improves performance and scalability."
      },
      {
        "id": 59,
        "question": "What is the Saga pattern in microservices?",
        "options": [
          "A monolithic database design",
          "A way to manage distributed transactions using a sequence of local transactions",
          "A UI design pattern for long forms",
          "A load balancing algorithm"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The Saga design pattern is a way to manage data consistency across microservices in distributed transaction scenarios by using a sequence of local transactions."
      },
      {
        "id": 60,
        "question": "In a real-time chat application, what protocol is best suited for bidirectional, low-latency communication?",
        "options": [
          "HTTP/1.1",
          "WebSockets",
          "FTP",
          "SMTP"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "WebSockets provide a persistent, full-duplex communication channel over a single TCP connection, ideal for real-time applications like chat."
      },
      {
        "id": 61,
        "question": "What does API stand for?",
        "options": [
          "Application Programming Interface",
          "Advanced Program Integration",
          "Automated Protocol Interface",
          "Application Process Integration"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "API stands for Application Programming Interface, which is a set of rules and protocols for building and interacting with software applications."
      },
      {
        "id": 62,
        "question": "In web architecture, what does the backend refer to?",
        "options": [
          "The user interface",
          "The server, database, and application logic",
          "The CSS and HTML",
          "The client-side browser"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "The backend, or server-side, consists of the server, database, and server-side applications that process data and business logic."
      },
      {
        "id": 63,
        "question": "What is JSON?",
        "options": [
          "A JavaScript framework",
          "A database engine",
          "A lightweight data-interchange format",
          "A web server"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "JSON (JavaScript Object Notation) is a lightweight, text-based data-interchange format that is easy for humans to read and write and easy for machines to parse and generate."
      },
      {
        "id": 64,
        "question": "What does REST stand for?",
        "options": [
          "Representational State Transfer",
          "Remote Execution System Technology",
          "Regular State Transmission",
          "Reliable Execution Standard Transfer"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "REST stands for Representational State Transfer, an architectural style for designing networked applications."
      },
      {
        "id": 65,
        "question": "Which HTTP method is typically used to create a new resource?",
        "options": [
          "GET",
          "PUT",
          "DELETE",
          "POST"
        ],
        "correct": 3,
        "difficulty": "Easy",
        "explanation": "The POST method is used to submit an entity to the specified resource, often causing a change in state or side effects on the server."
      },
      {
        "id": 66,
        "question": "What is the main purpose of caching?",
        "options": [
          "To secure the database",
          "To temporarily store frequently accessed data to reduce latency and database load",
          "To route HTTP traffic",
          "To format JSON data"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Caching involves storing copies of files or data in a temporary storage location so that they can be accessed more quickly."
      },
      {
        "id": 67,
        "question": "What are the three parts of a JSON Web Token (JWT)?",
        "options": [
          "Header, Payload, Signature",
          "Header, Body, Footer",
          "User, Data, Hash",
          "Key, Value, Timestamp"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "A JWT consists of three parts separated by dots: Header (algorithm & token type), Payload (claims), and Signature (to verify token integrity)."
      },
      {
        "id": 68,
        "question": "What is the primary benefit of a Microservices architecture over a Monolithic one?",
        "options": [
          "It uses less memory",
          "It is easier to build initially",
          "Services can be deployed, scaled, and maintained independently",
          "It requires fewer developers"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "Microservices allow large applications to be separated into smaller, independent services, enabling independent scaling, faster deployment, and localized fault tolerance."
      },
      {
        "id": 69,
        "question": "What is the role of a Load Balancer?",
        "options": [
          "To encrypt data in transit",
          "To distribute incoming network traffic across multiple servers",
          "To store session data",
          "To translate domain names to IP addresses"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "A load balancer efficiently distributes incoming network traffic across a group of backend servers, preventing any single server from becoming a bottleneck."
      },
      {
        "id": 70,
        "question": "What is rate limiting used for in APIs?",
        "options": [
          "To increase API speed",
          "To control the number of requests a client can make in a given time period",
          "To limit the size of database rows",
          "To restrict access to admins only"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Rate limiting controls the rate of traffic sent or received by a network to prevent DoS attacks, brute-force attacks, and server overload."
      },
      {
        "id": 71,
        "question": "Explain the CAP Theorem in distributed systems.",
        "options": [
          "Compute, Allocate, Process",
          "Consistency, Availability, Partition tolerance (you can only strongly guarantee two out of three)",
          "Caching, APIs, Proxies",
          "Concurrency, Asynchrony, Parallelism"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The CAP theorem states that a distributed data store can simultaneously provide at most two out of the following three guarantees: Consistency, Availability, and Partition tolerance."
      },
      {
        "id": 72,
        "question": "What is an Event-Driven Architecture?",
        "options": [
          "An architecture where state changes are produced, detected, and reacted to as events",
          "A system that only uses REST APIs",
          "An architecture built exclusively for UI clicks",
          "A single-threaded application design"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "Event-driven architecture uses events (a significant change in state) to trigger and communicate between decoupled services."
      },
      {
        "id": 73,
        "question": "What is Database Sharding?",
        "options": [
          "Creating database backups",
          "Splitting a large database into smaller, faster, more easily managed parts called data shards across multiple servers",
          "Adding more RAM to a database server",
          "Encrypting individual table columns"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Sharding is a method of distributing data across multiple machines horizontally, which improves performance and scalability."
      },
      {
        "id": 74,
        "question": "What is the Saga pattern in microservices?",
        "options": [
          "A monolithic database design",
          "A way to manage distributed transactions using a sequence of local transactions",
          "A UI design pattern for long forms",
          "A load balancing algorithm"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The Saga design pattern is a way to manage data consistency across microservices in distributed transaction scenarios by using a sequence of local transactions."
      },
      {
        "id": 75,
        "question": "In a real-time chat application, what protocol is best suited for bidirectional, low-latency communication?",
        "options": [
          "HTTP/1.1",
          "WebSockets",
          "FTP",
          "SMTP"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "WebSockets provide a persistent, full-duplex communication channel over a single TCP connection, ideal for real-time applications like chat."
      },
      {
        "id": 76,
        "question": "What does API stand for?",
        "options": [
          "Application Programming Interface",
          "Advanced Program Integration",
          "Automated Protocol Interface",
          "Application Process Integration"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "API stands for Application Programming Interface, which is a set of rules and protocols for building and interacting with software applications."
      },
      {
        "id": 77,
        "question": "In web architecture, what does the backend refer to?",
        "options": [
          "The user interface",
          "The server, database, and application logic",
          "The CSS and HTML",
          "The client-side browser"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "The backend, or server-side, consists of the server, database, and server-side applications that process data and business logic."
      },
      {
        "id": 78,
        "question": "What is JSON?",
        "options": [
          "A JavaScript framework",
          "A database engine",
          "A lightweight data-interchange format",
          "A web server"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "JSON (JavaScript Object Notation) is a lightweight, text-based data-interchange format that is easy for humans to read and write and easy for machines to parse and generate."
      },
      {
        "id": 79,
        "question": "What does REST stand for?",
        "options": [
          "Representational State Transfer",
          "Remote Execution System Technology",
          "Regular State Transmission",
          "Reliable Execution Standard Transfer"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "REST stands for Representational State Transfer, an architectural style for designing networked applications."
      },
      {
        "id": 80,
        "question": "Which HTTP method is typically used to create a new resource?",
        "options": [
          "GET",
          "PUT",
          "DELETE",
          "POST"
        ],
        "correct": 3,
        "difficulty": "Easy",
        "explanation": "The POST method is used to submit an entity to the specified resource, often causing a change in state or side effects on the server."
      },
      {
        "id": 81,
        "question": "What is the main purpose of caching?",
        "options": [
          "To secure the database",
          "To temporarily store frequently accessed data to reduce latency and database load",
          "To route HTTP traffic",
          "To format JSON data"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Caching involves storing copies of files or data in a temporary storage location so that they can be accessed more quickly."
      },
      {
        "id": 82,
        "question": "What are the three parts of a JSON Web Token (JWT)?",
        "options": [
          "Header, Payload, Signature",
          "Header, Body, Footer",
          "User, Data, Hash",
          "Key, Value, Timestamp"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "A JWT consists of three parts separated by dots: Header (algorithm & token type), Payload (claims), and Signature (to verify token integrity)."
      },
      {
        "id": 83,
        "question": "What is the primary benefit of a Microservices architecture over a Monolithic one?",
        "options": [
          "It uses less memory",
          "It is easier to build initially",
          "Services can be deployed, scaled, and maintained independently",
          "It requires fewer developers"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "Microservices allow large applications to be separated into smaller, independent services, enabling independent scaling, faster deployment, and localized fault tolerance."
      },
      {
        "id": 84,
        "question": "What is the role of a Load Balancer?",
        "options": [
          "To encrypt data in transit",
          "To distribute incoming network traffic across multiple servers",
          "To store session data",
          "To translate domain names to IP addresses"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "A load balancer efficiently distributes incoming network traffic across a group of backend servers, preventing any single server from becoming a bottleneck."
      },
      {
        "id": 85,
        "question": "What is rate limiting used for in APIs?",
        "options": [
          "To increase API speed",
          "To control the number of requests a client can make in a given time period",
          "To limit the size of database rows",
          "To restrict access to admins only"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Rate limiting controls the rate of traffic sent or received by a network to prevent DoS attacks, brute-force attacks, and server overload."
      },
      {
        "id": 86,
        "question": "Explain the CAP Theorem in distributed systems.",
        "options": [
          "Compute, Allocate, Process",
          "Consistency, Availability, Partition tolerance (you can only strongly guarantee two out of three)",
          "Caching, APIs, Proxies",
          "Concurrency, Asynchrony, Parallelism"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The CAP theorem states that a distributed data store can simultaneously provide at most two out of the following three guarantees: Consistency, Availability, and Partition tolerance."
      },
      {
        "id": 87,
        "question": "What is an Event-Driven Architecture?",
        "options": [
          "An architecture where state changes are produced, detected, and reacted to as events",
          "A system that only uses REST APIs",
          "An architecture built exclusively for UI clicks",
          "A single-threaded application design"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "Event-driven architecture uses events (a significant change in state) to trigger and communicate between decoupled services."
      },
      {
        "id": 88,
        "question": "What is Database Sharding?",
        "options": [
          "Creating database backups",
          "Splitting a large database into smaller, faster, more easily managed parts called data shards across multiple servers",
          "Adding more RAM to a database server",
          "Encrypting individual table columns"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Sharding is a method of distributing data across multiple machines horizontally, which improves performance and scalability."
      },
      {
        "id": 89,
        "question": "What is the Saga pattern in microservices?",
        "options": [
          "A monolithic database design",
          "A way to manage distributed transactions using a sequence of local transactions",
          "A UI design pattern for long forms",
          "A load balancing algorithm"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The Saga design pattern is a way to manage data consistency across microservices in distributed transaction scenarios by using a sequence of local transactions."
      },
      {
        "id": 90,
        "question": "In a real-time chat application, what protocol is best suited for bidirectional, low-latency communication?",
        "options": [
          "HTTP/1.1",
          "WebSockets",
          "FTP",
          "SMTP"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "WebSockets provide a persistent, full-duplex communication channel over a single TCP connection, ideal for real-time applications like chat."
      },
      {
        "id": 91,
        "question": "What does API stand for?",
        "options": [
          "Application Programming Interface",
          "Advanced Program Integration",
          "Automated Protocol Interface",
          "Application Process Integration"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "API stands for Application Programming Interface, which is a set of rules and protocols for building and interacting with software applications."
      },
      {
        "id": 92,
        "question": "In web architecture, what does the backend refer to?",
        "options": [
          "The user interface",
          "The server, database, and application logic",
          "The CSS and HTML",
          "The client-side browser"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "The backend, or server-side, consists of the server, database, and server-side applications that process data and business logic."
      },
      {
        "id": 93,
        "question": "What is JSON?",
        "options": [
          "A JavaScript framework",
          "A database engine",
          "A lightweight data-interchange format",
          "A web server"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "JSON (JavaScript Object Notation) is a lightweight, text-based data-interchange format that is easy for humans to read and write and easy for machines to parse and generate."
      },
      {
        "id": 94,
        "question": "What does REST stand for?",
        "options": [
          "Representational State Transfer",
          "Remote Execution System Technology",
          "Regular State Transmission",
          "Reliable Execution Standard Transfer"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "REST stands for Representational State Transfer, an architectural style for designing networked applications."
      },
      {
        "id": 95,
        "question": "Which HTTP method is typically used to create a new resource?",
        "options": [
          "GET",
          "PUT",
          "DELETE",
          "POST"
        ],
        "correct": 3,
        "difficulty": "Easy",
        "explanation": "The POST method is used to submit an entity to the specified resource, often causing a change in state or side effects on the server."
      },
      {
        "id": 96,
        "question": "What is the main purpose of caching?",
        "options": [
          "To secure the database",
          "To temporarily store frequently accessed data to reduce latency and database load",
          "To route HTTP traffic",
          "To format JSON data"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Caching involves storing copies of files or data in a temporary storage location so that they can be accessed more quickly."
      },
      {
        "id": 97,
        "question": "What are the three parts of a JSON Web Token (JWT)?",
        "options": [
          "Header, Payload, Signature",
          "Header, Body, Footer",
          "User, Data, Hash",
          "Key, Value, Timestamp"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "A JWT consists of three parts separated by dots: Header (algorithm & token type), Payload (claims), and Signature (to verify token integrity)."
      },
      {
        "id": 98,
        "question": "What is the primary benefit of a Microservices architecture over a Monolithic one?",
        "options": [
          "It uses less memory",
          "It is easier to build initially",
          "Services can be deployed, scaled, and maintained independently",
          "It requires fewer developers"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "Microservices allow large applications to be separated into smaller, independent services, enabling independent scaling, faster deployment, and localized fault tolerance."
      },
      {
        "id": 99,
        "question": "What is the role of a Load Balancer?",
        "options": [
          "To encrypt data in transit",
          "To distribute incoming network traffic across multiple servers",
          "To store session data",
          "To translate domain names to IP addresses"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "A load balancer efficiently distributes incoming network traffic across a group of backend servers, preventing any single server from becoming a bottleneck."
      },
      {
        "id": 100,
        "question": "What is rate limiting used for in APIs?",
        "options": [
          "To increase API speed",
          "To control the number of requests a client can make in a given time period",
          "To limit the size of database rows",
          "To restrict access to admins only"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Rate limiting controls the rate of traffic sent or received by a network to prevent DoS attacks, brute-force attacks, and server overload."
      },
      {
        "id": 101,
        "question": "Explain the CAP Theorem in distributed systems.",
        "options": [
          "Compute, Allocate, Process",
          "Consistency, Availability, Partition tolerance (you can only strongly guarantee two out of three)",
          "Caching, APIs, Proxies",
          "Concurrency, Asynchrony, Parallelism"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The CAP theorem states that a distributed data store can simultaneously provide at most two out of the following three guarantees: Consistency, Availability, and Partition tolerance."
      },
      {
        "id": 102,
        "question": "What is an Event-Driven Architecture?",
        "options": [
          "An architecture where state changes are produced, detected, and reacted to as events",
          "A system that only uses REST APIs",
          "An architecture built exclusively for UI clicks",
          "A single-threaded application design"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "Event-driven architecture uses events (a significant change in state) to trigger and communicate between decoupled services."
      },
      {
        "id": 103,
        "question": "What is Database Sharding?",
        "options": [
          "Creating database backups",
          "Splitting a large database into smaller, faster, more easily managed parts called data shards across multiple servers",
          "Adding more RAM to a database server",
          "Encrypting individual table columns"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Sharding is a method of distributing data across multiple machines horizontally, which improves performance and scalability."
      },
      {
        "id": 104,
        "question": "What is the Saga pattern in microservices?",
        "options": [
          "A monolithic database design",
          "A way to manage distributed transactions using a sequence of local transactions",
          "A UI design pattern for long forms",
          "A load balancing algorithm"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The Saga design pattern is a way to manage data consistency across microservices in distributed transaction scenarios by using a sequence of local transactions."
      },
      {
        "id": 105,
        "question": "In a real-time chat application, what protocol is best suited for bidirectional, low-latency communication?",
        "options": [
          "HTTP/1.1",
          "WebSockets",
          "FTP",
          "SMTP"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "WebSockets provide a persistent, full-duplex communication channel over a single TCP connection, ideal for real-time applications like chat."
      },
      {
        "id": 106,
        "question": "What does API stand for?",
        "options": [
          "Application Programming Interface",
          "Advanced Program Integration",
          "Automated Protocol Interface",
          "Application Process Integration"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "API stands for Application Programming Interface, which is a set of rules and protocols for building and interacting with software applications."
      },
      {
        "id": 107,
        "question": "In web architecture, what does the backend refer to?",
        "options": [
          "The user interface",
          "The server, database, and application logic",
          "The CSS and HTML",
          "The client-side browser"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "The backend, or server-side, consists of the server, database, and server-side applications that process data and business logic."
      },
      {
        "id": 108,
        "question": "What is JSON?",
        "options": [
          "A JavaScript framework",
          "A database engine",
          "A lightweight data-interchange format",
          "A web server"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "JSON (JavaScript Object Notation) is a lightweight, text-based data-interchange format that is easy for humans to read and write and easy for machines to parse and generate."
      },
      {
        "id": 109,
        "question": "What does REST stand for?",
        "options": [
          "Representational State Transfer",
          "Remote Execution System Technology",
          "Regular State Transmission",
          "Reliable Execution Standard Transfer"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "REST stands for Representational State Transfer, an architectural style for designing networked applications."
      },
      {
        "id": 110,
        "question": "Which HTTP method is typically used to create a new resource?",
        "options": [
          "GET",
          "PUT",
          "DELETE",
          "POST"
        ],
        "correct": 3,
        "difficulty": "Easy",
        "explanation": "The POST method is used to submit an entity to the specified resource, often causing a change in state or side effects on the server."
      },
      {
        "id": 111,
        "question": "What is the main purpose of caching?",
        "options": [
          "To secure the database",
          "To temporarily store frequently accessed data to reduce latency and database load",
          "To route HTTP traffic",
          "To format JSON data"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Caching involves storing copies of files or data in a temporary storage location so that they can be accessed more quickly."
      },
      {
        "id": 112,
        "question": "What are the three parts of a JSON Web Token (JWT)?",
        "options": [
          "Header, Payload, Signature",
          "Header, Body, Footer",
          "User, Data, Hash",
          "Key, Value, Timestamp"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "A JWT consists of three parts separated by dots: Header (algorithm & token type), Payload (claims), and Signature (to verify token integrity)."
      },
      {
        "id": 113,
        "question": "What is the primary benefit of a Microservices architecture over a Monolithic one?",
        "options": [
          "It uses less memory",
          "It is easier to build initially",
          "Services can be deployed, scaled, and maintained independently",
          "It requires fewer developers"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "Microservices allow large applications to be separated into smaller, independent services, enabling independent scaling, faster deployment, and localized fault tolerance."
      },
      {
        "id": 114,
        "question": "What is the role of a Load Balancer?",
        "options": [
          "To encrypt data in transit",
          "To distribute incoming network traffic across multiple servers",
          "To store session data",
          "To translate domain names to IP addresses"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "A load balancer efficiently distributes incoming network traffic across a group of backend servers, preventing any single server from becoming a bottleneck."
      },
      {
        "id": 115,
        "question": "What is rate limiting used for in APIs?",
        "options": [
          "To increase API speed",
          "To control the number of requests a client can make in a given time period",
          "To limit the size of database rows",
          "To restrict access to admins only"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Rate limiting controls the rate of traffic sent or received by a network to prevent DoS attacks, brute-force attacks, and server overload."
      },
      {
        "id": 116,
        "question": "Explain the CAP Theorem in distributed systems.",
        "options": [
          "Compute, Allocate, Process",
          "Consistency, Availability, Partition tolerance (you can only strongly guarantee two out of three)",
          "Caching, APIs, Proxies",
          "Concurrency, Asynchrony, Parallelism"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The CAP theorem states that a distributed data store can simultaneously provide at most two out of the following three guarantees: Consistency, Availability, and Partition tolerance."
      },
      {
        "id": 117,
        "question": "What is an Event-Driven Architecture?",
        "options": [
          "An architecture where state changes are produced, detected, and reacted to as events",
          "A system that only uses REST APIs",
          "An architecture built exclusively for UI clicks",
          "A single-threaded application design"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "Event-driven architecture uses events (a significant change in state) to trigger and communicate between decoupled services."
      },
      {
        "id": 118,
        "question": "What is Database Sharding?",
        "options": [
          "Creating database backups",
          "Splitting a large database into smaller, faster, more easily managed parts called data shards across multiple servers",
          "Adding more RAM to a database server",
          "Encrypting individual table columns"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Sharding is a method of distributing data across multiple machines horizontally, which improves performance and scalability."
      },
      {
        "id": 119,
        "question": "What is the Saga pattern in microservices?",
        "options": [
          "A monolithic database design",
          "A way to manage distributed transactions using a sequence of local transactions",
          "A UI design pattern for long forms",
          "A load balancing algorithm"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The Saga design pattern is a way to manage data consistency across microservices in distributed transaction scenarios by using a sequence of local transactions."
      },
      {
        "id": 120,
        "question": "In a real-time chat application, what protocol is best suited for bidirectional, low-latency communication?",
        "options": [
          "HTTP/1.1",
          "WebSockets",
          "FTP",
          "SMTP"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "WebSockets provide a persistent, full-duplex communication channel over a single TCP connection, ideal for real-time applications like chat."
      }
    ]
  },
  {
    "id": 4,
    "title": "Data Science & ML",
    "category": "AI / ML",
    "difficulty": "All Levels",
    "duration": 120,
    "badge": "🧠",
    "color": "from-orange-500 to-red-600",
    "skills": [
      "Statistics",
      "Algorithms",
      "Deep Learning",
      "Data Preprocessing"
    ],
    "avgScore": 70,
    "attempts": 2100,
    "description": "Prove your ML chops with real-world questions covering theory and practical applications.",
    "questions": [
      {
        "id": 1,
        "question": "What is supervised learning?",
        "options": [
          "Training a model with unlabelled data",
          "Training a model on a labeled dataset where the correct answers are known",
          "Letting an agent learn by trial and error",
          "Writing rules manually using if/else"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Supervised learning involves training an algorithm using labeled data, meaning the input data is paired with the correct output."
      },
      {
        "id": 2,
        "question": "What is a pandas DataFrame in Python?",
        "options": [
          "A 1D array",
          "A 2D, size-mutable, potentially heterogeneous tabular data structure",
          "A machine learning algorithm",
          "A database connection object"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A DataFrame is a two-dimensional labeled data structure with columns of potentially different types, similar to a spreadsheet or SQL table."
      },
      {
        "id": 3,
        "question": "What is the difference between classification and regression?",
        "options": [
          "Classification predicts continuous values, regression predicts categories",
          "Classification is unsupervised, regression is supervised",
          "Classification predicts discrete categories, regression predicts continuous numerical values",
          "They are the exact same thing"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Classification is used to predict a discrete class label (e.g., spam or not spam), while regression is used to predict a continuous quantity (e.g., price)."
      },
      {
        "id": 4,
        "question": "What is overfitting in machine learning?",
        "options": [
          "When a model learns the training data too well, including the noise, and performs poorly on unseen data",
          "When a model is too simple to capture patterns",
          "When training takes too long",
          "When the dataset is too small"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "Overfitting occurs when a model is too complex and models the training data too closely, failing to generalize to new, unseen data."
      },
      {
        "id": 5,
        "question": "What does a confusion matrix evaluate?",
        "options": [
          "Training time",
          "The performance of a classification model",
          "The number of layers in a neural network",
          "Data preprocessing speed"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A confusion matrix is a table used to describe the performance of a classification model by showing true positives, true negatives, false positives, and false negatives."
      },
      {
        "id": 6,
        "question": "What is k-fold cross-validation?",
        "options": [
          "A way to increase dataset size",
          "A technique to evaluate a model by splitting data into k subsets, training on k-1 and testing on the remaining one",
          "A method for clustering data into k groups",
          "An optimization algorithm"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "K-fold cross-validation ensures that every observation from the original dataset has the chance of appearing in training and test set, providing a robust estimate of model performance."
      },
      {
        "id": 7,
        "question": "How does a Random Forest algorithm work?",
        "options": [
          "By creating a single, very deep decision tree",
          "By building an ensemble of decision trees and merging their predictions",
          "By using neural networks to find random patterns",
          "By sorting data randomly before linear regression"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Random Forest operates by constructing a multitude of decision trees at training time and outputting the class that is the mode of the classes (classification) or mean prediction (regression) of the individual trees."
      },
      {
        "id": 8,
        "question": "What is Gradient Descent?",
        "options": [
          "An optimization algorithm used to minimize the cost function by iteratively moving in the direction of steepest descent",
          "A method to clean dirty data",
          "A type of neural network layer",
          "A metric for model accuracy"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Gradient descent is a first-order iterative optimization algorithm for finding a local minimum of a differentiable function."
      },
      {
        "id": 9,
        "question": "What does TF-IDF stand for in Natural Language Processing?",
        "options": [
          "True Frequency-Inverse Document Frequency",
          "Term Frequency-Inverse Document Frequency",
          "Text Format-Index Data Format",
          "Total Frequency-Initial Document Format"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "TF-IDF is a numerical statistic intended to reflect how important a word is to a document in a collection or corpus."
      },
      {
        "id": 10,
        "question": "What is a common technique to handle missing data in a dataset?",
        "options": [
          "Ignore the entire dataset",
          "Imputation (filling missing values with mean, median, mode, or using predictive models)",
          "Multiply missing values by zero",
          "Delete all columns"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Imputation replaces missing data with substituted values, preventing the loss of valuable data that would occur from simply dropping incomplete rows."
      },
      {
        "id": 11,
        "question": "Explain Backpropagation in Neural Networks.",
        "options": [
          "Forwarding inputs to the output layer",
          "The process of computing the gradient of the loss function with respect to the weights by applying the chain rule backwards",
          "A method to increase network latency",
          "Stopping training early"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Backpropagation calculates the gradient of a loss function with respect to all the weights in the network, efficiently using the chain rule."
      },
      {
        "id": 12,
        "question": "What is the Bias-Variance Tradeoff?",
        "options": [
          "The balance between a model's ability to minimize errors from erroneous assumptions (bias) and its sensitivity to small fluctuations in training data (variance)",
          "The tradeoff between training time and prediction time",
          "The choice between deep learning and classical ML",
          "The balance of positive and negative labels in data"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "High bias can cause an algorithm to miss relevant relations between features and target outputs (underfitting). High variance can cause an algorithm to model the random noise in the training data (overfitting)."
      },
      {
        "id": 13,
        "question": "How does a Support Vector Machine (SVM) work?",
        "options": [
          "It uses probabilistic trees",
          "It finds the hyperplane that maximizes the margin between different classes in a high-dimensional space",
          "It calculates the mean of nearest neighbors",
          "It strictly uses linear regression"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "SVM is a supervised machine learning model that uses classification algorithms for two-group classification problems by finding the optimal hyperplane."
      },
      {
        "id": 14,
        "question": "What is the Vanishing Gradient Problem?",
        "options": [
          "When gradients become too large and cause numerical overflow",
          "When gradients become exceedingly small as they propagate backward, preventing early layers from learning",
          "When the dataset disappears from memory",
          "When the loss function is zero"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "In deep neural networks, the vanishing gradient problem occurs when gradients approach zero during backpropagation, causing the weights of early layers to update very slowly or not at all."
      },
      {
        "id": 15,
        "question": "What is the primary goal of Principal Component Analysis (PCA)?",
        "options": [
          "To perform classification",
          "To increase the number of features",
          "Dimensionality reduction while preserving as much variance as possible",
          "To format text data"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "PCA is a statistical procedure that uses an orthogonal transformation to convert a set of observations of possibly correlated variables into a set of values of linearly uncorrelated variables called principal components."
      },
      {
        "id": 16,
        "question": "What is supervised learning?",
        "options": [
          "Training a model with unlabelled data",
          "Training a model on a labeled dataset where the correct answers are known",
          "Letting an agent learn by trial and error",
          "Writing rules manually using if/else"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Supervised learning involves training an algorithm using labeled data, meaning the input data is paired with the correct output."
      },
      {
        "id": 17,
        "question": "What is a pandas DataFrame in Python?",
        "options": [
          "A 1D array",
          "A 2D, size-mutable, potentially heterogeneous tabular data structure",
          "A machine learning algorithm",
          "A database connection object"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A DataFrame is a two-dimensional labeled data structure with columns of potentially different types, similar to a spreadsheet or SQL table."
      },
      {
        "id": 18,
        "question": "What is the difference between classification and regression?",
        "options": [
          "Classification predicts continuous values, regression predicts categories",
          "Classification is unsupervised, regression is supervised",
          "Classification predicts discrete categories, regression predicts continuous numerical values",
          "They are the exact same thing"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Classification is used to predict a discrete class label (e.g., spam or not spam), while regression is used to predict a continuous quantity (e.g., price)."
      },
      {
        "id": 19,
        "question": "What is overfitting in machine learning?",
        "options": [
          "When a model learns the training data too well, including the noise, and performs poorly on unseen data",
          "When a model is too simple to capture patterns",
          "When training takes too long",
          "When the dataset is too small"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "Overfitting occurs when a model is too complex and models the training data too closely, failing to generalize to new, unseen data."
      },
      {
        "id": 20,
        "question": "What does a confusion matrix evaluate?",
        "options": [
          "Training time",
          "The performance of a classification model",
          "The number of layers in a neural network",
          "Data preprocessing speed"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A confusion matrix is a table used to describe the performance of a classification model by showing true positives, true negatives, false positives, and false negatives."
      },
      {
        "id": 21,
        "question": "What is k-fold cross-validation?",
        "options": [
          "A way to increase dataset size",
          "A technique to evaluate a model by splitting data into k subsets, training on k-1 and testing on the remaining one",
          "A method for clustering data into k groups",
          "An optimization algorithm"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "K-fold cross-validation ensures that every observation from the original dataset has the chance of appearing in training and test set, providing a robust estimate of model performance."
      },
      {
        "id": 22,
        "question": "How does a Random Forest algorithm work?",
        "options": [
          "By creating a single, very deep decision tree",
          "By building an ensemble of decision trees and merging their predictions",
          "By using neural networks to find random patterns",
          "By sorting data randomly before linear regression"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Random Forest operates by constructing a multitude of decision trees at training time and outputting the class that is the mode of the classes (classification) or mean prediction (regression) of the individual trees."
      },
      {
        "id": 23,
        "question": "What is Gradient Descent?",
        "options": [
          "An optimization algorithm used to minimize the cost function by iteratively moving in the direction of steepest descent",
          "A method to clean dirty data",
          "A type of neural network layer",
          "A metric for model accuracy"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Gradient descent is a first-order iterative optimization algorithm for finding a local minimum of a differentiable function."
      },
      {
        "id": 24,
        "question": "What does TF-IDF stand for in Natural Language Processing?",
        "options": [
          "True Frequency-Inverse Document Frequency",
          "Term Frequency-Inverse Document Frequency",
          "Text Format-Index Data Format",
          "Total Frequency-Initial Document Format"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "TF-IDF is a numerical statistic intended to reflect how important a word is to a document in a collection or corpus."
      },
      {
        "id": 25,
        "question": "What is a common technique to handle missing data in a dataset?",
        "options": [
          "Ignore the entire dataset",
          "Imputation (filling missing values with mean, median, mode, or using predictive models)",
          "Multiply missing values by zero",
          "Delete all columns"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Imputation replaces missing data with substituted values, preventing the loss of valuable data that would occur from simply dropping incomplete rows."
      },
      {
        "id": 26,
        "question": "Explain Backpropagation in Neural Networks.",
        "options": [
          "Forwarding inputs to the output layer",
          "The process of computing the gradient of the loss function with respect to the weights by applying the chain rule backwards",
          "A method to increase network latency",
          "Stopping training early"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Backpropagation calculates the gradient of a loss function with respect to all the weights in the network, efficiently using the chain rule."
      },
      {
        "id": 27,
        "question": "What is the Bias-Variance Tradeoff?",
        "options": [
          "The balance between a model's ability to minimize errors from erroneous assumptions (bias) and its sensitivity to small fluctuations in training data (variance)",
          "The tradeoff between training time and prediction time",
          "The choice between deep learning and classical ML",
          "The balance of positive and negative labels in data"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "High bias can cause an algorithm to miss relevant relations between features and target outputs (underfitting). High variance can cause an algorithm to model the random noise in the training data (overfitting)."
      },
      {
        "id": 28,
        "question": "How does a Support Vector Machine (SVM) work?",
        "options": [
          "It uses probabilistic trees",
          "It finds the hyperplane that maximizes the margin between different classes in a high-dimensional space",
          "It calculates the mean of nearest neighbors",
          "It strictly uses linear regression"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "SVM is a supervised machine learning model that uses classification algorithms for two-group classification problems by finding the optimal hyperplane."
      },
      {
        "id": 29,
        "question": "What is the Vanishing Gradient Problem?",
        "options": [
          "When gradients become too large and cause numerical overflow",
          "When gradients become exceedingly small as they propagate backward, preventing early layers from learning",
          "When the dataset disappears from memory",
          "When the loss function is zero"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "In deep neural networks, the vanishing gradient problem occurs when gradients approach zero during backpropagation, causing the weights of early layers to update very slowly or not at all."
      },
      {
        "id": 30,
        "question": "What is the primary goal of Principal Component Analysis (PCA)?",
        "options": [
          "To perform classification",
          "To increase the number of features",
          "Dimensionality reduction while preserving as much variance as possible",
          "To format text data"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "PCA is a statistical procedure that uses an orthogonal transformation to convert a set of observations of possibly correlated variables into a set of values of linearly uncorrelated variables called principal components."
      },
      {
        "id": 31,
        "question": "What is supervised learning?",
        "options": [
          "Training a model with unlabelled data",
          "Training a model on a labeled dataset where the correct answers are known",
          "Letting an agent learn by trial and error",
          "Writing rules manually using if/else"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Supervised learning involves training an algorithm using labeled data, meaning the input data is paired with the correct output."
      },
      {
        "id": 32,
        "question": "What is a pandas DataFrame in Python?",
        "options": [
          "A 1D array",
          "A 2D, size-mutable, potentially heterogeneous tabular data structure",
          "A machine learning algorithm",
          "A database connection object"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A DataFrame is a two-dimensional labeled data structure with columns of potentially different types, similar to a spreadsheet or SQL table."
      },
      {
        "id": 33,
        "question": "What is the difference between classification and regression?",
        "options": [
          "Classification predicts continuous values, regression predicts categories",
          "Classification is unsupervised, regression is supervised",
          "Classification predicts discrete categories, regression predicts continuous numerical values",
          "They are the exact same thing"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Classification is used to predict a discrete class label (e.g., spam or not spam), while regression is used to predict a continuous quantity (e.g., price)."
      },
      {
        "id": 34,
        "question": "What is overfitting in machine learning?",
        "options": [
          "When a model learns the training data too well, including the noise, and performs poorly on unseen data",
          "When a model is too simple to capture patterns",
          "When training takes too long",
          "When the dataset is too small"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "Overfitting occurs when a model is too complex and models the training data too closely, failing to generalize to new, unseen data."
      },
      {
        "id": 35,
        "question": "What does a confusion matrix evaluate?",
        "options": [
          "Training time",
          "The performance of a classification model",
          "The number of layers in a neural network",
          "Data preprocessing speed"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A confusion matrix is a table used to describe the performance of a classification model by showing true positives, true negatives, false positives, and false negatives."
      },
      {
        "id": 36,
        "question": "What is k-fold cross-validation?",
        "options": [
          "A way to increase dataset size",
          "A technique to evaluate a model by splitting data into k subsets, training on k-1 and testing on the remaining one",
          "A method for clustering data into k groups",
          "An optimization algorithm"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "K-fold cross-validation ensures that every observation from the original dataset has the chance of appearing in training and test set, providing a robust estimate of model performance."
      },
      {
        "id": 37,
        "question": "How does a Random Forest algorithm work?",
        "options": [
          "By creating a single, very deep decision tree",
          "By building an ensemble of decision trees and merging their predictions",
          "By using neural networks to find random patterns",
          "By sorting data randomly before linear regression"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Random Forest operates by constructing a multitude of decision trees at training time and outputting the class that is the mode of the classes (classification) or mean prediction (regression) of the individual trees."
      },
      {
        "id": 38,
        "question": "What is Gradient Descent?",
        "options": [
          "An optimization algorithm used to minimize the cost function by iteratively moving in the direction of steepest descent",
          "A method to clean dirty data",
          "A type of neural network layer",
          "A metric for model accuracy"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Gradient descent is a first-order iterative optimization algorithm for finding a local minimum of a differentiable function."
      },
      {
        "id": 39,
        "question": "What does TF-IDF stand for in Natural Language Processing?",
        "options": [
          "True Frequency-Inverse Document Frequency",
          "Term Frequency-Inverse Document Frequency",
          "Text Format-Index Data Format",
          "Total Frequency-Initial Document Format"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "TF-IDF is a numerical statistic intended to reflect how important a word is to a document in a collection or corpus."
      },
      {
        "id": 40,
        "question": "What is a common technique to handle missing data in a dataset?",
        "options": [
          "Ignore the entire dataset",
          "Imputation (filling missing values with mean, median, mode, or using predictive models)",
          "Multiply missing values by zero",
          "Delete all columns"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Imputation replaces missing data with substituted values, preventing the loss of valuable data that would occur from simply dropping incomplete rows."
      },
      {
        "id": 41,
        "question": "Explain Backpropagation in Neural Networks.",
        "options": [
          "Forwarding inputs to the output layer",
          "The process of computing the gradient of the loss function with respect to the weights by applying the chain rule backwards",
          "A method to increase network latency",
          "Stopping training early"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Backpropagation calculates the gradient of a loss function with respect to all the weights in the network, efficiently using the chain rule."
      },
      {
        "id": 42,
        "question": "What is the Bias-Variance Tradeoff?",
        "options": [
          "The balance between a model's ability to minimize errors from erroneous assumptions (bias) and its sensitivity to small fluctuations in training data (variance)",
          "The tradeoff between training time and prediction time",
          "The choice between deep learning and classical ML",
          "The balance of positive and negative labels in data"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "High bias can cause an algorithm to miss relevant relations between features and target outputs (underfitting). High variance can cause an algorithm to model the random noise in the training data (overfitting)."
      },
      {
        "id": 43,
        "question": "How does a Support Vector Machine (SVM) work?",
        "options": [
          "It uses probabilistic trees",
          "It finds the hyperplane that maximizes the margin between different classes in a high-dimensional space",
          "It calculates the mean of nearest neighbors",
          "It strictly uses linear regression"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "SVM is a supervised machine learning model that uses classification algorithms for two-group classification problems by finding the optimal hyperplane."
      },
      {
        "id": 44,
        "question": "What is the Vanishing Gradient Problem?",
        "options": [
          "When gradients become too large and cause numerical overflow",
          "When gradients become exceedingly small as they propagate backward, preventing early layers from learning",
          "When the dataset disappears from memory",
          "When the loss function is zero"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "In deep neural networks, the vanishing gradient problem occurs when gradients approach zero during backpropagation, causing the weights of early layers to update very slowly or not at all."
      },
      {
        "id": 45,
        "question": "What is the primary goal of Principal Component Analysis (PCA)?",
        "options": [
          "To perform classification",
          "To increase the number of features",
          "Dimensionality reduction while preserving as much variance as possible",
          "To format text data"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "PCA is a statistical procedure that uses an orthogonal transformation to convert a set of observations of possibly correlated variables into a set of values of linearly uncorrelated variables called principal components."
      },
      {
        "id": 46,
        "question": "What is supervised learning?",
        "options": [
          "Training a model with unlabelled data",
          "Training a model on a labeled dataset where the correct answers are known",
          "Letting an agent learn by trial and error",
          "Writing rules manually using if/else"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Supervised learning involves training an algorithm using labeled data, meaning the input data is paired with the correct output."
      },
      {
        "id": 47,
        "question": "What is a pandas DataFrame in Python?",
        "options": [
          "A 1D array",
          "A 2D, size-mutable, potentially heterogeneous tabular data structure",
          "A machine learning algorithm",
          "A database connection object"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A DataFrame is a two-dimensional labeled data structure with columns of potentially different types, similar to a spreadsheet or SQL table."
      },
      {
        "id": 48,
        "question": "What is the difference between classification and regression?",
        "options": [
          "Classification predicts continuous values, regression predicts categories",
          "Classification is unsupervised, regression is supervised",
          "Classification predicts discrete categories, regression predicts continuous numerical values",
          "They are the exact same thing"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Classification is used to predict a discrete class label (e.g., spam or not spam), while regression is used to predict a continuous quantity (e.g., price)."
      },
      {
        "id": 49,
        "question": "What is overfitting in machine learning?",
        "options": [
          "When a model learns the training data too well, including the noise, and performs poorly on unseen data",
          "When a model is too simple to capture patterns",
          "When training takes too long",
          "When the dataset is too small"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "Overfitting occurs when a model is too complex and models the training data too closely, failing to generalize to new, unseen data."
      },
      {
        "id": 50,
        "question": "What does a confusion matrix evaluate?",
        "options": [
          "Training time",
          "The performance of a classification model",
          "The number of layers in a neural network",
          "Data preprocessing speed"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A confusion matrix is a table used to describe the performance of a classification model by showing true positives, true negatives, false positives, and false negatives."
      },
      {
        "id": 51,
        "question": "What is k-fold cross-validation?",
        "options": [
          "A way to increase dataset size",
          "A technique to evaluate a model by splitting data into k subsets, training on k-1 and testing on the remaining one",
          "A method for clustering data into k groups",
          "An optimization algorithm"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "K-fold cross-validation ensures that every observation from the original dataset has the chance of appearing in training and test set, providing a robust estimate of model performance."
      },
      {
        "id": 52,
        "question": "How does a Random Forest algorithm work?",
        "options": [
          "By creating a single, very deep decision tree",
          "By building an ensemble of decision trees and merging their predictions",
          "By using neural networks to find random patterns",
          "By sorting data randomly before linear regression"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Random Forest operates by constructing a multitude of decision trees at training time and outputting the class that is the mode of the classes (classification) or mean prediction (regression) of the individual trees."
      },
      {
        "id": 53,
        "question": "What is Gradient Descent?",
        "options": [
          "An optimization algorithm used to minimize the cost function by iteratively moving in the direction of steepest descent",
          "A method to clean dirty data",
          "A type of neural network layer",
          "A metric for model accuracy"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Gradient descent is a first-order iterative optimization algorithm for finding a local minimum of a differentiable function."
      },
      {
        "id": 54,
        "question": "What does TF-IDF stand for in Natural Language Processing?",
        "options": [
          "True Frequency-Inverse Document Frequency",
          "Term Frequency-Inverse Document Frequency",
          "Text Format-Index Data Format",
          "Total Frequency-Initial Document Format"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "TF-IDF is a numerical statistic intended to reflect how important a word is to a document in a collection or corpus."
      },
      {
        "id": 55,
        "question": "What is a common technique to handle missing data in a dataset?",
        "options": [
          "Ignore the entire dataset",
          "Imputation (filling missing values with mean, median, mode, or using predictive models)",
          "Multiply missing values by zero",
          "Delete all columns"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Imputation replaces missing data with substituted values, preventing the loss of valuable data that would occur from simply dropping incomplete rows."
      },
      {
        "id": 56,
        "question": "Explain Backpropagation in Neural Networks.",
        "options": [
          "Forwarding inputs to the output layer",
          "The process of computing the gradient of the loss function with respect to the weights by applying the chain rule backwards",
          "A method to increase network latency",
          "Stopping training early"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Backpropagation calculates the gradient of a loss function with respect to all the weights in the network, efficiently using the chain rule."
      },
      {
        "id": 57,
        "question": "What is the Bias-Variance Tradeoff?",
        "options": [
          "The balance between a model's ability to minimize errors from erroneous assumptions (bias) and its sensitivity to small fluctuations in training data (variance)",
          "The tradeoff between training time and prediction time",
          "The choice between deep learning and classical ML",
          "The balance of positive and negative labels in data"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "High bias can cause an algorithm to miss relevant relations between features and target outputs (underfitting). High variance can cause an algorithm to model the random noise in the training data (overfitting)."
      },
      {
        "id": 58,
        "question": "How does a Support Vector Machine (SVM) work?",
        "options": [
          "It uses probabilistic trees",
          "It finds the hyperplane that maximizes the margin between different classes in a high-dimensional space",
          "It calculates the mean of nearest neighbors",
          "It strictly uses linear regression"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "SVM is a supervised machine learning model that uses classification algorithms for two-group classification problems by finding the optimal hyperplane."
      },
      {
        "id": 59,
        "question": "What is the Vanishing Gradient Problem?",
        "options": [
          "When gradients become too large and cause numerical overflow",
          "When gradients become exceedingly small as they propagate backward, preventing early layers from learning",
          "When the dataset disappears from memory",
          "When the loss function is zero"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "In deep neural networks, the vanishing gradient problem occurs when gradients approach zero during backpropagation, causing the weights of early layers to update very slowly or not at all."
      },
      {
        "id": 60,
        "question": "What is the primary goal of Principal Component Analysis (PCA)?",
        "options": [
          "To perform classification",
          "To increase the number of features",
          "Dimensionality reduction while preserving as much variance as possible",
          "To format text data"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "PCA is a statistical procedure that uses an orthogonal transformation to convert a set of observations of possibly correlated variables into a set of values of linearly uncorrelated variables called principal components."
      },
      {
        "id": 61,
        "question": "What is supervised learning?",
        "options": [
          "Training a model with unlabelled data",
          "Training a model on a labeled dataset where the correct answers are known",
          "Letting an agent learn by trial and error",
          "Writing rules manually using if/else"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Supervised learning involves training an algorithm using labeled data, meaning the input data is paired with the correct output."
      },
      {
        "id": 62,
        "question": "What is a pandas DataFrame in Python?",
        "options": [
          "A 1D array",
          "A 2D, size-mutable, potentially heterogeneous tabular data structure",
          "A machine learning algorithm",
          "A database connection object"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A DataFrame is a two-dimensional labeled data structure with columns of potentially different types, similar to a spreadsheet or SQL table."
      },
      {
        "id": 63,
        "question": "What is the difference between classification and regression?",
        "options": [
          "Classification predicts continuous values, regression predicts categories",
          "Classification is unsupervised, regression is supervised",
          "Classification predicts discrete categories, regression predicts continuous numerical values",
          "They are the exact same thing"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Classification is used to predict a discrete class label (e.g., spam or not spam), while regression is used to predict a continuous quantity (e.g., price)."
      },
      {
        "id": 64,
        "question": "What is overfitting in machine learning?",
        "options": [
          "When a model learns the training data too well, including the noise, and performs poorly on unseen data",
          "When a model is too simple to capture patterns",
          "When training takes too long",
          "When the dataset is too small"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "Overfitting occurs when a model is too complex and models the training data too closely, failing to generalize to new, unseen data."
      },
      {
        "id": 65,
        "question": "What does a confusion matrix evaluate?",
        "options": [
          "Training time",
          "The performance of a classification model",
          "The number of layers in a neural network",
          "Data preprocessing speed"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A confusion matrix is a table used to describe the performance of a classification model by showing true positives, true negatives, false positives, and false negatives."
      },
      {
        "id": 66,
        "question": "What is k-fold cross-validation?",
        "options": [
          "A way to increase dataset size",
          "A technique to evaluate a model by splitting data into k subsets, training on k-1 and testing on the remaining one",
          "A method for clustering data into k groups",
          "An optimization algorithm"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "K-fold cross-validation ensures that every observation from the original dataset has the chance of appearing in training and test set, providing a robust estimate of model performance."
      },
      {
        "id": 67,
        "question": "How does a Random Forest algorithm work?",
        "options": [
          "By creating a single, very deep decision tree",
          "By building an ensemble of decision trees and merging their predictions",
          "By using neural networks to find random patterns",
          "By sorting data randomly before linear regression"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Random Forest operates by constructing a multitude of decision trees at training time and outputting the class that is the mode of the classes (classification) or mean prediction (regression) of the individual trees."
      },
      {
        "id": 68,
        "question": "What is Gradient Descent?",
        "options": [
          "An optimization algorithm used to minimize the cost function by iteratively moving in the direction of steepest descent",
          "A method to clean dirty data",
          "A type of neural network layer",
          "A metric for model accuracy"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Gradient descent is a first-order iterative optimization algorithm for finding a local minimum of a differentiable function."
      },
      {
        "id": 69,
        "question": "What does TF-IDF stand for in Natural Language Processing?",
        "options": [
          "True Frequency-Inverse Document Frequency",
          "Term Frequency-Inverse Document Frequency",
          "Text Format-Index Data Format",
          "Total Frequency-Initial Document Format"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "TF-IDF is a numerical statistic intended to reflect how important a word is to a document in a collection or corpus."
      },
      {
        "id": 70,
        "question": "What is a common technique to handle missing data in a dataset?",
        "options": [
          "Ignore the entire dataset",
          "Imputation (filling missing values with mean, median, mode, or using predictive models)",
          "Multiply missing values by zero",
          "Delete all columns"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Imputation replaces missing data with substituted values, preventing the loss of valuable data that would occur from simply dropping incomplete rows."
      },
      {
        "id": 71,
        "question": "Explain Backpropagation in Neural Networks.",
        "options": [
          "Forwarding inputs to the output layer",
          "The process of computing the gradient of the loss function with respect to the weights by applying the chain rule backwards",
          "A method to increase network latency",
          "Stopping training early"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Backpropagation calculates the gradient of a loss function with respect to all the weights in the network, efficiently using the chain rule."
      },
      {
        "id": 72,
        "question": "What is the Bias-Variance Tradeoff?",
        "options": [
          "The balance between a model's ability to minimize errors from erroneous assumptions (bias) and its sensitivity to small fluctuations in training data (variance)",
          "The tradeoff between training time and prediction time",
          "The choice between deep learning and classical ML",
          "The balance of positive and negative labels in data"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "High bias can cause an algorithm to miss relevant relations between features and target outputs (underfitting). High variance can cause an algorithm to model the random noise in the training data (overfitting)."
      },
      {
        "id": 73,
        "question": "How does a Support Vector Machine (SVM) work?",
        "options": [
          "It uses probabilistic trees",
          "It finds the hyperplane that maximizes the margin between different classes in a high-dimensional space",
          "It calculates the mean of nearest neighbors",
          "It strictly uses linear regression"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "SVM is a supervised machine learning model that uses classification algorithms for two-group classification problems by finding the optimal hyperplane."
      },
      {
        "id": 74,
        "question": "What is the Vanishing Gradient Problem?",
        "options": [
          "When gradients become too large and cause numerical overflow",
          "When gradients become exceedingly small as they propagate backward, preventing early layers from learning",
          "When the dataset disappears from memory",
          "When the loss function is zero"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "In deep neural networks, the vanishing gradient problem occurs when gradients approach zero during backpropagation, causing the weights of early layers to update very slowly or not at all."
      },
      {
        "id": 75,
        "question": "What is the primary goal of Principal Component Analysis (PCA)?",
        "options": [
          "To perform classification",
          "To increase the number of features",
          "Dimensionality reduction while preserving as much variance as possible",
          "To format text data"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "PCA is a statistical procedure that uses an orthogonal transformation to convert a set of observations of possibly correlated variables into a set of values of linearly uncorrelated variables called principal components."
      },
      {
        "id": 76,
        "question": "What is supervised learning?",
        "options": [
          "Training a model with unlabelled data",
          "Training a model on a labeled dataset where the correct answers are known",
          "Letting an agent learn by trial and error",
          "Writing rules manually using if/else"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Supervised learning involves training an algorithm using labeled data, meaning the input data is paired with the correct output."
      },
      {
        "id": 77,
        "question": "What is a pandas DataFrame in Python?",
        "options": [
          "A 1D array",
          "A 2D, size-mutable, potentially heterogeneous tabular data structure",
          "A machine learning algorithm",
          "A database connection object"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A DataFrame is a two-dimensional labeled data structure with columns of potentially different types, similar to a spreadsheet or SQL table."
      },
      {
        "id": 78,
        "question": "What is the difference between classification and regression?",
        "options": [
          "Classification predicts continuous values, regression predicts categories",
          "Classification is unsupervised, regression is supervised",
          "Classification predicts discrete categories, regression predicts continuous numerical values",
          "They are the exact same thing"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Classification is used to predict a discrete class label (e.g., spam or not spam), while regression is used to predict a continuous quantity (e.g., price)."
      },
      {
        "id": 79,
        "question": "What is overfitting in machine learning?",
        "options": [
          "When a model learns the training data too well, including the noise, and performs poorly on unseen data",
          "When a model is too simple to capture patterns",
          "When training takes too long",
          "When the dataset is too small"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "Overfitting occurs when a model is too complex and models the training data too closely, failing to generalize to new, unseen data."
      },
      {
        "id": 80,
        "question": "What does a confusion matrix evaluate?",
        "options": [
          "Training time",
          "The performance of a classification model",
          "The number of layers in a neural network",
          "Data preprocessing speed"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A confusion matrix is a table used to describe the performance of a classification model by showing true positives, true negatives, false positives, and false negatives."
      },
      {
        "id": 81,
        "question": "What is k-fold cross-validation?",
        "options": [
          "A way to increase dataset size",
          "A technique to evaluate a model by splitting data into k subsets, training on k-1 and testing on the remaining one",
          "A method for clustering data into k groups",
          "An optimization algorithm"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "K-fold cross-validation ensures that every observation from the original dataset has the chance of appearing in training and test set, providing a robust estimate of model performance."
      },
      {
        "id": 82,
        "question": "How does a Random Forest algorithm work?",
        "options": [
          "By creating a single, very deep decision tree",
          "By building an ensemble of decision trees and merging their predictions",
          "By using neural networks to find random patterns",
          "By sorting data randomly before linear regression"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Random Forest operates by constructing a multitude of decision trees at training time and outputting the class that is the mode of the classes (classification) or mean prediction (regression) of the individual trees."
      },
      {
        "id": 83,
        "question": "What is Gradient Descent?",
        "options": [
          "An optimization algorithm used to minimize the cost function by iteratively moving in the direction of steepest descent",
          "A method to clean dirty data",
          "A type of neural network layer",
          "A metric for model accuracy"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Gradient descent is a first-order iterative optimization algorithm for finding a local minimum of a differentiable function."
      },
      {
        "id": 84,
        "question": "What does TF-IDF stand for in Natural Language Processing?",
        "options": [
          "True Frequency-Inverse Document Frequency",
          "Term Frequency-Inverse Document Frequency",
          "Text Format-Index Data Format",
          "Total Frequency-Initial Document Format"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "TF-IDF is a numerical statistic intended to reflect how important a word is to a document in a collection or corpus."
      },
      {
        "id": 85,
        "question": "What is a common technique to handle missing data in a dataset?",
        "options": [
          "Ignore the entire dataset",
          "Imputation (filling missing values with mean, median, mode, or using predictive models)",
          "Multiply missing values by zero",
          "Delete all columns"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Imputation replaces missing data with substituted values, preventing the loss of valuable data that would occur from simply dropping incomplete rows."
      },
      {
        "id": 86,
        "question": "Explain Backpropagation in Neural Networks.",
        "options": [
          "Forwarding inputs to the output layer",
          "The process of computing the gradient of the loss function with respect to the weights by applying the chain rule backwards",
          "A method to increase network latency",
          "Stopping training early"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Backpropagation calculates the gradient of a loss function with respect to all the weights in the network, efficiently using the chain rule."
      },
      {
        "id": 87,
        "question": "What is the Bias-Variance Tradeoff?",
        "options": [
          "The balance between a model's ability to minimize errors from erroneous assumptions (bias) and its sensitivity to small fluctuations in training data (variance)",
          "The tradeoff between training time and prediction time",
          "The choice between deep learning and classical ML",
          "The balance of positive and negative labels in data"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "High bias can cause an algorithm to miss relevant relations between features and target outputs (underfitting). High variance can cause an algorithm to model the random noise in the training data (overfitting)."
      },
      {
        "id": 88,
        "question": "How does a Support Vector Machine (SVM) work?",
        "options": [
          "It uses probabilistic trees",
          "It finds the hyperplane that maximizes the margin between different classes in a high-dimensional space",
          "It calculates the mean of nearest neighbors",
          "It strictly uses linear regression"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "SVM is a supervised machine learning model that uses classification algorithms for two-group classification problems by finding the optimal hyperplane."
      },
      {
        "id": 89,
        "question": "What is the Vanishing Gradient Problem?",
        "options": [
          "When gradients become too large and cause numerical overflow",
          "When gradients become exceedingly small as they propagate backward, preventing early layers from learning",
          "When the dataset disappears from memory",
          "When the loss function is zero"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "In deep neural networks, the vanishing gradient problem occurs when gradients approach zero during backpropagation, causing the weights of early layers to update very slowly or not at all."
      },
      {
        "id": 90,
        "question": "What is the primary goal of Principal Component Analysis (PCA)?",
        "options": [
          "To perform classification",
          "To increase the number of features",
          "Dimensionality reduction while preserving as much variance as possible",
          "To format text data"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "PCA is a statistical procedure that uses an orthogonal transformation to convert a set of observations of possibly correlated variables into a set of values of linearly uncorrelated variables called principal components."
      },
      {
        "id": 91,
        "question": "What is supervised learning?",
        "options": [
          "Training a model with unlabelled data",
          "Training a model on a labeled dataset where the correct answers are known",
          "Letting an agent learn by trial and error",
          "Writing rules manually using if/else"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Supervised learning involves training an algorithm using labeled data, meaning the input data is paired with the correct output."
      },
      {
        "id": 92,
        "question": "What is a pandas DataFrame in Python?",
        "options": [
          "A 1D array",
          "A 2D, size-mutable, potentially heterogeneous tabular data structure",
          "A machine learning algorithm",
          "A database connection object"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A DataFrame is a two-dimensional labeled data structure with columns of potentially different types, similar to a spreadsheet or SQL table."
      },
      {
        "id": 93,
        "question": "What is the difference between classification and regression?",
        "options": [
          "Classification predicts continuous values, regression predicts categories",
          "Classification is unsupervised, regression is supervised",
          "Classification predicts discrete categories, regression predicts continuous numerical values",
          "They are the exact same thing"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Classification is used to predict a discrete class label (e.g., spam or not spam), while regression is used to predict a continuous quantity (e.g., price)."
      },
      {
        "id": 94,
        "question": "What is overfitting in machine learning?",
        "options": [
          "When a model learns the training data too well, including the noise, and performs poorly on unseen data",
          "When a model is too simple to capture patterns",
          "When training takes too long",
          "When the dataset is too small"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "Overfitting occurs when a model is too complex and models the training data too closely, failing to generalize to new, unseen data."
      },
      {
        "id": 95,
        "question": "What does a confusion matrix evaluate?",
        "options": [
          "Training time",
          "The performance of a classification model",
          "The number of layers in a neural network",
          "Data preprocessing speed"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A confusion matrix is a table used to describe the performance of a classification model by showing true positives, true negatives, false positives, and false negatives."
      },
      {
        "id": 96,
        "question": "What is k-fold cross-validation?",
        "options": [
          "A way to increase dataset size",
          "A technique to evaluate a model by splitting data into k subsets, training on k-1 and testing on the remaining one",
          "A method for clustering data into k groups",
          "An optimization algorithm"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "K-fold cross-validation ensures that every observation from the original dataset has the chance of appearing in training and test set, providing a robust estimate of model performance."
      },
      {
        "id": 97,
        "question": "How does a Random Forest algorithm work?",
        "options": [
          "By creating a single, very deep decision tree",
          "By building an ensemble of decision trees and merging their predictions",
          "By using neural networks to find random patterns",
          "By sorting data randomly before linear regression"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Random Forest operates by constructing a multitude of decision trees at training time and outputting the class that is the mode of the classes (classification) or mean prediction (regression) of the individual trees."
      },
      {
        "id": 98,
        "question": "What is Gradient Descent?",
        "options": [
          "An optimization algorithm used to minimize the cost function by iteratively moving in the direction of steepest descent",
          "A method to clean dirty data",
          "A type of neural network layer",
          "A metric for model accuracy"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Gradient descent is a first-order iterative optimization algorithm for finding a local minimum of a differentiable function."
      },
      {
        "id": 99,
        "question": "What does TF-IDF stand for in Natural Language Processing?",
        "options": [
          "True Frequency-Inverse Document Frequency",
          "Term Frequency-Inverse Document Frequency",
          "Text Format-Index Data Format",
          "Total Frequency-Initial Document Format"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "TF-IDF is a numerical statistic intended to reflect how important a word is to a document in a collection or corpus."
      },
      {
        "id": 100,
        "question": "What is a common technique to handle missing data in a dataset?",
        "options": [
          "Ignore the entire dataset",
          "Imputation (filling missing values with mean, median, mode, or using predictive models)",
          "Multiply missing values by zero",
          "Delete all columns"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Imputation replaces missing data with substituted values, preventing the loss of valuable data that would occur from simply dropping incomplete rows."
      },
      {
        "id": 101,
        "question": "Explain Backpropagation in Neural Networks.",
        "options": [
          "Forwarding inputs to the output layer",
          "The process of computing the gradient of the loss function with respect to the weights by applying the chain rule backwards",
          "A method to increase network latency",
          "Stopping training early"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Backpropagation calculates the gradient of a loss function with respect to all the weights in the network, efficiently using the chain rule."
      },
      {
        "id": 102,
        "question": "What is the Bias-Variance Tradeoff?",
        "options": [
          "The balance between a model's ability to minimize errors from erroneous assumptions (bias) and its sensitivity to small fluctuations in training data (variance)",
          "The tradeoff between training time and prediction time",
          "The choice between deep learning and classical ML",
          "The balance of positive and negative labels in data"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "High bias can cause an algorithm to miss relevant relations between features and target outputs (underfitting). High variance can cause an algorithm to model the random noise in the training data (overfitting)."
      },
      {
        "id": 103,
        "question": "How does a Support Vector Machine (SVM) work?",
        "options": [
          "It uses probabilistic trees",
          "It finds the hyperplane that maximizes the margin between different classes in a high-dimensional space",
          "It calculates the mean of nearest neighbors",
          "It strictly uses linear regression"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "SVM is a supervised machine learning model that uses classification algorithms for two-group classification problems by finding the optimal hyperplane."
      },
      {
        "id": 104,
        "question": "What is the Vanishing Gradient Problem?",
        "options": [
          "When gradients become too large and cause numerical overflow",
          "When gradients become exceedingly small as they propagate backward, preventing early layers from learning",
          "When the dataset disappears from memory",
          "When the loss function is zero"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "In deep neural networks, the vanishing gradient problem occurs when gradients approach zero during backpropagation, causing the weights of early layers to update very slowly or not at all."
      },
      {
        "id": 105,
        "question": "What is the primary goal of Principal Component Analysis (PCA)?",
        "options": [
          "To perform classification",
          "To increase the number of features",
          "Dimensionality reduction while preserving as much variance as possible",
          "To format text data"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "PCA is a statistical procedure that uses an orthogonal transformation to convert a set of observations of possibly correlated variables into a set of values of linearly uncorrelated variables called principal components."
      },
      {
        "id": 106,
        "question": "What is supervised learning?",
        "options": [
          "Training a model with unlabelled data",
          "Training a model on a labeled dataset where the correct answers are known",
          "Letting an agent learn by trial and error",
          "Writing rules manually using if/else"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Supervised learning involves training an algorithm using labeled data, meaning the input data is paired with the correct output."
      },
      {
        "id": 107,
        "question": "What is a pandas DataFrame in Python?",
        "options": [
          "A 1D array",
          "A 2D, size-mutable, potentially heterogeneous tabular data structure",
          "A machine learning algorithm",
          "A database connection object"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A DataFrame is a two-dimensional labeled data structure with columns of potentially different types, similar to a spreadsheet or SQL table."
      },
      {
        "id": 108,
        "question": "What is the difference between classification and regression?",
        "options": [
          "Classification predicts continuous values, regression predicts categories",
          "Classification is unsupervised, regression is supervised",
          "Classification predicts discrete categories, regression predicts continuous numerical values",
          "They are the exact same thing"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Classification is used to predict a discrete class label (e.g., spam or not spam), while regression is used to predict a continuous quantity (e.g., price)."
      },
      {
        "id": 109,
        "question": "What is overfitting in machine learning?",
        "options": [
          "When a model learns the training data too well, including the noise, and performs poorly on unseen data",
          "When a model is too simple to capture patterns",
          "When training takes too long",
          "When the dataset is too small"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "Overfitting occurs when a model is too complex and models the training data too closely, failing to generalize to new, unseen data."
      },
      {
        "id": 110,
        "question": "What does a confusion matrix evaluate?",
        "options": [
          "Training time",
          "The performance of a classification model",
          "The number of layers in a neural network",
          "Data preprocessing speed"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A confusion matrix is a table used to describe the performance of a classification model by showing true positives, true negatives, false positives, and false negatives."
      },
      {
        "id": 111,
        "question": "What is k-fold cross-validation?",
        "options": [
          "A way to increase dataset size",
          "A technique to evaluate a model by splitting data into k subsets, training on k-1 and testing on the remaining one",
          "A method for clustering data into k groups",
          "An optimization algorithm"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "K-fold cross-validation ensures that every observation from the original dataset has the chance of appearing in training and test set, providing a robust estimate of model performance."
      },
      {
        "id": 112,
        "question": "How does a Random Forest algorithm work?",
        "options": [
          "By creating a single, very deep decision tree",
          "By building an ensemble of decision trees and merging their predictions",
          "By using neural networks to find random patterns",
          "By sorting data randomly before linear regression"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Random Forest operates by constructing a multitude of decision trees at training time and outputting the class that is the mode of the classes (classification) or mean prediction (regression) of the individual trees."
      },
      {
        "id": 113,
        "question": "What is Gradient Descent?",
        "options": [
          "An optimization algorithm used to minimize the cost function by iteratively moving in the direction of steepest descent",
          "A method to clean dirty data",
          "A type of neural network layer",
          "A metric for model accuracy"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Gradient descent is a first-order iterative optimization algorithm for finding a local minimum of a differentiable function."
      },
      {
        "id": 114,
        "question": "What does TF-IDF stand for in Natural Language Processing?",
        "options": [
          "True Frequency-Inverse Document Frequency",
          "Term Frequency-Inverse Document Frequency",
          "Text Format-Index Data Format",
          "Total Frequency-Initial Document Format"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "TF-IDF is a numerical statistic intended to reflect how important a word is to a document in a collection or corpus."
      },
      {
        "id": 115,
        "question": "What is a common technique to handle missing data in a dataset?",
        "options": [
          "Ignore the entire dataset",
          "Imputation (filling missing values with mean, median, mode, or using predictive models)",
          "Multiply missing values by zero",
          "Delete all columns"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Imputation replaces missing data with substituted values, preventing the loss of valuable data that would occur from simply dropping incomplete rows."
      },
      {
        "id": 116,
        "question": "Explain Backpropagation in Neural Networks.",
        "options": [
          "Forwarding inputs to the output layer",
          "The process of computing the gradient of the loss function with respect to the weights by applying the chain rule backwards",
          "A method to increase network latency",
          "Stopping training early"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Backpropagation calculates the gradient of a loss function with respect to all the weights in the network, efficiently using the chain rule."
      },
      {
        "id": 117,
        "question": "What is the Bias-Variance Tradeoff?",
        "options": [
          "The balance between a model's ability to minimize errors from erroneous assumptions (bias) and its sensitivity to small fluctuations in training data (variance)",
          "The tradeoff between training time and prediction time",
          "The choice between deep learning and classical ML",
          "The balance of positive and negative labels in data"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "High bias can cause an algorithm to miss relevant relations between features and target outputs (underfitting). High variance can cause an algorithm to model the random noise in the training data (overfitting)."
      },
      {
        "id": 118,
        "question": "How does a Support Vector Machine (SVM) work?",
        "options": [
          "It uses probabilistic trees",
          "It finds the hyperplane that maximizes the margin between different classes in a high-dimensional space",
          "It calculates the mean of nearest neighbors",
          "It strictly uses linear regression"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "SVM is a supervised machine learning model that uses classification algorithms for two-group classification problems by finding the optimal hyperplane."
      },
      {
        "id": 119,
        "question": "What is the Vanishing Gradient Problem?",
        "options": [
          "When gradients become too large and cause numerical overflow",
          "When gradients become exceedingly small as they propagate backward, preventing early layers from learning",
          "When the dataset disappears from memory",
          "When the loss function is zero"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "In deep neural networks, the vanishing gradient problem occurs when gradients approach zero during backpropagation, causing the weights of early layers to update very slowly or not at all."
      },
      {
        "id": 120,
        "question": "What is the primary goal of Principal Component Analysis (PCA)?",
        "options": [
          "To perform classification",
          "To increase the number of features",
          "Dimensionality reduction while preserving as much variance as possible",
          "To format text data"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "PCA is a statistical procedure that uses an orthogonal transformation to convert a set of observations of possibly correlated variables into a set of values of linearly uncorrelated variables called principal components."
      }
    ]
  },
  {
    "id": 5,
    "title": "Cybersecurity Fundamentals",
    "category": "Security",
    "difficulty": "All Levels",
    "duration": 60,
    "badge": "🛡️",
    "color": "from-slate-600 to-gray-900",
    "skills": [
      "Networking",
      "Cryptography",
      "Ethical Hacking",
      "Threat Modeling"
    ],
    "avgScore": 81,
    "attempts": 1500,
    "description": "An assessment to test your knowledge of how to protect digital assets against modern cyber threats.",
    "questions": [
      {
        "id": 1,
        "question": "What is Phishing?",
        "options": [
          "A type of firewall",
          "A social engineering attack used to steal user data like login credentials",
          "A secure networking protocol",
          "An antivirus software"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Phishing is a fraudulent attempt, usually made through email, to steal your personal information."
      },
      {
        "id": 2,
        "question": "What does HTTPS stand for?",
        "options": [
          "HyperText Transfer Protocol Secure",
          "HyperText Transmission Process System",
          "High Transfer Technology Protocol Secure",
          "Hyper Transfer Text Protocol Standard"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "HTTPS is an extension of HTTP used for secure communication over a computer network, widely used on the Internet."
      },
      {
        "id": 3,
        "question": "What is the general term for malicious software?",
        "options": [
          "Freeware",
          "Shareware",
          "Malware",
          "Firmware"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Malware is an umbrella term for any malicious software designed to cause damage to a computer, server, client, or computer network."
      },
      {
        "id": 4,
        "question": "What is the primary function of a network firewall?",
        "options": [
          "To speed up internet connection",
          "To monitor and control incoming and outgoing network traffic based on predetermined security rules",
          "To encrypt hard drives",
          "To backup data"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A firewall establishes a barrier between a trusted network and an untrusted network, such as the Internet."
      },
      {
        "id": 5,
        "question": "What is Two-Factor Authentication (2FA)?",
        "options": [
          "Using two passwords",
          "A security process in which users provide two different authentication factors to verify themselves",
          "Logging in from two different devices simultaneously",
          "A protocol for double encryption"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "2FA adds an extra layer of security by requiring not only a password and username but also something that only the user has on them."
      },
      {
        "id": 6,
        "question": "What is Cross-Site Scripting (XSS)?",
        "options": [
          "An attack that injects malicious executable scripts into trusted websites",
          "A method to style web pages across different domains",
          "A secure way to share data between servers",
          "A SQL database vulnerability"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "XSS allows an attacker to execute malicious scripts in the victim's browser, often leading to session hijacking or data theft."
      },
      {
        "id": 7,
        "question": "What is SQL Injection?",
        "options": [
          "Optimizing SQL queries",
          "A code injection technique used to attack data-driven applications by inserting malicious SQL statements into entry fields",
          "A method to backup databases",
          "A new SQL standard"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "SQL injection is a web security vulnerability that allows an attacker to interfere with the queries that an application makes to its database."
      },
      {
        "id": 8,
        "question": "What is the difference between symmetric and asymmetric encryption?",
        "options": [
          "Symmetric uses the same key for encryption/decryption; Asymmetric uses a public key for encryption and private key for decryption",
          "Symmetric is used for web traffic, asymmetric for databases",
          "Asymmetric uses the same key, symmetric uses two keys",
          "Symmetric is always faster and more secure"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Symmetric encryption uses one key, making it faster but harder to share securely. Asymmetric uses a mathematically linked key pair."
      },
      {
        "id": 9,
        "question": "What is a Distributed Denial of Service (DDoS) attack?",
        "options": [
          "A virus that deletes files",
          "A malicious attempt to disrupt normal traffic of a targeted server, service or network by overwhelming the target with a flood of Internet traffic",
          "A technique to steal passwords via brute force",
          "A man-in-the-middle attack"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "DDoS attacks achieve effectiveness by utilizing multiple compromised computer systems as sources of attack traffic."
      },
      {
        "id": 10,
        "question": "What is Penetration Testing (Pen Testing)?",
        "options": [
          "Installing antivirus software",
          "An authorized simulated cyberattack on a computer system performed to evaluate its security",
          "Writing secure code",
          "Testing physical building security"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Pen testing involves ethical hackers mimicking the strategies and actions of an attacker to identify security vulnerabilities."
      },
      {
        "id": 11,
        "question": "Which OSI model layer is responsible for encryption and decryption, and where SSL/TLS operates conceptually?",
        "options": [
          "Network Layer",
          "Transport Layer",
          "Presentation Layer",
          "Data Link Layer"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "While TLS is often said to operate at the Transport layer, conceptually encryption and formatting are functions of the Presentation layer in the OSI model."
      },
      {
        "id": 12,
        "question": "How does RSA encryption fundamentally work?",
        "options": [
          "Using complex hash functions",
          "Relying on the practical difficulty of factoring the product of two large prime numbers",
          "Using symmetric block ciphers",
          "Utilizing elliptic curve geometry"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The security of RSA relies on the fact that while it is easy to multiply two large prime numbers together, it is computationally infeasible to factor the product back into the primes."
      },
      {
        "id": 13,
        "question": "What is a Buffer Overflow attack?",
        "options": [
          "Overloading a server with HTTP requests",
          "An anomaly where a program writes data to a buffer and overruns the boundary, overwriting adjacent memory locations",
          "Flooding a network switch with MAC addresses",
          "A database query that returns too many results"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Buffer overflows can trigger system crashes or create entry points for attackers to execute arbitrary code by manipulating memory."
      },
      {
        "id": 14,
        "question": "What is the core principle of Zero Trust Architecture?",
        "options": [
          "Trust local networks, verify external ones",
          "Never trust, always verify (assuming the network is always hostile)",
          "Use VPNs for everything",
          "Eliminate all passwords"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Zero Trust is a security model that requires strict identity verification for every person and device trying to access resources on a private network, regardless of whether they are sitting within or outside of the network perimeter."
      },
      {
        "id": 15,
        "question": "What is Cross-Site Request Forgery (CSRF) and how is it primarily prevented?",
        "options": [
          "An attack forcing a user to execute unwanted actions; prevented by Anti-CSRF tokens",
          "An attack stealing cookies; prevented by HTTPS",
          "A database attack; prevented by prepared statements",
          "A network attack; prevented by firewalls"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "CSRF tricks the victim into submitting a malicious request. It is commonly prevented by including unpredictable challenge tokens in requests."
      },
      {
        "id": 16,
        "question": "What is Phishing?",
        "options": [
          "A type of firewall",
          "A social engineering attack used to steal user data like login credentials",
          "A secure networking protocol",
          "An antivirus software"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Phishing is a fraudulent attempt, usually made through email, to steal your personal information."
      },
      {
        "id": 17,
        "question": "What does HTTPS stand for?",
        "options": [
          "HyperText Transfer Protocol Secure",
          "HyperText Transmission Process System",
          "High Transfer Technology Protocol Secure",
          "Hyper Transfer Text Protocol Standard"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "HTTPS is an extension of HTTP used for secure communication over a computer network, widely used on the Internet."
      },
      {
        "id": 18,
        "question": "What is the general term for malicious software?",
        "options": [
          "Freeware",
          "Shareware",
          "Malware",
          "Firmware"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Malware is an umbrella term for any malicious software designed to cause damage to a computer, server, client, or computer network."
      },
      {
        "id": 19,
        "question": "What is the primary function of a network firewall?",
        "options": [
          "To speed up internet connection",
          "To monitor and control incoming and outgoing network traffic based on predetermined security rules",
          "To encrypt hard drives",
          "To backup data"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A firewall establishes a barrier between a trusted network and an untrusted network, such as the Internet."
      },
      {
        "id": 20,
        "question": "What is Two-Factor Authentication (2FA)?",
        "options": [
          "Using two passwords",
          "A security process in which users provide two different authentication factors to verify themselves",
          "Logging in from two different devices simultaneously",
          "A protocol for double encryption"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "2FA adds an extra layer of security by requiring not only a password and username but also something that only the user has on them."
      },
      {
        "id": 21,
        "question": "What is Cross-Site Scripting (XSS)?",
        "options": [
          "An attack that injects malicious executable scripts into trusted websites",
          "A method to style web pages across different domains",
          "A secure way to share data between servers",
          "A SQL database vulnerability"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "XSS allows an attacker to execute malicious scripts in the victim's browser, often leading to session hijacking or data theft."
      },
      {
        "id": 22,
        "question": "What is SQL Injection?",
        "options": [
          "Optimizing SQL queries",
          "A code injection technique used to attack data-driven applications by inserting malicious SQL statements into entry fields",
          "A method to backup databases",
          "A new SQL standard"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "SQL injection is a web security vulnerability that allows an attacker to interfere with the queries that an application makes to its database."
      },
      {
        "id": 23,
        "question": "What is the difference between symmetric and asymmetric encryption?",
        "options": [
          "Symmetric uses the same key for encryption/decryption; Asymmetric uses a public key for encryption and private key for decryption",
          "Symmetric is used for web traffic, asymmetric for databases",
          "Asymmetric uses the same key, symmetric uses two keys",
          "Symmetric is always faster and more secure"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Symmetric encryption uses one key, making it faster but harder to share securely. Asymmetric uses a mathematically linked key pair."
      },
      {
        "id": 24,
        "question": "What is a Distributed Denial of Service (DDoS) attack?",
        "options": [
          "A virus that deletes files",
          "A malicious attempt to disrupt normal traffic of a targeted server, service or network by overwhelming the target with a flood of Internet traffic",
          "A technique to steal passwords via brute force",
          "A man-in-the-middle attack"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "DDoS attacks achieve effectiveness by utilizing multiple compromised computer systems as sources of attack traffic."
      },
      {
        "id": 25,
        "question": "What is Penetration Testing (Pen Testing)?",
        "options": [
          "Installing antivirus software",
          "An authorized simulated cyberattack on a computer system performed to evaluate its security",
          "Writing secure code",
          "Testing physical building security"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Pen testing involves ethical hackers mimicking the strategies and actions of an attacker to identify security vulnerabilities."
      },
      {
        "id": 26,
        "question": "Which OSI model layer is responsible for encryption and decryption, and where SSL/TLS operates conceptually?",
        "options": [
          "Network Layer",
          "Transport Layer",
          "Presentation Layer",
          "Data Link Layer"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "While TLS is often said to operate at the Transport layer, conceptually encryption and formatting are functions of the Presentation layer in the OSI model."
      },
      {
        "id": 27,
        "question": "How does RSA encryption fundamentally work?",
        "options": [
          "Using complex hash functions",
          "Relying on the practical difficulty of factoring the product of two large prime numbers",
          "Using symmetric block ciphers",
          "Utilizing elliptic curve geometry"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The security of RSA relies on the fact that while it is easy to multiply two large prime numbers together, it is computationally infeasible to factor the product back into the primes."
      },
      {
        "id": 28,
        "question": "What is a Buffer Overflow attack?",
        "options": [
          "Overloading a server with HTTP requests",
          "An anomaly where a program writes data to a buffer and overruns the boundary, overwriting adjacent memory locations",
          "Flooding a network switch with MAC addresses",
          "A database query that returns too many results"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Buffer overflows can trigger system crashes or create entry points for attackers to execute arbitrary code by manipulating memory."
      },
      {
        "id": 29,
        "question": "What is the core principle of Zero Trust Architecture?",
        "options": [
          "Trust local networks, verify external ones",
          "Never trust, always verify (assuming the network is always hostile)",
          "Use VPNs for everything",
          "Eliminate all passwords"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Zero Trust is a security model that requires strict identity verification for every person and device trying to access resources on a private network, regardless of whether they are sitting within or outside of the network perimeter."
      },
      {
        "id": 30,
        "question": "What is Cross-Site Request Forgery (CSRF) and how is it primarily prevented?",
        "options": [
          "An attack forcing a user to execute unwanted actions; prevented by Anti-CSRF tokens",
          "An attack stealing cookies; prevented by HTTPS",
          "A database attack; prevented by prepared statements",
          "A network attack; prevented by firewalls"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "CSRF tricks the victim into submitting a malicious request. It is commonly prevented by including unpredictable challenge tokens in requests."
      },
      {
        "id": 31,
        "question": "What is Phishing?",
        "options": [
          "A type of firewall",
          "A social engineering attack used to steal user data like login credentials",
          "A secure networking protocol",
          "An antivirus software"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Phishing is a fraudulent attempt, usually made through email, to steal your personal information."
      },
      {
        "id": 32,
        "question": "What does HTTPS stand for?",
        "options": [
          "HyperText Transfer Protocol Secure",
          "HyperText Transmission Process System",
          "High Transfer Technology Protocol Secure",
          "Hyper Transfer Text Protocol Standard"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "HTTPS is an extension of HTTP used for secure communication over a computer network, widely used on the Internet."
      },
      {
        "id": 33,
        "question": "What is the general term for malicious software?",
        "options": [
          "Freeware",
          "Shareware",
          "Malware",
          "Firmware"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Malware is an umbrella term for any malicious software designed to cause damage to a computer, server, client, or computer network."
      },
      {
        "id": 34,
        "question": "What is the primary function of a network firewall?",
        "options": [
          "To speed up internet connection",
          "To monitor and control incoming and outgoing network traffic based on predetermined security rules",
          "To encrypt hard drives",
          "To backup data"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A firewall establishes a barrier between a trusted network and an untrusted network, such as the Internet."
      },
      {
        "id": 35,
        "question": "What is Two-Factor Authentication (2FA)?",
        "options": [
          "Using two passwords",
          "A security process in which users provide two different authentication factors to verify themselves",
          "Logging in from two different devices simultaneously",
          "A protocol for double encryption"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "2FA adds an extra layer of security by requiring not only a password and username but also something that only the user has on them."
      },
      {
        "id": 36,
        "question": "What is Cross-Site Scripting (XSS)?",
        "options": [
          "An attack that injects malicious executable scripts into trusted websites",
          "A method to style web pages across different domains",
          "A secure way to share data between servers",
          "A SQL database vulnerability"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "XSS allows an attacker to execute malicious scripts in the victim's browser, often leading to session hijacking or data theft."
      },
      {
        "id": 37,
        "question": "What is SQL Injection?",
        "options": [
          "Optimizing SQL queries",
          "A code injection technique used to attack data-driven applications by inserting malicious SQL statements into entry fields",
          "A method to backup databases",
          "A new SQL standard"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "SQL injection is a web security vulnerability that allows an attacker to interfere with the queries that an application makes to its database."
      },
      {
        "id": 38,
        "question": "What is the difference between symmetric and asymmetric encryption?",
        "options": [
          "Symmetric uses the same key for encryption/decryption; Asymmetric uses a public key for encryption and private key for decryption",
          "Symmetric is used for web traffic, asymmetric for databases",
          "Asymmetric uses the same key, symmetric uses two keys",
          "Symmetric is always faster and more secure"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Symmetric encryption uses one key, making it faster but harder to share securely. Asymmetric uses a mathematically linked key pair."
      },
      {
        "id": 39,
        "question": "What is a Distributed Denial of Service (DDoS) attack?",
        "options": [
          "A virus that deletes files",
          "A malicious attempt to disrupt normal traffic of a targeted server, service or network by overwhelming the target with a flood of Internet traffic",
          "A technique to steal passwords via brute force",
          "A man-in-the-middle attack"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "DDoS attacks achieve effectiveness by utilizing multiple compromised computer systems as sources of attack traffic."
      },
      {
        "id": 40,
        "question": "What is Penetration Testing (Pen Testing)?",
        "options": [
          "Installing antivirus software",
          "An authorized simulated cyberattack on a computer system performed to evaluate its security",
          "Writing secure code",
          "Testing physical building security"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Pen testing involves ethical hackers mimicking the strategies and actions of an attacker to identify security vulnerabilities."
      },
      {
        "id": 41,
        "question": "Which OSI model layer is responsible for encryption and decryption, and where SSL/TLS operates conceptually?",
        "options": [
          "Network Layer",
          "Transport Layer",
          "Presentation Layer",
          "Data Link Layer"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "While TLS is often said to operate at the Transport layer, conceptually encryption and formatting are functions of the Presentation layer in the OSI model."
      },
      {
        "id": 42,
        "question": "How does RSA encryption fundamentally work?",
        "options": [
          "Using complex hash functions",
          "Relying on the practical difficulty of factoring the product of two large prime numbers",
          "Using symmetric block ciphers",
          "Utilizing elliptic curve geometry"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The security of RSA relies on the fact that while it is easy to multiply two large prime numbers together, it is computationally infeasible to factor the product back into the primes."
      },
      {
        "id": 43,
        "question": "What is a Buffer Overflow attack?",
        "options": [
          "Overloading a server with HTTP requests",
          "An anomaly where a program writes data to a buffer and overruns the boundary, overwriting adjacent memory locations",
          "Flooding a network switch with MAC addresses",
          "A database query that returns too many results"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Buffer overflows can trigger system crashes or create entry points for attackers to execute arbitrary code by manipulating memory."
      },
      {
        "id": 44,
        "question": "What is the core principle of Zero Trust Architecture?",
        "options": [
          "Trust local networks, verify external ones",
          "Never trust, always verify (assuming the network is always hostile)",
          "Use VPNs for everything",
          "Eliminate all passwords"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Zero Trust is a security model that requires strict identity verification for every person and device trying to access resources on a private network, regardless of whether they are sitting within or outside of the network perimeter."
      },
      {
        "id": 45,
        "question": "What is Cross-Site Request Forgery (CSRF) and how is it primarily prevented?",
        "options": [
          "An attack forcing a user to execute unwanted actions; prevented by Anti-CSRF tokens",
          "An attack stealing cookies; prevented by HTTPS",
          "A database attack; prevented by prepared statements",
          "A network attack; prevented by firewalls"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "CSRF tricks the victim into submitting a malicious request. It is commonly prevented by including unpredictable challenge tokens in requests."
      },
      {
        "id": 46,
        "question": "What is Phishing?",
        "options": [
          "A type of firewall",
          "A social engineering attack used to steal user data like login credentials",
          "A secure networking protocol",
          "An antivirus software"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Phishing is a fraudulent attempt, usually made through email, to steal your personal information."
      },
      {
        "id": 47,
        "question": "What does HTTPS stand for?",
        "options": [
          "HyperText Transfer Protocol Secure",
          "HyperText Transmission Process System",
          "High Transfer Technology Protocol Secure",
          "Hyper Transfer Text Protocol Standard"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "HTTPS is an extension of HTTP used for secure communication over a computer network, widely used on the Internet."
      },
      {
        "id": 48,
        "question": "What is the general term for malicious software?",
        "options": [
          "Freeware",
          "Shareware",
          "Malware",
          "Firmware"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Malware is an umbrella term for any malicious software designed to cause damage to a computer, server, client, or computer network."
      },
      {
        "id": 49,
        "question": "What is the primary function of a network firewall?",
        "options": [
          "To speed up internet connection",
          "To monitor and control incoming and outgoing network traffic based on predetermined security rules",
          "To encrypt hard drives",
          "To backup data"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A firewall establishes a barrier between a trusted network and an untrusted network, such as the Internet."
      },
      {
        "id": 50,
        "question": "What is Two-Factor Authentication (2FA)?",
        "options": [
          "Using two passwords",
          "A security process in which users provide two different authentication factors to verify themselves",
          "Logging in from two different devices simultaneously",
          "A protocol for double encryption"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "2FA adds an extra layer of security by requiring not only a password and username but also something that only the user has on them."
      },
      {
        "id": 51,
        "question": "What is Cross-Site Scripting (XSS)?",
        "options": [
          "An attack that injects malicious executable scripts into trusted websites",
          "A method to style web pages across different domains",
          "A secure way to share data between servers",
          "A SQL database vulnerability"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "XSS allows an attacker to execute malicious scripts in the victim's browser, often leading to session hijacking or data theft."
      },
      {
        "id": 52,
        "question": "What is SQL Injection?",
        "options": [
          "Optimizing SQL queries",
          "A code injection technique used to attack data-driven applications by inserting malicious SQL statements into entry fields",
          "A method to backup databases",
          "A new SQL standard"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "SQL injection is a web security vulnerability that allows an attacker to interfere with the queries that an application makes to its database."
      },
      {
        "id": 53,
        "question": "What is the difference between symmetric and asymmetric encryption?",
        "options": [
          "Symmetric uses the same key for encryption/decryption; Asymmetric uses a public key for encryption and private key for decryption",
          "Symmetric is used for web traffic, asymmetric for databases",
          "Asymmetric uses the same key, symmetric uses two keys",
          "Symmetric is always faster and more secure"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Symmetric encryption uses one key, making it faster but harder to share securely. Asymmetric uses a mathematically linked key pair."
      },
      {
        "id": 54,
        "question": "What is a Distributed Denial of Service (DDoS) attack?",
        "options": [
          "A virus that deletes files",
          "A malicious attempt to disrupt normal traffic of a targeted server, service or network by overwhelming the target with a flood of Internet traffic",
          "A technique to steal passwords via brute force",
          "A man-in-the-middle attack"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "DDoS attacks achieve effectiveness by utilizing multiple compromised computer systems as sources of attack traffic."
      },
      {
        "id": 55,
        "question": "What is Penetration Testing (Pen Testing)?",
        "options": [
          "Installing antivirus software",
          "An authorized simulated cyberattack on a computer system performed to evaluate its security",
          "Writing secure code",
          "Testing physical building security"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Pen testing involves ethical hackers mimicking the strategies and actions of an attacker to identify security vulnerabilities."
      },
      {
        "id": 56,
        "question": "Which OSI model layer is responsible for encryption and decryption, and where SSL/TLS operates conceptually?",
        "options": [
          "Network Layer",
          "Transport Layer",
          "Presentation Layer",
          "Data Link Layer"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "While TLS is often said to operate at the Transport layer, conceptually encryption and formatting are functions of the Presentation layer in the OSI model."
      },
      {
        "id": 57,
        "question": "How does RSA encryption fundamentally work?",
        "options": [
          "Using complex hash functions",
          "Relying on the practical difficulty of factoring the product of two large prime numbers",
          "Using symmetric block ciphers",
          "Utilizing elliptic curve geometry"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The security of RSA relies on the fact that while it is easy to multiply two large prime numbers together, it is computationally infeasible to factor the product back into the primes."
      },
      {
        "id": 58,
        "question": "What is a Buffer Overflow attack?",
        "options": [
          "Overloading a server with HTTP requests",
          "An anomaly where a program writes data to a buffer and overruns the boundary, overwriting adjacent memory locations",
          "Flooding a network switch with MAC addresses",
          "A database query that returns too many results"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Buffer overflows can trigger system crashes or create entry points for attackers to execute arbitrary code by manipulating memory."
      },
      {
        "id": 59,
        "question": "What is the core principle of Zero Trust Architecture?",
        "options": [
          "Trust local networks, verify external ones",
          "Never trust, always verify (assuming the network is always hostile)",
          "Use VPNs for everything",
          "Eliminate all passwords"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Zero Trust is a security model that requires strict identity verification for every person and device trying to access resources on a private network, regardless of whether they are sitting within or outside of the network perimeter."
      },
      {
        "id": 60,
        "question": "What is Cross-Site Request Forgery (CSRF) and how is it primarily prevented?",
        "options": [
          "An attack forcing a user to execute unwanted actions; prevented by Anti-CSRF tokens",
          "An attack stealing cookies; prevented by HTTPS",
          "A database attack; prevented by prepared statements",
          "A network attack; prevented by firewalls"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "CSRF tricks the victim into submitting a malicious request. It is commonly prevented by including unpredictable challenge tokens in requests."
      },
      {
        "id": 61,
        "question": "What is Phishing?",
        "options": [
          "A type of firewall",
          "A social engineering attack used to steal user data like login credentials",
          "A secure networking protocol",
          "An antivirus software"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Phishing is a fraudulent attempt, usually made through email, to steal your personal information."
      },
      {
        "id": 62,
        "question": "What does HTTPS stand for?",
        "options": [
          "HyperText Transfer Protocol Secure",
          "HyperText Transmission Process System",
          "High Transfer Technology Protocol Secure",
          "Hyper Transfer Text Protocol Standard"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "HTTPS is an extension of HTTP used for secure communication over a computer network, widely used on the Internet."
      },
      {
        "id": 63,
        "question": "What is the general term for malicious software?",
        "options": [
          "Freeware",
          "Shareware",
          "Malware",
          "Firmware"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Malware is an umbrella term for any malicious software designed to cause damage to a computer, server, client, or computer network."
      },
      {
        "id": 64,
        "question": "What is the primary function of a network firewall?",
        "options": [
          "To speed up internet connection",
          "To monitor and control incoming and outgoing network traffic based on predetermined security rules",
          "To encrypt hard drives",
          "To backup data"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A firewall establishes a barrier between a trusted network and an untrusted network, such as the Internet."
      },
      {
        "id": 65,
        "question": "What is Two-Factor Authentication (2FA)?",
        "options": [
          "Using two passwords",
          "A security process in which users provide two different authentication factors to verify themselves",
          "Logging in from two different devices simultaneously",
          "A protocol for double encryption"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "2FA adds an extra layer of security by requiring not only a password and username but also something that only the user has on them."
      },
      {
        "id": 66,
        "question": "What is Cross-Site Scripting (XSS)?",
        "options": [
          "An attack that injects malicious executable scripts into trusted websites",
          "A method to style web pages across different domains",
          "A secure way to share data between servers",
          "A SQL database vulnerability"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "XSS allows an attacker to execute malicious scripts in the victim's browser, often leading to session hijacking or data theft."
      },
      {
        "id": 67,
        "question": "What is SQL Injection?",
        "options": [
          "Optimizing SQL queries",
          "A code injection technique used to attack data-driven applications by inserting malicious SQL statements into entry fields",
          "A method to backup databases",
          "A new SQL standard"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "SQL injection is a web security vulnerability that allows an attacker to interfere with the queries that an application makes to its database."
      },
      {
        "id": 68,
        "question": "What is the difference between symmetric and asymmetric encryption?",
        "options": [
          "Symmetric uses the same key for encryption/decryption; Asymmetric uses a public key for encryption and private key for decryption",
          "Symmetric is used for web traffic, asymmetric for databases",
          "Asymmetric uses the same key, symmetric uses two keys",
          "Symmetric is always faster and more secure"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Symmetric encryption uses one key, making it faster but harder to share securely. Asymmetric uses a mathematically linked key pair."
      },
      {
        "id": 69,
        "question": "What is a Distributed Denial of Service (DDoS) attack?",
        "options": [
          "A virus that deletes files",
          "A malicious attempt to disrupt normal traffic of a targeted server, service or network by overwhelming the target with a flood of Internet traffic",
          "A technique to steal passwords via brute force",
          "A man-in-the-middle attack"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "DDoS attacks achieve effectiveness by utilizing multiple compromised computer systems as sources of attack traffic."
      },
      {
        "id": 70,
        "question": "What is Penetration Testing (Pen Testing)?",
        "options": [
          "Installing antivirus software",
          "An authorized simulated cyberattack on a computer system performed to evaluate its security",
          "Writing secure code",
          "Testing physical building security"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Pen testing involves ethical hackers mimicking the strategies and actions of an attacker to identify security vulnerabilities."
      },
      {
        "id": 71,
        "question": "Which OSI model layer is responsible for encryption and decryption, and where SSL/TLS operates conceptually?",
        "options": [
          "Network Layer",
          "Transport Layer",
          "Presentation Layer",
          "Data Link Layer"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "While TLS is often said to operate at the Transport layer, conceptually encryption and formatting are functions of the Presentation layer in the OSI model."
      },
      {
        "id": 72,
        "question": "How does RSA encryption fundamentally work?",
        "options": [
          "Using complex hash functions",
          "Relying on the practical difficulty of factoring the product of two large prime numbers",
          "Using symmetric block ciphers",
          "Utilizing elliptic curve geometry"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The security of RSA relies on the fact that while it is easy to multiply two large prime numbers together, it is computationally infeasible to factor the product back into the primes."
      },
      {
        "id": 73,
        "question": "What is a Buffer Overflow attack?",
        "options": [
          "Overloading a server with HTTP requests",
          "An anomaly where a program writes data to a buffer and overruns the boundary, overwriting adjacent memory locations",
          "Flooding a network switch with MAC addresses",
          "A database query that returns too many results"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Buffer overflows can trigger system crashes or create entry points for attackers to execute arbitrary code by manipulating memory."
      },
      {
        "id": 74,
        "question": "What is the core principle of Zero Trust Architecture?",
        "options": [
          "Trust local networks, verify external ones",
          "Never trust, always verify (assuming the network is always hostile)",
          "Use VPNs for everything",
          "Eliminate all passwords"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Zero Trust is a security model that requires strict identity verification for every person and device trying to access resources on a private network, regardless of whether they are sitting within or outside of the network perimeter."
      },
      {
        "id": 75,
        "question": "What is Cross-Site Request Forgery (CSRF) and how is it primarily prevented?",
        "options": [
          "An attack forcing a user to execute unwanted actions; prevented by Anti-CSRF tokens",
          "An attack stealing cookies; prevented by HTTPS",
          "A database attack; prevented by prepared statements",
          "A network attack; prevented by firewalls"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "CSRF tricks the victim into submitting a malicious request. It is commonly prevented by including unpredictable challenge tokens in requests."
      },
      {
        "id": 76,
        "question": "What is Phishing?",
        "options": [
          "A type of firewall",
          "A social engineering attack used to steal user data like login credentials",
          "A secure networking protocol",
          "An antivirus software"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Phishing is a fraudulent attempt, usually made through email, to steal your personal information."
      },
      {
        "id": 77,
        "question": "What does HTTPS stand for?",
        "options": [
          "HyperText Transfer Protocol Secure",
          "HyperText Transmission Process System",
          "High Transfer Technology Protocol Secure",
          "Hyper Transfer Text Protocol Standard"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "HTTPS is an extension of HTTP used for secure communication over a computer network, widely used on the Internet."
      },
      {
        "id": 78,
        "question": "What is the general term for malicious software?",
        "options": [
          "Freeware",
          "Shareware",
          "Malware",
          "Firmware"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Malware is an umbrella term for any malicious software designed to cause damage to a computer, server, client, or computer network."
      },
      {
        "id": 79,
        "question": "What is the primary function of a network firewall?",
        "options": [
          "To speed up internet connection",
          "To monitor and control incoming and outgoing network traffic based on predetermined security rules",
          "To encrypt hard drives",
          "To backup data"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A firewall establishes a barrier between a trusted network and an untrusted network, such as the Internet."
      },
      {
        "id": 80,
        "question": "What is Two-Factor Authentication (2FA)?",
        "options": [
          "Using two passwords",
          "A security process in which users provide two different authentication factors to verify themselves",
          "Logging in from two different devices simultaneously",
          "A protocol for double encryption"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "2FA adds an extra layer of security by requiring not only a password and username but also something that only the user has on them."
      },
      {
        "id": 81,
        "question": "What is Cross-Site Scripting (XSS)?",
        "options": [
          "An attack that injects malicious executable scripts into trusted websites",
          "A method to style web pages across different domains",
          "A secure way to share data between servers",
          "A SQL database vulnerability"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "XSS allows an attacker to execute malicious scripts in the victim's browser, often leading to session hijacking or data theft."
      },
      {
        "id": 82,
        "question": "What is SQL Injection?",
        "options": [
          "Optimizing SQL queries",
          "A code injection technique used to attack data-driven applications by inserting malicious SQL statements into entry fields",
          "A method to backup databases",
          "A new SQL standard"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "SQL injection is a web security vulnerability that allows an attacker to interfere with the queries that an application makes to its database."
      },
      {
        "id": 83,
        "question": "What is the difference between symmetric and asymmetric encryption?",
        "options": [
          "Symmetric uses the same key for encryption/decryption; Asymmetric uses a public key for encryption and private key for decryption",
          "Symmetric is used for web traffic, asymmetric for databases",
          "Asymmetric uses the same key, symmetric uses two keys",
          "Symmetric is always faster and more secure"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Symmetric encryption uses one key, making it faster but harder to share securely. Asymmetric uses a mathematically linked key pair."
      },
      {
        "id": 84,
        "question": "What is a Distributed Denial of Service (DDoS) attack?",
        "options": [
          "A virus that deletes files",
          "A malicious attempt to disrupt normal traffic of a targeted server, service or network by overwhelming the target with a flood of Internet traffic",
          "A technique to steal passwords via brute force",
          "A man-in-the-middle attack"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "DDoS attacks achieve effectiveness by utilizing multiple compromised computer systems as sources of attack traffic."
      },
      {
        "id": 85,
        "question": "What is Penetration Testing (Pen Testing)?",
        "options": [
          "Installing antivirus software",
          "An authorized simulated cyberattack on a computer system performed to evaluate its security",
          "Writing secure code",
          "Testing physical building security"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Pen testing involves ethical hackers mimicking the strategies and actions of an attacker to identify security vulnerabilities."
      },
      {
        "id": 86,
        "question": "Which OSI model layer is responsible for encryption and decryption, and where SSL/TLS operates conceptually?",
        "options": [
          "Network Layer",
          "Transport Layer",
          "Presentation Layer",
          "Data Link Layer"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "While TLS is often said to operate at the Transport layer, conceptually encryption and formatting are functions of the Presentation layer in the OSI model."
      },
      {
        "id": 87,
        "question": "How does RSA encryption fundamentally work?",
        "options": [
          "Using complex hash functions",
          "Relying on the practical difficulty of factoring the product of two large prime numbers",
          "Using symmetric block ciphers",
          "Utilizing elliptic curve geometry"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The security of RSA relies on the fact that while it is easy to multiply two large prime numbers together, it is computationally infeasible to factor the product back into the primes."
      },
      {
        "id": 88,
        "question": "What is a Buffer Overflow attack?",
        "options": [
          "Overloading a server with HTTP requests",
          "An anomaly where a program writes data to a buffer and overruns the boundary, overwriting adjacent memory locations",
          "Flooding a network switch with MAC addresses",
          "A database query that returns too many results"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Buffer overflows can trigger system crashes or create entry points for attackers to execute arbitrary code by manipulating memory."
      },
      {
        "id": 89,
        "question": "What is the core principle of Zero Trust Architecture?",
        "options": [
          "Trust local networks, verify external ones",
          "Never trust, always verify (assuming the network is always hostile)",
          "Use VPNs for everything",
          "Eliminate all passwords"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Zero Trust is a security model that requires strict identity verification for every person and device trying to access resources on a private network, regardless of whether they are sitting within or outside of the network perimeter."
      },
      {
        "id": 90,
        "question": "What is Cross-Site Request Forgery (CSRF) and how is it primarily prevented?",
        "options": [
          "An attack forcing a user to execute unwanted actions; prevented by Anti-CSRF tokens",
          "An attack stealing cookies; prevented by HTTPS",
          "A database attack; prevented by prepared statements",
          "A network attack; prevented by firewalls"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "CSRF tricks the victim into submitting a malicious request. It is commonly prevented by including unpredictable challenge tokens in requests."
      },
      {
        "id": 91,
        "question": "What is Phishing?",
        "options": [
          "A type of firewall",
          "A social engineering attack used to steal user data like login credentials",
          "A secure networking protocol",
          "An antivirus software"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Phishing is a fraudulent attempt, usually made through email, to steal your personal information."
      },
      {
        "id": 92,
        "question": "What does HTTPS stand for?",
        "options": [
          "HyperText Transfer Protocol Secure",
          "HyperText Transmission Process System",
          "High Transfer Technology Protocol Secure",
          "Hyper Transfer Text Protocol Standard"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "HTTPS is an extension of HTTP used for secure communication over a computer network, widely used on the Internet."
      },
      {
        "id": 93,
        "question": "What is the general term for malicious software?",
        "options": [
          "Freeware",
          "Shareware",
          "Malware",
          "Firmware"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Malware is an umbrella term for any malicious software designed to cause damage to a computer, server, client, or computer network."
      },
      {
        "id": 94,
        "question": "What is the primary function of a network firewall?",
        "options": [
          "To speed up internet connection",
          "To monitor and control incoming and outgoing network traffic based on predetermined security rules",
          "To encrypt hard drives",
          "To backup data"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A firewall establishes a barrier between a trusted network and an untrusted network, such as the Internet."
      },
      {
        "id": 95,
        "question": "What is Two-Factor Authentication (2FA)?",
        "options": [
          "Using two passwords",
          "A security process in which users provide two different authentication factors to verify themselves",
          "Logging in from two different devices simultaneously",
          "A protocol for double encryption"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "2FA adds an extra layer of security by requiring not only a password and username but also something that only the user has on them."
      },
      {
        "id": 96,
        "question": "What is Cross-Site Scripting (XSS)?",
        "options": [
          "An attack that injects malicious executable scripts into trusted websites",
          "A method to style web pages across different domains",
          "A secure way to share data between servers",
          "A SQL database vulnerability"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "XSS allows an attacker to execute malicious scripts in the victim's browser, often leading to session hijacking or data theft."
      },
      {
        "id": 97,
        "question": "What is SQL Injection?",
        "options": [
          "Optimizing SQL queries",
          "A code injection technique used to attack data-driven applications by inserting malicious SQL statements into entry fields",
          "A method to backup databases",
          "A new SQL standard"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "SQL injection is a web security vulnerability that allows an attacker to interfere with the queries that an application makes to its database."
      },
      {
        "id": 98,
        "question": "What is the difference between symmetric and asymmetric encryption?",
        "options": [
          "Symmetric uses the same key for encryption/decryption; Asymmetric uses a public key for encryption and private key for decryption",
          "Symmetric is used for web traffic, asymmetric for databases",
          "Asymmetric uses the same key, symmetric uses two keys",
          "Symmetric is always faster and more secure"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Symmetric encryption uses one key, making it faster but harder to share securely. Asymmetric uses a mathematically linked key pair."
      },
      {
        "id": 99,
        "question": "What is a Distributed Denial of Service (DDoS) attack?",
        "options": [
          "A virus that deletes files",
          "A malicious attempt to disrupt normal traffic of a targeted server, service or network by overwhelming the target with a flood of Internet traffic",
          "A technique to steal passwords via brute force",
          "A man-in-the-middle attack"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "DDoS attacks achieve effectiveness by utilizing multiple compromised computer systems as sources of attack traffic."
      },
      {
        "id": 100,
        "question": "What is Penetration Testing (Pen Testing)?",
        "options": [
          "Installing antivirus software",
          "An authorized simulated cyberattack on a computer system performed to evaluate its security",
          "Writing secure code",
          "Testing physical building security"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Pen testing involves ethical hackers mimicking the strategies and actions of an attacker to identify security vulnerabilities."
      },
      {
        "id": 101,
        "question": "Which OSI model layer is responsible for encryption and decryption, and where SSL/TLS operates conceptually?",
        "options": [
          "Network Layer",
          "Transport Layer",
          "Presentation Layer",
          "Data Link Layer"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "While TLS is often said to operate at the Transport layer, conceptually encryption and formatting are functions of the Presentation layer in the OSI model."
      },
      {
        "id": 102,
        "question": "How does RSA encryption fundamentally work?",
        "options": [
          "Using complex hash functions",
          "Relying on the practical difficulty of factoring the product of two large prime numbers",
          "Using symmetric block ciphers",
          "Utilizing elliptic curve geometry"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The security of RSA relies on the fact that while it is easy to multiply two large prime numbers together, it is computationally infeasible to factor the product back into the primes."
      },
      {
        "id": 103,
        "question": "What is a Buffer Overflow attack?",
        "options": [
          "Overloading a server with HTTP requests",
          "An anomaly where a program writes data to a buffer and overruns the boundary, overwriting adjacent memory locations",
          "Flooding a network switch with MAC addresses",
          "A database query that returns too many results"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Buffer overflows can trigger system crashes or create entry points for attackers to execute arbitrary code by manipulating memory."
      },
      {
        "id": 104,
        "question": "What is the core principle of Zero Trust Architecture?",
        "options": [
          "Trust local networks, verify external ones",
          "Never trust, always verify (assuming the network is always hostile)",
          "Use VPNs for everything",
          "Eliminate all passwords"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Zero Trust is a security model that requires strict identity verification for every person and device trying to access resources on a private network, regardless of whether they are sitting within or outside of the network perimeter."
      },
      {
        "id": 105,
        "question": "What is Cross-Site Request Forgery (CSRF) and how is it primarily prevented?",
        "options": [
          "An attack forcing a user to execute unwanted actions; prevented by Anti-CSRF tokens",
          "An attack stealing cookies; prevented by HTTPS",
          "A database attack; prevented by prepared statements",
          "A network attack; prevented by firewalls"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "CSRF tricks the victim into submitting a malicious request. It is commonly prevented by including unpredictable challenge tokens in requests."
      },
      {
        "id": 106,
        "question": "What is Phishing?",
        "options": [
          "A type of firewall",
          "A social engineering attack used to steal user data like login credentials",
          "A secure networking protocol",
          "An antivirus software"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Phishing is a fraudulent attempt, usually made through email, to steal your personal information."
      },
      {
        "id": 107,
        "question": "What does HTTPS stand for?",
        "options": [
          "HyperText Transfer Protocol Secure",
          "HyperText Transmission Process System",
          "High Transfer Technology Protocol Secure",
          "Hyper Transfer Text Protocol Standard"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "HTTPS is an extension of HTTP used for secure communication over a computer network, widely used on the Internet."
      },
      {
        "id": 108,
        "question": "What is the general term for malicious software?",
        "options": [
          "Freeware",
          "Shareware",
          "Malware",
          "Firmware"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Malware is an umbrella term for any malicious software designed to cause damage to a computer, server, client, or computer network."
      },
      {
        "id": 109,
        "question": "What is the primary function of a network firewall?",
        "options": [
          "To speed up internet connection",
          "To monitor and control incoming and outgoing network traffic based on predetermined security rules",
          "To encrypt hard drives",
          "To backup data"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A firewall establishes a barrier between a trusted network and an untrusted network, such as the Internet."
      },
      {
        "id": 110,
        "question": "What is Two-Factor Authentication (2FA)?",
        "options": [
          "Using two passwords",
          "A security process in which users provide two different authentication factors to verify themselves",
          "Logging in from two different devices simultaneously",
          "A protocol for double encryption"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "2FA adds an extra layer of security by requiring not only a password and username but also something that only the user has on them."
      },
      {
        "id": 111,
        "question": "What is Cross-Site Scripting (XSS)?",
        "options": [
          "An attack that injects malicious executable scripts into trusted websites",
          "A method to style web pages across different domains",
          "A secure way to share data between servers",
          "A SQL database vulnerability"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "XSS allows an attacker to execute malicious scripts in the victim's browser, often leading to session hijacking or data theft."
      },
      {
        "id": 112,
        "question": "What is SQL Injection?",
        "options": [
          "Optimizing SQL queries",
          "A code injection technique used to attack data-driven applications by inserting malicious SQL statements into entry fields",
          "A method to backup databases",
          "A new SQL standard"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "SQL injection is a web security vulnerability that allows an attacker to interfere with the queries that an application makes to its database."
      },
      {
        "id": 113,
        "question": "What is the difference between symmetric and asymmetric encryption?",
        "options": [
          "Symmetric uses the same key for encryption/decryption; Asymmetric uses a public key for encryption and private key for decryption",
          "Symmetric is used for web traffic, asymmetric for databases",
          "Asymmetric uses the same key, symmetric uses two keys",
          "Symmetric is always faster and more secure"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Symmetric encryption uses one key, making it faster but harder to share securely. Asymmetric uses a mathematically linked key pair."
      },
      {
        "id": 114,
        "question": "What is a Distributed Denial of Service (DDoS) attack?",
        "options": [
          "A virus that deletes files",
          "A malicious attempt to disrupt normal traffic of a targeted server, service or network by overwhelming the target with a flood of Internet traffic",
          "A technique to steal passwords via brute force",
          "A man-in-the-middle attack"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "DDoS attacks achieve effectiveness by utilizing multiple compromised computer systems as sources of attack traffic."
      },
      {
        "id": 115,
        "question": "What is Penetration Testing (Pen Testing)?",
        "options": [
          "Installing antivirus software",
          "An authorized simulated cyberattack on a computer system performed to evaluate its security",
          "Writing secure code",
          "Testing physical building security"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Pen testing involves ethical hackers mimicking the strategies and actions of an attacker to identify security vulnerabilities."
      },
      {
        "id": 116,
        "question": "Which OSI model layer is responsible for encryption and decryption, and where SSL/TLS operates conceptually?",
        "options": [
          "Network Layer",
          "Transport Layer",
          "Presentation Layer",
          "Data Link Layer"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "While TLS is often said to operate at the Transport layer, conceptually encryption and formatting are functions of the Presentation layer in the OSI model."
      },
      {
        "id": 117,
        "question": "How does RSA encryption fundamentally work?",
        "options": [
          "Using complex hash functions",
          "Relying on the practical difficulty of factoring the product of two large prime numbers",
          "Using symmetric block ciphers",
          "Utilizing elliptic curve geometry"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "The security of RSA relies on the fact that while it is easy to multiply two large prime numbers together, it is computationally infeasible to factor the product back into the primes."
      },
      {
        "id": 118,
        "question": "What is a Buffer Overflow attack?",
        "options": [
          "Overloading a server with HTTP requests",
          "An anomaly where a program writes data to a buffer and overruns the boundary, overwriting adjacent memory locations",
          "Flooding a network switch with MAC addresses",
          "A database query that returns too many results"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Buffer overflows can trigger system crashes or create entry points for attackers to execute arbitrary code by manipulating memory."
      },
      {
        "id": 119,
        "question": "What is the core principle of Zero Trust Architecture?",
        "options": [
          "Trust local networks, verify external ones",
          "Never trust, always verify (assuming the network is always hostile)",
          "Use VPNs for everything",
          "Eliminate all passwords"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Zero Trust is a security model that requires strict identity verification for every person and device trying to access resources on a private network, regardless of whether they are sitting within or outside of the network perimeter."
      },
      {
        "id": 120,
        "question": "What is Cross-Site Request Forgery (CSRF) and how is it primarily prevented?",
        "options": [
          "An attack forcing a user to execute unwanted actions; prevented by Anti-CSRF tokens",
          "An attack stealing cookies; prevented by HTTPS",
          "A database attack; prevented by prepared statements",
          "A network attack; prevented by firewalls"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "CSRF tricks the victim into submitting a malicious request. It is commonly prevented by including unpredictable challenge tokens in requests."
      }
    ]
  },
  {
    "id": 6,
    "title": "SQL & Database Mastery",
    "category": "Database",
    "difficulty": "All Levels",
    "duration": 60,
    "badge": "📊",
    "color": "from-cyan-500 to-blue-700",
    "skills": [
      "SQL",
      "Normalization",
      "Indexing",
      "NoSQL"
    ],
    "avgScore": 75,
    "attempts": 1800,
    "description": "Master the art of data manipulation and database design with authentic technical questions.",
    "questions": [
      {
        "id": 1,
        "question": "What does SQL stand for?",
        "options": [
          "Structured Question Language",
          "Standard Query Language",
          "Structured Query Language",
          "Sequential Query Language"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "SQL is a standard language for storing, manipulating and retrieving data in databases."
      },
      {
        "id": 2,
        "question": "Which SQL statement is used to extract data from a database?",
        "options": [
          "EXTRACT",
          "OPEN",
          "GET",
          "SELECT"
        ],
        "correct": 3,
        "difficulty": "Easy",
        "explanation": "The SELECT statement is used to select data from a database. The data returned is stored in a result table."
      },
      {
        "id": 3,
        "question": "Which clause is used to filter records in SQL?",
        "options": [
          "FILTER",
          "WHERE",
          "SORT",
          "MATCH"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "The WHERE clause is used to filter records and extract only those records that fulfill a specified condition."
      },
      {
        "id": 4,
        "question": "What is a Primary Key?",
        "options": [
          "A key used to encrypt the database",
          "A column or set of columns that uniquely identifies each row in a table",
          "The first column in any table",
          "A key used to join tables"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A primary key must contain UNIQUE values, and cannot contain NULL values. A table can have only one primary key."
      },
      {
        "id": 5,
        "question": "Which SQL statement is used to update existing data in a database?",
        "options": [
          "MODIFY",
          "CHANGE",
          "UPDATE",
          "ALTER"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The UPDATE statement is used to modify the existing records in a table."
      },
      {
        "id": 6,
        "question": "What is the difference between an INNER JOIN and a LEFT JOIN?",
        "options": [
          "They are exactly the same",
          "INNER JOIN returns records that have matching values in both tables; LEFT JOIN returns all records from the left table, and the matched records from the right table",
          "LEFT JOIN only returns records from the right table",
          "INNER JOIN requires a foreign key, LEFT JOIN does not"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Inner join only keeps intersecting rows. Left join keeps all rows from the first table and adds data from the second where available."
      },
      {
        "id": 7,
        "question": "What is an index in a database?",
        "options": [
          "A table of contents for the database that speeds up data retrieval operations",
          "A built-in backup system",
          "A list of database users",
          "A constraint to ensure data validity"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Indexes are used to find rows with specific column values quickly, drastically reducing the time required for queries."
      },
      {
        "id": 8,
        "question": "What is database Normalization?",
        "options": [
          "Converting data to a standard format",
          "The process of organizing data to reduce redundancy and improve data integrity",
          "Making the database run faster",
          "A security protocol"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Normalization involves dividing large tables into smaller, less redundant tables and defining relationships between them."
      },
      {
        "id": 9,
        "question": "What is the difference between the GROUP BY and HAVING clauses?",
        "options": [
          "HAVING is used with UPDATE, GROUP BY with SELECT",
          "GROUP BY aggregates data, HAVING filters the aggregated data (since WHERE cannot be used with aggregate functions)",
          "There is no difference",
          "GROUP BY is faster than HAVING"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The HAVING clause was added to SQL because the WHERE keyword cannot be used with aggregate functions."
      },
      {
        "id": 10,
        "question": "What is a Foreign Key?",
        "options": [
          "A key from an external database",
          "A field (or collection of fields) in one table, that refers to the Primary Key in another table",
          "An encrypted key",
          "A key used for indexing only"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The foreign key is used to prevent actions that would destroy links between tables, enforcing referential integrity."
      },
      {
        "id": 11,
        "question": "What do the ACID properties stand for in database transactions?",
        "options": [
          "Atomicity, Consistency, Isolation, Durability",
          "Accuracy, Completeness, Integrity, Dependability",
          "Asynchrony, Concurrency, Isolation, Distribution",
          "Availability, Consistency, Interoperability, Durability"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "ACID properties guarantee that database transactions are processed reliably."
      },
      {
        "id": 12,
        "question": "Explain isolation levels in relational databases.",
        "options": [
          "How databases are physically separated on servers",
          "Settings that control how transaction integrity is visible to other concurrent transactions (e.g., Read Uncommitted, Serializable)",
          "Levels of user access permissions",
          "Encryption levels for stored data"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Isolation levels balance data consistency and concurrency. Serializable is the highest level, while Read Uncommitted is the lowest."
      },
      {
        "id": 13,
        "question": "What is a database deadlock?",
        "options": [
          "When a server crashes",
          "When two or more transactions indefinitely wait for one another to release locks",
          "When a table has no primary key",
          "When a query runs forever"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "A deadlock occurs when Transaction A holds Lock 1 and waits for Lock 2, while Transaction B holds Lock 2 and waits for Lock 1."
      },
      {
        "id": 14,
        "question": "What is the difference between a Clustered and a Non-Clustered index?",
        "options": [
          "Clustered indexes are slower",
          "A Clustered index determines the physical order of data in a table (only one per table); a Non-Clustered index is stored separately from the data",
          "Non-clustered indexes are used for primary keys",
          "They are the same thing"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Because the data rows themselves are stored in the order of the clustered index, a table can only have one clustered index."
      },
      {
        "id": 15,
        "question": "How do Materialized Views differ from standard Views?",
        "options": [
          "They cannot be joined with other tables",
          "Materialized views store the query result physically on disk, while standard views execute the query dynamically every time",
          "Standard views are faster",
          "Materialized views only contain integers"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Materialized views provide performance benefits for complex aggregations at the cost of requiring manual or periodic refreshes."
      },
      {
        "id": 16,
        "question": "What does SQL stand for?",
        "options": [
          "Structured Question Language",
          "Standard Query Language",
          "Structured Query Language",
          "Sequential Query Language"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "SQL is a standard language for storing, manipulating and retrieving data in databases."
      },
      {
        "id": 17,
        "question": "Which SQL statement is used to extract data from a database?",
        "options": [
          "EXTRACT",
          "OPEN",
          "GET",
          "SELECT"
        ],
        "correct": 3,
        "difficulty": "Easy",
        "explanation": "The SELECT statement is used to select data from a database. The data returned is stored in a result table."
      },
      {
        "id": 18,
        "question": "Which clause is used to filter records in SQL?",
        "options": [
          "FILTER",
          "WHERE",
          "SORT",
          "MATCH"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "The WHERE clause is used to filter records and extract only those records that fulfill a specified condition."
      },
      {
        "id": 19,
        "question": "What is a Primary Key?",
        "options": [
          "A key used to encrypt the database",
          "A column or set of columns that uniquely identifies each row in a table",
          "The first column in any table",
          "A key used to join tables"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A primary key must contain UNIQUE values, and cannot contain NULL values. A table can have only one primary key."
      },
      {
        "id": 20,
        "question": "Which SQL statement is used to update existing data in a database?",
        "options": [
          "MODIFY",
          "CHANGE",
          "UPDATE",
          "ALTER"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The UPDATE statement is used to modify the existing records in a table."
      },
      {
        "id": 21,
        "question": "What is the difference between an INNER JOIN and a LEFT JOIN?",
        "options": [
          "They are exactly the same",
          "INNER JOIN returns records that have matching values in both tables; LEFT JOIN returns all records from the left table, and the matched records from the right table",
          "LEFT JOIN only returns records from the right table",
          "INNER JOIN requires a foreign key, LEFT JOIN does not"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Inner join only keeps intersecting rows. Left join keeps all rows from the first table and adds data from the second where available."
      },
      {
        "id": 22,
        "question": "What is an index in a database?",
        "options": [
          "A table of contents for the database that speeds up data retrieval operations",
          "A built-in backup system",
          "A list of database users",
          "A constraint to ensure data validity"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Indexes are used to find rows with specific column values quickly, drastically reducing the time required for queries."
      },
      {
        "id": 23,
        "question": "What is database Normalization?",
        "options": [
          "Converting data to a standard format",
          "The process of organizing data to reduce redundancy and improve data integrity",
          "Making the database run faster",
          "A security protocol"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Normalization involves dividing large tables into smaller, less redundant tables and defining relationships between them."
      },
      {
        "id": 24,
        "question": "What is the difference between the GROUP BY and HAVING clauses?",
        "options": [
          "HAVING is used with UPDATE, GROUP BY with SELECT",
          "GROUP BY aggregates data, HAVING filters the aggregated data (since WHERE cannot be used with aggregate functions)",
          "There is no difference",
          "GROUP BY is faster than HAVING"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The HAVING clause was added to SQL because the WHERE keyword cannot be used with aggregate functions."
      },
      {
        "id": 25,
        "question": "What is a Foreign Key?",
        "options": [
          "A key from an external database",
          "A field (or collection of fields) in one table, that refers to the Primary Key in another table",
          "An encrypted key",
          "A key used for indexing only"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The foreign key is used to prevent actions that would destroy links between tables, enforcing referential integrity."
      },
      {
        "id": 26,
        "question": "What do the ACID properties stand for in database transactions?",
        "options": [
          "Atomicity, Consistency, Isolation, Durability",
          "Accuracy, Completeness, Integrity, Dependability",
          "Asynchrony, Concurrency, Isolation, Distribution",
          "Availability, Consistency, Interoperability, Durability"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "ACID properties guarantee that database transactions are processed reliably."
      },
      {
        "id": 27,
        "question": "Explain isolation levels in relational databases.",
        "options": [
          "How databases are physically separated on servers",
          "Settings that control how transaction integrity is visible to other concurrent transactions (e.g., Read Uncommitted, Serializable)",
          "Levels of user access permissions",
          "Encryption levels for stored data"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Isolation levels balance data consistency and concurrency. Serializable is the highest level, while Read Uncommitted is the lowest."
      },
      {
        "id": 28,
        "question": "What is a database deadlock?",
        "options": [
          "When a server crashes",
          "When two or more transactions indefinitely wait for one another to release locks",
          "When a table has no primary key",
          "When a query runs forever"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "A deadlock occurs when Transaction A holds Lock 1 and waits for Lock 2, while Transaction B holds Lock 2 and waits for Lock 1."
      },
      {
        "id": 29,
        "question": "What is the difference between a Clustered and a Non-Clustered index?",
        "options": [
          "Clustered indexes are slower",
          "A Clustered index determines the physical order of data in a table (only one per table); a Non-Clustered index is stored separately from the data",
          "Non-clustered indexes are used for primary keys",
          "They are the same thing"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Because the data rows themselves are stored in the order of the clustered index, a table can only have one clustered index."
      },
      {
        "id": 30,
        "question": "How do Materialized Views differ from standard Views?",
        "options": [
          "They cannot be joined with other tables",
          "Materialized views store the query result physically on disk, while standard views execute the query dynamically every time",
          "Standard views are faster",
          "Materialized views only contain integers"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Materialized views provide performance benefits for complex aggregations at the cost of requiring manual or periodic refreshes."
      },
      {
        "id": 31,
        "question": "What does SQL stand for?",
        "options": [
          "Structured Question Language",
          "Standard Query Language",
          "Structured Query Language",
          "Sequential Query Language"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "SQL is a standard language for storing, manipulating and retrieving data in databases."
      },
      {
        "id": 32,
        "question": "Which SQL statement is used to extract data from a database?",
        "options": [
          "EXTRACT",
          "OPEN",
          "GET",
          "SELECT"
        ],
        "correct": 3,
        "difficulty": "Easy",
        "explanation": "The SELECT statement is used to select data from a database. The data returned is stored in a result table."
      },
      {
        "id": 33,
        "question": "Which clause is used to filter records in SQL?",
        "options": [
          "FILTER",
          "WHERE",
          "SORT",
          "MATCH"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "The WHERE clause is used to filter records and extract only those records that fulfill a specified condition."
      },
      {
        "id": 34,
        "question": "What is a Primary Key?",
        "options": [
          "A key used to encrypt the database",
          "A column or set of columns that uniquely identifies each row in a table",
          "The first column in any table",
          "A key used to join tables"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A primary key must contain UNIQUE values, and cannot contain NULL values. A table can have only one primary key."
      },
      {
        "id": 35,
        "question": "Which SQL statement is used to update existing data in a database?",
        "options": [
          "MODIFY",
          "CHANGE",
          "UPDATE",
          "ALTER"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The UPDATE statement is used to modify the existing records in a table."
      },
      {
        "id": 36,
        "question": "What is the difference between an INNER JOIN and a LEFT JOIN?",
        "options": [
          "They are exactly the same",
          "INNER JOIN returns records that have matching values in both tables; LEFT JOIN returns all records from the left table, and the matched records from the right table",
          "LEFT JOIN only returns records from the right table",
          "INNER JOIN requires a foreign key, LEFT JOIN does not"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Inner join only keeps intersecting rows. Left join keeps all rows from the first table and adds data from the second where available."
      },
      {
        "id": 37,
        "question": "What is an index in a database?",
        "options": [
          "A table of contents for the database that speeds up data retrieval operations",
          "A built-in backup system",
          "A list of database users",
          "A constraint to ensure data validity"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Indexes are used to find rows with specific column values quickly, drastically reducing the time required for queries."
      },
      {
        "id": 38,
        "question": "What is database Normalization?",
        "options": [
          "Converting data to a standard format",
          "The process of organizing data to reduce redundancy and improve data integrity",
          "Making the database run faster",
          "A security protocol"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Normalization involves dividing large tables into smaller, less redundant tables and defining relationships between them."
      },
      {
        "id": 39,
        "question": "What is the difference between the GROUP BY and HAVING clauses?",
        "options": [
          "HAVING is used with UPDATE, GROUP BY with SELECT",
          "GROUP BY aggregates data, HAVING filters the aggregated data (since WHERE cannot be used with aggregate functions)",
          "There is no difference",
          "GROUP BY is faster than HAVING"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The HAVING clause was added to SQL because the WHERE keyword cannot be used with aggregate functions."
      },
      {
        "id": 40,
        "question": "What is a Foreign Key?",
        "options": [
          "A key from an external database",
          "A field (or collection of fields) in one table, that refers to the Primary Key in another table",
          "An encrypted key",
          "A key used for indexing only"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The foreign key is used to prevent actions that would destroy links between tables, enforcing referential integrity."
      },
      {
        "id": 41,
        "question": "What do the ACID properties stand for in database transactions?",
        "options": [
          "Atomicity, Consistency, Isolation, Durability",
          "Accuracy, Completeness, Integrity, Dependability",
          "Asynchrony, Concurrency, Isolation, Distribution",
          "Availability, Consistency, Interoperability, Durability"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "ACID properties guarantee that database transactions are processed reliably."
      },
      {
        "id": 42,
        "question": "Explain isolation levels in relational databases.",
        "options": [
          "How databases are physically separated on servers",
          "Settings that control how transaction integrity is visible to other concurrent transactions (e.g., Read Uncommitted, Serializable)",
          "Levels of user access permissions",
          "Encryption levels for stored data"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Isolation levels balance data consistency and concurrency. Serializable is the highest level, while Read Uncommitted is the lowest."
      },
      {
        "id": 43,
        "question": "What is a database deadlock?",
        "options": [
          "When a server crashes",
          "When two or more transactions indefinitely wait for one another to release locks",
          "When a table has no primary key",
          "When a query runs forever"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "A deadlock occurs when Transaction A holds Lock 1 and waits for Lock 2, while Transaction B holds Lock 2 and waits for Lock 1."
      },
      {
        "id": 44,
        "question": "What is the difference between a Clustered and a Non-Clustered index?",
        "options": [
          "Clustered indexes are slower",
          "A Clustered index determines the physical order of data in a table (only one per table); a Non-Clustered index is stored separately from the data",
          "Non-clustered indexes are used for primary keys",
          "They are the same thing"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Because the data rows themselves are stored in the order of the clustered index, a table can only have one clustered index."
      },
      {
        "id": 45,
        "question": "How do Materialized Views differ from standard Views?",
        "options": [
          "They cannot be joined with other tables",
          "Materialized views store the query result physically on disk, while standard views execute the query dynamically every time",
          "Standard views are faster",
          "Materialized views only contain integers"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Materialized views provide performance benefits for complex aggregations at the cost of requiring manual or periodic refreshes."
      },
      {
        "id": 46,
        "question": "What does SQL stand for?",
        "options": [
          "Structured Question Language",
          "Standard Query Language",
          "Structured Query Language",
          "Sequential Query Language"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "SQL is a standard language for storing, manipulating and retrieving data in databases."
      },
      {
        "id": 47,
        "question": "Which SQL statement is used to extract data from a database?",
        "options": [
          "EXTRACT",
          "OPEN",
          "GET",
          "SELECT"
        ],
        "correct": 3,
        "difficulty": "Easy",
        "explanation": "The SELECT statement is used to select data from a database. The data returned is stored in a result table."
      },
      {
        "id": 48,
        "question": "Which clause is used to filter records in SQL?",
        "options": [
          "FILTER",
          "WHERE",
          "SORT",
          "MATCH"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "The WHERE clause is used to filter records and extract only those records that fulfill a specified condition."
      },
      {
        "id": 49,
        "question": "What is a Primary Key?",
        "options": [
          "A key used to encrypt the database",
          "A column or set of columns that uniquely identifies each row in a table",
          "The first column in any table",
          "A key used to join tables"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A primary key must contain UNIQUE values, and cannot contain NULL values. A table can have only one primary key."
      },
      {
        "id": 50,
        "question": "Which SQL statement is used to update existing data in a database?",
        "options": [
          "MODIFY",
          "CHANGE",
          "UPDATE",
          "ALTER"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The UPDATE statement is used to modify the existing records in a table."
      },
      {
        "id": 51,
        "question": "What is the difference between an INNER JOIN and a LEFT JOIN?",
        "options": [
          "They are exactly the same",
          "INNER JOIN returns records that have matching values in both tables; LEFT JOIN returns all records from the left table, and the matched records from the right table",
          "LEFT JOIN only returns records from the right table",
          "INNER JOIN requires a foreign key, LEFT JOIN does not"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Inner join only keeps intersecting rows. Left join keeps all rows from the first table and adds data from the second where available."
      },
      {
        "id": 52,
        "question": "What is an index in a database?",
        "options": [
          "A table of contents for the database that speeds up data retrieval operations",
          "A built-in backup system",
          "A list of database users",
          "A constraint to ensure data validity"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Indexes are used to find rows with specific column values quickly, drastically reducing the time required for queries."
      },
      {
        "id": 53,
        "question": "What is database Normalization?",
        "options": [
          "Converting data to a standard format",
          "The process of organizing data to reduce redundancy and improve data integrity",
          "Making the database run faster",
          "A security protocol"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Normalization involves dividing large tables into smaller, less redundant tables and defining relationships between them."
      },
      {
        "id": 54,
        "question": "What is the difference between the GROUP BY and HAVING clauses?",
        "options": [
          "HAVING is used with UPDATE, GROUP BY with SELECT",
          "GROUP BY aggregates data, HAVING filters the aggregated data (since WHERE cannot be used with aggregate functions)",
          "There is no difference",
          "GROUP BY is faster than HAVING"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The HAVING clause was added to SQL because the WHERE keyword cannot be used with aggregate functions."
      },
      {
        "id": 55,
        "question": "What is a Foreign Key?",
        "options": [
          "A key from an external database",
          "A field (or collection of fields) in one table, that refers to the Primary Key in another table",
          "An encrypted key",
          "A key used for indexing only"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The foreign key is used to prevent actions that would destroy links between tables, enforcing referential integrity."
      },
      {
        "id": 56,
        "question": "What do the ACID properties stand for in database transactions?",
        "options": [
          "Atomicity, Consistency, Isolation, Durability",
          "Accuracy, Completeness, Integrity, Dependability",
          "Asynchrony, Concurrency, Isolation, Distribution",
          "Availability, Consistency, Interoperability, Durability"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "ACID properties guarantee that database transactions are processed reliably."
      },
      {
        "id": 57,
        "question": "Explain isolation levels in relational databases.",
        "options": [
          "How databases are physically separated on servers",
          "Settings that control how transaction integrity is visible to other concurrent transactions (e.g., Read Uncommitted, Serializable)",
          "Levels of user access permissions",
          "Encryption levels for stored data"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Isolation levels balance data consistency and concurrency. Serializable is the highest level, while Read Uncommitted is the lowest."
      },
      {
        "id": 58,
        "question": "What is a database deadlock?",
        "options": [
          "When a server crashes",
          "When two or more transactions indefinitely wait for one another to release locks",
          "When a table has no primary key",
          "When a query runs forever"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "A deadlock occurs when Transaction A holds Lock 1 and waits for Lock 2, while Transaction B holds Lock 2 and waits for Lock 1."
      },
      {
        "id": 59,
        "question": "What is the difference between a Clustered and a Non-Clustered index?",
        "options": [
          "Clustered indexes are slower",
          "A Clustered index determines the physical order of data in a table (only one per table); a Non-Clustered index is stored separately from the data",
          "Non-clustered indexes are used for primary keys",
          "They are the same thing"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Because the data rows themselves are stored in the order of the clustered index, a table can only have one clustered index."
      },
      {
        "id": 60,
        "question": "How do Materialized Views differ from standard Views?",
        "options": [
          "They cannot be joined with other tables",
          "Materialized views store the query result physically on disk, while standard views execute the query dynamically every time",
          "Standard views are faster",
          "Materialized views only contain integers"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Materialized views provide performance benefits for complex aggregations at the cost of requiring manual or periodic refreshes."
      },
      {
        "id": 61,
        "question": "What does SQL stand for?",
        "options": [
          "Structured Question Language",
          "Standard Query Language",
          "Structured Query Language",
          "Sequential Query Language"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "SQL is a standard language for storing, manipulating and retrieving data in databases."
      },
      {
        "id": 62,
        "question": "Which SQL statement is used to extract data from a database?",
        "options": [
          "EXTRACT",
          "OPEN",
          "GET",
          "SELECT"
        ],
        "correct": 3,
        "difficulty": "Easy",
        "explanation": "The SELECT statement is used to select data from a database. The data returned is stored in a result table."
      },
      {
        "id": 63,
        "question": "Which clause is used to filter records in SQL?",
        "options": [
          "FILTER",
          "WHERE",
          "SORT",
          "MATCH"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "The WHERE clause is used to filter records and extract only those records that fulfill a specified condition."
      },
      {
        "id": 64,
        "question": "What is a Primary Key?",
        "options": [
          "A key used to encrypt the database",
          "A column or set of columns that uniquely identifies each row in a table",
          "The first column in any table",
          "A key used to join tables"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A primary key must contain UNIQUE values, and cannot contain NULL values. A table can have only one primary key."
      },
      {
        "id": 65,
        "question": "Which SQL statement is used to update existing data in a database?",
        "options": [
          "MODIFY",
          "CHANGE",
          "UPDATE",
          "ALTER"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The UPDATE statement is used to modify the existing records in a table."
      },
      {
        "id": 66,
        "question": "What is the difference between an INNER JOIN and a LEFT JOIN?",
        "options": [
          "They are exactly the same",
          "INNER JOIN returns records that have matching values in both tables; LEFT JOIN returns all records from the left table, and the matched records from the right table",
          "LEFT JOIN only returns records from the right table",
          "INNER JOIN requires a foreign key, LEFT JOIN does not"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Inner join only keeps intersecting rows. Left join keeps all rows from the first table and adds data from the second where available."
      },
      {
        "id": 67,
        "question": "What is an index in a database?",
        "options": [
          "A table of contents for the database that speeds up data retrieval operations",
          "A built-in backup system",
          "A list of database users",
          "A constraint to ensure data validity"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Indexes are used to find rows with specific column values quickly, drastically reducing the time required for queries."
      },
      {
        "id": 68,
        "question": "What is database Normalization?",
        "options": [
          "Converting data to a standard format",
          "The process of organizing data to reduce redundancy and improve data integrity",
          "Making the database run faster",
          "A security protocol"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Normalization involves dividing large tables into smaller, less redundant tables and defining relationships between them."
      },
      {
        "id": 69,
        "question": "What is the difference between the GROUP BY and HAVING clauses?",
        "options": [
          "HAVING is used with UPDATE, GROUP BY with SELECT",
          "GROUP BY aggregates data, HAVING filters the aggregated data (since WHERE cannot be used with aggregate functions)",
          "There is no difference",
          "GROUP BY is faster than HAVING"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The HAVING clause was added to SQL because the WHERE keyword cannot be used with aggregate functions."
      },
      {
        "id": 70,
        "question": "What is a Foreign Key?",
        "options": [
          "A key from an external database",
          "A field (or collection of fields) in one table, that refers to the Primary Key in another table",
          "An encrypted key",
          "A key used for indexing only"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The foreign key is used to prevent actions that would destroy links between tables, enforcing referential integrity."
      },
      {
        "id": 71,
        "question": "What do the ACID properties stand for in database transactions?",
        "options": [
          "Atomicity, Consistency, Isolation, Durability",
          "Accuracy, Completeness, Integrity, Dependability",
          "Asynchrony, Concurrency, Isolation, Distribution",
          "Availability, Consistency, Interoperability, Durability"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "ACID properties guarantee that database transactions are processed reliably."
      },
      {
        "id": 72,
        "question": "Explain isolation levels in relational databases.",
        "options": [
          "How databases are physically separated on servers",
          "Settings that control how transaction integrity is visible to other concurrent transactions (e.g., Read Uncommitted, Serializable)",
          "Levels of user access permissions",
          "Encryption levels for stored data"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Isolation levels balance data consistency and concurrency. Serializable is the highest level, while Read Uncommitted is the lowest."
      },
      {
        "id": 73,
        "question": "What is a database deadlock?",
        "options": [
          "When a server crashes",
          "When two or more transactions indefinitely wait for one another to release locks",
          "When a table has no primary key",
          "When a query runs forever"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "A deadlock occurs when Transaction A holds Lock 1 and waits for Lock 2, while Transaction B holds Lock 2 and waits for Lock 1."
      },
      {
        "id": 74,
        "question": "What is the difference between a Clustered and a Non-Clustered index?",
        "options": [
          "Clustered indexes are slower",
          "A Clustered index determines the physical order of data in a table (only one per table); a Non-Clustered index is stored separately from the data",
          "Non-clustered indexes are used for primary keys",
          "They are the same thing"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Because the data rows themselves are stored in the order of the clustered index, a table can only have one clustered index."
      },
      {
        "id": 75,
        "question": "How do Materialized Views differ from standard Views?",
        "options": [
          "They cannot be joined with other tables",
          "Materialized views store the query result physically on disk, while standard views execute the query dynamically every time",
          "Standard views are faster",
          "Materialized views only contain integers"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Materialized views provide performance benefits for complex aggregations at the cost of requiring manual or periodic refreshes."
      },
      {
        "id": 76,
        "question": "What does SQL stand for?",
        "options": [
          "Structured Question Language",
          "Standard Query Language",
          "Structured Query Language",
          "Sequential Query Language"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "SQL is a standard language for storing, manipulating and retrieving data in databases."
      },
      {
        "id": 77,
        "question": "Which SQL statement is used to extract data from a database?",
        "options": [
          "EXTRACT",
          "OPEN",
          "GET",
          "SELECT"
        ],
        "correct": 3,
        "difficulty": "Easy",
        "explanation": "The SELECT statement is used to select data from a database. The data returned is stored in a result table."
      },
      {
        "id": 78,
        "question": "Which clause is used to filter records in SQL?",
        "options": [
          "FILTER",
          "WHERE",
          "SORT",
          "MATCH"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "The WHERE clause is used to filter records and extract only those records that fulfill a specified condition."
      },
      {
        "id": 79,
        "question": "What is a Primary Key?",
        "options": [
          "A key used to encrypt the database",
          "A column or set of columns that uniquely identifies each row in a table",
          "The first column in any table",
          "A key used to join tables"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A primary key must contain UNIQUE values, and cannot contain NULL values. A table can have only one primary key."
      },
      {
        "id": 80,
        "question": "Which SQL statement is used to update existing data in a database?",
        "options": [
          "MODIFY",
          "CHANGE",
          "UPDATE",
          "ALTER"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The UPDATE statement is used to modify the existing records in a table."
      },
      {
        "id": 81,
        "question": "What is the difference between an INNER JOIN and a LEFT JOIN?",
        "options": [
          "They are exactly the same",
          "INNER JOIN returns records that have matching values in both tables; LEFT JOIN returns all records from the left table, and the matched records from the right table",
          "LEFT JOIN only returns records from the right table",
          "INNER JOIN requires a foreign key, LEFT JOIN does not"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Inner join only keeps intersecting rows. Left join keeps all rows from the first table and adds data from the second where available."
      },
      {
        "id": 82,
        "question": "What is an index in a database?",
        "options": [
          "A table of contents for the database that speeds up data retrieval operations",
          "A built-in backup system",
          "A list of database users",
          "A constraint to ensure data validity"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Indexes are used to find rows with specific column values quickly, drastically reducing the time required for queries."
      },
      {
        "id": 83,
        "question": "What is database Normalization?",
        "options": [
          "Converting data to a standard format",
          "The process of organizing data to reduce redundancy and improve data integrity",
          "Making the database run faster",
          "A security protocol"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Normalization involves dividing large tables into smaller, less redundant tables and defining relationships between them."
      },
      {
        "id": 84,
        "question": "What is the difference between the GROUP BY and HAVING clauses?",
        "options": [
          "HAVING is used with UPDATE, GROUP BY with SELECT",
          "GROUP BY aggregates data, HAVING filters the aggregated data (since WHERE cannot be used with aggregate functions)",
          "There is no difference",
          "GROUP BY is faster than HAVING"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The HAVING clause was added to SQL because the WHERE keyword cannot be used with aggregate functions."
      },
      {
        "id": 85,
        "question": "What is a Foreign Key?",
        "options": [
          "A key from an external database",
          "A field (or collection of fields) in one table, that refers to the Primary Key in another table",
          "An encrypted key",
          "A key used for indexing only"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The foreign key is used to prevent actions that would destroy links between tables, enforcing referential integrity."
      },
      {
        "id": 86,
        "question": "What do the ACID properties stand for in database transactions?",
        "options": [
          "Atomicity, Consistency, Isolation, Durability",
          "Accuracy, Completeness, Integrity, Dependability",
          "Asynchrony, Concurrency, Isolation, Distribution",
          "Availability, Consistency, Interoperability, Durability"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "ACID properties guarantee that database transactions are processed reliably."
      },
      {
        "id": 87,
        "question": "Explain isolation levels in relational databases.",
        "options": [
          "How databases are physically separated on servers",
          "Settings that control how transaction integrity is visible to other concurrent transactions (e.g., Read Uncommitted, Serializable)",
          "Levels of user access permissions",
          "Encryption levels for stored data"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Isolation levels balance data consistency and concurrency. Serializable is the highest level, while Read Uncommitted is the lowest."
      },
      {
        "id": 88,
        "question": "What is a database deadlock?",
        "options": [
          "When a server crashes",
          "When two or more transactions indefinitely wait for one another to release locks",
          "When a table has no primary key",
          "When a query runs forever"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "A deadlock occurs when Transaction A holds Lock 1 and waits for Lock 2, while Transaction B holds Lock 2 and waits for Lock 1."
      },
      {
        "id": 89,
        "question": "What is the difference between a Clustered and a Non-Clustered index?",
        "options": [
          "Clustered indexes are slower",
          "A Clustered index determines the physical order of data in a table (only one per table); a Non-Clustered index is stored separately from the data",
          "Non-clustered indexes are used for primary keys",
          "They are the same thing"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Because the data rows themselves are stored in the order of the clustered index, a table can only have one clustered index."
      },
      {
        "id": 90,
        "question": "How do Materialized Views differ from standard Views?",
        "options": [
          "They cannot be joined with other tables",
          "Materialized views store the query result physically on disk, while standard views execute the query dynamically every time",
          "Standard views are faster",
          "Materialized views only contain integers"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Materialized views provide performance benefits for complex aggregations at the cost of requiring manual or periodic refreshes."
      },
      {
        "id": 91,
        "question": "What does SQL stand for?",
        "options": [
          "Structured Question Language",
          "Standard Query Language",
          "Structured Query Language",
          "Sequential Query Language"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "SQL is a standard language for storing, manipulating and retrieving data in databases."
      },
      {
        "id": 92,
        "question": "Which SQL statement is used to extract data from a database?",
        "options": [
          "EXTRACT",
          "OPEN",
          "GET",
          "SELECT"
        ],
        "correct": 3,
        "difficulty": "Easy",
        "explanation": "The SELECT statement is used to select data from a database. The data returned is stored in a result table."
      },
      {
        "id": 93,
        "question": "Which clause is used to filter records in SQL?",
        "options": [
          "FILTER",
          "WHERE",
          "SORT",
          "MATCH"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "The WHERE clause is used to filter records and extract only those records that fulfill a specified condition."
      },
      {
        "id": 94,
        "question": "What is a Primary Key?",
        "options": [
          "A key used to encrypt the database",
          "A column or set of columns that uniquely identifies each row in a table",
          "The first column in any table",
          "A key used to join tables"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A primary key must contain UNIQUE values, and cannot contain NULL values. A table can have only one primary key."
      },
      {
        "id": 95,
        "question": "Which SQL statement is used to update existing data in a database?",
        "options": [
          "MODIFY",
          "CHANGE",
          "UPDATE",
          "ALTER"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The UPDATE statement is used to modify the existing records in a table."
      },
      {
        "id": 96,
        "question": "What is the difference between an INNER JOIN and a LEFT JOIN?",
        "options": [
          "They are exactly the same",
          "INNER JOIN returns records that have matching values in both tables; LEFT JOIN returns all records from the left table, and the matched records from the right table",
          "LEFT JOIN only returns records from the right table",
          "INNER JOIN requires a foreign key, LEFT JOIN does not"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Inner join only keeps intersecting rows. Left join keeps all rows from the first table and adds data from the second where available."
      },
      {
        "id": 97,
        "question": "What is an index in a database?",
        "options": [
          "A table of contents for the database that speeds up data retrieval operations",
          "A built-in backup system",
          "A list of database users",
          "A constraint to ensure data validity"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Indexes are used to find rows with specific column values quickly, drastically reducing the time required for queries."
      },
      {
        "id": 98,
        "question": "What is database Normalization?",
        "options": [
          "Converting data to a standard format",
          "The process of organizing data to reduce redundancy and improve data integrity",
          "Making the database run faster",
          "A security protocol"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Normalization involves dividing large tables into smaller, less redundant tables and defining relationships between them."
      },
      {
        "id": 99,
        "question": "What is the difference between the GROUP BY and HAVING clauses?",
        "options": [
          "HAVING is used with UPDATE, GROUP BY with SELECT",
          "GROUP BY aggregates data, HAVING filters the aggregated data (since WHERE cannot be used with aggregate functions)",
          "There is no difference",
          "GROUP BY is faster than HAVING"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The HAVING clause was added to SQL because the WHERE keyword cannot be used with aggregate functions."
      },
      {
        "id": 100,
        "question": "What is a Foreign Key?",
        "options": [
          "A key from an external database",
          "A field (or collection of fields) in one table, that refers to the Primary Key in another table",
          "An encrypted key",
          "A key used for indexing only"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The foreign key is used to prevent actions that would destroy links between tables, enforcing referential integrity."
      },
      {
        "id": 101,
        "question": "What do the ACID properties stand for in database transactions?",
        "options": [
          "Atomicity, Consistency, Isolation, Durability",
          "Accuracy, Completeness, Integrity, Dependability",
          "Asynchrony, Concurrency, Isolation, Distribution",
          "Availability, Consistency, Interoperability, Durability"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "ACID properties guarantee that database transactions are processed reliably."
      },
      {
        "id": 102,
        "question": "Explain isolation levels in relational databases.",
        "options": [
          "How databases are physically separated on servers",
          "Settings that control how transaction integrity is visible to other concurrent transactions (e.g., Read Uncommitted, Serializable)",
          "Levels of user access permissions",
          "Encryption levels for stored data"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Isolation levels balance data consistency and concurrency. Serializable is the highest level, while Read Uncommitted is the lowest."
      },
      {
        "id": 103,
        "question": "What is a database deadlock?",
        "options": [
          "When a server crashes",
          "When two or more transactions indefinitely wait for one another to release locks",
          "When a table has no primary key",
          "When a query runs forever"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "A deadlock occurs when Transaction A holds Lock 1 and waits for Lock 2, while Transaction B holds Lock 2 and waits for Lock 1."
      },
      {
        "id": 104,
        "question": "What is the difference between a Clustered and a Non-Clustered index?",
        "options": [
          "Clustered indexes are slower",
          "A Clustered index determines the physical order of data in a table (only one per table); a Non-Clustered index is stored separately from the data",
          "Non-clustered indexes are used for primary keys",
          "They are the same thing"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Because the data rows themselves are stored in the order of the clustered index, a table can only have one clustered index."
      },
      {
        "id": 105,
        "question": "How do Materialized Views differ from standard Views?",
        "options": [
          "They cannot be joined with other tables",
          "Materialized views store the query result physically on disk, while standard views execute the query dynamically every time",
          "Standard views are faster",
          "Materialized views only contain integers"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Materialized views provide performance benefits for complex aggregations at the cost of requiring manual or periodic refreshes."
      },
      {
        "id": 106,
        "question": "What does SQL stand for?",
        "options": [
          "Structured Question Language",
          "Standard Query Language",
          "Structured Query Language",
          "Sequential Query Language"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "SQL is a standard language for storing, manipulating and retrieving data in databases."
      },
      {
        "id": 107,
        "question": "Which SQL statement is used to extract data from a database?",
        "options": [
          "EXTRACT",
          "OPEN",
          "GET",
          "SELECT"
        ],
        "correct": 3,
        "difficulty": "Easy",
        "explanation": "The SELECT statement is used to select data from a database. The data returned is stored in a result table."
      },
      {
        "id": 108,
        "question": "Which clause is used to filter records in SQL?",
        "options": [
          "FILTER",
          "WHERE",
          "SORT",
          "MATCH"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "The WHERE clause is used to filter records and extract only those records that fulfill a specified condition."
      },
      {
        "id": 109,
        "question": "What is a Primary Key?",
        "options": [
          "A key used to encrypt the database",
          "A column or set of columns that uniquely identifies each row in a table",
          "The first column in any table",
          "A key used to join tables"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A primary key must contain UNIQUE values, and cannot contain NULL values. A table can have only one primary key."
      },
      {
        "id": 110,
        "question": "Which SQL statement is used to update existing data in a database?",
        "options": [
          "MODIFY",
          "CHANGE",
          "UPDATE",
          "ALTER"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The UPDATE statement is used to modify the existing records in a table."
      },
      {
        "id": 111,
        "question": "What is the difference between an INNER JOIN and a LEFT JOIN?",
        "options": [
          "They are exactly the same",
          "INNER JOIN returns records that have matching values in both tables; LEFT JOIN returns all records from the left table, and the matched records from the right table",
          "LEFT JOIN only returns records from the right table",
          "INNER JOIN requires a foreign key, LEFT JOIN does not"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Inner join only keeps intersecting rows. Left join keeps all rows from the first table and adds data from the second where available."
      },
      {
        "id": 112,
        "question": "What is an index in a database?",
        "options": [
          "A table of contents for the database that speeds up data retrieval operations",
          "A built-in backup system",
          "A list of database users",
          "A constraint to ensure data validity"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Indexes are used to find rows with specific column values quickly, drastically reducing the time required for queries."
      },
      {
        "id": 113,
        "question": "What is database Normalization?",
        "options": [
          "Converting data to a standard format",
          "The process of organizing data to reduce redundancy and improve data integrity",
          "Making the database run faster",
          "A security protocol"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Normalization involves dividing large tables into smaller, less redundant tables and defining relationships between them."
      },
      {
        "id": 114,
        "question": "What is the difference between the GROUP BY and HAVING clauses?",
        "options": [
          "HAVING is used with UPDATE, GROUP BY with SELECT",
          "GROUP BY aggregates data, HAVING filters the aggregated data (since WHERE cannot be used with aggregate functions)",
          "There is no difference",
          "GROUP BY is faster than HAVING"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The HAVING clause was added to SQL because the WHERE keyword cannot be used with aggregate functions."
      },
      {
        "id": 115,
        "question": "What is a Foreign Key?",
        "options": [
          "A key from an external database",
          "A field (or collection of fields) in one table, that refers to the Primary Key in another table",
          "An encrypted key",
          "A key used for indexing only"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The foreign key is used to prevent actions that would destroy links between tables, enforcing referential integrity."
      },
      {
        "id": 116,
        "question": "What do the ACID properties stand for in database transactions?",
        "options": [
          "Atomicity, Consistency, Isolation, Durability",
          "Accuracy, Completeness, Integrity, Dependability",
          "Asynchrony, Concurrency, Isolation, Distribution",
          "Availability, Consistency, Interoperability, Durability"
        ],
        "correct": 0,
        "difficulty": "Hard",
        "explanation": "ACID properties guarantee that database transactions are processed reliably."
      },
      {
        "id": 117,
        "question": "Explain isolation levels in relational databases.",
        "options": [
          "How databases are physically separated on servers",
          "Settings that control how transaction integrity is visible to other concurrent transactions (e.g., Read Uncommitted, Serializable)",
          "Levels of user access permissions",
          "Encryption levels for stored data"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Isolation levels balance data consistency and concurrency. Serializable is the highest level, while Read Uncommitted is the lowest."
      },
      {
        "id": 118,
        "question": "What is a database deadlock?",
        "options": [
          "When a server crashes",
          "When two or more transactions indefinitely wait for one another to release locks",
          "When a table has no primary key",
          "When a query runs forever"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "A deadlock occurs when Transaction A holds Lock 1 and waits for Lock 2, while Transaction B holds Lock 2 and waits for Lock 1."
      },
      {
        "id": 119,
        "question": "What is the difference between a Clustered and a Non-Clustered index?",
        "options": [
          "Clustered indexes are slower",
          "A Clustered index determines the physical order of data in a table (only one per table); a Non-Clustered index is stored separately from the data",
          "Non-clustered indexes are used for primary keys",
          "They are the same thing"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Because the data rows themselves are stored in the order of the clustered index, a table can only have one clustered index."
      },
      {
        "id": 120,
        "question": "How do Materialized Views differ from standard Views?",
        "options": [
          "They cannot be joined with other tables",
          "Materialized views store the query result physically on disk, while standard views execute the query dynamically every time",
          "Standard views are faster",
          "Materialized views only contain integers"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Materialized views provide performance benefits for complex aggregations at the cost of requiring manual or periodic refreshes."
      }
    ]
  },
  {
    "id": 7,
    "title": "DevOps Engineering",
    "category": "DevOps",
    "difficulty": "All Levels",
    "duration": 75,
    "badge": "♾️",
    "color": "from-teal-500 to-emerald-800",
    "skills": [
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Terraform"
    ],
    "avgScore": 68,
    "attempts": 950,
    "description": "Evaluate your automation and infrastructure management skills with industry-relevant questions.",
    "questions": [
      {
        "id": 1,
        "question": "What does CI/CD stand for?",
        "options": [
          "Continuous Integration / Continuous Deployment",
          "Code Integration / Code Delivery",
          "Continuous Improvement / Continuous Development",
          "Compile Install / Compile Deploy"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "CI/CD bridges the gaps between development and operation activities and teams by enforcing automation in building, testing and deployment."
      },
      {
        "id": 2,
        "question": "What is the primary purpose of version control systems like Git?",
        "options": [
          "To deploy code",
          "To track changes in source code over time and facilitate collaboration",
          "To compile code",
          "To host websites"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Version control software keeps track of every modification to the code in a special kind of database."
      },
      {
        "id": 3,
        "question": "What is Docker primarily used for?",
        "options": [
          "Creating virtual machines",
          "Writing code",
          "Developing, shipping, and running applications in lightweight, portable containers",
          "Database management"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Docker uses OS-level virtualization to deliver software in packages called containers."
      },
      {
        "id": 4,
        "question": "What is the purpose of Jenkins in a DevOps pipeline?",
        "options": [
          "It is a database",
          "It is an automation server used to build, test, and deploy software reliably",
          "It is a container runtime",
          "It is a load balancer"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Jenkins is an open-source automation server that enables developers around the world to reliably build, test, and deploy their software."
      },
      {
        "id": 5,
        "question": "What is a CI/CD Pipeline?",
        "options": [
          "A physical cable connecting servers",
          "A set of automated processes that allow developers and DevOps professionals to reliably and efficiently compile, build, and deploy code",
          "A shell script",
          "A Git branch"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A pipeline automates the steps of delivering software, eliminating manual errors and standardizing feedback loops."
      },
      {
        "id": 6,
        "question": "What is Infrastructure as Code (IaC)?",
        "options": [
          "Writing applications in Assembly language",
          "Managing and provisioning computer data centers through machine-readable definition files, rather than physical hardware configuration",
          "Using Docker to run code",
          "A testing methodology"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "IaC allows you to automate the provisioning of infrastructure, ensuring consistency and version control (e.g., using Terraform or Ansible)."
      },
      {
        "id": 7,
        "question": "What is Kubernetes?",
        "options": [
          "A cloud provider",
          "An open-source system for automating deployment, scaling, and management of containerized applications",
          "A type of database",
          "A programming language"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Kubernetes (K8s) is a container orchestration platform that manages clusters of containerized applications."
      },
      {
        "id": 8,
        "question": "What is the main difference between a Virtual Machine (VM) and a Container?",
        "options": [
          "Containers are slower",
          "VMs virtualize the hardware, while containers virtualize the operating system",
          "Containers require a hypervisor",
          "VMs are open-source"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Containers share the host system's kernel, making them much more lightweight and faster to start than VMs, which run full guest OSes."
      },
      {
        "id": 9,
        "question": "What does a Reverse Proxy do?",
        "options": [
          "Connects local networks to the internet",
          "Directs client requests to the appropriate backend server and returns the server's response to the client",
          "Encrypts database queries",
          "Blocks incoming IP addresses"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "A reverse proxy sits in front of web servers and forwards client requests to those web servers, often providing load balancing and caching."
      },
      {
        "id": 10,
        "question": "Explain Blue-Green Deployment.",
        "options": [
          "A routing protocol",
          "A release management technique that reduces downtime and risk by running two identical production environments (Blue and Green)",
          "A UI design principle",
          "Deploying only on weekends"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Only one environment is live at a time. To deploy a new version, it is installed in the idle environment and tested. Then, traffic is routed to the new environment."
      },
      {
        "id": 11,
        "question": "How does Kubernetes handle Service Discovery internally?",
        "options": [
          "Using hardcoded IP addresses",
          "Through the internal DNS server (CoreDNS) which assigns DNS names to Services",
          "By querying the cloud provider API",
          "Using ARP broadcasts"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Kubernetes automatically assigns a DNS name to every Service and allows Pods to resolve that name to the Service's ClusterIP."
      },
      {
        "id": 12,
        "question": "What is GitOps?",
        "options": [
          "A way to commit code",
          "An operational framework that takes DevOps best practices used for application development and applies them to infrastructure automation using Git as the single source of truth",
          "A Git branch strategy",
          "An alternative to GitHub"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "In GitOps, infrastructure is declared in Git, and an automated agent (like ArgoCD) ensures the live environment matches the Git repository state."
      },
      {
        "id": 13,
        "question": "What is a Service Mesh?",
        "options": [
          "A physical network topology",
          "A dedicated infrastructure layer for facilitating service-to-service communications between services or microservices (e.g., Istio)",
          "A web framework",
          "A Docker container"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "A service mesh manages the complex communication between microservices, providing observability, traffic management, and security (mTLS) without changing application code."
      },
      {
        "id": 14,
        "question": "What is Chaos Engineering?",
        "options": [
          "Writing bad code on purpose",
          "The discipline of experimenting on a system in order to build confidence in the system's capability to withstand turbulent conditions in production",
          "Ignoring alerts",
          "A project management style"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Chaos engineering involves intentionally injecting failures (like killing servers or dropping network traffic) to test system resilience."
      },
      {
        "id": 15,
        "question": "How do you secure a Docker image pipeline?",
        "options": [
          "Only use public images",
          "Scan images for vulnerabilities, use multi-stage builds, sign images (Docker Content Trust), and use minimal base images",
          "Use a longer password",
          "Run containers as root"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Securing the pipeline involves minimizing the attack surface, validating integrity, and actively scanning for known CVEs."
      },
      {
        "id": 16,
        "question": "What does CI/CD stand for?",
        "options": [
          "Continuous Integration / Continuous Deployment",
          "Code Integration / Code Delivery",
          "Continuous Improvement / Continuous Development",
          "Compile Install / Compile Deploy"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "CI/CD bridges the gaps between development and operation activities and teams by enforcing automation in building, testing and deployment."
      },
      {
        "id": 17,
        "question": "What is the primary purpose of version control systems like Git?",
        "options": [
          "To deploy code",
          "To track changes in source code over time and facilitate collaboration",
          "To compile code",
          "To host websites"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Version control software keeps track of every modification to the code in a special kind of database."
      },
      {
        "id": 18,
        "question": "What is Docker primarily used for?",
        "options": [
          "Creating virtual machines",
          "Writing code",
          "Developing, shipping, and running applications in lightweight, portable containers",
          "Database management"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Docker uses OS-level virtualization to deliver software in packages called containers."
      },
      {
        "id": 19,
        "question": "What is the purpose of Jenkins in a DevOps pipeline?",
        "options": [
          "It is a database",
          "It is an automation server used to build, test, and deploy software reliably",
          "It is a container runtime",
          "It is a load balancer"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Jenkins is an open-source automation server that enables developers around the world to reliably build, test, and deploy their software."
      },
      {
        "id": 20,
        "question": "What is a CI/CD Pipeline?",
        "options": [
          "A physical cable connecting servers",
          "A set of automated processes that allow developers and DevOps professionals to reliably and efficiently compile, build, and deploy code",
          "A shell script",
          "A Git branch"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A pipeline automates the steps of delivering software, eliminating manual errors and standardizing feedback loops."
      },
      {
        "id": 21,
        "question": "What is Infrastructure as Code (IaC)?",
        "options": [
          "Writing applications in Assembly language",
          "Managing and provisioning computer data centers through machine-readable definition files, rather than physical hardware configuration",
          "Using Docker to run code",
          "A testing methodology"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "IaC allows you to automate the provisioning of infrastructure, ensuring consistency and version control (e.g., using Terraform or Ansible)."
      },
      {
        "id": 22,
        "question": "What is Kubernetes?",
        "options": [
          "A cloud provider",
          "An open-source system for automating deployment, scaling, and management of containerized applications",
          "A type of database",
          "A programming language"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Kubernetes (K8s) is a container orchestration platform that manages clusters of containerized applications."
      },
      {
        "id": 23,
        "question": "What is the main difference between a Virtual Machine (VM) and a Container?",
        "options": [
          "Containers are slower",
          "VMs virtualize the hardware, while containers virtualize the operating system",
          "Containers require a hypervisor",
          "VMs are open-source"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Containers share the host system's kernel, making them much more lightweight and faster to start than VMs, which run full guest OSes."
      },
      {
        "id": 24,
        "question": "What does a Reverse Proxy do?",
        "options": [
          "Connects local networks to the internet",
          "Directs client requests to the appropriate backend server and returns the server's response to the client",
          "Encrypts database queries",
          "Blocks incoming IP addresses"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "A reverse proxy sits in front of web servers and forwards client requests to those web servers, often providing load balancing and caching."
      },
      {
        "id": 25,
        "question": "Explain Blue-Green Deployment.",
        "options": [
          "A routing protocol",
          "A release management technique that reduces downtime and risk by running two identical production environments (Blue and Green)",
          "A UI design principle",
          "Deploying only on weekends"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Only one environment is live at a time. To deploy a new version, it is installed in the idle environment and tested. Then, traffic is routed to the new environment."
      },
      {
        "id": 26,
        "question": "How does Kubernetes handle Service Discovery internally?",
        "options": [
          "Using hardcoded IP addresses",
          "Through the internal DNS server (CoreDNS) which assigns DNS names to Services",
          "By querying the cloud provider API",
          "Using ARP broadcasts"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Kubernetes automatically assigns a DNS name to every Service and allows Pods to resolve that name to the Service's ClusterIP."
      },
      {
        "id": 27,
        "question": "What is GitOps?",
        "options": [
          "A way to commit code",
          "An operational framework that takes DevOps best practices used for application development and applies them to infrastructure automation using Git as the single source of truth",
          "A Git branch strategy",
          "An alternative to GitHub"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "In GitOps, infrastructure is declared in Git, and an automated agent (like ArgoCD) ensures the live environment matches the Git repository state."
      },
      {
        "id": 28,
        "question": "What is a Service Mesh?",
        "options": [
          "A physical network topology",
          "A dedicated infrastructure layer for facilitating service-to-service communications between services or microservices (e.g., Istio)",
          "A web framework",
          "A Docker container"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "A service mesh manages the complex communication between microservices, providing observability, traffic management, and security (mTLS) without changing application code."
      },
      {
        "id": 29,
        "question": "What is Chaos Engineering?",
        "options": [
          "Writing bad code on purpose",
          "The discipline of experimenting on a system in order to build confidence in the system's capability to withstand turbulent conditions in production",
          "Ignoring alerts",
          "A project management style"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Chaos engineering involves intentionally injecting failures (like killing servers or dropping network traffic) to test system resilience."
      },
      {
        "id": 30,
        "question": "How do you secure a Docker image pipeline?",
        "options": [
          "Only use public images",
          "Scan images for vulnerabilities, use multi-stage builds, sign images (Docker Content Trust), and use minimal base images",
          "Use a longer password",
          "Run containers as root"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Securing the pipeline involves minimizing the attack surface, validating integrity, and actively scanning for known CVEs."
      },
      {
        "id": 31,
        "question": "What does CI/CD stand for?",
        "options": [
          "Continuous Integration / Continuous Deployment",
          "Code Integration / Code Delivery",
          "Continuous Improvement / Continuous Development",
          "Compile Install / Compile Deploy"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "CI/CD bridges the gaps between development and operation activities and teams by enforcing automation in building, testing and deployment."
      },
      {
        "id": 32,
        "question": "What is the primary purpose of version control systems like Git?",
        "options": [
          "To deploy code",
          "To track changes in source code over time and facilitate collaboration",
          "To compile code",
          "To host websites"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Version control software keeps track of every modification to the code in a special kind of database."
      },
      {
        "id": 33,
        "question": "What is Docker primarily used for?",
        "options": [
          "Creating virtual machines",
          "Writing code",
          "Developing, shipping, and running applications in lightweight, portable containers",
          "Database management"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Docker uses OS-level virtualization to deliver software in packages called containers."
      },
      {
        "id": 34,
        "question": "What is the purpose of Jenkins in a DevOps pipeline?",
        "options": [
          "It is a database",
          "It is an automation server used to build, test, and deploy software reliably",
          "It is a container runtime",
          "It is a load balancer"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Jenkins is an open-source automation server that enables developers around the world to reliably build, test, and deploy their software."
      },
      {
        "id": 35,
        "question": "What is a CI/CD Pipeline?",
        "options": [
          "A physical cable connecting servers",
          "A set of automated processes that allow developers and DevOps professionals to reliably and efficiently compile, build, and deploy code",
          "A shell script",
          "A Git branch"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A pipeline automates the steps of delivering software, eliminating manual errors and standardizing feedback loops."
      },
      {
        "id": 36,
        "question": "What is Infrastructure as Code (IaC)?",
        "options": [
          "Writing applications in Assembly language",
          "Managing and provisioning computer data centers through machine-readable definition files, rather than physical hardware configuration",
          "Using Docker to run code",
          "A testing methodology"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "IaC allows you to automate the provisioning of infrastructure, ensuring consistency and version control (e.g., using Terraform or Ansible)."
      },
      {
        "id": 37,
        "question": "What is Kubernetes?",
        "options": [
          "A cloud provider",
          "An open-source system for automating deployment, scaling, and management of containerized applications",
          "A type of database",
          "A programming language"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Kubernetes (K8s) is a container orchestration platform that manages clusters of containerized applications."
      },
      {
        "id": 38,
        "question": "What is the main difference between a Virtual Machine (VM) and a Container?",
        "options": [
          "Containers are slower",
          "VMs virtualize the hardware, while containers virtualize the operating system",
          "Containers require a hypervisor",
          "VMs are open-source"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Containers share the host system's kernel, making them much more lightweight and faster to start than VMs, which run full guest OSes."
      },
      {
        "id": 39,
        "question": "What does a Reverse Proxy do?",
        "options": [
          "Connects local networks to the internet",
          "Directs client requests to the appropriate backend server and returns the server's response to the client",
          "Encrypts database queries",
          "Blocks incoming IP addresses"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "A reverse proxy sits in front of web servers and forwards client requests to those web servers, often providing load balancing and caching."
      },
      {
        "id": 40,
        "question": "Explain Blue-Green Deployment.",
        "options": [
          "A routing protocol",
          "A release management technique that reduces downtime and risk by running two identical production environments (Blue and Green)",
          "A UI design principle",
          "Deploying only on weekends"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Only one environment is live at a time. To deploy a new version, it is installed in the idle environment and tested. Then, traffic is routed to the new environment."
      },
      {
        "id": 41,
        "question": "How does Kubernetes handle Service Discovery internally?",
        "options": [
          "Using hardcoded IP addresses",
          "Through the internal DNS server (CoreDNS) which assigns DNS names to Services",
          "By querying the cloud provider API",
          "Using ARP broadcasts"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Kubernetes automatically assigns a DNS name to every Service and allows Pods to resolve that name to the Service's ClusterIP."
      },
      {
        "id": 42,
        "question": "What is GitOps?",
        "options": [
          "A way to commit code",
          "An operational framework that takes DevOps best practices used for application development and applies them to infrastructure automation using Git as the single source of truth",
          "A Git branch strategy",
          "An alternative to GitHub"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "In GitOps, infrastructure is declared in Git, and an automated agent (like ArgoCD) ensures the live environment matches the Git repository state."
      },
      {
        "id": 43,
        "question": "What is a Service Mesh?",
        "options": [
          "A physical network topology",
          "A dedicated infrastructure layer for facilitating service-to-service communications between services or microservices (e.g., Istio)",
          "A web framework",
          "A Docker container"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "A service mesh manages the complex communication between microservices, providing observability, traffic management, and security (mTLS) without changing application code."
      },
      {
        "id": 44,
        "question": "What is Chaos Engineering?",
        "options": [
          "Writing bad code on purpose",
          "The discipline of experimenting on a system in order to build confidence in the system's capability to withstand turbulent conditions in production",
          "Ignoring alerts",
          "A project management style"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Chaos engineering involves intentionally injecting failures (like killing servers or dropping network traffic) to test system resilience."
      },
      {
        "id": 45,
        "question": "How do you secure a Docker image pipeline?",
        "options": [
          "Only use public images",
          "Scan images for vulnerabilities, use multi-stage builds, sign images (Docker Content Trust), and use minimal base images",
          "Use a longer password",
          "Run containers as root"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Securing the pipeline involves minimizing the attack surface, validating integrity, and actively scanning for known CVEs."
      },
      {
        "id": 46,
        "question": "What does CI/CD stand for?",
        "options": [
          "Continuous Integration / Continuous Deployment",
          "Code Integration / Code Delivery",
          "Continuous Improvement / Continuous Development",
          "Compile Install / Compile Deploy"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "CI/CD bridges the gaps between development and operation activities and teams by enforcing automation in building, testing and deployment."
      },
      {
        "id": 47,
        "question": "What is the primary purpose of version control systems like Git?",
        "options": [
          "To deploy code",
          "To track changes in source code over time and facilitate collaboration",
          "To compile code",
          "To host websites"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Version control software keeps track of every modification to the code in a special kind of database."
      },
      {
        "id": 48,
        "question": "What is Docker primarily used for?",
        "options": [
          "Creating virtual machines",
          "Writing code",
          "Developing, shipping, and running applications in lightweight, portable containers",
          "Database management"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Docker uses OS-level virtualization to deliver software in packages called containers."
      },
      {
        "id": 49,
        "question": "What is the purpose of Jenkins in a DevOps pipeline?",
        "options": [
          "It is a database",
          "It is an automation server used to build, test, and deploy software reliably",
          "It is a container runtime",
          "It is a load balancer"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Jenkins is an open-source automation server that enables developers around the world to reliably build, test, and deploy their software."
      },
      {
        "id": 50,
        "question": "What is a CI/CD Pipeline?",
        "options": [
          "A physical cable connecting servers",
          "A set of automated processes that allow developers and DevOps professionals to reliably and efficiently compile, build, and deploy code",
          "A shell script",
          "A Git branch"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A pipeline automates the steps of delivering software, eliminating manual errors and standardizing feedback loops."
      },
      {
        "id": 51,
        "question": "What is Infrastructure as Code (IaC)?",
        "options": [
          "Writing applications in Assembly language",
          "Managing and provisioning computer data centers through machine-readable definition files, rather than physical hardware configuration",
          "Using Docker to run code",
          "A testing methodology"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "IaC allows you to automate the provisioning of infrastructure, ensuring consistency and version control (e.g., using Terraform or Ansible)."
      },
      {
        "id": 52,
        "question": "What is Kubernetes?",
        "options": [
          "A cloud provider",
          "An open-source system for automating deployment, scaling, and management of containerized applications",
          "A type of database",
          "A programming language"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Kubernetes (K8s) is a container orchestration platform that manages clusters of containerized applications."
      },
      {
        "id": 53,
        "question": "What is the main difference between a Virtual Machine (VM) and a Container?",
        "options": [
          "Containers are slower",
          "VMs virtualize the hardware, while containers virtualize the operating system",
          "Containers require a hypervisor",
          "VMs are open-source"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Containers share the host system's kernel, making them much more lightweight and faster to start than VMs, which run full guest OSes."
      },
      {
        "id": 54,
        "question": "What does a Reverse Proxy do?",
        "options": [
          "Connects local networks to the internet",
          "Directs client requests to the appropriate backend server and returns the server's response to the client",
          "Encrypts database queries",
          "Blocks incoming IP addresses"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "A reverse proxy sits in front of web servers and forwards client requests to those web servers, often providing load balancing and caching."
      },
      {
        "id": 55,
        "question": "Explain Blue-Green Deployment.",
        "options": [
          "A routing protocol",
          "A release management technique that reduces downtime and risk by running two identical production environments (Blue and Green)",
          "A UI design principle",
          "Deploying only on weekends"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Only one environment is live at a time. To deploy a new version, it is installed in the idle environment and tested. Then, traffic is routed to the new environment."
      },
      {
        "id": 56,
        "question": "How does Kubernetes handle Service Discovery internally?",
        "options": [
          "Using hardcoded IP addresses",
          "Through the internal DNS server (CoreDNS) which assigns DNS names to Services",
          "By querying the cloud provider API",
          "Using ARP broadcasts"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Kubernetes automatically assigns a DNS name to every Service and allows Pods to resolve that name to the Service's ClusterIP."
      },
      {
        "id": 57,
        "question": "What is GitOps?",
        "options": [
          "A way to commit code",
          "An operational framework that takes DevOps best practices used for application development and applies them to infrastructure automation using Git as the single source of truth",
          "A Git branch strategy",
          "An alternative to GitHub"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "In GitOps, infrastructure is declared in Git, and an automated agent (like ArgoCD) ensures the live environment matches the Git repository state."
      },
      {
        "id": 58,
        "question": "What is a Service Mesh?",
        "options": [
          "A physical network topology",
          "A dedicated infrastructure layer for facilitating service-to-service communications between services or microservices (e.g., Istio)",
          "A web framework",
          "A Docker container"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "A service mesh manages the complex communication between microservices, providing observability, traffic management, and security (mTLS) without changing application code."
      },
      {
        "id": 59,
        "question": "What is Chaos Engineering?",
        "options": [
          "Writing bad code on purpose",
          "The discipline of experimenting on a system in order to build confidence in the system's capability to withstand turbulent conditions in production",
          "Ignoring alerts",
          "A project management style"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Chaos engineering involves intentionally injecting failures (like killing servers or dropping network traffic) to test system resilience."
      },
      {
        "id": 60,
        "question": "How do you secure a Docker image pipeline?",
        "options": [
          "Only use public images",
          "Scan images for vulnerabilities, use multi-stage builds, sign images (Docker Content Trust), and use minimal base images",
          "Use a longer password",
          "Run containers as root"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Securing the pipeline involves minimizing the attack surface, validating integrity, and actively scanning for known CVEs."
      },
      {
        "id": 61,
        "question": "What does CI/CD stand for?",
        "options": [
          "Continuous Integration / Continuous Deployment",
          "Code Integration / Code Delivery",
          "Continuous Improvement / Continuous Development",
          "Compile Install / Compile Deploy"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "CI/CD bridges the gaps between development and operation activities and teams by enforcing automation in building, testing and deployment."
      },
      {
        "id": 62,
        "question": "What is the primary purpose of version control systems like Git?",
        "options": [
          "To deploy code",
          "To track changes in source code over time and facilitate collaboration",
          "To compile code",
          "To host websites"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Version control software keeps track of every modification to the code in a special kind of database."
      },
      {
        "id": 63,
        "question": "What is Docker primarily used for?",
        "options": [
          "Creating virtual machines",
          "Writing code",
          "Developing, shipping, and running applications in lightweight, portable containers",
          "Database management"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Docker uses OS-level virtualization to deliver software in packages called containers."
      },
      {
        "id": 64,
        "question": "What is the purpose of Jenkins in a DevOps pipeline?",
        "options": [
          "It is a database",
          "It is an automation server used to build, test, and deploy software reliably",
          "It is a container runtime",
          "It is a load balancer"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Jenkins is an open-source automation server that enables developers around the world to reliably build, test, and deploy their software."
      },
      {
        "id": 65,
        "question": "What is a CI/CD Pipeline?",
        "options": [
          "A physical cable connecting servers",
          "A set of automated processes that allow developers and DevOps professionals to reliably and efficiently compile, build, and deploy code",
          "A shell script",
          "A Git branch"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A pipeline automates the steps of delivering software, eliminating manual errors and standardizing feedback loops."
      },
      {
        "id": 66,
        "question": "What is Infrastructure as Code (IaC)?",
        "options": [
          "Writing applications in Assembly language",
          "Managing and provisioning computer data centers through machine-readable definition files, rather than physical hardware configuration",
          "Using Docker to run code",
          "A testing methodology"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "IaC allows you to automate the provisioning of infrastructure, ensuring consistency and version control (e.g., using Terraform or Ansible)."
      },
      {
        "id": 67,
        "question": "What is Kubernetes?",
        "options": [
          "A cloud provider",
          "An open-source system for automating deployment, scaling, and management of containerized applications",
          "A type of database",
          "A programming language"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Kubernetes (K8s) is a container orchestration platform that manages clusters of containerized applications."
      },
      {
        "id": 68,
        "question": "What is the main difference between a Virtual Machine (VM) and a Container?",
        "options": [
          "Containers are slower",
          "VMs virtualize the hardware, while containers virtualize the operating system",
          "Containers require a hypervisor",
          "VMs are open-source"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Containers share the host system's kernel, making them much more lightweight and faster to start than VMs, which run full guest OSes."
      },
      {
        "id": 69,
        "question": "What does a Reverse Proxy do?",
        "options": [
          "Connects local networks to the internet",
          "Directs client requests to the appropriate backend server and returns the server's response to the client",
          "Encrypts database queries",
          "Blocks incoming IP addresses"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "A reverse proxy sits in front of web servers and forwards client requests to those web servers, often providing load balancing and caching."
      },
      {
        "id": 70,
        "question": "Explain Blue-Green Deployment.",
        "options": [
          "A routing protocol",
          "A release management technique that reduces downtime and risk by running two identical production environments (Blue and Green)",
          "A UI design principle",
          "Deploying only on weekends"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Only one environment is live at a time. To deploy a new version, it is installed in the idle environment and tested. Then, traffic is routed to the new environment."
      },
      {
        "id": 71,
        "question": "How does Kubernetes handle Service Discovery internally?",
        "options": [
          "Using hardcoded IP addresses",
          "Through the internal DNS server (CoreDNS) which assigns DNS names to Services",
          "By querying the cloud provider API",
          "Using ARP broadcasts"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Kubernetes automatically assigns a DNS name to every Service and allows Pods to resolve that name to the Service's ClusterIP."
      },
      {
        "id": 72,
        "question": "What is GitOps?",
        "options": [
          "A way to commit code",
          "An operational framework that takes DevOps best practices used for application development and applies them to infrastructure automation using Git as the single source of truth",
          "A Git branch strategy",
          "An alternative to GitHub"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "In GitOps, infrastructure is declared in Git, and an automated agent (like ArgoCD) ensures the live environment matches the Git repository state."
      },
      {
        "id": 73,
        "question": "What is a Service Mesh?",
        "options": [
          "A physical network topology",
          "A dedicated infrastructure layer for facilitating service-to-service communications between services or microservices (e.g., Istio)",
          "A web framework",
          "A Docker container"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "A service mesh manages the complex communication between microservices, providing observability, traffic management, and security (mTLS) without changing application code."
      },
      {
        "id": 74,
        "question": "What is Chaos Engineering?",
        "options": [
          "Writing bad code on purpose",
          "The discipline of experimenting on a system in order to build confidence in the system's capability to withstand turbulent conditions in production",
          "Ignoring alerts",
          "A project management style"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Chaos engineering involves intentionally injecting failures (like killing servers or dropping network traffic) to test system resilience."
      },
      {
        "id": 75,
        "question": "How do you secure a Docker image pipeline?",
        "options": [
          "Only use public images",
          "Scan images for vulnerabilities, use multi-stage builds, sign images (Docker Content Trust), and use minimal base images",
          "Use a longer password",
          "Run containers as root"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Securing the pipeline involves minimizing the attack surface, validating integrity, and actively scanning for known CVEs."
      },
      {
        "id": 76,
        "question": "What does CI/CD stand for?",
        "options": [
          "Continuous Integration / Continuous Deployment",
          "Code Integration / Code Delivery",
          "Continuous Improvement / Continuous Development",
          "Compile Install / Compile Deploy"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "CI/CD bridges the gaps between development and operation activities and teams by enforcing automation in building, testing and deployment."
      },
      {
        "id": 77,
        "question": "What is the primary purpose of version control systems like Git?",
        "options": [
          "To deploy code",
          "To track changes in source code over time and facilitate collaboration",
          "To compile code",
          "To host websites"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Version control software keeps track of every modification to the code in a special kind of database."
      },
      {
        "id": 78,
        "question": "What is Docker primarily used for?",
        "options": [
          "Creating virtual machines",
          "Writing code",
          "Developing, shipping, and running applications in lightweight, portable containers",
          "Database management"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Docker uses OS-level virtualization to deliver software in packages called containers."
      },
      {
        "id": 79,
        "question": "What is the purpose of Jenkins in a DevOps pipeline?",
        "options": [
          "It is a database",
          "It is an automation server used to build, test, and deploy software reliably",
          "It is a container runtime",
          "It is a load balancer"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Jenkins is an open-source automation server that enables developers around the world to reliably build, test, and deploy their software."
      },
      {
        "id": 80,
        "question": "What is a CI/CD Pipeline?",
        "options": [
          "A physical cable connecting servers",
          "A set of automated processes that allow developers and DevOps professionals to reliably and efficiently compile, build, and deploy code",
          "A shell script",
          "A Git branch"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A pipeline automates the steps of delivering software, eliminating manual errors and standardizing feedback loops."
      },
      {
        "id": 81,
        "question": "What is Infrastructure as Code (IaC)?",
        "options": [
          "Writing applications in Assembly language",
          "Managing and provisioning computer data centers through machine-readable definition files, rather than physical hardware configuration",
          "Using Docker to run code",
          "A testing methodology"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "IaC allows you to automate the provisioning of infrastructure, ensuring consistency and version control (e.g., using Terraform or Ansible)."
      },
      {
        "id": 82,
        "question": "What is Kubernetes?",
        "options": [
          "A cloud provider",
          "An open-source system for automating deployment, scaling, and management of containerized applications",
          "A type of database",
          "A programming language"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Kubernetes (K8s) is a container orchestration platform that manages clusters of containerized applications."
      },
      {
        "id": 83,
        "question": "What is the main difference between a Virtual Machine (VM) and a Container?",
        "options": [
          "Containers are slower",
          "VMs virtualize the hardware, while containers virtualize the operating system",
          "Containers require a hypervisor",
          "VMs are open-source"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Containers share the host system's kernel, making them much more lightweight and faster to start than VMs, which run full guest OSes."
      },
      {
        "id": 84,
        "question": "What does a Reverse Proxy do?",
        "options": [
          "Connects local networks to the internet",
          "Directs client requests to the appropriate backend server and returns the server's response to the client",
          "Encrypts database queries",
          "Blocks incoming IP addresses"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "A reverse proxy sits in front of web servers and forwards client requests to those web servers, often providing load balancing and caching."
      },
      {
        "id": 85,
        "question": "Explain Blue-Green Deployment.",
        "options": [
          "A routing protocol",
          "A release management technique that reduces downtime and risk by running two identical production environments (Blue and Green)",
          "A UI design principle",
          "Deploying only on weekends"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Only one environment is live at a time. To deploy a new version, it is installed in the idle environment and tested. Then, traffic is routed to the new environment."
      },
      {
        "id": 86,
        "question": "How does Kubernetes handle Service Discovery internally?",
        "options": [
          "Using hardcoded IP addresses",
          "Through the internal DNS server (CoreDNS) which assigns DNS names to Services",
          "By querying the cloud provider API",
          "Using ARP broadcasts"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Kubernetes automatically assigns a DNS name to every Service and allows Pods to resolve that name to the Service's ClusterIP."
      },
      {
        "id": 87,
        "question": "What is GitOps?",
        "options": [
          "A way to commit code",
          "An operational framework that takes DevOps best practices used for application development and applies them to infrastructure automation using Git as the single source of truth",
          "A Git branch strategy",
          "An alternative to GitHub"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "In GitOps, infrastructure is declared in Git, and an automated agent (like ArgoCD) ensures the live environment matches the Git repository state."
      },
      {
        "id": 88,
        "question": "What is a Service Mesh?",
        "options": [
          "A physical network topology",
          "A dedicated infrastructure layer for facilitating service-to-service communications between services or microservices (e.g., Istio)",
          "A web framework",
          "A Docker container"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "A service mesh manages the complex communication between microservices, providing observability, traffic management, and security (mTLS) without changing application code."
      },
      {
        "id": 89,
        "question": "What is Chaos Engineering?",
        "options": [
          "Writing bad code on purpose",
          "The discipline of experimenting on a system in order to build confidence in the system's capability to withstand turbulent conditions in production",
          "Ignoring alerts",
          "A project management style"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Chaos engineering involves intentionally injecting failures (like killing servers or dropping network traffic) to test system resilience."
      },
      {
        "id": 90,
        "question": "How do you secure a Docker image pipeline?",
        "options": [
          "Only use public images",
          "Scan images for vulnerabilities, use multi-stage builds, sign images (Docker Content Trust), and use minimal base images",
          "Use a longer password",
          "Run containers as root"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Securing the pipeline involves minimizing the attack surface, validating integrity, and actively scanning for known CVEs."
      },
      {
        "id": 91,
        "question": "What does CI/CD stand for?",
        "options": [
          "Continuous Integration / Continuous Deployment",
          "Code Integration / Code Delivery",
          "Continuous Improvement / Continuous Development",
          "Compile Install / Compile Deploy"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "CI/CD bridges the gaps between development and operation activities and teams by enforcing automation in building, testing and deployment."
      },
      {
        "id": 92,
        "question": "What is the primary purpose of version control systems like Git?",
        "options": [
          "To deploy code",
          "To track changes in source code over time and facilitate collaboration",
          "To compile code",
          "To host websites"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Version control software keeps track of every modification to the code in a special kind of database."
      },
      {
        "id": 93,
        "question": "What is Docker primarily used for?",
        "options": [
          "Creating virtual machines",
          "Writing code",
          "Developing, shipping, and running applications in lightweight, portable containers",
          "Database management"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Docker uses OS-level virtualization to deliver software in packages called containers."
      },
      {
        "id": 94,
        "question": "What is the purpose of Jenkins in a DevOps pipeline?",
        "options": [
          "It is a database",
          "It is an automation server used to build, test, and deploy software reliably",
          "It is a container runtime",
          "It is a load balancer"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Jenkins is an open-source automation server that enables developers around the world to reliably build, test, and deploy their software."
      },
      {
        "id": 95,
        "question": "What is a CI/CD Pipeline?",
        "options": [
          "A physical cable connecting servers",
          "A set of automated processes that allow developers and DevOps professionals to reliably and efficiently compile, build, and deploy code",
          "A shell script",
          "A Git branch"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A pipeline automates the steps of delivering software, eliminating manual errors and standardizing feedback loops."
      },
      {
        "id": 96,
        "question": "What is Infrastructure as Code (IaC)?",
        "options": [
          "Writing applications in Assembly language",
          "Managing and provisioning computer data centers through machine-readable definition files, rather than physical hardware configuration",
          "Using Docker to run code",
          "A testing methodology"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "IaC allows you to automate the provisioning of infrastructure, ensuring consistency and version control (e.g., using Terraform or Ansible)."
      },
      {
        "id": 97,
        "question": "What is Kubernetes?",
        "options": [
          "A cloud provider",
          "An open-source system for automating deployment, scaling, and management of containerized applications",
          "A type of database",
          "A programming language"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Kubernetes (K8s) is a container orchestration platform that manages clusters of containerized applications."
      },
      {
        "id": 98,
        "question": "What is the main difference between a Virtual Machine (VM) and a Container?",
        "options": [
          "Containers are slower",
          "VMs virtualize the hardware, while containers virtualize the operating system",
          "Containers require a hypervisor",
          "VMs are open-source"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Containers share the host system's kernel, making them much more lightweight and faster to start than VMs, which run full guest OSes."
      },
      {
        "id": 99,
        "question": "What does a Reverse Proxy do?",
        "options": [
          "Connects local networks to the internet",
          "Directs client requests to the appropriate backend server and returns the server's response to the client",
          "Encrypts database queries",
          "Blocks incoming IP addresses"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "A reverse proxy sits in front of web servers and forwards client requests to those web servers, often providing load balancing and caching."
      },
      {
        "id": 100,
        "question": "Explain Blue-Green Deployment.",
        "options": [
          "A routing protocol",
          "A release management technique that reduces downtime and risk by running two identical production environments (Blue and Green)",
          "A UI design principle",
          "Deploying only on weekends"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Only one environment is live at a time. To deploy a new version, it is installed in the idle environment and tested. Then, traffic is routed to the new environment."
      },
      {
        "id": 101,
        "question": "How does Kubernetes handle Service Discovery internally?",
        "options": [
          "Using hardcoded IP addresses",
          "Through the internal DNS server (CoreDNS) which assigns DNS names to Services",
          "By querying the cloud provider API",
          "Using ARP broadcasts"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Kubernetes automatically assigns a DNS name to every Service and allows Pods to resolve that name to the Service's ClusterIP."
      },
      {
        "id": 102,
        "question": "What is GitOps?",
        "options": [
          "A way to commit code",
          "An operational framework that takes DevOps best practices used for application development and applies them to infrastructure automation using Git as the single source of truth",
          "A Git branch strategy",
          "An alternative to GitHub"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "In GitOps, infrastructure is declared in Git, and an automated agent (like ArgoCD) ensures the live environment matches the Git repository state."
      },
      {
        "id": 103,
        "question": "What is a Service Mesh?",
        "options": [
          "A physical network topology",
          "A dedicated infrastructure layer for facilitating service-to-service communications between services or microservices (e.g., Istio)",
          "A web framework",
          "A Docker container"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "A service mesh manages the complex communication between microservices, providing observability, traffic management, and security (mTLS) without changing application code."
      },
      {
        "id": 104,
        "question": "What is Chaos Engineering?",
        "options": [
          "Writing bad code on purpose",
          "The discipline of experimenting on a system in order to build confidence in the system's capability to withstand turbulent conditions in production",
          "Ignoring alerts",
          "A project management style"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Chaos engineering involves intentionally injecting failures (like killing servers or dropping network traffic) to test system resilience."
      },
      {
        "id": 105,
        "question": "How do you secure a Docker image pipeline?",
        "options": [
          "Only use public images",
          "Scan images for vulnerabilities, use multi-stage builds, sign images (Docker Content Trust), and use minimal base images",
          "Use a longer password",
          "Run containers as root"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Securing the pipeline involves minimizing the attack surface, validating integrity, and actively scanning for known CVEs."
      },
      {
        "id": 106,
        "question": "What does CI/CD stand for?",
        "options": [
          "Continuous Integration / Continuous Deployment",
          "Code Integration / Code Delivery",
          "Continuous Improvement / Continuous Development",
          "Compile Install / Compile Deploy"
        ],
        "correct": 0,
        "difficulty": "Easy",
        "explanation": "CI/CD bridges the gaps between development and operation activities and teams by enforcing automation in building, testing and deployment."
      },
      {
        "id": 107,
        "question": "What is the primary purpose of version control systems like Git?",
        "options": [
          "To deploy code",
          "To track changes in source code over time and facilitate collaboration",
          "To compile code",
          "To host websites"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Version control software keeps track of every modification to the code in a special kind of database."
      },
      {
        "id": 108,
        "question": "What is Docker primarily used for?",
        "options": [
          "Creating virtual machines",
          "Writing code",
          "Developing, shipping, and running applications in lightweight, portable containers",
          "Database management"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Docker uses OS-level virtualization to deliver software in packages called containers."
      },
      {
        "id": 109,
        "question": "What is the purpose of Jenkins in a DevOps pipeline?",
        "options": [
          "It is a database",
          "It is an automation server used to build, test, and deploy software reliably",
          "It is a container runtime",
          "It is a load balancer"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Jenkins is an open-source automation server that enables developers around the world to reliably build, test, and deploy their software."
      },
      {
        "id": 110,
        "question": "What is a CI/CD Pipeline?",
        "options": [
          "A physical cable connecting servers",
          "A set of automated processes that allow developers and DevOps professionals to reliably and efficiently compile, build, and deploy code",
          "A shell script",
          "A Git branch"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A pipeline automates the steps of delivering software, eliminating manual errors and standardizing feedback loops."
      },
      {
        "id": 111,
        "question": "What is Infrastructure as Code (IaC)?",
        "options": [
          "Writing applications in Assembly language",
          "Managing and provisioning computer data centers through machine-readable definition files, rather than physical hardware configuration",
          "Using Docker to run code",
          "A testing methodology"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "IaC allows you to automate the provisioning of infrastructure, ensuring consistency and version control (e.g., using Terraform or Ansible)."
      },
      {
        "id": 112,
        "question": "What is Kubernetes?",
        "options": [
          "A cloud provider",
          "An open-source system for automating deployment, scaling, and management of containerized applications",
          "A type of database",
          "A programming language"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Kubernetes (K8s) is a container orchestration platform that manages clusters of containerized applications."
      },
      {
        "id": 113,
        "question": "What is the main difference between a Virtual Machine (VM) and a Container?",
        "options": [
          "Containers are slower",
          "VMs virtualize the hardware, while containers virtualize the operating system",
          "Containers require a hypervisor",
          "VMs are open-source"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Containers share the host system's kernel, making them much more lightweight and faster to start than VMs, which run full guest OSes."
      },
      {
        "id": 114,
        "question": "What does a Reverse Proxy do?",
        "options": [
          "Connects local networks to the internet",
          "Directs client requests to the appropriate backend server and returns the server's response to the client",
          "Encrypts database queries",
          "Blocks incoming IP addresses"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "A reverse proxy sits in front of web servers and forwards client requests to those web servers, often providing load balancing and caching."
      },
      {
        "id": 115,
        "question": "Explain Blue-Green Deployment.",
        "options": [
          "A routing protocol",
          "A release management technique that reduces downtime and risk by running two identical production environments (Blue and Green)",
          "A UI design principle",
          "Deploying only on weekends"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Only one environment is live at a time. To deploy a new version, it is installed in the idle environment and tested. Then, traffic is routed to the new environment."
      },
      {
        "id": 116,
        "question": "How does Kubernetes handle Service Discovery internally?",
        "options": [
          "Using hardcoded IP addresses",
          "Through the internal DNS server (CoreDNS) which assigns DNS names to Services",
          "By querying the cloud provider API",
          "Using ARP broadcasts"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Kubernetes automatically assigns a DNS name to every Service and allows Pods to resolve that name to the Service's ClusterIP."
      },
      {
        "id": 117,
        "question": "What is GitOps?",
        "options": [
          "A way to commit code",
          "An operational framework that takes DevOps best practices used for application development and applies them to infrastructure automation using Git as the single source of truth",
          "A Git branch strategy",
          "An alternative to GitHub"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "In GitOps, infrastructure is declared in Git, and an automated agent (like ArgoCD) ensures the live environment matches the Git repository state."
      },
      {
        "id": 118,
        "question": "What is a Service Mesh?",
        "options": [
          "A physical network topology",
          "A dedicated infrastructure layer for facilitating service-to-service communications between services or microservices (e.g., Istio)",
          "A web framework",
          "A Docker container"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "A service mesh manages the complex communication between microservices, providing observability, traffic management, and security (mTLS) without changing application code."
      },
      {
        "id": 119,
        "question": "What is Chaos Engineering?",
        "options": [
          "Writing bad code on purpose",
          "The discipline of experimenting on a system in order to build confidence in the system's capability to withstand turbulent conditions in production",
          "Ignoring alerts",
          "A project management style"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Chaos engineering involves intentionally injecting failures (like killing servers or dropping network traffic) to test system resilience."
      },
      {
        "id": 120,
        "question": "How do you secure a Docker image pipeline?",
        "options": [
          "Only use public images",
          "Scan images for vulnerabilities, use multi-stage builds, sign images (Docker Content Trust), and use minimal base images",
          "Use a longer password",
          "Run containers as root"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Securing the pipeline involves minimizing the attack surface, validating integrity, and actively scanning for known CVEs."
      }
    ]
  },
  {
    "id": 8,
    "title": "Mobile App Development",
    "category": "Mobile",
    "difficulty": "All Levels",
    "duration": 60,
    "badge": "📱",
    "color": "from-rose-500 to-pink-700",
    "skills": [
      "React Native",
      "Flutter",
      "Swift",
      "Kotlin"
    ],
    "avgScore": 74,
    "attempts": 1100,
    "description": "Test your ability to build high-quality mobile applications for iOS and Android.",
    "questions": [
      {
        "id": 1,
        "question": "What is an APK file?",
        "options": [
          "Apple Package Kit",
          "Android Package Kit - the package file format used by the Android OS for distribution and installation of mobile apps",
          "A programming language",
          "A database format"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "APK is the file format used to install software on the Android operating system."
      },
      {
        "id": 2,
        "question": "What is the difference between Native and Cross-Platform app development?",
        "options": [
          "Native is for iOS, Cross-platform is for Android",
          "Native apps are built specifically for one platform using platform-specific languages, while cross-platform apps use a single codebase for multiple platforms",
          "Cross-platform apps are always faster",
          "Native apps run in browsers"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Native uses Swift/Kotlin for iOS/Android respectively. Cross-platform uses frameworks like React Native or Flutter to target both."
      },
      {
        "id": 3,
        "question": "Which programming language is primarily used for modern native iOS development?",
        "options": [
          "Java",
          "C#",
          "Swift",
          "Python"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Swift is a powerful and intuitive programming language created by Apple for building apps for iOS, Mac, Apple TV, and Apple Watch."
      },
      {
        "id": 4,
        "question": "What is the purpose of the AndroidManifest.xml file?",
        "options": [
          "To style the app",
          "To write Java code",
          "To declare essential information about the app to the Android build tools, Android OS, and Google Play",
          "To store user data"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The manifest file describes essential information about your app, including components (activities, services) and required permissions."
      },
      {
        "id": 5,
        "question": "What is an emulator in mobile development?",
        "options": [
          "A device you hold",
          "A software program that allows your computer to imitate the features of a mobile device for testing purposes",
          "A cloud server",
          "An app store"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Emulators simulate the hardware and OS of a mobile device so developers can test apps without needing a physical device."
      },
      {
        "id": 6,
        "question": "Explain how the React Native Bridge works.",
        "options": [
          "It translates JavaScript directly to machine code",
          "It allows asynchronous, serialized communication between the JavaScript thread and the Native (iOS/Android) thread",
          "It bridges the gap between web and desktop",
          "It compiles React code into Swift"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The bridge passes messages (JSON) between the JS thread and the native thread, allowing JS to control native UI components."
      },
      {
        "id": 7,
        "question": "Which of the following is a common State Management library used in mobile frameworks like React Native or Flutter?",
        "options": [
          "Express",
          "Redux (or BLoC in Flutter)",
          "TensorFlow",
          "PostgreSQL"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Redux is commonly used in React Native, and BLoC or Provider are common in Flutter to manage complex application state."
      },
      {
        "id": 8,
        "question": "How does memory management work in iOS development?",
        "options": [
          "Manual allocation and deallocation only",
          "Garbage Collection",
          "Automatic Reference Counting (ARC) which automatically tracks and manages the app's memory usage",
          "The OS handles it completely transparently"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "ARC automatically frees up the memory used by class instances when those instances are no longer needed, using reference counts."
      },
      {
        "id": 9,
        "question": "What is a Push Notification?",
        "options": [
          "A message sent from an app while it is open",
          "A message that pops up on a mobile device sent by an application publisher at any time, even if the app is closed",
          "An email sent to a user",
          "A local alarm"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Push notifications are used to deliver real-time updates, reminders, and engagement prompts to users."
      },
      {
        "id": 10,
        "question": "Which lifecycle method is triggered when an Android app goes to the background?",
        "options": [
          "onDestroy()",
          "onStart()",
          "onResume()",
          "onPause() / onStop()"
        ],
        "correct": 3,
        "difficulty": "Medium",
        "explanation": "When an activity is no longer in the foreground, `onPause()` is called, followed by `onStop()` if it is no longer visible."
      },
      {
        "id": 11,
        "question": "How would you optimize a React Native app that suffers from slow list scrolling?",
        "options": [
          "Use standard ScrollView for all lists",
          "Replace FlatList with a custom map function",
          "Use `FlatList` with optimized `initialNumToRender`, `maxToRenderPerBatch`, and pure components",
          "Rewrite the app in Java"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Optimizing FlatList props and ensuring items don't unnecessarily re-render are critical for React Native list performance."
      },
      {
        "id": 12,
        "question": "Explain Grand Central Dispatch (GCD) in iOS.",
        "options": [
          "A UI framework",
          "A low-level C API that manages concurrent operations by dispatching tasks to multiple multicore processors",
          "A database library",
          "A networking protocol"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "GCD provides a robust, easy-to-use asynchronous execution model, managing thread pools behind the scenes."
      },
      {
        "id": 13,
        "question": "How does Flutter render its UI differently than React Native?",
        "options": [
          "It uses the same native components via a bridge",
          "It uses WebViews exclusively",
          "Flutter bypasses the system UI components and draws its own widgets directly using the Skia (or Impeller) graphics engine",
          "It uses HTML Canvas"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Unlike React Native which controls native views, Flutter draws every pixel itself, ensuring absolute consistency across platforms."
      },
      {
        "id": 14,
        "question": "What is the best practice for securing sensitive data (like tokens) at rest in a mobile app?",
        "options": [
          "Store in SharedPreferences or UserDefaults in plain text",
          "Save to a local SQLite database",
          "Use the Android Keystore / iOS Keychain to securely encrypt and store sensitive data",
          "Write it to a local text file"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Keystore and Keychain provide hardware-backed encryption and secure storage mechanisms for highly sensitive data."
      },
      {
        "id": 15,
        "question": "What commonly causes Memory Leaks in Android apps?",
        "options": [
          "Using too many images",
          "Holding strong references to a Context (like an Activity) inside a long-running background thread or static variable",
          "Not using Kotlin",
          "Having too many activities"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "If a static object or background thread holds a reference to an Activity that has been destroyed, the garbage collector cannot free the Activity's memory."
      },
      {
        "id": 16,
        "question": "What is an APK file?",
        "options": [
          "Apple Package Kit",
          "Android Package Kit - the package file format used by the Android OS for distribution and installation of mobile apps",
          "A programming language",
          "A database format"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "APK is the file format used to install software on the Android operating system."
      },
      {
        "id": 17,
        "question": "What is the difference between Native and Cross-Platform app development?",
        "options": [
          "Native is for iOS, Cross-platform is for Android",
          "Native apps are built specifically for one platform using platform-specific languages, while cross-platform apps use a single codebase for multiple platforms",
          "Cross-platform apps are always faster",
          "Native apps run in browsers"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Native uses Swift/Kotlin for iOS/Android respectively. Cross-platform uses frameworks like React Native or Flutter to target both."
      },
      {
        "id": 18,
        "question": "Which programming language is primarily used for modern native iOS development?",
        "options": [
          "Java",
          "C#",
          "Swift",
          "Python"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Swift is a powerful and intuitive programming language created by Apple for building apps for iOS, Mac, Apple TV, and Apple Watch."
      },
      {
        "id": 19,
        "question": "What is the purpose of the AndroidManifest.xml file?",
        "options": [
          "To style the app",
          "To write Java code",
          "To declare essential information about the app to the Android build tools, Android OS, and Google Play",
          "To store user data"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The manifest file describes essential information about your app, including components (activities, services) and required permissions."
      },
      {
        "id": 20,
        "question": "What is an emulator in mobile development?",
        "options": [
          "A device you hold",
          "A software program that allows your computer to imitate the features of a mobile device for testing purposes",
          "A cloud server",
          "An app store"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Emulators simulate the hardware and OS of a mobile device so developers can test apps without needing a physical device."
      },
      {
        "id": 21,
        "question": "Explain how the React Native Bridge works.",
        "options": [
          "It translates JavaScript directly to machine code",
          "It allows asynchronous, serialized communication between the JavaScript thread and the Native (iOS/Android) thread",
          "It bridges the gap between web and desktop",
          "It compiles React code into Swift"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The bridge passes messages (JSON) between the JS thread and the native thread, allowing JS to control native UI components."
      },
      {
        "id": 22,
        "question": "Which of the following is a common State Management library used in mobile frameworks like React Native or Flutter?",
        "options": [
          "Express",
          "Redux (or BLoC in Flutter)",
          "TensorFlow",
          "PostgreSQL"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Redux is commonly used in React Native, and BLoC or Provider are common in Flutter to manage complex application state."
      },
      {
        "id": 23,
        "question": "How does memory management work in iOS development?",
        "options": [
          "Manual allocation and deallocation only",
          "Garbage Collection",
          "Automatic Reference Counting (ARC) which automatically tracks and manages the app's memory usage",
          "The OS handles it completely transparently"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "ARC automatically frees up the memory used by class instances when those instances are no longer needed, using reference counts."
      },
      {
        "id": 24,
        "question": "What is a Push Notification?",
        "options": [
          "A message sent from an app while it is open",
          "A message that pops up on a mobile device sent by an application publisher at any time, even if the app is closed",
          "An email sent to a user",
          "A local alarm"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Push notifications are used to deliver real-time updates, reminders, and engagement prompts to users."
      },
      {
        "id": 25,
        "question": "Which lifecycle method is triggered when an Android app goes to the background?",
        "options": [
          "onDestroy()",
          "onStart()",
          "onResume()",
          "onPause() / onStop()"
        ],
        "correct": 3,
        "difficulty": "Medium",
        "explanation": "When an activity is no longer in the foreground, `onPause()` is called, followed by `onStop()` if it is no longer visible."
      },
      {
        "id": 26,
        "question": "How would you optimize a React Native app that suffers from slow list scrolling?",
        "options": [
          "Use standard ScrollView for all lists",
          "Replace FlatList with a custom map function",
          "Use `FlatList` with optimized `initialNumToRender`, `maxToRenderPerBatch`, and pure components",
          "Rewrite the app in Java"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Optimizing FlatList props and ensuring items don't unnecessarily re-render are critical for React Native list performance."
      },
      {
        "id": 27,
        "question": "Explain Grand Central Dispatch (GCD) in iOS.",
        "options": [
          "A UI framework",
          "A low-level C API that manages concurrent operations by dispatching tasks to multiple multicore processors",
          "A database library",
          "A networking protocol"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "GCD provides a robust, easy-to-use asynchronous execution model, managing thread pools behind the scenes."
      },
      {
        "id": 28,
        "question": "How does Flutter render its UI differently than React Native?",
        "options": [
          "It uses the same native components via a bridge",
          "It uses WebViews exclusively",
          "Flutter bypasses the system UI components and draws its own widgets directly using the Skia (or Impeller) graphics engine",
          "It uses HTML Canvas"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Unlike React Native which controls native views, Flutter draws every pixel itself, ensuring absolute consistency across platforms."
      },
      {
        "id": 29,
        "question": "What is the best practice for securing sensitive data (like tokens) at rest in a mobile app?",
        "options": [
          "Store in SharedPreferences or UserDefaults in plain text",
          "Save to a local SQLite database",
          "Use the Android Keystore / iOS Keychain to securely encrypt and store sensitive data",
          "Write it to a local text file"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Keystore and Keychain provide hardware-backed encryption and secure storage mechanisms for highly sensitive data."
      },
      {
        "id": 30,
        "question": "What commonly causes Memory Leaks in Android apps?",
        "options": [
          "Using too many images",
          "Holding strong references to a Context (like an Activity) inside a long-running background thread or static variable",
          "Not using Kotlin",
          "Having too many activities"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "If a static object or background thread holds a reference to an Activity that has been destroyed, the garbage collector cannot free the Activity's memory."
      },
      {
        "id": 31,
        "question": "What is an APK file?",
        "options": [
          "Apple Package Kit",
          "Android Package Kit - the package file format used by the Android OS for distribution and installation of mobile apps",
          "A programming language",
          "A database format"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "APK is the file format used to install software on the Android operating system."
      },
      {
        "id": 32,
        "question": "What is the difference between Native and Cross-Platform app development?",
        "options": [
          "Native is for iOS, Cross-platform is for Android",
          "Native apps are built specifically for one platform using platform-specific languages, while cross-platform apps use a single codebase for multiple platforms",
          "Cross-platform apps are always faster",
          "Native apps run in browsers"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Native uses Swift/Kotlin for iOS/Android respectively. Cross-platform uses frameworks like React Native or Flutter to target both."
      },
      {
        "id": 33,
        "question": "Which programming language is primarily used for modern native iOS development?",
        "options": [
          "Java",
          "C#",
          "Swift",
          "Python"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Swift is a powerful and intuitive programming language created by Apple for building apps for iOS, Mac, Apple TV, and Apple Watch."
      },
      {
        "id": 34,
        "question": "What is the purpose of the AndroidManifest.xml file?",
        "options": [
          "To style the app",
          "To write Java code",
          "To declare essential information about the app to the Android build tools, Android OS, and Google Play",
          "To store user data"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The manifest file describes essential information about your app, including components (activities, services) and required permissions."
      },
      {
        "id": 35,
        "question": "What is an emulator in mobile development?",
        "options": [
          "A device you hold",
          "A software program that allows your computer to imitate the features of a mobile device for testing purposes",
          "A cloud server",
          "An app store"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Emulators simulate the hardware and OS of a mobile device so developers can test apps without needing a physical device."
      },
      {
        "id": 36,
        "question": "Explain how the React Native Bridge works.",
        "options": [
          "It translates JavaScript directly to machine code",
          "It allows asynchronous, serialized communication between the JavaScript thread and the Native (iOS/Android) thread",
          "It bridges the gap between web and desktop",
          "It compiles React code into Swift"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The bridge passes messages (JSON) between the JS thread and the native thread, allowing JS to control native UI components."
      },
      {
        "id": 37,
        "question": "Which of the following is a common State Management library used in mobile frameworks like React Native or Flutter?",
        "options": [
          "Express",
          "Redux (or BLoC in Flutter)",
          "TensorFlow",
          "PostgreSQL"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Redux is commonly used in React Native, and BLoC or Provider are common in Flutter to manage complex application state."
      },
      {
        "id": 38,
        "question": "How does memory management work in iOS development?",
        "options": [
          "Manual allocation and deallocation only",
          "Garbage Collection",
          "Automatic Reference Counting (ARC) which automatically tracks and manages the app's memory usage",
          "The OS handles it completely transparently"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "ARC automatically frees up the memory used by class instances when those instances are no longer needed, using reference counts."
      },
      {
        "id": 39,
        "question": "What is a Push Notification?",
        "options": [
          "A message sent from an app while it is open",
          "A message that pops up on a mobile device sent by an application publisher at any time, even if the app is closed",
          "An email sent to a user",
          "A local alarm"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Push notifications are used to deliver real-time updates, reminders, and engagement prompts to users."
      },
      {
        "id": 40,
        "question": "Which lifecycle method is triggered when an Android app goes to the background?",
        "options": [
          "onDestroy()",
          "onStart()",
          "onResume()",
          "onPause() / onStop()"
        ],
        "correct": 3,
        "difficulty": "Medium",
        "explanation": "When an activity is no longer in the foreground, `onPause()` is called, followed by `onStop()` if it is no longer visible."
      },
      {
        "id": 41,
        "question": "How would you optimize a React Native app that suffers from slow list scrolling?",
        "options": [
          "Use standard ScrollView for all lists",
          "Replace FlatList with a custom map function",
          "Use `FlatList` with optimized `initialNumToRender`, `maxToRenderPerBatch`, and pure components",
          "Rewrite the app in Java"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Optimizing FlatList props and ensuring items don't unnecessarily re-render are critical for React Native list performance."
      },
      {
        "id": 42,
        "question": "Explain Grand Central Dispatch (GCD) in iOS.",
        "options": [
          "A UI framework",
          "A low-level C API that manages concurrent operations by dispatching tasks to multiple multicore processors",
          "A database library",
          "A networking protocol"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "GCD provides a robust, easy-to-use asynchronous execution model, managing thread pools behind the scenes."
      },
      {
        "id": 43,
        "question": "How does Flutter render its UI differently than React Native?",
        "options": [
          "It uses the same native components via a bridge",
          "It uses WebViews exclusively",
          "Flutter bypasses the system UI components and draws its own widgets directly using the Skia (or Impeller) graphics engine",
          "It uses HTML Canvas"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Unlike React Native which controls native views, Flutter draws every pixel itself, ensuring absolute consistency across platforms."
      },
      {
        "id": 44,
        "question": "What is the best practice for securing sensitive data (like tokens) at rest in a mobile app?",
        "options": [
          "Store in SharedPreferences or UserDefaults in plain text",
          "Save to a local SQLite database",
          "Use the Android Keystore / iOS Keychain to securely encrypt and store sensitive data",
          "Write it to a local text file"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Keystore and Keychain provide hardware-backed encryption and secure storage mechanisms for highly sensitive data."
      },
      {
        "id": 45,
        "question": "What commonly causes Memory Leaks in Android apps?",
        "options": [
          "Using too many images",
          "Holding strong references to a Context (like an Activity) inside a long-running background thread or static variable",
          "Not using Kotlin",
          "Having too many activities"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "If a static object or background thread holds a reference to an Activity that has been destroyed, the garbage collector cannot free the Activity's memory."
      },
      {
        "id": 46,
        "question": "What is an APK file?",
        "options": [
          "Apple Package Kit",
          "Android Package Kit - the package file format used by the Android OS for distribution and installation of mobile apps",
          "A programming language",
          "A database format"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "APK is the file format used to install software on the Android operating system."
      },
      {
        "id": 47,
        "question": "What is the difference between Native and Cross-Platform app development?",
        "options": [
          "Native is for iOS, Cross-platform is for Android",
          "Native apps are built specifically for one platform using platform-specific languages, while cross-platform apps use a single codebase for multiple platforms",
          "Cross-platform apps are always faster",
          "Native apps run in browsers"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Native uses Swift/Kotlin for iOS/Android respectively. Cross-platform uses frameworks like React Native or Flutter to target both."
      },
      {
        "id": 48,
        "question": "Which programming language is primarily used for modern native iOS development?",
        "options": [
          "Java",
          "C#",
          "Swift",
          "Python"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Swift is a powerful and intuitive programming language created by Apple for building apps for iOS, Mac, Apple TV, and Apple Watch."
      },
      {
        "id": 49,
        "question": "What is the purpose of the AndroidManifest.xml file?",
        "options": [
          "To style the app",
          "To write Java code",
          "To declare essential information about the app to the Android build tools, Android OS, and Google Play",
          "To store user data"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The manifest file describes essential information about your app, including components (activities, services) and required permissions."
      },
      {
        "id": 50,
        "question": "What is an emulator in mobile development?",
        "options": [
          "A device you hold",
          "A software program that allows your computer to imitate the features of a mobile device for testing purposes",
          "A cloud server",
          "An app store"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Emulators simulate the hardware and OS of a mobile device so developers can test apps without needing a physical device."
      },
      {
        "id": 51,
        "question": "Explain how the React Native Bridge works.",
        "options": [
          "It translates JavaScript directly to machine code",
          "It allows asynchronous, serialized communication between the JavaScript thread and the Native (iOS/Android) thread",
          "It bridges the gap between web and desktop",
          "It compiles React code into Swift"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The bridge passes messages (JSON) between the JS thread and the native thread, allowing JS to control native UI components."
      },
      {
        "id": 52,
        "question": "Which of the following is a common State Management library used in mobile frameworks like React Native or Flutter?",
        "options": [
          "Express",
          "Redux (or BLoC in Flutter)",
          "TensorFlow",
          "PostgreSQL"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Redux is commonly used in React Native, and BLoC or Provider are common in Flutter to manage complex application state."
      },
      {
        "id": 53,
        "question": "How does memory management work in iOS development?",
        "options": [
          "Manual allocation and deallocation only",
          "Garbage Collection",
          "Automatic Reference Counting (ARC) which automatically tracks and manages the app's memory usage",
          "The OS handles it completely transparently"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "ARC automatically frees up the memory used by class instances when those instances are no longer needed, using reference counts."
      },
      {
        "id": 54,
        "question": "What is a Push Notification?",
        "options": [
          "A message sent from an app while it is open",
          "A message that pops up on a mobile device sent by an application publisher at any time, even if the app is closed",
          "An email sent to a user",
          "A local alarm"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Push notifications are used to deliver real-time updates, reminders, and engagement prompts to users."
      },
      {
        "id": 55,
        "question": "Which lifecycle method is triggered when an Android app goes to the background?",
        "options": [
          "onDestroy()",
          "onStart()",
          "onResume()",
          "onPause() / onStop()"
        ],
        "correct": 3,
        "difficulty": "Medium",
        "explanation": "When an activity is no longer in the foreground, `onPause()` is called, followed by `onStop()` if it is no longer visible."
      },
      {
        "id": 56,
        "question": "How would you optimize a React Native app that suffers from slow list scrolling?",
        "options": [
          "Use standard ScrollView for all lists",
          "Replace FlatList with a custom map function",
          "Use `FlatList` with optimized `initialNumToRender`, `maxToRenderPerBatch`, and pure components",
          "Rewrite the app in Java"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Optimizing FlatList props and ensuring items don't unnecessarily re-render are critical for React Native list performance."
      },
      {
        "id": 57,
        "question": "Explain Grand Central Dispatch (GCD) in iOS.",
        "options": [
          "A UI framework",
          "A low-level C API that manages concurrent operations by dispatching tasks to multiple multicore processors",
          "A database library",
          "A networking protocol"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "GCD provides a robust, easy-to-use asynchronous execution model, managing thread pools behind the scenes."
      },
      {
        "id": 58,
        "question": "How does Flutter render its UI differently than React Native?",
        "options": [
          "It uses the same native components via a bridge",
          "It uses WebViews exclusively",
          "Flutter bypasses the system UI components and draws its own widgets directly using the Skia (or Impeller) graphics engine",
          "It uses HTML Canvas"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Unlike React Native which controls native views, Flutter draws every pixel itself, ensuring absolute consistency across platforms."
      },
      {
        "id": 59,
        "question": "What is the best practice for securing sensitive data (like tokens) at rest in a mobile app?",
        "options": [
          "Store in SharedPreferences or UserDefaults in plain text",
          "Save to a local SQLite database",
          "Use the Android Keystore / iOS Keychain to securely encrypt and store sensitive data",
          "Write it to a local text file"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Keystore and Keychain provide hardware-backed encryption and secure storage mechanisms for highly sensitive data."
      },
      {
        "id": 60,
        "question": "What commonly causes Memory Leaks in Android apps?",
        "options": [
          "Using too many images",
          "Holding strong references to a Context (like an Activity) inside a long-running background thread or static variable",
          "Not using Kotlin",
          "Having too many activities"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "If a static object or background thread holds a reference to an Activity that has been destroyed, the garbage collector cannot free the Activity's memory."
      },
      {
        "id": 61,
        "question": "What is an APK file?",
        "options": [
          "Apple Package Kit",
          "Android Package Kit - the package file format used by the Android OS for distribution and installation of mobile apps",
          "A programming language",
          "A database format"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "APK is the file format used to install software on the Android operating system."
      },
      {
        "id": 62,
        "question": "What is the difference between Native and Cross-Platform app development?",
        "options": [
          "Native is for iOS, Cross-platform is for Android",
          "Native apps are built specifically for one platform using platform-specific languages, while cross-platform apps use a single codebase for multiple platforms",
          "Cross-platform apps are always faster",
          "Native apps run in browsers"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Native uses Swift/Kotlin for iOS/Android respectively. Cross-platform uses frameworks like React Native or Flutter to target both."
      },
      {
        "id": 63,
        "question": "Which programming language is primarily used for modern native iOS development?",
        "options": [
          "Java",
          "C#",
          "Swift",
          "Python"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Swift is a powerful and intuitive programming language created by Apple for building apps for iOS, Mac, Apple TV, and Apple Watch."
      },
      {
        "id": 64,
        "question": "What is the purpose of the AndroidManifest.xml file?",
        "options": [
          "To style the app",
          "To write Java code",
          "To declare essential information about the app to the Android build tools, Android OS, and Google Play",
          "To store user data"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The manifest file describes essential information about your app, including components (activities, services) and required permissions."
      },
      {
        "id": 65,
        "question": "What is an emulator in mobile development?",
        "options": [
          "A device you hold",
          "A software program that allows your computer to imitate the features of a mobile device for testing purposes",
          "A cloud server",
          "An app store"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Emulators simulate the hardware and OS of a mobile device so developers can test apps without needing a physical device."
      },
      {
        "id": 66,
        "question": "Explain how the React Native Bridge works.",
        "options": [
          "It translates JavaScript directly to machine code",
          "It allows asynchronous, serialized communication between the JavaScript thread and the Native (iOS/Android) thread",
          "It bridges the gap between web and desktop",
          "It compiles React code into Swift"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The bridge passes messages (JSON) between the JS thread and the native thread, allowing JS to control native UI components."
      },
      {
        "id": 67,
        "question": "Which of the following is a common State Management library used in mobile frameworks like React Native or Flutter?",
        "options": [
          "Express",
          "Redux (or BLoC in Flutter)",
          "TensorFlow",
          "PostgreSQL"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Redux is commonly used in React Native, and BLoC or Provider are common in Flutter to manage complex application state."
      },
      {
        "id": 68,
        "question": "How does memory management work in iOS development?",
        "options": [
          "Manual allocation and deallocation only",
          "Garbage Collection",
          "Automatic Reference Counting (ARC) which automatically tracks and manages the app's memory usage",
          "The OS handles it completely transparently"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "ARC automatically frees up the memory used by class instances when those instances are no longer needed, using reference counts."
      },
      {
        "id": 69,
        "question": "What is a Push Notification?",
        "options": [
          "A message sent from an app while it is open",
          "A message that pops up on a mobile device sent by an application publisher at any time, even if the app is closed",
          "An email sent to a user",
          "A local alarm"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Push notifications are used to deliver real-time updates, reminders, and engagement prompts to users."
      },
      {
        "id": 70,
        "question": "Which lifecycle method is triggered when an Android app goes to the background?",
        "options": [
          "onDestroy()",
          "onStart()",
          "onResume()",
          "onPause() / onStop()"
        ],
        "correct": 3,
        "difficulty": "Medium",
        "explanation": "When an activity is no longer in the foreground, `onPause()` is called, followed by `onStop()` if it is no longer visible."
      },
      {
        "id": 71,
        "question": "How would you optimize a React Native app that suffers from slow list scrolling?",
        "options": [
          "Use standard ScrollView for all lists",
          "Replace FlatList with a custom map function",
          "Use `FlatList` with optimized `initialNumToRender`, `maxToRenderPerBatch`, and pure components",
          "Rewrite the app in Java"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Optimizing FlatList props and ensuring items don't unnecessarily re-render are critical for React Native list performance."
      },
      {
        "id": 72,
        "question": "Explain Grand Central Dispatch (GCD) in iOS.",
        "options": [
          "A UI framework",
          "A low-level C API that manages concurrent operations by dispatching tasks to multiple multicore processors",
          "A database library",
          "A networking protocol"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "GCD provides a robust, easy-to-use asynchronous execution model, managing thread pools behind the scenes."
      },
      {
        "id": 73,
        "question": "How does Flutter render its UI differently than React Native?",
        "options": [
          "It uses the same native components via a bridge",
          "It uses WebViews exclusively",
          "Flutter bypasses the system UI components and draws its own widgets directly using the Skia (or Impeller) graphics engine",
          "It uses HTML Canvas"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Unlike React Native which controls native views, Flutter draws every pixel itself, ensuring absolute consistency across platforms."
      },
      {
        "id": 74,
        "question": "What is the best practice for securing sensitive data (like tokens) at rest in a mobile app?",
        "options": [
          "Store in SharedPreferences or UserDefaults in plain text",
          "Save to a local SQLite database",
          "Use the Android Keystore / iOS Keychain to securely encrypt and store sensitive data",
          "Write it to a local text file"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Keystore and Keychain provide hardware-backed encryption and secure storage mechanisms for highly sensitive data."
      },
      {
        "id": 75,
        "question": "What commonly causes Memory Leaks in Android apps?",
        "options": [
          "Using too many images",
          "Holding strong references to a Context (like an Activity) inside a long-running background thread or static variable",
          "Not using Kotlin",
          "Having too many activities"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "If a static object or background thread holds a reference to an Activity that has been destroyed, the garbage collector cannot free the Activity's memory."
      },
      {
        "id": 76,
        "question": "What is an APK file?",
        "options": [
          "Apple Package Kit",
          "Android Package Kit - the package file format used by the Android OS for distribution and installation of mobile apps",
          "A programming language",
          "A database format"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "APK is the file format used to install software on the Android operating system."
      },
      {
        "id": 77,
        "question": "What is the difference between Native and Cross-Platform app development?",
        "options": [
          "Native is for iOS, Cross-platform is for Android",
          "Native apps are built specifically for one platform using platform-specific languages, while cross-platform apps use a single codebase for multiple platforms",
          "Cross-platform apps are always faster",
          "Native apps run in browsers"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Native uses Swift/Kotlin for iOS/Android respectively. Cross-platform uses frameworks like React Native or Flutter to target both."
      },
      {
        "id": 78,
        "question": "Which programming language is primarily used for modern native iOS development?",
        "options": [
          "Java",
          "C#",
          "Swift",
          "Python"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Swift is a powerful and intuitive programming language created by Apple for building apps for iOS, Mac, Apple TV, and Apple Watch."
      },
      {
        "id": 79,
        "question": "What is the purpose of the AndroidManifest.xml file?",
        "options": [
          "To style the app",
          "To write Java code",
          "To declare essential information about the app to the Android build tools, Android OS, and Google Play",
          "To store user data"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The manifest file describes essential information about your app, including components (activities, services) and required permissions."
      },
      {
        "id": 80,
        "question": "What is an emulator in mobile development?",
        "options": [
          "A device you hold",
          "A software program that allows your computer to imitate the features of a mobile device for testing purposes",
          "A cloud server",
          "An app store"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Emulators simulate the hardware and OS of a mobile device so developers can test apps without needing a physical device."
      },
      {
        "id": 81,
        "question": "Explain how the React Native Bridge works.",
        "options": [
          "It translates JavaScript directly to machine code",
          "It allows asynchronous, serialized communication between the JavaScript thread and the Native (iOS/Android) thread",
          "It bridges the gap between web and desktop",
          "It compiles React code into Swift"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The bridge passes messages (JSON) between the JS thread and the native thread, allowing JS to control native UI components."
      },
      {
        "id": 82,
        "question": "Which of the following is a common State Management library used in mobile frameworks like React Native or Flutter?",
        "options": [
          "Express",
          "Redux (or BLoC in Flutter)",
          "TensorFlow",
          "PostgreSQL"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Redux is commonly used in React Native, and BLoC or Provider are common in Flutter to manage complex application state."
      },
      {
        "id": 83,
        "question": "How does memory management work in iOS development?",
        "options": [
          "Manual allocation and deallocation only",
          "Garbage Collection",
          "Automatic Reference Counting (ARC) which automatically tracks and manages the app's memory usage",
          "The OS handles it completely transparently"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "ARC automatically frees up the memory used by class instances when those instances are no longer needed, using reference counts."
      },
      {
        "id": 84,
        "question": "What is a Push Notification?",
        "options": [
          "A message sent from an app while it is open",
          "A message that pops up on a mobile device sent by an application publisher at any time, even if the app is closed",
          "An email sent to a user",
          "A local alarm"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Push notifications are used to deliver real-time updates, reminders, and engagement prompts to users."
      },
      {
        "id": 85,
        "question": "Which lifecycle method is triggered when an Android app goes to the background?",
        "options": [
          "onDestroy()",
          "onStart()",
          "onResume()",
          "onPause() / onStop()"
        ],
        "correct": 3,
        "difficulty": "Medium",
        "explanation": "When an activity is no longer in the foreground, `onPause()` is called, followed by `onStop()` if it is no longer visible."
      },
      {
        "id": 86,
        "question": "How would you optimize a React Native app that suffers from slow list scrolling?",
        "options": [
          "Use standard ScrollView for all lists",
          "Replace FlatList with a custom map function",
          "Use `FlatList` with optimized `initialNumToRender`, `maxToRenderPerBatch`, and pure components",
          "Rewrite the app in Java"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Optimizing FlatList props and ensuring items don't unnecessarily re-render are critical for React Native list performance."
      },
      {
        "id": 87,
        "question": "Explain Grand Central Dispatch (GCD) in iOS.",
        "options": [
          "A UI framework",
          "A low-level C API that manages concurrent operations by dispatching tasks to multiple multicore processors",
          "A database library",
          "A networking protocol"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "GCD provides a robust, easy-to-use asynchronous execution model, managing thread pools behind the scenes."
      },
      {
        "id": 88,
        "question": "How does Flutter render its UI differently than React Native?",
        "options": [
          "It uses the same native components via a bridge",
          "It uses WebViews exclusively",
          "Flutter bypasses the system UI components and draws its own widgets directly using the Skia (or Impeller) graphics engine",
          "It uses HTML Canvas"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Unlike React Native which controls native views, Flutter draws every pixel itself, ensuring absolute consistency across platforms."
      },
      {
        "id": 89,
        "question": "What is the best practice for securing sensitive data (like tokens) at rest in a mobile app?",
        "options": [
          "Store in SharedPreferences or UserDefaults in plain text",
          "Save to a local SQLite database",
          "Use the Android Keystore / iOS Keychain to securely encrypt and store sensitive data",
          "Write it to a local text file"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Keystore and Keychain provide hardware-backed encryption and secure storage mechanisms for highly sensitive data."
      },
      {
        "id": 90,
        "question": "What commonly causes Memory Leaks in Android apps?",
        "options": [
          "Using too many images",
          "Holding strong references to a Context (like an Activity) inside a long-running background thread or static variable",
          "Not using Kotlin",
          "Having too many activities"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "If a static object or background thread holds a reference to an Activity that has been destroyed, the garbage collector cannot free the Activity's memory."
      },
      {
        "id": 91,
        "question": "What is an APK file?",
        "options": [
          "Apple Package Kit",
          "Android Package Kit - the package file format used by the Android OS for distribution and installation of mobile apps",
          "A programming language",
          "A database format"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "APK is the file format used to install software on the Android operating system."
      },
      {
        "id": 92,
        "question": "What is the difference between Native and Cross-Platform app development?",
        "options": [
          "Native is for iOS, Cross-platform is for Android",
          "Native apps are built specifically for one platform using platform-specific languages, while cross-platform apps use a single codebase for multiple platforms",
          "Cross-platform apps are always faster",
          "Native apps run in browsers"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Native uses Swift/Kotlin for iOS/Android respectively. Cross-platform uses frameworks like React Native or Flutter to target both."
      },
      {
        "id": 93,
        "question": "Which programming language is primarily used for modern native iOS development?",
        "options": [
          "Java",
          "C#",
          "Swift",
          "Python"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Swift is a powerful and intuitive programming language created by Apple for building apps for iOS, Mac, Apple TV, and Apple Watch."
      },
      {
        "id": 94,
        "question": "What is the purpose of the AndroidManifest.xml file?",
        "options": [
          "To style the app",
          "To write Java code",
          "To declare essential information about the app to the Android build tools, Android OS, and Google Play",
          "To store user data"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The manifest file describes essential information about your app, including components (activities, services) and required permissions."
      },
      {
        "id": 95,
        "question": "What is an emulator in mobile development?",
        "options": [
          "A device you hold",
          "A software program that allows your computer to imitate the features of a mobile device for testing purposes",
          "A cloud server",
          "An app store"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Emulators simulate the hardware and OS of a mobile device so developers can test apps without needing a physical device."
      },
      {
        "id": 96,
        "question": "Explain how the React Native Bridge works.",
        "options": [
          "It translates JavaScript directly to machine code",
          "It allows asynchronous, serialized communication between the JavaScript thread and the Native (iOS/Android) thread",
          "It bridges the gap between web and desktop",
          "It compiles React code into Swift"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The bridge passes messages (JSON) between the JS thread and the native thread, allowing JS to control native UI components."
      },
      {
        "id": 97,
        "question": "Which of the following is a common State Management library used in mobile frameworks like React Native or Flutter?",
        "options": [
          "Express",
          "Redux (or BLoC in Flutter)",
          "TensorFlow",
          "PostgreSQL"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Redux is commonly used in React Native, and BLoC or Provider are common in Flutter to manage complex application state."
      },
      {
        "id": 98,
        "question": "How does memory management work in iOS development?",
        "options": [
          "Manual allocation and deallocation only",
          "Garbage Collection",
          "Automatic Reference Counting (ARC) which automatically tracks and manages the app's memory usage",
          "The OS handles it completely transparently"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "ARC automatically frees up the memory used by class instances when those instances are no longer needed, using reference counts."
      },
      {
        "id": 99,
        "question": "What is a Push Notification?",
        "options": [
          "A message sent from an app while it is open",
          "A message that pops up on a mobile device sent by an application publisher at any time, even if the app is closed",
          "An email sent to a user",
          "A local alarm"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Push notifications are used to deliver real-time updates, reminders, and engagement prompts to users."
      },
      {
        "id": 100,
        "question": "Which lifecycle method is triggered when an Android app goes to the background?",
        "options": [
          "onDestroy()",
          "onStart()",
          "onResume()",
          "onPause() / onStop()"
        ],
        "correct": 3,
        "difficulty": "Medium",
        "explanation": "When an activity is no longer in the foreground, `onPause()` is called, followed by `onStop()` if it is no longer visible."
      },
      {
        "id": 101,
        "question": "How would you optimize a React Native app that suffers from slow list scrolling?",
        "options": [
          "Use standard ScrollView for all lists",
          "Replace FlatList with a custom map function",
          "Use `FlatList` with optimized `initialNumToRender`, `maxToRenderPerBatch`, and pure components",
          "Rewrite the app in Java"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Optimizing FlatList props and ensuring items don't unnecessarily re-render are critical for React Native list performance."
      },
      {
        "id": 102,
        "question": "Explain Grand Central Dispatch (GCD) in iOS.",
        "options": [
          "A UI framework",
          "A low-level C API that manages concurrent operations by dispatching tasks to multiple multicore processors",
          "A database library",
          "A networking protocol"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "GCD provides a robust, easy-to-use asynchronous execution model, managing thread pools behind the scenes."
      },
      {
        "id": 103,
        "question": "How does Flutter render its UI differently than React Native?",
        "options": [
          "It uses the same native components via a bridge",
          "It uses WebViews exclusively",
          "Flutter bypasses the system UI components and draws its own widgets directly using the Skia (or Impeller) graphics engine",
          "It uses HTML Canvas"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Unlike React Native which controls native views, Flutter draws every pixel itself, ensuring absolute consistency across platforms."
      },
      {
        "id": 104,
        "question": "What is the best practice for securing sensitive data (like tokens) at rest in a mobile app?",
        "options": [
          "Store in SharedPreferences or UserDefaults in plain text",
          "Save to a local SQLite database",
          "Use the Android Keystore / iOS Keychain to securely encrypt and store sensitive data",
          "Write it to a local text file"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Keystore and Keychain provide hardware-backed encryption and secure storage mechanisms for highly sensitive data."
      },
      {
        "id": 105,
        "question": "What commonly causes Memory Leaks in Android apps?",
        "options": [
          "Using too many images",
          "Holding strong references to a Context (like an Activity) inside a long-running background thread or static variable",
          "Not using Kotlin",
          "Having too many activities"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "If a static object or background thread holds a reference to an Activity that has been destroyed, the garbage collector cannot free the Activity's memory."
      },
      {
        "id": 106,
        "question": "What is an APK file?",
        "options": [
          "Apple Package Kit",
          "Android Package Kit - the package file format used by the Android OS for distribution and installation of mobile apps",
          "A programming language",
          "A database format"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "APK is the file format used to install software on the Android operating system."
      },
      {
        "id": 107,
        "question": "What is the difference between Native and Cross-Platform app development?",
        "options": [
          "Native is for iOS, Cross-platform is for Android",
          "Native apps are built specifically for one platform using platform-specific languages, while cross-platform apps use a single codebase for multiple platforms",
          "Cross-platform apps are always faster",
          "Native apps run in browsers"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Native uses Swift/Kotlin for iOS/Android respectively. Cross-platform uses frameworks like React Native or Flutter to target both."
      },
      {
        "id": 108,
        "question": "Which programming language is primarily used for modern native iOS development?",
        "options": [
          "Java",
          "C#",
          "Swift",
          "Python"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "Swift is a powerful and intuitive programming language created by Apple for building apps for iOS, Mac, Apple TV, and Apple Watch."
      },
      {
        "id": 109,
        "question": "What is the purpose of the AndroidManifest.xml file?",
        "options": [
          "To style the app",
          "To write Java code",
          "To declare essential information about the app to the Android build tools, Android OS, and Google Play",
          "To store user data"
        ],
        "correct": 2,
        "difficulty": "Easy",
        "explanation": "The manifest file describes essential information about your app, including components (activities, services) and required permissions."
      },
      {
        "id": 110,
        "question": "What is an emulator in mobile development?",
        "options": [
          "A device you hold",
          "A software program that allows your computer to imitate the features of a mobile device for testing purposes",
          "A cloud server",
          "An app store"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Emulators simulate the hardware and OS of a mobile device so developers can test apps without needing a physical device."
      },
      {
        "id": 111,
        "question": "Explain how the React Native Bridge works.",
        "options": [
          "It translates JavaScript directly to machine code",
          "It allows asynchronous, serialized communication between the JavaScript thread and the Native (iOS/Android) thread",
          "It bridges the gap between web and desktop",
          "It compiles React code into Swift"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The bridge passes messages (JSON) between the JS thread and the native thread, allowing JS to control native UI components."
      },
      {
        "id": 112,
        "question": "Which of the following is a common State Management library used in mobile frameworks like React Native or Flutter?",
        "options": [
          "Express",
          "Redux (or BLoC in Flutter)",
          "TensorFlow",
          "PostgreSQL"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Redux is commonly used in React Native, and BLoC or Provider are common in Flutter to manage complex application state."
      },
      {
        "id": 113,
        "question": "How does memory management work in iOS development?",
        "options": [
          "Manual allocation and deallocation only",
          "Garbage Collection",
          "Automatic Reference Counting (ARC) which automatically tracks and manages the app's memory usage",
          "The OS handles it completely transparently"
        ],
        "correct": 2,
        "difficulty": "Medium",
        "explanation": "ARC automatically frees up the memory used by class instances when those instances are no longer needed, using reference counts."
      },
      {
        "id": 114,
        "question": "What is a Push Notification?",
        "options": [
          "A message sent from an app while it is open",
          "A message that pops up on a mobile device sent by an application publisher at any time, even if the app is closed",
          "An email sent to a user",
          "A local alarm"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Push notifications are used to deliver real-time updates, reminders, and engagement prompts to users."
      },
      {
        "id": 115,
        "question": "Which lifecycle method is triggered when an Android app goes to the background?",
        "options": [
          "onDestroy()",
          "onStart()",
          "onResume()",
          "onPause() / onStop()"
        ],
        "correct": 3,
        "difficulty": "Medium",
        "explanation": "When an activity is no longer in the foreground, `onPause()` is called, followed by `onStop()` if it is no longer visible."
      },
      {
        "id": 116,
        "question": "How would you optimize a React Native app that suffers from slow list scrolling?",
        "options": [
          "Use standard ScrollView for all lists",
          "Replace FlatList with a custom map function",
          "Use `FlatList` with optimized `initialNumToRender`, `maxToRenderPerBatch`, and pure components",
          "Rewrite the app in Java"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Optimizing FlatList props and ensuring items don't unnecessarily re-render are critical for React Native list performance."
      },
      {
        "id": 117,
        "question": "Explain Grand Central Dispatch (GCD) in iOS.",
        "options": [
          "A UI framework",
          "A low-level C API that manages concurrent operations by dispatching tasks to multiple multicore processors",
          "A database library",
          "A networking protocol"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "GCD provides a robust, easy-to-use asynchronous execution model, managing thread pools behind the scenes."
      },
      {
        "id": 118,
        "question": "How does Flutter render its UI differently than React Native?",
        "options": [
          "It uses the same native components via a bridge",
          "It uses WebViews exclusively",
          "Flutter bypasses the system UI components and draws its own widgets directly using the Skia (or Impeller) graphics engine",
          "It uses HTML Canvas"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Unlike React Native which controls native views, Flutter draws every pixel itself, ensuring absolute consistency across platforms."
      },
      {
        "id": 119,
        "question": "What is the best practice for securing sensitive data (like tokens) at rest in a mobile app?",
        "options": [
          "Store in SharedPreferences or UserDefaults in plain text",
          "Save to a local SQLite database",
          "Use the Android Keystore / iOS Keychain to securely encrypt and store sensitive data",
          "Write it to a local text file"
        ],
        "correct": 2,
        "difficulty": "Hard",
        "explanation": "Keystore and Keychain provide hardware-backed encryption and secure storage mechanisms for highly sensitive data."
      },
      {
        "id": 120,
        "question": "What commonly causes Memory Leaks in Android apps?",
        "options": [
          "Using too many images",
          "Holding strong references to a Context (like an Activity) inside a long-running background thread or static variable",
          "Not using Kotlin",
          "Having too many activities"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "If a static object or background thread holds a reference to an Activity that has been destroyed, the garbage collector cannot free the Activity's memory."
      }
    ]
  },
  {
    "id": 9,
    "title": "Data Engineering",
    "category": "Data Science",
    "difficulty": "All Levels",
    "duration": 90,
    "badge": "⚙️",
    "color": "from-amber-500 to-orange-700",
    "skills": [
      "ETL",
      "Spark",
      "Hadoop",
      "Data Warehousing"
    ],
    "avgScore": 71,
    "attempts": 800,
    "description": "Assess your data pipeline construction and large-scale data processing capabilities.",
    "questions": [
      {
        "id": 1,
        "question": "What does ETL stand for?",
        "options": [
          "Extract, Test, Load",
          "Extract, Transform, Load",
          "Entity, Table, Logic",
          "Execute, Transform, Loop"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "ETL is the process of extracting data from systems, transforming it into a clean/usable format, and loading it into a data warehouse."
      },
      {
        "id": 2,
        "question": "What is a Data Warehouse?",
        "options": [
          "A warehouse storing physical hard drives",
          "A central repository of integrated data from one or more disparate sources used for reporting and data analysis",
          "A real-time transactional database",
          "A file system"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Data warehouses store historical data in a structured format optimized for complex analytical queries (OLAP)."
      },
      {
        "id": 3,
        "question": "What is generally considered \"Big Data\"?",
        "options": [
          "Any file over 1GB",
          "Data characterized by the 3 Vs: high Volume, Velocity, and Variety",
          "Data stored on a mainframe",
          "Data used in Excel"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Big Data refers to data sets that are too large or complex to be dealt with by traditional data-processing application software."
      },
      {
        "id": 4,
        "question": "What is a data pipeline?",
        "options": [
          "An internet cable",
          "A set of actions that ingest raw data from disparate sources and move the data to a destination for storage and analysis",
          "A SQL query",
          "A database index"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A data pipeline automates the extraction, transformation, and loading of data between systems."
      },
      {
        "id": 5,
        "question": "What is the difference between structured and unstructured data?",
        "options": [
          "Structured data is encrypted, unstructured is not",
          "Structured data resides in fixed fields within a record or file (like a relational database); unstructured data does not (like text or video)",
          "Unstructured data is always bigger",
          "There is no difference"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Structured data fits neatly into tables and columns. Unstructured data, like emails, logs, and media, lacks a predefined data model."
      },
      {
        "id": 6,
        "question": "What is Apache Spark?",
        "options": [
          "A SQL database",
          "An open-source, distributed computing system used for big data processing and analytics",
          "A data visualization tool",
          "A web server"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Spark is an analytics engine for large-scale data processing that processes data in-memory for fast performance."
      },
      {
        "id": 7,
        "question": "How does a Data Lake differ from a Data Warehouse?",
        "options": [
          "A Data Lake stores raw, unprocessed data in its native format, while a Warehouse stores structured, processed data",
          "A Data Lake is smaller than a Warehouse",
          "A Data Lake only stores images",
          "They are synonyms"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Data Lakes use a \"schema-on-read\" approach, allowing you to store any type of data and apply structure only when you analyze it."
      },
      {
        "id": 8,
        "question": "What is a Star Schema in data warehousing?",
        "options": [
          "A way to draw graphs",
          "A database design where a central fact table is connected to multiple dimension tables, resembling a star",
          "A schema used exclusively for NoSQL",
          "A security model"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The star schema is the simplest style of data mart schema, widely used because it optimizes query performance for analytics."
      },
      {
        "id": 9,
        "question": "What is Apache Kafka primarily used for?",
        "options": [
          "Running web applications",
          "Building real-time streaming data pipelines and applications that adapt to data streams",
          "Storing static files",
          "Relational database management"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Kafka is a distributed event streaming platform capable of handling trillions of events a day."
      },
      {
        "id": 10,
        "question": "What is the difference between batch and stream processing?",
        "options": [
          "Batch processes small data, stream processes large data",
          "Batch processing handles data in large, scheduled chunks; Stream processing handles data continuously as it arrives in real-time",
          "Batch is faster than stream",
          "Batch is only used for video"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Batch processing is best for daily/weekly reports, while stream processing is necessary for real-time dashboards and fraud detection."
      },
      {
        "id": 11,
        "question": "Explain the MapReduce paradigm.",
        "options": [
          "A way to reduce the size of a map",
          "A programming model where \"Map\" filters/sorts data and \"Reduce\" performs summary operations across distributed nodes",
          "A type of neural network",
          "A SQL command"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "MapReduce allows massive scalability across hundreds or thousands of servers in a Hadoop cluster."
      },
      {
        "id": 12,
        "question": "How do columnar databases optimize analytical queries?",
        "options": [
          "By storing data row by row to keep records together",
          "By storing data by columns rather than rows, allowing high compression and reducing disk I/O when querying specific fields",
          "By keeping everything in RAM",
          "By not using indexes"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Columnar databases (like Redshift or BigQuery) drastically speed up analytical queries (which typically select a few columns across millions of rows) by reading only the necessary column data."
      },
      {
        "id": 13,
        "question": "What is \"data skew\" in distributed computing systems?",
        "options": [
          "When data is corrupted",
          "An imbalance in the distribution of data across partitions, causing some nodes to process significantly more data than others",
          "When data types are mixed up",
          "A security vulnerability"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Data skew creates straggler tasks—while most nodes finish quickly, the system must wait for the overloaded node to finish, bottlenecking the entire job."
      },
      {
        "id": 14,
        "question": "Explain \"Exactly-once\" semantics in stream processing.",
        "options": [
          "Data is processed once and deleted",
          "A guarantee that a stream processing system will process every event exactly once, even in the event of system failures",
          "A rule that users can only log in once",
          "A method of hashing"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Achieving exactly-once semantics requires complex coordination (like transactional writes and idempotent operations) to ensure no data is lost or duplicated during failures."
      },
      {
        "id": 15,
        "question": "What fundamentally distinguishes Snowflake's architecture from traditional on-premise Data Warehouses?",
        "options": [
          "It does not use SQL",
          "It physically separates compute and storage, allowing both to scale independently in the cloud",
          "It only runs on Linux",
          "It uses row-based storage"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Snowflake's separation of compute (virtual warehouses) and storage (cloud blob storage) allows users to pay for only the compute they use and seamlessly scale resources up or down without migrating data."
      },
      {
        "id": 16,
        "question": "What does ETL stand for?",
        "options": [
          "Extract, Test, Load",
          "Extract, Transform, Load",
          "Entity, Table, Logic",
          "Execute, Transform, Loop"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "ETL is the process of extracting data from systems, transforming it into a clean/usable format, and loading it into a data warehouse."
      },
      {
        "id": 17,
        "question": "What is a Data Warehouse?",
        "options": [
          "A warehouse storing physical hard drives",
          "A central repository of integrated data from one or more disparate sources used for reporting and data analysis",
          "A real-time transactional database",
          "A file system"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Data warehouses store historical data in a structured format optimized for complex analytical queries (OLAP)."
      },
      {
        "id": 18,
        "question": "What is generally considered \"Big Data\"?",
        "options": [
          "Any file over 1GB",
          "Data characterized by the 3 Vs: high Volume, Velocity, and Variety",
          "Data stored on a mainframe",
          "Data used in Excel"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Big Data refers to data sets that are too large or complex to be dealt with by traditional data-processing application software."
      },
      {
        "id": 19,
        "question": "What is a data pipeline?",
        "options": [
          "An internet cable",
          "A set of actions that ingest raw data from disparate sources and move the data to a destination for storage and analysis",
          "A SQL query",
          "A database index"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A data pipeline automates the extraction, transformation, and loading of data between systems."
      },
      {
        "id": 20,
        "question": "What is the difference between structured and unstructured data?",
        "options": [
          "Structured data is encrypted, unstructured is not",
          "Structured data resides in fixed fields within a record or file (like a relational database); unstructured data does not (like text or video)",
          "Unstructured data is always bigger",
          "There is no difference"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Structured data fits neatly into tables and columns. Unstructured data, like emails, logs, and media, lacks a predefined data model."
      },
      {
        "id": 21,
        "question": "What is Apache Spark?",
        "options": [
          "A SQL database",
          "An open-source, distributed computing system used for big data processing and analytics",
          "A data visualization tool",
          "A web server"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Spark is an analytics engine for large-scale data processing that processes data in-memory for fast performance."
      },
      {
        "id": 22,
        "question": "How does a Data Lake differ from a Data Warehouse?",
        "options": [
          "A Data Lake stores raw, unprocessed data in its native format, while a Warehouse stores structured, processed data",
          "A Data Lake is smaller than a Warehouse",
          "A Data Lake only stores images",
          "They are synonyms"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Data Lakes use a \"schema-on-read\" approach, allowing you to store any type of data and apply structure only when you analyze it."
      },
      {
        "id": 23,
        "question": "What is a Star Schema in data warehousing?",
        "options": [
          "A way to draw graphs",
          "A database design where a central fact table is connected to multiple dimension tables, resembling a star",
          "A schema used exclusively for NoSQL",
          "A security model"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The star schema is the simplest style of data mart schema, widely used because it optimizes query performance for analytics."
      },
      {
        "id": 24,
        "question": "What is Apache Kafka primarily used for?",
        "options": [
          "Running web applications",
          "Building real-time streaming data pipelines and applications that adapt to data streams",
          "Storing static files",
          "Relational database management"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Kafka is a distributed event streaming platform capable of handling trillions of events a day."
      },
      {
        "id": 25,
        "question": "What is the difference between batch and stream processing?",
        "options": [
          "Batch processes small data, stream processes large data",
          "Batch processing handles data in large, scheduled chunks; Stream processing handles data continuously as it arrives in real-time",
          "Batch is faster than stream",
          "Batch is only used for video"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Batch processing is best for daily/weekly reports, while stream processing is necessary for real-time dashboards and fraud detection."
      },
      {
        "id": 26,
        "question": "Explain the MapReduce paradigm.",
        "options": [
          "A way to reduce the size of a map",
          "A programming model where \"Map\" filters/sorts data and \"Reduce\" performs summary operations across distributed nodes",
          "A type of neural network",
          "A SQL command"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "MapReduce allows massive scalability across hundreds or thousands of servers in a Hadoop cluster."
      },
      {
        "id": 27,
        "question": "How do columnar databases optimize analytical queries?",
        "options": [
          "By storing data row by row to keep records together",
          "By storing data by columns rather than rows, allowing high compression and reducing disk I/O when querying specific fields",
          "By keeping everything in RAM",
          "By not using indexes"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Columnar databases (like Redshift or BigQuery) drastically speed up analytical queries (which typically select a few columns across millions of rows) by reading only the necessary column data."
      },
      {
        "id": 28,
        "question": "What is \"data skew\" in distributed computing systems?",
        "options": [
          "When data is corrupted",
          "An imbalance in the distribution of data across partitions, causing some nodes to process significantly more data than others",
          "When data types are mixed up",
          "A security vulnerability"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Data skew creates straggler tasks—while most nodes finish quickly, the system must wait for the overloaded node to finish, bottlenecking the entire job."
      },
      {
        "id": 29,
        "question": "Explain \"Exactly-once\" semantics in stream processing.",
        "options": [
          "Data is processed once and deleted",
          "A guarantee that a stream processing system will process every event exactly once, even in the event of system failures",
          "A rule that users can only log in once",
          "A method of hashing"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Achieving exactly-once semantics requires complex coordination (like transactional writes and idempotent operations) to ensure no data is lost or duplicated during failures."
      },
      {
        "id": 30,
        "question": "What fundamentally distinguishes Snowflake's architecture from traditional on-premise Data Warehouses?",
        "options": [
          "It does not use SQL",
          "It physically separates compute and storage, allowing both to scale independently in the cloud",
          "It only runs on Linux",
          "It uses row-based storage"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Snowflake's separation of compute (virtual warehouses) and storage (cloud blob storage) allows users to pay for only the compute they use and seamlessly scale resources up or down without migrating data."
      },
      {
        "id": 31,
        "question": "What does ETL stand for?",
        "options": [
          "Extract, Test, Load",
          "Extract, Transform, Load",
          "Entity, Table, Logic",
          "Execute, Transform, Loop"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "ETL is the process of extracting data from systems, transforming it into a clean/usable format, and loading it into a data warehouse."
      },
      {
        "id": 32,
        "question": "What is a Data Warehouse?",
        "options": [
          "A warehouse storing physical hard drives",
          "A central repository of integrated data from one or more disparate sources used for reporting and data analysis",
          "A real-time transactional database",
          "A file system"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Data warehouses store historical data in a structured format optimized for complex analytical queries (OLAP)."
      },
      {
        "id": 33,
        "question": "What is generally considered \"Big Data\"?",
        "options": [
          "Any file over 1GB",
          "Data characterized by the 3 Vs: high Volume, Velocity, and Variety",
          "Data stored on a mainframe",
          "Data used in Excel"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Big Data refers to data sets that are too large or complex to be dealt with by traditional data-processing application software."
      },
      {
        "id": 34,
        "question": "What is a data pipeline?",
        "options": [
          "An internet cable",
          "A set of actions that ingest raw data from disparate sources and move the data to a destination for storage and analysis",
          "A SQL query",
          "A database index"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A data pipeline automates the extraction, transformation, and loading of data between systems."
      },
      {
        "id": 35,
        "question": "What is the difference between structured and unstructured data?",
        "options": [
          "Structured data is encrypted, unstructured is not",
          "Structured data resides in fixed fields within a record or file (like a relational database); unstructured data does not (like text or video)",
          "Unstructured data is always bigger",
          "There is no difference"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Structured data fits neatly into tables and columns. Unstructured data, like emails, logs, and media, lacks a predefined data model."
      },
      {
        "id": 36,
        "question": "What is Apache Spark?",
        "options": [
          "A SQL database",
          "An open-source, distributed computing system used for big data processing and analytics",
          "A data visualization tool",
          "A web server"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Spark is an analytics engine for large-scale data processing that processes data in-memory for fast performance."
      },
      {
        "id": 37,
        "question": "How does a Data Lake differ from a Data Warehouse?",
        "options": [
          "A Data Lake stores raw, unprocessed data in its native format, while a Warehouse stores structured, processed data",
          "A Data Lake is smaller than a Warehouse",
          "A Data Lake only stores images",
          "They are synonyms"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Data Lakes use a \"schema-on-read\" approach, allowing you to store any type of data and apply structure only when you analyze it."
      },
      {
        "id": 38,
        "question": "What is a Star Schema in data warehousing?",
        "options": [
          "A way to draw graphs",
          "A database design where a central fact table is connected to multiple dimension tables, resembling a star",
          "A schema used exclusively for NoSQL",
          "A security model"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The star schema is the simplest style of data mart schema, widely used because it optimizes query performance for analytics."
      },
      {
        "id": 39,
        "question": "What is Apache Kafka primarily used for?",
        "options": [
          "Running web applications",
          "Building real-time streaming data pipelines and applications that adapt to data streams",
          "Storing static files",
          "Relational database management"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Kafka is a distributed event streaming platform capable of handling trillions of events a day."
      },
      {
        "id": 40,
        "question": "What is the difference between batch and stream processing?",
        "options": [
          "Batch processes small data, stream processes large data",
          "Batch processing handles data in large, scheduled chunks; Stream processing handles data continuously as it arrives in real-time",
          "Batch is faster than stream",
          "Batch is only used for video"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Batch processing is best for daily/weekly reports, while stream processing is necessary for real-time dashboards and fraud detection."
      },
      {
        "id": 41,
        "question": "Explain the MapReduce paradigm.",
        "options": [
          "A way to reduce the size of a map",
          "A programming model where \"Map\" filters/sorts data and \"Reduce\" performs summary operations across distributed nodes",
          "A type of neural network",
          "A SQL command"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "MapReduce allows massive scalability across hundreds or thousands of servers in a Hadoop cluster."
      },
      {
        "id": 42,
        "question": "How do columnar databases optimize analytical queries?",
        "options": [
          "By storing data row by row to keep records together",
          "By storing data by columns rather than rows, allowing high compression and reducing disk I/O when querying specific fields",
          "By keeping everything in RAM",
          "By not using indexes"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Columnar databases (like Redshift or BigQuery) drastically speed up analytical queries (which typically select a few columns across millions of rows) by reading only the necessary column data."
      },
      {
        "id": 43,
        "question": "What is \"data skew\" in distributed computing systems?",
        "options": [
          "When data is corrupted",
          "An imbalance in the distribution of data across partitions, causing some nodes to process significantly more data than others",
          "When data types are mixed up",
          "A security vulnerability"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Data skew creates straggler tasks—while most nodes finish quickly, the system must wait for the overloaded node to finish, bottlenecking the entire job."
      },
      {
        "id": 44,
        "question": "Explain \"Exactly-once\" semantics in stream processing.",
        "options": [
          "Data is processed once and deleted",
          "A guarantee that a stream processing system will process every event exactly once, even in the event of system failures",
          "A rule that users can only log in once",
          "A method of hashing"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Achieving exactly-once semantics requires complex coordination (like transactional writes and idempotent operations) to ensure no data is lost or duplicated during failures."
      },
      {
        "id": 45,
        "question": "What fundamentally distinguishes Snowflake's architecture from traditional on-premise Data Warehouses?",
        "options": [
          "It does not use SQL",
          "It physically separates compute and storage, allowing both to scale independently in the cloud",
          "It only runs on Linux",
          "It uses row-based storage"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Snowflake's separation of compute (virtual warehouses) and storage (cloud blob storage) allows users to pay for only the compute they use and seamlessly scale resources up or down without migrating data."
      },
      {
        "id": 46,
        "question": "What does ETL stand for?",
        "options": [
          "Extract, Test, Load",
          "Extract, Transform, Load",
          "Entity, Table, Logic",
          "Execute, Transform, Loop"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "ETL is the process of extracting data from systems, transforming it into a clean/usable format, and loading it into a data warehouse."
      },
      {
        "id": 47,
        "question": "What is a Data Warehouse?",
        "options": [
          "A warehouse storing physical hard drives",
          "A central repository of integrated data from one or more disparate sources used for reporting and data analysis",
          "A real-time transactional database",
          "A file system"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Data warehouses store historical data in a structured format optimized for complex analytical queries (OLAP)."
      },
      {
        "id": 48,
        "question": "What is generally considered \"Big Data\"?",
        "options": [
          "Any file over 1GB",
          "Data characterized by the 3 Vs: high Volume, Velocity, and Variety",
          "Data stored on a mainframe",
          "Data used in Excel"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Big Data refers to data sets that are too large or complex to be dealt with by traditional data-processing application software."
      },
      {
        "id": 49,
        "question": "What is a data pipeline?",
        "options": [
          "An internet cable",
          "A set of actions that ingest raw data from disparate sources and move the data to a destination for storage and analysis",
          "A SQL query",
          "A database index"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A data pipeline automates the extraction, transformation, and loading of data between systems."
      },
      {
        "id": 50,
        "question": "What is the difference between structured and unstructured data?",
        "options": [
          "Structured data is encrypted, unstructured is not",
          "Structured data resides in fixed fields within a record or file (like a relational database); unstructured data does not (like text or video)",
          "Unstructured data is always bigger",
          "There is no difference"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Structured data fits neatly into tables and columns. Unstructured data, like emails, logs, and media, lacks a predefined data model."
      },
      {
        "id": 51,
        "question": "What is Apache Spark?",
        "options": [
          "A SQL database",
          "An open-source, distributed computing system used for big data processing and analytics",
          "A data visualization tool",
          "A web server"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Spark is an analytics engine for large-scale data processing that processes data in-memory for fast performance."
      },
      {
        "id": 52,
        "question": "How does a Data Lake differ from a Data Warehouse?",
        "options": [
          "A Data Lake stores raw, unprocessed data in its native format, while a Warehouse stores structured, processed data",
          "A Data Lake is smaller than a Warehouse",
          "A Data Lake only stores images",
          "They are synonyms"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Data Lakes use a \"schema-on-read\" approach, allowing you to store any type of data and apply structure only when you analyze it."
      },
      {
        "id": 53,
        "question": "What is a Star Schema in data warehousing?",
        "options": [
          "A way to draw graphs",
          "A database design where a central fact table is connected to multiple dimension tables, resembling a star",
          "A schema used exclusively for NoSQL",
          "A security model"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The star schema is the simplest style of data mart schema, widely used because it optimizes query performance for analytics."
      },
      {
        "id": 54,
        "question": "What is Apache Kafka primarily used for?",
        "options": [
          "Running web applications",
          "Building real-time streaming data pipelines and applications that adapt to data streams",
          "Storing static files",
          "Relational database management"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Kafka is a distributed event streaming platform capable of handling trillions of events a day."
      },
      {
        "id": 55,
        "question": "What is the difference between batch and stream processing?",
        "options": [
          "Batch processes small data, stream processes large data",
          "Batch processing handles data in large, scheduled chunks; Stream processing handles data continuously as it arrives in real-time",
          "Batch is faster than stream",
          "Batch is only used for video"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Batch processing is best for daily/weekly reports, while stream processing is necessary for real-time dashboards and fraud detection."
      },
      {
        "id": 56,
        "question": "Explain the MapReduce paradigm.",
        "options": [
          "A way to reduce the size of a map",
          "A programming model where \"Map\" filters/sorts data and \"Reduce\" performs summary operations across distributed nodes",
          "A type of neural network",
          "A SQL command"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "MapReduce allows massive scalability across hundreds or thousands of servers in a Hadoop cluster."
      },
      {
        "id": 57,
        "question": "How do columnar databases optimize analytical queries?",
        "options": [
          "By storing data row by row to keep records together",
          "By storing data by columns rather than rows, allowing high compression and reducing disk I/O when querying specific fields",
          "By keeping everything in RAM",
          "By not using indexes"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Columnar databases (like Redshift or BigQuery) drastically speed up analytical queries (which typically select a few columns across millions of rows) by reading only the necessary column data."
      },
      {
        "id": 58,
        "question": "What is \"data skew\" in distributed computing systems?",
        "options": [
          "When data is corrupted",
          "An imbalance in the distribution of data across partitions, causing some nodes to process significantly more data than others",
          "When data types are mixed up",
          "A security vulnerability"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Data skew creates straggler tasks—while most nodes finish quickly, the system must wait for the overloaded node to finish, bottlenecking the entire job."
      },
      {
        "id": 59,
        "question": "Explain \"Exactly-once\" semantics in stream processing.",
        "options": [
          "Data is processed once and deleted",
          "A guarantee that a stream processing system will process every event exactly once, even in the event of system failures",
          "A rule that users can only log in once",
          "A method of hashing"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Achieving exactly-once semantics requires complex coordination (like transactional writes and idempotent operations) to ensure no data is lost or duplicated during failures."
      },
      {
        "id": 60,
        "question": "What fundamentally distinguishes Snowflake's architecture from traditional on-premise Data Warehouses?",
        "options": [
          "It does not use SQL",
          "It physically separates compute and storage, allowing both to scale independently in the cloud",
          "It only runs on Linux",
          "It uses row-based storage"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Snowflake's separation of compute (virtual warehouses) and storage (cloud blob storage) allows users to pay for only the compute they use and seamlessly scale resources up or down without migrating data."
      },
      {
        "id": 61,
        "question": "What does ETL stand for?",
        "options": [
          "Extract, Test, Load",
          "Extract, Transform, Load",
          "Entity, Table, Logic",
          "Execute, Transform, Loop"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "ETL is the process of extracting data from systems, transforming it into a clean/usable format, and loading it into a data warehouse."
      },
      {
        "id": 62,
        "question": "What is a Data Warehouse?",
        "options": [
          "A warehouse storing physical hard drives",
          "A central repository of integrated data from one or more disparate sources used for reporting and data analysis",
          "A real-time transactional database",
          "A file system"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Data warehouses store historical data in a structured format optimized for complex analytical queries (OLAP)."
      },
      {
        "id": 63,
        "question": "What is generally considered \"Big Data\"?",
        "options": [
          "Any file over 1GB",
          "Data characterized by the 3 Vs: high Volume, Velocity, and Variety",
          "Data stored on a mainframe",
          "Data used in Excel"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Big Data refers to data sets that are too large or complex to be dealt with by traditional data-processing application software."
      },
      {
        "id": 64,
        "question": "What is a data pipeline?",
        "options": [
          "An internet cable",
          "A set of actions that ingest raw data from disparate sources and move the data to a destination for storage and analysis",
          "A SQL query",
          "A database index"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A data pipeline automates the extraction, transformation, and loading of data between systems."
      },
      {
        "id": 65,
        "question": "What is the difference between structured and unstructured data?",
        "options": [
          "Structured data is encrypted, unstructured is not",
          "Structured data resides in fixed fields within a record or file (like a relational database); unstructured data does not (like text or video)",
          "Unstructured data is always bigger",
          "There is no difference"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Structured data fits neatly into tables and columns. Unstructured data, like emails, logs, and media, lacks a predefined data model."
      },
      {
        "id": 66,
        "question": "What is Apache Spark?",
        "options": [
          "A SQL database",
          "An open-source, distributed computing system used for big data processing and analytics",
          "A data visualization tool",
          "A web server"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Spark is an analytics engine for large-scale data processing that processes data in-memory for fast performance."
      },
      {
        "id": 67,
        "question": "How does a Data Lake differ from a Data Warehouse?",
        "options": [
          "A Data Lake stores raw, unprocessed data in its native format, while a Warehouse stores structured, processed data",
          "A Data Lake is smaller than a Warehouse",
          "A Data Lake only stores images",
          "They are synonyms"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Data Lakes use a \"schema-on-read\" approach, allowing you to store any type of data and apply structure only when you analyze it."
      },
      {
        "id": 68,
        "question": "What is a Star Schema in data warehousing?",
        "options": [
          "A way to draw graphs",
          "A database design where a central fact table is connected to multiple dimension tables, resembling a star",
          "A schema used exclusively for NoSQL",
          "A security model"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The star schema is the simplest style of data mart schema, widely used because it optimizes query performance for analytics."
      },
      {
        "id": 69,
        "question": "What is Apache Kafka primarily used for?",
        "options": [
          "Running web applications",
          "Building real-time streaming data pipelines and applications that adapt to data streams",
          "Storing static files",
          "Relational database management"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Kafka is a distributed event streaming platform capable of handling trillions of events a day."
      },
      {
        "id": 70,
        "question": "What is the difference between batch and stream processing?",
        "options": [
          "Batch processes small data, stream processes large data",
          "Batch processing handles data in large, scheduled chunks; Stream processing handles data continuously as it arrives in real-time",
          "Batch is faster than stream",
          "Batch is only used for video"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Batch processing is best for daily/weekly reports, while stream processing is necessary for real-time dashboards and fraud detection."
      },
      {
        "id": 71,
        "question": "Explain the MapReduce paradigm.",
        "options": [
          "A way to reduce the size of a map",
          "A programming model where \"Map\" filters/sorts data and \"Reduce\" performs summary operations across distributed nodes",
          "A type of neural network",
          "A SQL command"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "MapReduce allows massive scalability across hundreds or thousands of servers in a Hadoop cluster."
      },
      {
        "id": 72,
        "question": "How do columnar databases optimize analytical queries?",
        "options": [
          "By storing data row by row to keep records together",
          "By storing data by columns rather than rows, allowing high compression and reducing disk I/O when querying specific fields",
          "By keeping everything in RAM",
          "By not using indexes"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Columnar databases (like Redshift or BigQuery) drastically speed up analytical queries (which typically select a few columns across millions of rows) by reading only the necessary column data."
      },
      {
        "id": 73,
        "question": "What is \"data skew\" in distributed computing systems?",
        "options": [
          "When data is corrupted",
          "An imbalance in the distribution of data across partitions, causing some nodes to process significantly more data than others",
          "When data types are mixed up",
          "A security vulnerability"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Data skew creates straggler tasks—while most nodes finish quickly, the system must wait for the overloaded node to finish, bottlenecking the entire job."
      },
      {
        "id": 74,
        "question": "Explain \"Exactly-once\" semantics in stream processing.",
        "options": [
          "Data is processed once and deleted",
          "A guarantee that a stream processing system will process every event exactly once, even in the event of system failures",
          "A rule that users can only log in once",
          "A method of hashing"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Achieving exactly-once semantics requires complex coordination (like transactional writes and idempotent operations) to ensure no data is lost or duplicated during failures."
      },
      {
        "id": 75,
        "question": "What fundamentally distinguishes Snowflake's architecture from traditional on-premise Data Warehouses?",
        "options": [
          "It does not use SQL",
          "It physically separates compute and storage, allowing both to scale independently in the cloud",
          "It only runs on Linux",
          "It uses row-based storage"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Snowflake's separation of compute (virtual warehouses) and storage (cloud blob storage) allows users to pay for only the compute they use and seamlessly scale resources up or down without migrating data."
      },
      {
        "id": 76,
        "question": "What does ETL stand for?",
        "options": [
          "Extract, Test, Load",
          "Extract, Transform, Load",
          "Entity, Table, Logic",
          "Execute, Transform, Loop"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "ETL is the process of extracting data from systems, transforming it into a clean/usable format, and loading it into a data warehouse."
      },
      {
        "id": 77,
        "question": "What is a Data Warehouse?",
        "options": [
          "A warehouse storing physical hard drives",
          "A central repository of integrated data from one or more disparate sources used for reporting and data analysis",
          "A real-time transactional database",
          "A file system"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Data warehouses store historical data in a structured format optimized for complex analytical queries (OLAP)."
      },
      {
        "id": 78,
        "question": "What is generally considered \"Big Data\"?",
        "options": [
          "Any file over 1GB",
          "Data characterized by the 3 Vs: high Volume, Velocity, and Variety",
          "Data stored on a mainframe",
          "Data used in Excel"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Big Data refers to data sets that are too large or complex to be dealt with by traditional data-processing application software."
      },
      {
        "id": 79,
        "question": "What is a data pipeline?",
        "options": [
          "An internet cable",
          "A set of actions that ingest raw data from disparate sources and move the data to a destination for storage and analysis",
          "A SQL query",
          "A database index"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A data pipeline automates the extraction, transformation, and loading of data between systems."
      },
      {
        "id": 80,
        "question": "What is the difference between structured and unstructured data?",
        "options": [
          "Structured data is encrypted, unstructured is not",
          "Structured data resides in fixed fields within a record or file (like a relational database); unstructured data does not (like text or video)",
          "Unstructured data is always bigger",
          "There is no difference"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Structured data fits neatly into tables and columns. Unstructured data, like emails, logs, and media, lacks a predefined data model."
      },
      {
        "id": 81,
        "question": "What is Apache Spark?",
        "options": [
          "A SQL database",
          "An open-source, distributed computing system used for big data processing and analytics",
          "A data visualization tool",
          "A web server"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Spark is an analytics engine for large-scale data processing that processes data in-memory for fast performance."
      },
      {
        "id": 82,
        "question": "How does a Data Lake differ from a Data Warehouse?",
        "options": [
          "A Data Lake stores raw, unprocessed data in its native format, while a Warehouse stores structured, processed data",
          "A Data Lake is smaller than a Warehouse",
          "A Data Lake only stores images",
          "They are synonyms"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Data Lakes use a \"schema-on-read\" approach, allowing you to store any type of data and apply structure only when you analyze it."
      },
      {
        "id": 83,
        "question": "What is a Star Schema in data warehousing?",
        "options": [
          "A way to draw graphs",
          "A database design where a central fact table is connected to multiple dimension tables, resembling a star",
          "A schema used exclusively for NoSQL",
          "A security model"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The star schema is the simplest style of data mart schema, widely used because it optimizes query performance for analytics."
      },
      {
        "id": 84,
        "question": "What is Apache Kafka primarily used for?",
        "options": [
          "Running web applications",
          "Building real-time streaming data pipelines and applications that adapt to data streams",
          "Storing static files",
          "Relational database management"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Kafka is a distributed event streaming platform capable of handling trillions of events a day."
      },
      {
        "id": 85,
        "question": "What is the difference between batch and stream processing?",
        "options": [
          "Batch processes small data, stream processes large data",
          "Batch processing handles data in large, scheduled chunks; Stream processing handles data continuously as it arrives in real-time",
          "Batch is faster than stream",
          "Batch is only used for video"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Batch processing is best for daily/weekly reports, while stream processing is necessary for real-time dashboards and fraud detection."
      },
      {
        "id": 86,
        "question": "Explain the MapReduce paradigm.",
        "options": [
          "A way to reduce the size of a map",
          "A programming model where \"Map\" filters/sorts data and \"Reduce\" performs summary operations across distributed nodes",
          "A type of neural network",
          "A SQL command"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "MapReduce allows massive scalability across hundreds or thousands of servers in a Hadoop cluster."
      },
      {
        "id": 87,
        "question": "How do columnar databases optimize analytical queries?",
        "options": [
          "By storing data row by row to keep records together",
          "By storing data by columns rather than rows, allowing high compression and reducing disk I/O when querying specific fields",
          "By keeping everything in RAM",
          "By not using indexes"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Columnar databases (like Redshift or BigQuery) drastically speed up analytical queries (which typically select a few columns across millions of rows) by reading only the necessary column data."
      },
      {
        "id": 88,
        "question": "What is \"data skew\" in distributed computing systems?",
        "options": [
          "When data is corrupted",
          "An imbalance in the distribution of data across partitions, causing some nodes to process significantly more data than others",
          "When data types are mixed up",
          "A security vulnerability"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Data skew creates straggler tasks—while most nodes finish quickly, the system must wait for the overloaded node to finish, bottlenecking the entire job."
      },
      {
        "id": 89,
        "question": "Explain \"Exactly-once\" semantics in stream processing.",
        "options": [
          "Data is processed once and deleted",
          "A guarantee that a stream processing system will process every event exactly once, even in the event of system failures",
          "A rule that users can only log in once",
          "A method of hashing"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Achieving exactly-once semantics requires complex coordination (like transactional writes and idempotent operations) to ensure no data is lost or duplicated during failures."
      },
      {
        "id": 90,
        "question": "What fundamentally distinguishes Snowflake's architecture from traditional on-premise Data Warehouses?",
        "options": [
          "It does not use SQL",
          "It physically separates compute and storage, allowing both to scale independently in the cloud",
          "It only runs on Linux",
          "It uses row-based storage"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Snowflake's separation of compute (virtual warehouses) and storage (cloud blob storage) allows users to pay for only the compute they use and seamlessly scale resources up or down without migrating data."
      },
      {
        "id": 91,
        "question": "What does ETL stand for?",
        "options": [
          "Extract, Test, Load",
          "Extract, Transform, Load",
          "Entity, Table, Logic",
          "Execute, Transform, Loop"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "ETL is the process of extracting data from systems, transforming it into a clean/usable format, and loading it into a data warehouse."
      },
      {
        "id": 92,
        "question": "What is a Data Warehouse?",
        "options": [
          "A warehouse storing physical hard drives",
          "A central repository of integrated data from one or more disparate sources used for reporting and data analysis",
          "A real-time transactional database",
          "A file system"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Data warehouses store historical data in a structured format optimized for complex analytical queries (OLAP)."
      },
      {
        "id": 93,
        "question": "What is generally considered \"Big Data\"?",
        "options": [
          "Any file over 1GB",
          "Data characterized by the 3 Vs: high Volume, Velocity, and Variety",
          "Data stored on a mainframe",
          "Data used in Excel"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Big Data refers to data sets that are too large or complex to be dealt with by traditional data-processing application software."
      },
      {
        "id": 94,
        "question": "What is a data pipeline?",
        "options": [
          "An internet cable",
          "A set of actions that ingest raw data from disparate sources and move the data to a destination for storage and analysis",
          "A SQL query",
          "A database index"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A data pipeline automates the extraction, transformation, and loading of data between systems."
      },
      {
        "id": 95,
        "question": "What is the difference between structured and unstructured data?",
        "options": [
          "Structured data is encrypted, unstructured is not",
          "Structured data resides in fixed fields within a record or file (like a relational database); unstructured data does not (like text or video)",
          "Unstructured data is always bigger",
          "There is no difference"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Structured data fits neatly into tables and columns. Unstructured data, like emails, logs, and media, lacks a predefined data model."
      },
      {
        "id": 96,
        "question": "What is Apache Spark?",
        "options": [
          "A SQL database",
          "An open-source, distributed computing system used for big data processing and analytics",
          "A data visualization tool",
          "A web server"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Spark is an analytics engine for large-scale data processing that processes data in-memory for fast performance."
      },
      {
        "id": 97,
        "question": "How does a Data Lake differ from a Data Warehouse?",
        "options": [
          "A Data Lake stores raw, unprocessed data in its native format, while a Warehouse stores structured, processed data",
          "A Data Lake is smaller than a Warehouse",
          "A Data Lake only stores images",
          "They are synonyms"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Data Lakes use a \"schema-on-read\" approach, allowing you to store any type of data and apply structure only when you analyze it."
      },
      {
        "id": 98,
        "question": "What is a Star Schema in data warehousing?",
        "options": [
          "A way to draw graphs",
          "A database design where a central fact table is connected to multiple dimension tables, resembling a star",
          "A schema used exclusively for NoSQL",
          "A security model"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The star schema is the simplest style of data mart schema, widely used because it optimizes query performance for analytics."
      },
      {
        "id": 99,
        "question": "What is Apache Kafka primarily used for?",
        "options": [
          "Running web applications",
          "Building real-time streaming data pipelines and applications that adapt to data streams",
          "Storing static files",
          "Relational database management"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Kafka is a distributed event streaming platform capable of handling trillions of events a day."
      },
      {
        "id": 100,
        "question": "What is the difference between batch and stream processing?",
        "options": [
          "Batch processes small data, stream processes large data",
          "Batch processing handles data in large, scheduled chunks; Stream processing handles data continuously as it arrives in real-time",
          "Batch is faster than stream",
          "Batch is only used for video"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Batch processing is best for daily/weekly reports, while stream processing is necessary for real-time dashboards and fraud detection."
      },
      {
        "id": 101,
        "question": "Explain the MapReduce paradigm.",
        "options": [
          "A way to reduce the size of a map",
          "A programming model where \"Map\" filters/sorts data and \"Reduce\" performs summary operations across distributed nodes",
          "A type of neural network",
          "A SQL command"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "MapReduce allows massive scalability across hundreds or thousands of servers in a Hadoop cluster."
      },
      {
        "id": 102,
        "question": "How do columnar databases optimize analytical queries?",
        "options": [
          "By storing data row by row to keep records together",
          "By storing data by columns rather than rows, allowing high compression and reducing disk I/O when querying specific fields",
          "By keeping everything in RAM",
          "By not using indexes"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Columnar databases (like Redshift or BigQuery) drastically speed up analytical queries (which typically select a few columns across millions of rows) by reading only the necessary column data."
      },
      {
        "id": 103,
        "question": "What is \"data skew\" in distributed computing systems?",
        "options": [
          "When data is corrupted",
          "An imbalance in the distribution of data across partitions, causing some nodes to process significantly more data than others",
          "When data types are mixed up",
          "A security vulnerability"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Data skew creates straggler tasks—while most nodes finish quickly, the system must wait for the overloaded node to finish, bottlenecking the entire job."
      },
      {
        "id": 104,
        "question": "Explain \"Exactly-once\" semantics in stream processing.",
        "options": [
          "Data is processed once and deleted",
          "A guarantee that a stream processing system will process every event exactly once, even in the event of system failures",
          "A rule that users can only log in once",
          "A method of hashing"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Achieving exactly-once semantics requires complex coordination (like transactional writes and idempotent operations) to ensure no data is lost or duplicated during failures."
      },
      {
        "id": 105,
        "question": "What fundamentally distinguishes Snowflake's architecture from traditional on-premise Data Warehouses?",
        "options": [
          "It does not use SQL",
          "It physically separates compute and storage, allowing both to scale independently in the cloud",
          "It only runs on Linux",
          "It uses row-based storage"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Snowflake's separation of compute (virtual warehouses) and storage (cloud blob storage) allows users to pay for only the compute they use and seamlessly scale resources up or down without migrating data."
      },
      {
        "id": 106,
        "question": "What does ETL stand for?",
        "options": [
          "Extract, Test, Load",
          "Extract, Transform, Load",
          "Entity, Table, Logic",
          "Execute, Transform, Loop"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "ETL is the process of extracting data from systems, transforming it into a clean/usable format, and loading it into a data warehouse."
      },
      {
        "id": 107,
        "question": "What is a Data Warehouse?",
        "options": [
          "A warehouse storing physical hard drives",
          "A central repository of integrated data from one or more disparate sources used for reporting and data analysis",
          "A real-time transactional database",
          "A file system"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Data warehouses store historical data in a structured format optimized for complex analytical queries (OLAP)."
      },
      {
        "id": 108,
        "question": "What is generally considered \"Big Data\"?",
        "options": [
          "Any file over 1GB",
          "Data characterized by the 3 Vs: high Volume, Velocity, and Variety",
          "Data stored on a mainframe",
          "Data used in Excel"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Big Data refers to data sets that are too large or complex to be dealt with by traditional data-processing application software."
      },
      {
        "id": 109,
        "question": "What is a data pipeline?",
        "options": [
          "An internet cable",
          "A set of actions that ingest raw data from disparate sources and move the data to a destination for storage and analysis",
          "A SQL query",
          "A database index"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "A data pipeline automates the extraction, transformation, and loading of data between systems."
      },
      {
        "id": 110,
        "question": "What is the difference between structured and unstructured data?",
        "options": [
          "Structured data is encrypted, unstructured is not",
          "Structured data resides in fixed fields within a record or file (like a relational database); unstructured data does not (like text or video)",
          "Unstructured data is always bigger",
          "There is no difference"
        ],
        "correct": 1,
        "difficulty": "Easy",
        "explanation": "Structured data fits neatly into tables and columns. Unstructured data, like emails, logs, and media, lacks a predefined data model."
      },
      {
        "id": 111,
        "question": "What is Apache Spark?",
        "options": [
          "A SQL database",
          "An open-source, distributed computing system used for big data processing and analytics",
          "A data visualization tool",
          "A web server"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Spark is an analytics engine for large-scale data processing that processes data in-memory for fast performance."
      },
      {
        "id": 112,
        "question": "How does a Data Lake differ from a Data Warehouse?",
        "options": [
          "A Data Lake stores raw, unprocessed data in its native format, while a Warehouse stores structured, processed data",
          "A Data Lake is smaller than a Warehouse",
          "A Data Lake only stores images",
          "They are synonyms"
        ],
        "correct": 0,
        "difficulty": "Medium",
        "explanation": "Data Lakes use a \"schema-on-read\" approach, allowing you to store any type of data and apply structure only when you analyze it."
      },
      {
        "id": 113,
        "question": "What is a Star Schema in data warehousing?",
        "options": [
          "A way to draw graphs",
          "A database design where a central fact table is connected to multiple dimension tables, resembling a star",
          "A schema used exclusively for NoSQL",
          "A security model"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "The star schema is the simplest style of data mart schema, widely used because it optimizes query performance for analytics."
      },
      {
        "id": 114,
        "question": "What is Apache Kafka primarily used for?",
        "options": [
          "Running web applications",
          "Building real-time streaming data pipelines and applications that adapt to data streams",
          "Storing static files",
          "Relational database management"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Kafka is a distributed event streaming platform capable of handling trillions of events a day."
      },
      {
        "id": 115,
        "question": "What is the difference between batch and stream processing?",
        "options": [
          "Batch processes small data, stream processes large data",
          "Batch processing handles data in large, scheduled chunks; Stream processing handles data continuously as it arrives in real-time",
          "Batch is faster than stream",
          "Batch is only used for video"
        ],
        "correct": 1,
        "difficulty": "Medium",
        "explanation": "Batch processing is best for daily/weekly reports, while stream processing is necessary for real-time dashboards and fraud detection."
      },
      {
        "id": 116,
        "question": "Explain the MapReduce paradigm.",
        "options": [
          "A way to reduce the size of a map",
          "A programming model where \"Map\" filters/sorts data and \"Reduce\" performs summary operations across distributed nodes",
          "A type of neural network",
          "A SQL command"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "MapReduce allows massive scalability across hundreds or thousands of servers in a Hadoop cluster."
      },
      {
        "id": 117,
        "question": "How do columnar databases optimize analytical queries?",
        "options": [
          "By storing data row by row to keep records together",
          "By storing data by columns rather than rows, allowing high compression and reducing disk I/O when querying specific fields",
          "By keeping everything in RAM",
          "By not using indexes"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Columnar databases (like Redshift or BigQuery) drastically speed up analytical queries (which typically select a few columns across millions of rows) by reading only the necessary column data."
      },
      {
        "id": 118,
        "question": "What is \"data skew\" in distributed computing systems?",
        "options": [
          "When data is corrupted",
          "An imbalance in the distribution of data across partitions, causing some nodes to process significantly more data than others",
          "When data types are mixed up",
          "A security vulnerability"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Data skew creates straggler tasks—while most nodes finish quickly, the system must wait for the overloaded node to finish, bottlenecking the entire job."
      },
      {
        "id": 119,
        "question": "Explain \"Exactly-once\" semantics in stream processing.",
        "options": [
          "Data is processed once and deleted",
          "A guarantee that a stream processing system will process every event exactly once, even in the event of system failures",
          "A rule that users can only log in once",
          "A method of hashing"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Achieving exactly-once semantics requires complex coordination (like transactional writes and idempotent operations) to ensure no data is lost or duplicated during failures."
      },
      {
        "id": 120,
        "question": "What fundamentally distinguishes Snowflake's architecture from traditional on-premise Data Warehouses?",
        "options": [
          "It does not use SQL",
          "It physically separates compute and storage, allowing both to scale independently in the cloud",
          "It only runs on Linux",
          "It uses row-based storage"
        ],
        "correct": 1,
        "difficulty": "Hard",
        "explanation": "Snowflake's separation of compute (virtual warehouses) and storage (cloud blob storage) allows users to pay for only the compute they use and seamlessly scale resources up or down without migrating data."
      }
    ]
  }
];
