import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"
import { useState } from "react"
import "../styles/ForgotPasswordPage.scss"

const schema = z.object({
    email: z.string().email("Email inválido"),
})

type FormData = z.infer<typeof schema>

export default function ForgotPasswordPage() {
    const [sent, setSent] = useState(false)
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } =
        useForm<FormData>({ resolver: zodResolver(schema) })

    const onSubmit = async (data: FormData) => {
        await new Promise((r) => setTimeout(r, 1000))
        if (data.email === "admin@example.com") {
            setSent(true)
        } else {
            setError("email", { message: "No existe una cuenta asociada a ese email" })
        }
    }

    return (
        <div className="forgot-container">
            <div className="forgot-card">
                <h1>interfase</h1>
                <p className="subtitle">Recuperar acceso</p>

                {!sent ? (
                    <form className="forgot-form" onSubmit={handleSubmit(onSubmit)}>
                        <p className="intro-text mb-4">
                            Ingresá tu email y te enviaremos instrucciones para recuperar tu contraseña.
                        </p>
                        <div className="form-group">
                            <input
                                {...register("email")}
                                placeholder="tu@email.com"
                                className={`input-field ${errors.email ? "error" : ""}`}
                            />
                            {errors.email && <p className="error-message">{errors.email.message}</p>}
                        </div>

                        <button type="submit" disabled={isSubmitting} className="btn-primary submit-btn">
                            {isSubmitting ? "Enviando..." : "Enviar instrucciones"}
                        </button>
                    </form>
                ) : (
                    <div className="status-message success">
                        <p>✓ Recibirás las instrucciones para recuperar tu contraseña en tu correo electrónico.</p>
                    </div>
                )}

                <p className="help-text">
                    <Link className="link-text" to="/login">Volver al login</Link>
                </p>
            </div>
        </div>
    )
}