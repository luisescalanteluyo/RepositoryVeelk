import { MouseEventHandler, useEffect, useState } from "react";
import { storeVehicle } from "../../controllers/vehicles";
import ToastComponent from "../Toast";

function TableArchiveComponent({ idk, event }: { idk: string | undefined, event: MouseEventHandler }) {
    const [toast, setToast] = useState({ show: false, title: "", msg: "", error: false });
    const [chkInput, setChkInput] = useState(false);

    useEffect(() => { }, [chkInput])

    const storeVehicleEvent = async () => {
        if (idk !== undefined) {
            const vehicle = await storeVehicle(idk);
            if (vehicle) {
                setToast({ show: true, title: "Correcto", msg: "¡El vehículo ha sido archivado correctamente!", error: false });
                setTimeout(() => document.getElementById("back-btn")?.click(), 2000)
            } else {
                setToast({ show: true, title: "Error", msg: "¡El vehículo no ha sido archivado!", error: true });
            }
        }
    }

    return (
        <>{toast.show && <ToastComponent title={toast.title} msg={toast.msg} error={toast.error} />}
            <div className="offcanvas-body mx-0 flex-grow-0">
                <div className="row  mb-3">
                    <h5 id="offcanvasEndLabel" className="offcanvas-title" style={{ marginTop: '30px', marginBottom: '30px' }}>Archivar vehículo </h5>
                    <div className="row mb-3">
                        <div className="justify-content-between" style={{ marginTop: '15px' }}>
                            <input className="form-check-input"
                                type="checkbox"
                                onChange={e => { setChkInput(e.target.checked) }}
                                defaultChecked={chkInput} id="starredAt" />
                            <label className="form-check-label" htmlFor="starredAt">&nbsp;&nbsp;&nbsp;Estoy seguro de archivar esté vehículo</label>
                        </div>

                    </div>
                </div>
                <div className="row mb-3">
                    <button
                        type="button"
                        className="btn btn-primary d-grid w-100"
                        data-bs-dismiss="offcanvas"
                        disabled={!chkInput}
                        onClick={() => storeVehicleEvent()}>
                        Archivar vehículo
                    </button>
                </div>
                <div className="row mb-3">
                    <button
                        type="button"
                        id="back-btn"
                        className="btn btn-outline-secondary d-grid w-100"
                        data-bs-dismiss="offcanvas"
                        onClick={event}>
                        Volver al vehículo
                    </button>
                </div>
            </div>
        </>)
}
export default TableArchiveComponent;