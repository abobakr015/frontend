import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("SYP");
  const [result, setResult] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/rates").then(res => setRates(res.data));
  }, []);

  const handleConvert = () => {
    axios.post("http://localhost:5000/convert", { from, to, amount: parseFloat(amount) })
      .then(res => setResult(res.data.result.toFixed(2)))
      .catch(() => alert("تحقق من العملات المدخلة أو الاتصال بالخادم"));
  };

  return (
    <div className="max-w-lg mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-center mb-6">💱 أسعار الصرف في سوريا</h1>
      <div className="bg-white p-4 rounded shadow mb-6">
        <p className="text-lg font-semibold">💵 الدولار ↔ الليرة السورية: <span className="text-blue-700">{rates.USD_SYP || "..."}</span></p>
        <p className="text-lg font-semibold">💵 الدولار ↔ الليرة التركية: <span className="text-blue-700">{rates.USD_TRY || "..."}</span></p>
        <p className="text-lg font-semibold">💷 الليرة السورية ↔ الليرة التركية: <span className="text-blue-700">{rates.SYP_TRY ? rates.SYP_TRY.toFixed(4) : "..."}</span></p>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-3">🔢 حاسبة التحويل</h2>
        <input type="number" placeholder="المبلغ" className="border p-2 w-full mb-3" value={amount} onChange={e => setAmount(e.target.value)} />
        <div className="flex gap-2 mb-3">
          <input type="text" placeholder="من (مثل USD)" className="border p-2 w-full" value={from} onChange={e => setFrom(e.target.value.toUpperCase())} />
          <input type="text" placeholder="إلى (مثل SYP)" className="border p-2 w-full" value={to} onChange={e => setTo(e.target.value.toUpperCase())} />
        </div>
        <button className="bg-green-600 text-white p-2 w-full rounded" onClick={handleConvert}>تحويل</button>
        {result !== null && <p className="mt-3 text-lg">💰 النتيجة: <span className="font-bold">{result}</span></p>}
      </div>
    </div>
  );
}

export default App;
