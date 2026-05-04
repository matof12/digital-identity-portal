import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getProfile, updateProfile } from "../services/userServices";
import "../styles/ProfilePage.scss";

const schema = z.object({
  name: z.string().min(2, "Mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
});

type FormData = z.infer<typeof schema>;

export default function ProfilePage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profile, setProfile] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    getProfile().then((p) => {
      setProfile(p);
      reset({ name: p.name, email: p.email });
    });
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const updated = await updateProfile(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setProfile((prev: any) => ({ ...prev, ...updated }));
      setFeedback({ type: "success", msg: "Perfil actualizado correctamente" });
      setEditing(false);
    } catch {
      setFeedback({ type: "error", msg: "Error al actualizar el perfil" });
    }
    setTimeout(() => setFeedback(null), 3000);
  };

  if (!profile) return <p className="loading">Cargando...</p>;

  return (
    <div className="profile-container">
      <h2 className="section-title">Perfil</h2>

      {feedback && (
        <div className={`feedback-message ${feedback.type}`}>
          {feedback.msg}
        </div>
      )}

      <div className="profile-card">
        <div className="profile-header">
          {profile.avatar ? (
            <img className="profile-avatar image" src={profile.avatar} alt="avatar" />
          ) : (
            <div className="profile-avatar gradient">MF</div>
          )}
          <div className="user-info">
            <p className="name">{profile.name}</p>
            <p className="role">{profile.role}</p>
          </div>
        </div>

        <div className="profile-content">
          {!editing ? (
            <div className="view-mode">
              {[
                { label: "Email", value: profile.email },
                { label: "País", value: profile.country },
                { label: "Teléfono", value: profile.phone },
              ].map((f) => (
                <div className="info-field" key={f.label}>
                  <p className="field-label">{f.label}</p>
                  <p className="value">{f.value}</p>
                </div>
              ))}
              <button className="btn-primary edit-btn" onClick={() => setEditing(true)}>
                Editar perfil
              </button>
            </div>
          ) : (
            <div className="edit-mode">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label className="field-label">Nombre</label>
                <input
                  {...register("name")}
                  className={`input-field ${errors.name ? "error" : ""}`}
                />
                {errors.name && <p className="error-message">{errors.name.message}</p>}
              </div>

              <div className="form-group">
                <label className="field-label">Email</label>
                <input
                  {...register("email")}
                  className={`input-field ${errors.email ? "error" : ""}`}
                />
                {errors.email && <p className="error-message">{errors.email.message}</p>}
              </div>

              <div className="card-actions">
                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? "Guardando..." : "Guardar"}
                </button>
                <button type="button" className="btn-secondary" onClick={() => setEditing(false)}>
                  Cancelar
                </button>
              </div>
            </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}