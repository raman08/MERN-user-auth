import React from 'react';
import {
	Box,
	Container,
	Text,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
} from '@chakra-ui/react';

import Login from '../components/login';
import Signup from '../components/signup';

const Home = () => {
	return (
		<>
			<Container centerContent maxW="container.xl">
				<Box
					d="flex"
					justifyContent="center"
					p="3"
					bg={'white'}
					m="40px 0 15px 0"
					w="50%"
					borderRadius="lg"
					borderColor="white"
				>
					<Text fontSize="2xl" fontFamily="Work Sans" color="black">
						Login To Continue
					</Text>
				</Box>
				<Box
					bg="white"
					w="70%"
					p="4"
					borderRadius="lg"
					borderWidth="1px"
				>
					<Tabs isFitted variant="soft-rounded">
						<TabList mb="1em">
							<Tab>Login</Tab>
							<Tab>SignUp</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								<Login />
							</TabPanel>
							<TabPanel>
								<Signup />
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Box>
			</Container>
		</>
	);
};

export default Home;
