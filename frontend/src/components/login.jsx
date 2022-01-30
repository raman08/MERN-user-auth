import { useState } from 'react';
import {
	VStack,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Button,
	useToast,
} from '@chakra-ui/react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [show, setShow] = useState(false);

	const [loading, setLoading] = useState(false);

	const toast = useToast();

	const handelPassClick = () => setShow(!show);

	const navigate = useNavigate();

	const BaseURL = 'http://localhost:8000/user/login';
	axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

	const submitHandler = async () => {
		setLoading(true);

		if (!email || !password) {
			toast({
				title: 'Please Fill All the Fields',
				status: 'error',
				position: 'top',
			});
			setLoading(false);
			return;
		}

		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const formData = {
				email: email,
				password: password,
			};

			const { data } = await axios.post(BaseURL, formData, config);

			localStorage.setItem('userDetails', JSON.stringify(data));

			toast({
				title: 'Login Sucessfully',
				status: 'success',
				position: 'top',
				isClosable: true,
				duration: '2000',
			});

			setLoading(false);

			navigate('/profile');
		} catch (err) {
			if (err.response) {
				if (err.response.status === 401) {
					toast({
						title: err.response.data.error,
						status: 'info',
						duration: '3000',
						position: 'top',
					});
				} else {
					toast({
						title: 'Some Error Occour',
						status: 'info',
						duration: '3000',
						position: 'top',
					});
				}
			}

			setLoading(false);
		}
	};

	return (
		<VStack spacing="5px">
			<FormControl id="lemail" isRequired>
				<FormLabel>Email</FormLabel>
				<Input
					placeholder="jhonwatts@gmail.com"
					onChange={e => setEmail(e.target.value)}
				></Input>
			</FormControl>

			<FormControl id="lpassword" isRequired>
				<FormLabel>Password</FormLabel>
				<InputGroup>
					<Input
						type={show ? 'text' : 'password'}
						placeholder="********"
						onChange={e => setPassword(e.target.value)}
					></Input>
					<InputRightElement w="4.5rem">
						<Button size="sm" onClick={handelPassClick}>
							{show ? 'Hide' : 'Show'}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>

			<Button
				colorScheme={'blue'}
				style={{ marginTop: '15px' }}
				isLoading={loading}
				onClick={submitHandler}
			>
				SignUp
			</Button>
		</VStack>
	);
};

export default Login;
