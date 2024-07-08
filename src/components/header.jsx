import { Box, Flex, Image } from "@chakra-ui/react"
import Icon from "../assets/keyboard.svg"

const Header = () => {
    return (
        <Flex alignItems={"center"} gap='8px' color="#FFDB58">
            <Image width={'30px'} height={"30px"} src={Icon} />
            <Box letterSpacing={"2px"} fontFamily={"Lilita One"} fontWeight={600} fontSize="24px">Typing Test</Box>
        </Flex>
    )
}

export default Header   