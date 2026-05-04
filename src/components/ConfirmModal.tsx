import "../styles/ConfirmModal.scss"

interface Props {
    message: string
    onConfirm: () => void
    onCancel: () => void
}

export default function ConfirmModal({ message, onConfirm, onCancel }: Props) {
    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-icon">⚠️</div>
                <p className="modal-message">{message}</p>
                <div className="modal-actions">
                    <button className="btn-secondary" onClick={onCancel}>
                        Cancelar
                    </button>
                    <button className="btn-danger" onClick={onConfirm}>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    )
}