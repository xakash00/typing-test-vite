import { useCallback, useState, useRef, useEffect } from "react";
import { TYPING_DURATION } from "./constants/constants";
import axios from "axios"
import { Box } from "@chakra-ui/react";
import { Container, InputTextField } from "./styled";
import "./App.css"
function App() {
  const [words, setWords] = useState([]);
  const textAreaRef = useRef(null);
  const [duration, setDuration] = useState(TYPING_DURATION);
  const [showCard, setShowCard] = useState(false);
  // for setinterval function that
  const [intervalState, setIntervalState] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  // the card info that will appear after a periode of time specified in duration state
  const [cardTypingTestInfo, setCardTypingTestInfo] = useState({
    typedLetters: 0,
    correctLetters: 0,
  });
  // getting differents words from `https://random-word-api.herokuapp.com/word?number=${WORDS_NUMBER}`
  const fetchData = useCallback(async () => {
    axios
      .get("https://random-word-api.herokuapp.com/word?number=60")
      .then((response) => response.data)
      .then((data) => {
        setWords(
          data
            .join(' ')
            .split('')
            .map((letter, index) => (
              <span key={index} id={`letter__${index}`}>
                {letter}
              </span>
            )),
        );
        document
          .querySelectorAll('.typing__words span')
          .forEach((span) => (span.className = ''));
      });
  }, []);
  /* !handleInput
   * changing the color of the correct letter to "green"
   * changing the color of the incorect letter to "red" & underlining it
   */
  const handleInput = () => {
    let typedLetters = textAreaRef.current.value.split('');
    words.forEach((word, index) => {
      if (typedLetters[index] == null) {
        document.getElementById(`letter__${index}`).className = '';
      } else if (word['props']['children'] === typedLetters[index]) {
        document.getElementById(`letter__${index}`).className =
          'letter__correct';
      } else {
        document.getElementById(`letter__${index}`).className =
          'letter__incorrect';
      }
    });
    // adding a small cursor
    document.getElementById(
      `letter__${textAreaRef.current.value.length}`,
    ).className = 'typing__cursor';
  };

  useEffect(() => {
    // when user focus in the textArea we will dercrement the duration like a counter
    if (isFocused && duration === TYPING_DURATION) {
      setIntervalState(
        setInterval(
          () => setDuration((duration) => duration - 1),
          1000,
        ),
      );
      // if the duraion arrived to {0} we will stop the interval
    } else if (duration === 0) {
      clearInterval(intervalState);
      // leaving focus from textArea
      textAreaRef?.current.blur();
      // setIsFocused(false);
      setCardTypingTestInfo(() => {
        return {
          typedLetters: textAreaRef?.current?.value?.length,
          correctLetters:
            document.querySelectorAll('.letter__correct').length,
        };
      });
      // showing the card
      setShowCard(true);
      // getting new words
      if (!isFocused) fetchData();
    }
  }, [duration, isFocused]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleFocus = () => {
    // showing the cursor
    document.getElementById(
      `letter__${textAreaRef.current.value.length ?? 0}`,
    ).className = 'typing__cursor';
    setIsFocused(true);
  };

  const handleBlur = () => {
    // hiding the cursor
    document.querySelector('.typing__cursor').className = '';
    setIsFocused(false);
  };

  return (
    <Container id="typing__test__speed">
      <Box variant='h3' color='primary'>
        Typing Test Speed
      </Box>
      <Box variant='h1' color='primary'>
        {duration}
      </Box>
      <main style={{ height: 0 }}>
        <div className='typing__textArea'>
          <InputTextField
            unselectable='on'
            onFocus={handleFocus}
            onBlur={handleBlur}
            onInput={handleInput}
            ref={textAreaRef}
          />
        </div>
        <div className='typing__words'>{words.length > 0 && words}</div>
      </main>
      {/* {showCard && (
        <CardInfo
          {...cardTypingTestInfo}
          setDuration={setDuration}
          setShowCard={setShowCard}
          textAreaRef={textAreaRef}
        />
      )} */}
    </Container>
  )
}

export default App
