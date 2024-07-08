import styled from "@emotion/styled";

const LettersFontSize = "18px"

export const Colors = {
	white: '#ffffff',
	lightCyan: '#cbf3f0',
	gray: '#eceaeb',
	cyan: '#2ec4b6',
};

export const Container = styled.section`
	
	justify-content: space-around;
	background-color: #4d4855;
background-image: linear-gradient(147deg, #4d4855 0%, #000000 74%);
	height: 100vh;
	/* overflow: hidden; */
	align-items: center;
	position: relative;
	width: 100%;
	flex-wrap: wrap;
	padding: 1em 2em;
	font-size: ${LettersFontSize};
	.typing__words {
		position: relative;
		top: -400px;
		color: #fcfcfc;
		font-family:Raleway;
	letter-spacing: 0.75px;
		padding: 1em;
		z-index: 0;
		/* background-color:#f3ededc4; */
		/* box-shadow: 1px 1px 9px 0px ${Colors.cyan}; */
		user-select: none; // for not selecting the text and copying it into the textArea
		span {
			font-weight: 500;
			font-style: Integral CF;
			padding: 0.9px; // 'letter spacing'
		}
	}
	h3 {
		width: fit-content;
		padding-bottom: 2px;
		border-bottom: 5px solid ${Colors['cyan']};
		position: relative;
		color: ${Colors['cyan']};
		font-size: clamp(1em, 5vw, 3em);
		font-weight: bold;
		margin-bottom: 40px;
		text-transform: capitalize;
		letter-spacing: 1px;
		word-spacing: 3px;
	}
	.typing__textArea {
		width: 100%;
	}
`;
export const InputTextField = styled.textarea`
	width: 100%;
	height: 400px;
	font-size: 1.3em;
	position: relative;
	padding: 1em;
	z-index: 2;
	border: none;
	color: transparent;
	background: transparent;
	resize: none;
	user-select: none;
	&:focus {
		outline: none;
	}
	&::selection {
		background: transparent;
	}
`;