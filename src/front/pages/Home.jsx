import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Card from "../components/Card.jsx";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer()
	const [correoElectronico, setCorreoElectronico] = useState("")
	const [contraseña, setContraseña] = useState("")
	
	const [ojito, setOjito] = useState('password')

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	useEffect(() => {
		loadMessage()
	}, [])

	function iniciarSesion() {
		fetch(`${import.meta.env.VITE_BACKEND_URL}/token`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: correoElectronico, password: contraseña })
		})
			.then(resp => resp.json())
			.then(data => {
				if (data && data.token) {
					localStorage.setItem('token4libros', data.token)
				}
				else alert('Este usuario no existe')
			})
			.catch(error => {
				alert('Este usuario no existe')
				console.log(error)
			})
	}

	return (
		<div className="text-center mt-5">
			<h1 className="display-4">Iniciar sesión</h1>
			<input type="text" onChange={(e) => setCorreoElectronico(e.target.value)} />
			<input type="password" onChange={(e) => setContraseña(e.target.value)} />
			<button onClick={iniciarSesion}>
				Iniciar sesión
			</button>

			<a href="/olvide">
				Olvidé mi contraseña
			</a>
		</div>
	);
}; 