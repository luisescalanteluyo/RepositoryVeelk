function ToastComponent({ title, msg, error }: { title: string, msg: string, error: boolean }) {

    const validateTypeToast = () => error ? 'bg-danger' : 'bg-success';

    return (
        <div className={`bs-toast toast toast-placement-ex m-2 fade ${validateTypeToast()} top-0 end-0 show`} role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000">
            <div className="toast-header">
                <i className="bx bx-bell me-2"></i>
                <div className="me-auto fw-semibold">{title}</div>
                <small>Ahora</small>
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">{msg}</div>
        </div>
    )
}

export default ToastComponent;