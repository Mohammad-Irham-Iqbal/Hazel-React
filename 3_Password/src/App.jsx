import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [number_in, setnumber_in] = useState(false);
  const [symbol_in, setsymbol_in] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number_in) {
      str += "0123456789";
    }
    if (symbol_in) {
      str += "!@#$%^&*()_+";
    }

    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }

    setPassword(pass);
  }, [length, number_in, symbol_in, setPassword]);

  // useCallback is used to memoize the function so that it doesn't get recreated on every render

  // useEffect is used to call the passwordGenerator function whenever the dependencies change

  // In this case, the dependencies are len, number_in, and symbol_in

  // This means that whenever the length, number_in, or symbol_in changes, the passwordGenerator function will be called

  // and a new password will be generated

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 3);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number_in, symbol_in, passwordGenerator]);

  // useEffect is used to call the passwordGenerator function whenever the dependencies change

  // In this case, the dependencies are len, number_in, and symbol_in

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-3xl text-center font-bold text-yellow-300 my-3">
          Random Password Generator
        </h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
          <input
            type="text"
            value={password}
            className="outline-none bg-amber-200 w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer hover:bg-blue-800 transition duration-200 ease-in-out"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setlength(e.target.value)}
            />
            <label>Length: {length} </label>
          </div>
          <div className=" flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={number_in}
              id="numberInput"
              onChange={() => {
                setnumber_in((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={symbol_in}
              id="symbolInput"
              onChange={() => {
                setsymbol_in((prev) => !prev);
              }}
            />
            <label htmlFor="symbolInput">Symbols</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
