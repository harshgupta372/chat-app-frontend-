import React, { useState, useEffect } from 'react';
import { History, Delete, Plus, Minus, X, Divide, Equal } from 'lucide-react';

type Operation = '+' | '-' | '×' | '÷' | '=';

interface HistoryItem {
  calculation: string;
  result: string;
}

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<Operation | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [waitingForNewNumber, setWaitingForNewNumber] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForNewNumber) {
      setDisplay(num);
      setWaitingForNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op: Operation) => {
    if (op === '=') {
      calculate();
    } else {
      setOperation(op);
      setPreviousValue(display);
      setWaitingForNewNumber(true);
    }
  };

  const calculate = () => {
    if (!previousValue || !operation) return;

    const prev = parseFloat(previousValue);
    const current = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        result = prev / current;
        break;
    }

    const calculation = `${previousValue} ${operation} ${display}`;
    const resultString = result.toString();
    
    setHistory([...history, { calculation, result: resultString }]);
    setDisplay(resultString);
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewNumber(true);
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
  };

  const handleKeyboard = (e: KeyboardEvent) => {
    if (/[0-9]/.test(e.key)) {
      handleNumber(e.key);
    } else if (['+', '-'].includes(e.key)) {
      handleOperation(e.key as Operation);
    } else if (e.key === '*') {
      handleOperation('×');
    } else if (e.key === '/') {
      handleOperation('÷');
    } else if (e.key === 'Enter' || e.key === '=') {
      handleOperation('=');
    } else if (e.key === 'Escape') {
      clear();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [display, previousValue, operation]);

  const Button = ({ children, onClick, className = '' }: any) => (
    <button
      onClick={onClick}
      className={`p-4 text-lg font-medium rounded-xl transition-all duration-200 
      hover:bg-opacity-90 active:transform active:scale-95 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="relative">
      <div className="bg-white rounded-2xl shadow-2xl w-[320px] p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Calculator</h2>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <History className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <div className="text-gray-500 text-sm h-6">
            {previousValue && `${previousValue} ${operation}`}
          </div>
          <div className="text-3xl font-bold text-gray-800 break-all">
            {display}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <Button
            onClick={clear}
            className="bg-red-100 text-red-600"
          >
            <Delete className="w-5 h-5 mx-auto" />
          </Button>
          <Button
            onClick={() => handleOperation('÷')}
            className="bg-indigo-100 text-indigo-600"
          >
            <Divide className="w-5 h-5 mx-auto" />
          </Button>
          <Button
            onClick={() => handleOperation('×')}
            className="bg-indigo-100 text-indigo-600"
          >
            <X className="w-5 h-5 mx-auto" />
          </Button>
          <Button
            onClick={() => handleOperation('-')}
            className="bg-indigo-100 text-indigo-600"
          >
            <Minus className="w-5 h-5 mx-auto" />
          </Button>

          {[7, 8, 9].map((num) => (
            <Button
              key={num}
              onClick={() => handleNumber(num.toString())}
              className="bg-gray-100 text-gray-800"
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => handleOperation('+')}
            className="bg-indigo-100 text-indigo-600"
          >
            <Plus className="w-5 h-5 mx-auto" />
          </Button>

          {[4, 5, 6].map((num) => (
            <Button
              key={num}
              onClick={() => handleNumber(num.toString())}
              className="bg-gray-100 text-gray-800"
            >
              {num}
            </Button>
          ))}
          <Button
            onClick={() => handleOperation('=')}
            className="bg-indigo-600 text-white row-span-2"
          >
            <Equal className="w-5 h-5 mx-auto" />
          </Button>

          {[1, 2, 3].map((num) => (
            <Button
              key={num}
              onClick={() => handleNumber(num.toString())}
              className="bg-gray-100 text-gray-800"
            >
              {num}
            </Button>
          ))}

          <Button
            onClick={() => handleNumber('0')}
            className="bg-gray-100 text-gray-800 col-span-2"
          >
            0
          </Button>
          <Button
            onClick={() => handleNumber('.')}
            className="bg-gray-100 text-gray-800"
          >
            .
          </Button>
        </div>
      </div>

      {showHistory && (
        <div className="absolute top-0 -right-64 bg-white rounded-2xl shadow-2xl w-60 p-4 max-h-[400px] overflow-y-auto">
          <h3 className="text-lg font-bold text-gray-800 mb-3">History</h3>
          {history.length === 0 ? (
            <p className="text-gray-500 text-sm">No calculations yet</p>
          ) : (
            history.map((item, index) => (
              <div key={index} className="mb-2 p-2 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">{item.calculation}</div>
                <div className="text-lg font-medium text-gray-800">
                  = {item.result}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Calculator;