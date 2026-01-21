import React, { useEffect, useState } from "react"

export default function Olvide() {
    const [correoElectronico, setCorreoElectronico] = useState("")


    function restaurarContraseña() {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/reset-password`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: correoElectronico })
		})
			.then(resp => resp.json())
			.then(data => {
				if (data && data.success) {
					alert('Checkea tu email')
				}
                else alert('Hubo un error intentando resetar tu contraseña')
			})
			.catch(error => {
				alert('Hubo un error intentando resetar tu contraseña')
				console.log(error)
			})
	}

    return (
        <div className="text-center mt-5">
			<h1 className="display-4">Olvidé mi contraseña</h1>
			<input type="text" onChange={(e) => setCorreoElectronico(e.target.value)} />
			<button onClick={restaurarContraseña}>
				Restaurar contraseña
			</button>
		</div>
    )
}