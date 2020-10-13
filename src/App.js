import React, {useState, useEffect} from 'react';
import Popover from '@terebentina/react-popover';
import '@terebentina/react-popover/lib/styles.css';
import './App.scss';


function App() {
    const [word, setWord] = useState('');
    const [results, setResults] = useState([]);
    const paragraph = 'Master mind';
    useEffect(() => {
        if (word.length > 0) {
            fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
                    "x-rapidapi-key": "564b41377cmshb229633a333c326p1732e5jsn5ade892de5a5"
                }
            })
                .then(response => response.json())
                .then(json => setResults(json.definitions));
        }
    }, [word]);


    const renderParagraph = () => paragraph.split(/ /g)
        .map((word) => <span style={{"margin-right": "10px"}} onClick={() => setWord(word)}>{word}</span>);

    return (
        <div>
            <div className="App">
                {renderParagraph()}
            </div>
        </div>
    );
}

export default App;
