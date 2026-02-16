import React, { useState } from 'react'
import PhysicsDice from '../lab/PhysicsDice'
import '../lab/PhysicsDice.scss'
import './App.css'

type DiceConfig = {
    sides: number;
    color: string;
    roughness: number;
    metalness: number;
    textColor: string;
    highlightTextColor: string;
}

function App() {
    const [diceList, setDiceList] = useState<DiceConfig[]>([]);
    const [rollKey, setRollKey] = useState(0);
    const [results, setResults] = useState<number[]>([]);
    const [collisionVolume, setCollisionVolume] = useState(0.5);

    const addDice = (sides: number) => {
        setDiceList([...diceList, {
            sides,
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            roughness: 0.5,
            metalness: 0.1,
            textColor: '#ffffff',
            highlightTextColor: '#ffff00'
        }]);
    };

    const removeDice = (index: number) => {
        setDiceList(diceList.filter((_, i) => i !== index));
    };

    const updateDice = (index: number, updates: Partial<DiceConfig>) => {
        setDiceList(diceList.map((die, i) => i === index ? { ...die, ...updates } : die));
    };

    const rollDice = () => {
        setRollKey(prev => prev + 1);
    };

    const clearAll = () => {
        setDiceList([]);
        setResults([]);
    };

    return (
        <div className="app">
            <div className="app-header">
                <h1>🎲 DavaloDice</h1>
            </div>

            <div className="app-container-vertical">
                <div className="section section-roll">
                    <button onClick={rollDice} className="btn btn-primary btn-large btn-roll">🎲 Roll Dice</button>
                    <button onClick={clearAll} className="btn btn-danger btn-clear">Clear All</button>
                </div>

                <div className="section section-preview">
                    <div className="preview-container">
                        <PhysicsDice
                            diceSides={diceList.map(d => d.sides)}
                            diceCount={diceList.length}
                            diceColors={diceList.map(d => d.color)}
                            diceRoughnesses={diceList.map(d => d.roughness)}
                            diceMetalnesses={diceList.map(d => d.metalness)}
                            textColors={diceList.map(d => d.textColor)}
                            highlightTextColors={diceList.map(d => d.highlightTextColor)}
                            rollKey={rollKey}
                            collisionVolume={collisionVolume}
                            onResults={setResults}
                            results={results}
                        />
                        {diceList.length === 0 && (
                            <div className="empty-dice-overlay">
                                <p>Add dice below to begin</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="section section-add-dice">
                    <h2>Add Dice</h2>
                    <div className="dice-buttons">
                        <button onClick={() => addDice(4)} className="btn btn-add">Add D4</button>
                        <button onClick={() => addDice(6)} className="btn btn-add">Add D6</button>
                        <button onClick={() => addDice(8)} className="btn btn-add">Add D8</button>
                        <button onClick={() => addDice(10)} className="btn btn-add">Add D10</button>
                        <button onClick={() => addDice(12)} className="btn btn-add">Add D12</button>
                        <button onClick={() => addDice(20)} className="btn btn-add">Add D20</button>
                    </div>
                </div>

                <div className="section section-dice-list">
                    <h2>Your Dice ({diceList.length})</h2>

                    <div className="control-group">
                        <label>
                            Sound Volume: {Math.round(collisionVolume * 100)}%
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={collisionVolume}
                                onChange={(e) => setCollisionVolume(parseFloat(e.target.value))}
                            />
                        </label>
                    </div>

                    <div className="dice-list">
                        {diceList.map((die, index) => (
                            <div key={index} className="dice-item">
                                <div className="dice-item-header">
                                    <h3>D{die.sides}</h3>
                                    <button onClick={() => removeDice(index)} className="btn btn-small btn-danger">×</button>
                                </div>

                                <div className="dice-preview-simple" style={{ backgroundColor: die.color }}>
                                    <span className="dice-label">D{die.sides}</span>
                                </div>

                                <div className="dice-controls">
                                    <label>
                                        Color:
                                        <input
                                            type="color"
                                            value={die.color}
                                            onChange={(e) => updateDice(index, { color: e.target.value })}
                                        />
                                    </label>

                                    <label>
                                        Roughness: {die.roughness.toFixed(1)}
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.1"
                                            value={die.roughness}
                                            onChange={(e) => updateDice(index, { roughness: parseFloat(e.target.value) })}
                                        />
                                    </label>

                                    <label>
                                        Metalness: {die.metalness.toFixed(1)}
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.1"
                                            value={die.metalness}
                                            onChange={(e) => updateDice(index, { metalness: parseFloat(e.target.value) })}
                                        />
                                    </label>

                                    <label>
                                        Text Color:
                                        <input
                                            type="color"
                                            value={die.textColor}
                                            onChange={(e) => updateDice(index, { textColor: e.target.value })}
                                        />
                                    </label>

                                    <label>
                                        Highlight Color:
                                        <input
                                            type="color"
                                            value={die.highlightTextColor}
                                            onChange={(e) => updateDice(index, { highlightTextColor: e.target.value })}
                                        />
                                    </label>
                                </div>
                            </div>
                        ))}
                        {diceList.length === 0 && (
                            <p className="empty-message">No dice added yet. Use the buttons above to add dice!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
