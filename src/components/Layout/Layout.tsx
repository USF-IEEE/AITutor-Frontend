import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import { AtSignIcon, SettingsIcon, HamburgerIcon } from '@chakra-ui/icons';

interface LayoutProps {
	children: React.ReactNode;
}

interface SidebarItemProps {
	text: string;
	icon: React.ReactNode;
	onClick: () => void;
}

const Layout = ({ children }: LayoutProps) => {
	const SidebarItem = ({ text, icon, onClick }: SidebarItemProps) => {
		return (
			<Box as="button" onClick={onClick} w="100%" padding="12px">
				<Flex align="center" p="4" role="group" cursor="pointer">
					{icon}
					<Text>{text}</Text>
				</Flex>
			</Box>
		);
	};
	const barHeight = '100px';
	return (
		<Box
			width="100vw"
			h="100vh"
			backgroundColor={'#f8f7f3'}
			overflow={'hidden'}
		>
			<Flex
				width={'100%'}
				height={barHeight}
				padding="16px"
				alignItems="center"
			>
				<Heading
					fontSize="3xl"
					textTransform={'uppercase'}
					marginLeft={'2.5em'}
				>
					AITutor
				</Heading>
			</Flex>

			<Grid gridTemplateColumns={'1.5fr 8fr'} h={`calc(100vh - ${barHeight})`}>
				<Flex flexDir={'column'} alignItems={'center'}>
					<SidebarItem
						text={'Home'}
						icon={<HamburgerIcon mr="4" boxSize="6" />}
						onClick={console.log('home')}
					/>
					<SidebarItem
						text={'Chat'}
						icon={<AtSignIcon mr="4" boxSize="6" />}
						onClick={console.log('chat')}
					/>
					<SidebarItem
						text={'Settings'}
						icon={<SettingsIcon mr="4" boxSize="6" />}
						onClick={console.log('settings')}
					/>
				</Flex>
				<Flex
					bgColor="#ffffff"
					borderTopLeftRadius="20px"
					padding="20px"
					height={'100%'}
					boxShadow="2px 2px 4px rgba(0, 0, 0, 0.2)"
					overflowY="scroll"
					alignItems={'center'}
					justifyContent={'center'}
					flexDir={'column'}
				>
					{children}
				</Flex>
			</Grid>
		</Box>
	);
};

export default Layout;
