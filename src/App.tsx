import React, { useState, useRef, useEffect } from 'react'
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
    const [diceList, setDiceList] = useState<DiceConfig[]>([
        { sides: 6, color: '#ff4444', roughness: 0.5, metalness: 0.1, textColor: '#ffffff', highlightTextColor: '#ffff00' }
    ]);
    const [rollKey, setRollKey] = useState(0);
    const [results, setResults] = useState<number[]>([]);
    const [collisionVolume, setCollisionVolume] = useState(0.5);
    const thumbnailCanvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
    const [thumbnailCanvases, setThumbnailCanvases] = useState<(HTMLCanvasElement | null)[]>([]);

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
    useEffect(() => {
        // Update thumbnail canvases when dice list changes
        setThumbnailCanvases([...thumbnailCanvasRefs.current]);
    }, [diceList.length]);

    };

    return (
        <div className="app">
            <div className="app-header">
                <h1>🎲 DavaloDice</h1>
            </div>

            <div className="app-container">
                <div className="controls-panel">
                    <div className="section">
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

                    <div className="section">
                        <h2>Dice Controls</h2>
                        <button onClick={rollDice} className="btn btn-primary btn-large">🎲 Roll Dice</button>
                        <button onClick={clearAll} className="btn btn-danger">Clear All</button>

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
                    </div>

                    <div className="section">
                        <h2>Your Dice ({diceList.length})</h2>
                        <div className="dice-list">
                            {diceList.map((die, index) => (
                                <div key={index} className="dice-item">
                                    <div className="dice-item-header">
                                        <h3>D{die.sides}</h3>
                                        <button onClick={() => removeDice(index)} className="btn btn-small btn-danger">×</button>
                                    </div>

                                    <div className="dice-preview">
                                        <canvas 
                                            ref={(el) => {
                                                thumbnailCanvasRefs.current[index] = el;
                                            }}
                                            width={120}
                                            height={120}
                                        />
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
                                <p className="empty-message">No dice added yet. Click "Add D6" or any other dice type to get started!</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="preview-panel">
                    <div className="preview-container">
                        {diceList.length > 0 ? (
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
                                thumbnailCanvases={thumbnailCanvases}
                            />
                        ) : (
                            <div className="preview-empty">
                                <h2>👈 Add some dice to get started!</h2>
                                <p>Click one of the "Add D#" buttons to add dice to the scene</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
