import { useCallback, useState, useRef, useEffect } from "react";
import { TYPING_DURATION } from "./constants/constants";
import axios from "axios";
import { Box, Spinner } from "@chakra-ui/react";
import { Container, InputTextField } from "./styled";
import "./App.css";
import Header from "./components/header";
import { fallBackParagraph } from "./helperFuncs";
import OptionBar from "./components/optionsBar";

function App() {
  const [words, setWords] = useState([]);
  const textAreaRef = useRef(null);
  const [duration, setDuration] = useState(TYPING_DURATION);
  const [showCard, setShowCard] = useState(false);
  const [loading, setLoading] = useState(false)
  const [intervalState, setIntervalState] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [cardTypingTestInfo, setCardTypingTestInfo] = useState({
    typedLetters: 0,
    correctLetters: 0,
    accuracy: 0
  });
  // getting differents words from `http://metaphorpsum.com/paragraphs/1/20`
  const fetchData = useCallback(async () => {
    setLoading(true)
    axios.get(`http://metaphorpsum.com/paragraphs/1/${15}`).then((data) => {
      setWords(
        data.data
          .split('')
          .map((letter, index) => (
            <span key={index} id={`letter__${index}`}>
              {letter}
            </span>
          )),
      );
      setLoading(false)
    }).catch((err) => {
      console.log(err)
      setLoading(false)
      setWords(
        fallBackParagraph
          .split('')
          .map((letter, index) => (
            <span key={index} id={`letter__${index}`}>
              {letter}
            </span>
          )),
      );
    })

  }, [duration]);

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
    document.getElementById(
      `letter__${textAreaRef.current.value.length}`,
    ).className = 'typing__cursor';
  };

  useEffect(() => {
    if (isFocused && duration === TYPING_DURATION) {
      setIntervalState(
        setInterval(
          () => setDuration((duration) => duration - 1),
          1000,
        ),
      );

    } else if (duration === 0) {
      clearInterval(intervalState);

      textAreaRef?.current.blur();
      // setIsFocused(false);
      setCardTypingTestInfo(() => {
        return {
          typedLetters: textAreaRef?.current?.value?.length,
          correctLetters:
            document.querySelectorAll('.letter__correct').length,

        };
      });

      setShowCard(true);

      // if (!isFocused) fetchData();
    }
  }, [duration, isFocused]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleFocus = () => {

    document.getElementById(
      `letter__${textAreaRef.current.value.length ?? 0}`,
    ).className = 'typing__cursor';
    setIsFocused(true);
  };

  const handleBlur = () => {

    document.querySelector('.typing__cursor').className = '';
    setIsFocused(false);
  };

  const updateDuration = (num) => {
    setDuration(num)
  }

  return (
    <Container id="typing__test__speed">
      <Header refetch={() => { fetchData(); setShowCard(false); setDuration(TYPING_DURATION); }} />
      <Box mt="30px">
        <OptionBar {...{ updateDuration, setWords, setLoading }} refetch={() => { fetchData(); setShowCard(false); setDuration() }} />
      </Box>
      <Box color="#FFDB58" mt={'30px'} {...(duration < 11 && { className: "blink_me" })} variant="h1" fontSize={"30px"} fontWeight={500} w='100%' textAlign={"center"}>
        {duration}
      </Box>
      {
        !showCard && <Box>
          {loading === true ? <Loader /> : <>
            <Box className='typing__textArea'>
              <InputTextField
                unselectable='on'
                onBlur={handleBlur}
                onFocus={handleFocus}
                onInput={handleInput}
                ref={textAreaRef}
              />
            </Box>
            <Box className='typing__words'>{words.length > 0 && words}</Box>
          </>
          }

        </Box>
      }

      {showCard && <pre><code>{JSON.stringify(cardTypingTestInfo, 2, null)}</code></pre>}
      {/* {showCard && (
        <CardInfo
          {...cardTypingTestInfo}
          setDuration={setDuration}
          setShowCard={setShowCard}
          textAreaRef={textAreaRef}
        />
      )} */}
    </Container >
  )
}

export default App


const Loader = () => {
  return (
    <Box w='100%' marginTop={"10%"} textAlign={"center"} >
      <Spinner color="#FFDB58" size='xl' />
    </Box>
  )
}