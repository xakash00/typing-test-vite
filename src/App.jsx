import { useCallback, useState, useRef, useEffect } from "react";
import { TYPING_DURATION } from "./constants/constants";
import axios from "axios";
import { Box, Spinner } from "@chakra-ui/react";
import { Container, InputTextField } from "./styled";
import "./App.css";
import Header from "./components/header";

const sample = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"]



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
    axios.get("http://metaphorpsum.com/paragraphs/1/20").then((data) => {
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
    }).catch(() => {
      setLoading(false)
      setWords(
        sample
          .join(' ')
          .split('')
          .map((letter, index) => (
            <span key={index} id={`letter__${index}`}>
              {letter}
            </span>
          )),
      );
    })

  }, []);

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

  return (
    <Container id="typing__test__speed">
      <Header refetch={fetchData} />
      <Box color="#FFDB58" mt={'30px'} {...(duration < 11 && { className: "blink_me" })} variant="h1" fontSize={"30px"} fontWeight={500} w='100%' textAlign={"center"}>
        {duration}
      </Box>
      {!showCard && <div>
        {loading === true ? <Loader /> : <>
          <div className='typing__textArea'>
            <InputTextField
              unselectable='on'
              onBlur={handleBlur}
              onFocus={handleFocus}
              onInput={handleInput}
              ref={textAreaRef}
            />
          </div>
          <div className='typing__words'>{words.length > 0 && words}</div>
        </>
        }

      </div>}

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