import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Card from "../components/Card.jsx";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer()
	const [correoElectronico, setCorreoElectronico] = useState("")

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

	function enviarCorreo() {
		fetch(`${import.meta.env.VITE_BACKEND_URL}/email-prueba`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ recipient: correoElectronico })
		})
		.then(resp => resp.json())
		.then(data => {
			console.log(data)
		})
		.catch(error => {
			console.log(error)
		}) 
	}

	return (
		<div className="text-center mt-5">
			<h1 className="display-4">Hello Rigo!!</h1>
			<input type="text" onChange={(e) => setCorreoElectronico(e.target.value)} />
			<button onClick={enviarCorreo}>
				Enviar correo electrónico
			</button>
		</div>
	);
}; 