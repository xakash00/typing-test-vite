import { Box, Flex } from '@chakra-ui/react';
import Reset from "../assets/resetIcon.svg?react";
import Quotes from "../assets/quotes.svg?react";
import axios from 'axios';
import { TYPING_DURATION } from '../constants/constants';


const OptionBar = (props) => {
    const { refetch, updateDuration, setWords, setLoading } = props;

    const getQuotes = async () => {
        setLoading(true)
        const response = await axios.get("https://api.quotable.io/random")
        await setLoading(false)
        setWords(response.data.content.split('')
            .map((letter, index) => (
                <span key={index} id={`letter__${index}`}>
                    {letter}
                </span>
            )),
            await updateDuration(25)
        )

    }

    return (
        <Flex rounded='8px' className='options-bar' padding="16px" alignItems={"center"} justifyContent={"center"}>
            <Box gap="8px" onClick={() => { refetch(); updateDuration(TYPING_DURATION) }} width="100%" display="flex" alignItems={"center"} justifyContent={"center"} stroke="#646669" _hover={{ bg: "transparent", stroke: "#FCFCFC", color: "#FCFCFC" }}>
                <Reset width="20px" height={"20px"} />
                <Box color="#646669" fontSize={"13px"}>Reset</Box>
            </Box>
            <Box gap='8px' onClick={() => { getQuotes() }} width="100%" display="flex" alignItems={"center"} justifyContent={"center"} fill="#646669" _hover={{ bg: "transparent", fill: "#FCFCFC", color: "#FCFCFC" }}>
                <Quotes width="20px" height={"20px"} />
                <Box color="#646669" fontSize={"13px"}>Quotes</Box>
            </Box>
            <Flex alignItems={"center"} gap="30px" pl="30px" borderLeft="2px solid white">
                <Box as='button' onClick={() => { updateDuration(15) }} width="100%" display="flex" alignItems={"center"} justifyContent={"center"} fontSize="13px" color="#646669" _hover={{ bg: "transparent", color: "#FCFCFC" }}>
                    15
                </Box>
                <Box as='button' onClick={() => { updateDuration(30) }} width="100%" display="flex" alignItems={"center"} justifyContent={"center"} fontSize="13px" color="#646669" _hover={{ bg: "transparent", color: "#FCFCFC" }}>
                    30
                </Box>
                <Box as='button' onClick={() => { updateDuration(60) }} width="100%" display="flex" alignItems={"center"} justifyContent={"center"} fontSize="13px" color="#646669" _hover={{ bg: "transparent", color: "#FCFCFC" }}>
                    60
                </Box>
                <Box as='button' onClick={() => { updateDuration(120) }} width="100%" display="flex" alignItems={"center"} justifyContent={"center"} fontSize="13px" color="#646669" _hover={{ bg: "transparent", color: "#FCFCFC" }}>
                    120
                </Box>
            </Flex>
        </Flex>
    )
}

export default OptionBar