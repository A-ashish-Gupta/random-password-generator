import { useCallback, useEffect, useRef, useState } from 'react'

const App = () => {

  const[length,setLength] = useState(8);
  const[includeNumbers,setIncludeNumbers]  = useState(false);
  const[includeCharacters,setIncludeCharacters] = useState(false);
  const[password,setPassword] = useState("");

  const passwordRef = useRef(null);

  const copyPassword = useCallback(()=>{
    window.navigator.clipboard.writeText(password)
    alert("password copied")
  },[password])

  const generatePassword = useCallback(()=>{
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if (includeNumbers) {
        str += "0123456789";
      }

      if(includeCharacters){
        str +="!@#$%^&*";
      }
      let pass = "";
      for(let i=0;i<length;i++){
        let char = Math.floor(Math.random()*str.length )+1;
        pass += str.charAt(char);
      }

      setPassword(pass);
  },[length,includeNumbers,includeCharacters]);

  useEffect(()=>{
      generatePassword();
  },[generatePassword])

  return (
    <>
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
        <div className="w-full max-w-xl bg-slate-900 border border-blue-900 rounded-2xl shadow-2xl p-8">

          <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-400 mb-8">
            Random Password Generator
          </h1>

          <div className="flex gap-2 mb-8">
            <input
              type="text"
              value={password}
              readOnly
              placeholder="Your password"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
              ref={passwordRef}
            />
          </div>

          <div className="mb-8">
            <div className="flex justify-between mb-3">
              <label className="font-semibold">
                Password Length
              </label>

              <span className="text-blue-400 font-bold">
                {length}
              </span>
            </div>

            <input
              type="range"
              min="8"
              max="25"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>

          <div className="space-y-4 mb-8">

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="numbers"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers(!includeNumbers)}
                className="w-5 h-5 accent-blue-500"
              />

              <span className="text-slate-200">
                Include Numbers
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="characters"
                checked={includeCharacters}
                onChange={() => setIncludeCharacters(!includeCharacters)}
                className="w-5 h-5 accent-blue-500"
              />

              <span className="text-slate-200">
                Include Characters
              </span>
            </label>

          </div>

          <button
            onClick={generatePassword}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-bold text-lg transition"
          >
            Generate Password
          </button>
           <button
            onClick={copyPassword}
            className="w-full mt-5 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-bold text-lg transition"
          >
            Copy Password to Clip-board
          </button>
        </div>
      </div>
    </>
  )
}

export default App
