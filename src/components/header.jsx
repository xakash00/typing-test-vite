import { Box, Flex, Image } from "@chakra-ui/react"
import Icon from "../assets/keyboard.svg"
// import Refetch from "../assets/refetchIcon.svg"
import Refetch from "../assets/refetchIcon.svg?react";

const Header = (props) => {
    return (
        <Flex alignItems={"center"} gap='8px' color="#FFDB58">
            <Image width={'30px'} height={"30px"} src={Icon} />
            <Box letterSpacing={"1px"} fontFamily={"Lilita One"} fontWeight={500} fontSize="24px">Typing Test</Box>
            <Box marginLeft='10px' onClick={props.refetch} as="button" _hover={{ bg: "transparent", fill: "#FCFCFC" }} transition={"fill 0.3s ease"} fill="#646669" bg='transparent'>
                <Refetch width={'22px'} height={"22px"} />
            </Box>
        </Flex>
    )
}

export default Header   