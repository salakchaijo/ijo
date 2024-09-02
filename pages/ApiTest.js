import { useState } from 'react';

export default function ApiTest() {
    const [number1, setNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);
    const [operation, setOperation] = useState('plus');
    const [result, setResult] = useState(null);

    const callApi = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/${operation}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ number1, number2 })
            });
            const data = await response.json();
            setResult(data.result);
        } catch (error) {
            console.error('Error calling API:', error);
            setResult('Error occurred');
        }
    };
    
    return (
        <div>
            <h1>API Test Page</h1>
            <input
                type="number"
                value={number1}
                onChange={(e) => setNumber1(parseFloat(e.target.value))}
                placeholder="Number 1"
            />
            <input
                type="number"
                value={number2}
                onChange={(e) => setNumber2(parseFloat(e.target.value))}
                placeholder="Number 2"
            />
            <select value={operation} onChange={(e) => setOperation(e.target.value)}>
                <option value="plus">Plus</option>
                <option value="delete">Delete</option>
                <option value="multiply">Multiply</option>
                <option value="separate">Divide</option>
            </select>
            <button onClick={callApi}>Call API</button>
            {result && <div>Result: {result}</div>}
        </div>
    );
}
