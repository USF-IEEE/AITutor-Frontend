import { useState } from 'react';
import { Box, IconButton, Spacer, HStack } from '@chakra-ui/react';
import Slides from '../components/Layout/Slides';
import Layout from '../components/Layout/Layout';

import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

const dummyContent = [
	{
		title: 'Introduction to C++ Programming',
		content: [
			'Brief history of C++',
			"C++'s role in modern software development",
			'Key features of C++ (e.g., object-oriented, performance)',
		],
	},
	{
		title: 'C++ Basic Syntax',
		content: [
			'Structure of a simple C++ program',
			'Explanation of `#include`, `int main()`, and basic input/output',
			'"Hello World" program',
		],
	},
	{
		title: 'Variables and Data Types in C++',
		content: [
			'Explanation of variables and data types (int, char, float, double, bool)',
			'Examples of variable declarations and assignments',
		],
	},
	{
		title: 'Control Structures in C++',
		content: [
			'Explanation of `if`, `else`, `while`, `for`, and `switch` statements',
			'Code examples for each control structure',
		],
	},
	{
		title: 'Functions in C++',
		content: [
			'Definition and purpose of functions',
			'Syntax for defining and calling functions',
			'Example of a simple function',
		],
	},
	{
		title: 'Introduction to Object-Oriented Programming in C++',
		content: [
			'Concepts of classes and objects',
			'How to define a class and create objects',
			'Example of a simple class',
		],
	},
	{
		title: 'Pointers and Memory Management in C++',
		content: [
			'Explanation of pointers and references',
			'Dynamic memory allocation (`new` and `delete`)',
			'Example code for pointer usage',
		],
	},
	{
		title: 'Standard Template Library (STL) in C++',
		content: [
			'Overview of STL components (Containers, Iterators, Algorithms)',
			'Examples using `vector`, `map`, and algorithms like `sort`',
		],
	},
	{
		title: 'Best Practices and Debugging in C++',
		content: [
			'Coding standards and best practices (naming conventions, comment usage)',
			'Introduction to debugging techniques and tools',
		],
	},
	{
		title: 'Conclusion and Further Learning',
		content: [
			'Recap of key points covered',
			'Recommendations for further study (books, online courses, forums)',
		],
	},
];

const SlidesPage = () => {
	const [slide, setSlide] = useState(0);
	return (
		<Layout>
			<HStack marginBottom="16px">
				<IconButton
					icon={<ChevronLeftIcon />}
					colorScheme="orange"
					aria-label="left-nav"
					onClick={() => setSlide(slide == 0 ? 0 : slide - 1)}
				/>
				<Spacer />
				<IconButton
					icon={<ChevronRightIcon />}
					aria-label="right-nav"
					colorScheme="orange"
					onClick={() =>
						setSlide(
							slide == dummyContent.length - 1
								? dummyContent.length - 1
								: slide + 1
						)
					}
				/>
			</HStack>
			<Box
				width={'90%'}
				height={'90%'}
				border="2px solid black"
				borderRadius={'20px'}
			>
				<Slides
					title={dummyContent[slide].title}
					content={dummyContent[slide].content}
				/>
			</Box>
		</Layout>
	);
};

export default SlidesPage;
