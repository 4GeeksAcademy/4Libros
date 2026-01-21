import React, { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom";

export default function Resetear() {
    const [params] = useSearchParams()

    const [contraseña, setContraseña] = useState("")
    const [repite, setRepite] = useState("")

    function restaurarContraseña() {
        if (contraseña !== repite) {
            alert("las contraseñas no coinciden")
            return
        }

        let token = params.get('token')

        fetch(`${import.meta.env.VITE_BACKEND_URL}/change-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ password: contraseña })
        })
            .then(resp => resp.json())
            .then(data => {
                if (data && data.success) {
                    alert('Contraseña cambiada correctament')
                }
                else alert('Hubo un error intentando cambiar tu contraseña')
            })
            .catch(error => {
                alert('Hubo un error intentando cambiar tu contraseña')
                console.log(error)
            })
    }

    return (
        <div className="text-center mt-5">
            <h1 className="display-4">Restaura tu contraseña</h1>
            <input type="password" onChange={(e) => setContraseña(e.target.value)} />
            <input type="password" onChange={(e) => setRepite(e.target.value)} />
            <button onClick={restaurarContraseña}>
                Restaurar contraseña
            </button>
        </div>
    )
}