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

const Signup = () => {
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [cpassword, setCPassword] = useState();
	const [phone, setPhone] = useState();
	const [address, setAddress] = useState();

	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);

	const toast = useToast();

	const handelPassClick = () => setShow(!show);

	const BaseURL = 'http://localhost:8000/user/signup';
	// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

	const submitHandler = async () => {
		setLoading(true);

		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!cpassword ||
			!phone ||
			!address
		) {
			toast({
				title: 'Please Fill All the Fields',
				status: 'error',
				position: 'top',
			});
			setLoading(false);
			return;
		}

		if (password !== cpassword) {
			toast({
				title: 'Password are not same',
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
			const { data } = await axios.post(
				BaseURL,
				{
					firstName: firstName,
					lastName: lastName,
					email: email,
					password: password,
					cpassword: cpassword,
					phoneNo: phone,
					address: address,
				},
				config
			);

			console.log(data);
			toast({
				title: 'User Created Sucessfully!',
				status: 'success',
				position: 'top',
			});
			setLoading(false);
		} catch (err) {
			if (err.response) {
				if (err.response.status === 400) {
					for (var i = 0; i < err.response.data.errors.length; i++) {
						toast({
							title: err.response.data.errors[i].msg,
							status: 'error',
							duration: '3000',
							position: 'top',
						});
					}
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
			<FormControl id="first-name" isRequired>
				<FormLabel>First Name</FormLabel>
				<Input
					placeholder="Jhon"
					type="email"
					onChange={e => setFirstName(e.target.value)}
				></Input>
			</FormControl>

			<FormControl id="last-name" isRequired>
				<FormLabel>Last Name</FormLabel>
				<Input
					placeholder="Watts"
					onChange={e => setLastName(e.target.value)}
				></Input>
			</FormControl>

			<FormControl id="email" isRequired>
				<FormLabel>Email</FormLabel>
				<Input
					placeholder="jhonwatts@gmail.com"
					onChange={e => setEmail(e.target.value)}
				></Input>
			</FormControl>

			<FormControl id="password" isRequired>
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

			<FormControl id="cpassword" isRequired>
				<FormLabel>Confirm Password</FormLabel>
				<InputGroup>
					<Input
						type={show ? 'text' : 'password'}
						placeholder="********"
						onChange={e => setCPassword(e.target.value)}
					></Input>
					<InputRightElement w="4.5rem">
						<Button size="sm" onClick={handelPassClick}>
							{show ? 'Hide' : 'Show'}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>

			<FormControl id="phone" isRequired>
				<FormLabel>Phone No</FormLabel>
				<Input
					placeholder="7777777777"
					type="number"
					onChange={e => setPhone(e.target.value)}
				></Input>
			</FormControl>

			<FormControl id="address" isRequired>
				<FormLabel>Address</FormLabel>
				<Input
					placeholder="167 Fidel Pine, Bilzen, USA"
					onChange={e => setAddress(e.target.value)}
				></Input>
			</FormControl>

			<Button
				colorScheme={'blue'}
				style={{ marginTop: '15px' }}
				onClick={submitHandler}
				isLoading={loading}
			>
				SignUp
			</Button>
		</VStack>
	);
};

export default Signup;
