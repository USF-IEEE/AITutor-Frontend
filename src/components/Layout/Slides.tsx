import { Box, Flex, List, ListItem, Text } from '@chakra-ui/react';

interface SlideProps {
	title: string;
	content: string[];
}

const Slides = ({ title, content }: SlideProps) => {
	return (
		<Box padding="10%">
			<Flex direction="column" alignItems="center">
				<Box fontSize="2xl" fontWeight="bold">
					<Text>{title}</Text>
				</Box>
				<List spacing={3} padding="5%">
					{content.map((item) => {
						return (
							<ListItem>
								<Text>{item}</Text>
							</ListItem>
						);
					})}
				</List>
			</Flex>
		</Box>
	);
};

export default Slides;
