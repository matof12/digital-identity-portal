import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/LoginPage.scss";

const schema = z.object({
  username: z.string().min(1, "Requerido"),
  password: z.string().min(4, "Mínimo 4 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } =
    useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const ok = await login(data.username, data.password);
    if (ok) navigate("/");
    else setError("root", { message: "Credenciales inválidas" });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>interfase</h1>
        <p className="subtitle">Portal de Identidad Digital</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="field-label">Usuario</label>
            <input
              {...register("username")}
              placeholder="Ingrese su usuario"
              className={`input-field ${errors.username ? "error" : ""}`}
            />
            {errors.username && <p className="error-message">{errors.username.message}</p>}
          </div>
          <div className="form-group">
            <label className="field-label">Contraseña</label>
            <input
              {...register("password")}
              type="password"
              placeholder="Ingrese su contraseña"
              className={`input-field ${errors.password ? "error" : ""}`}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>

          {errors.root && <div className="alert-error">{errors.root.message}</div>}

          <button type="submit" disabled={isSubmitting} className="btn-primary submit-btn">
            {isSubmitting ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="forgot-link">
          <Link to="/forgot-password">Olvidé mi contraseña</Link>
        </p>
      </div>
    </div>
  );
}