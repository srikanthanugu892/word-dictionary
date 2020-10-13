import React, {useState, useEffect} from 'react';
import {Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import './App.scss';

function App() {
    const [word, setWord] = useState('');
    const [results, setResults] = useState([]);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const paragraph = 'Master mind test final';

    useEffect(() => {
        if (word.length > 0) {
            setResults([]);
            fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
                    "x-rapidapi-key": "564b41377cmshb229633a333c326p1732e5jsn5ade892de5a5"
                }
            })
                .then(response => response.json())
                .then(json => {
                    const nounDefinitions = [];
                    json.definitions.forEach((obj) => {
                        if (obj.partOfSpeech === 'noun') {
                            nounDefinitions.push(obj);
                            return;
                        }
                    });
                    nounDefinitions.length > 0 ? setResults(nounDefinitions) : setResults(json.definitions);
                });
        }
    }, [word]);

    const toggle = () => setPopoverOpen(!popoverOpen);

    const handleClick = (wrd) => {
        setPopoverOpen(false);
        setWord(wrd)
    }

    const renderParagraph = () => paragraph.split(' ')
        .map((wrd, index) => {
            return (
                <span name={`wordName${index}`} key={`word${index}`} id="Popover1"
                      style={{
                          marginRight: "5px",
                          backgroundColor: (wrd === word && popoverOpen === true) ? "yellow" : ''
                      }} type="button"
                      onClick={() => handleClick(wrd)}>{wrd}
                </span>
            )
        });

    return (
        <div className="App">
            <h1>Word Dictionary</h1>
            <h5>Click on the word to check the definition</h5>
            <br/>
            <br/>
            <div className="App">
                {renderParagraph()}
            </div>
            <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
                <PopoverHeader>{word}</PopoverHeader>
                {results.length > 0 &&
                <PopoverBody>
                    <p>{results[0].partOfSpeech}:</p>
                    {results[0].definition}
                </PopoverBody>}
                {results.length <= 0 && <PopoverBody>Loading definition...</PopoverBody>}
            </Popover>
        </div>
    );
}

export default App;
