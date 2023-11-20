/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [CharAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";
    if (numAllowed) str += "! @#$%^&*|?/";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, CharAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  function handleRefresh() {
    window.location.reload();
  }

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, CharAllowed, passwordGenerator]);
  return (
    <div className=" w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3  bg-gray-800 bg-opacity-80 font-serif text-Black-500 my-52 ">
      <h1 className="text-white text-center my-3">Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-2 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-sky-700 text-white px-3 py-0.5 shrink-0">
          <i className="fa-regular fa-copy"></i>
        </button>

        <button
          onClick={handleRefresh}
          className="outline-none bg-sky-700 text-white px-3 py-0.5 shrink-0">
          <i className="fa-solid fa-arrows-rotate"></i>
        </button>
      </div>
      <div className=" text-sm gap-x-1 bg-sky-700  rounded-lg ">
        <h1 className="text-white text-center font-bold my-1 py-3">
          Customize your Password
        </h1>
        <div className="flex text-sm gap-x-2 my-2 px-6">
          <div className="flex items-center gap-x-1 mb-5">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={CharAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Symbols</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
