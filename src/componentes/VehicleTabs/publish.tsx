import { MouseEventHandler, useEffect, useState } from "react";
import { publishVehicle } from "../../controllers/vehicles";
import ToastComponent from "../Toast";
import { promoModel } from "../../models/vehicles";

function TablePublishComponent({ idk, event, promo }: { idk: string | undefined, event: MouseEventHandler, promo: promoModel | undefined }) {
    const [promoInput, setPromoInput] = useState({ message: '', starredAt: '' });
    const [toast, setToast] = useState({ show: false, title: "", msg: "", error: false });
    const [chkInput, setChkInput] = useState(false);

    useEffect(() => {
        emptyPromoEvent();
    }, [chkInput])

    const emptyPromoEvent = () => {
        if(promo !== null && promo !== undefined){
            if (promo.message !== null && promo.message !== "") {
                if (promo.starredAt) { setChkInput(true) }
                setPromoInput(promo);
            } else {
                setPromoInput({ message: '', starredAt: '' });
            }
        }else {
            setPromoInput({ message: '', starredAt: '' });
        }  
    }


    const publishVehicleEvent = async () => {
        if (idk !== undefined) {
            const vehicle = await publishVehicle(idk, false, promoInput);
            if (vehicle) {
                setToast({ show: true, title: "Correcto", msg: "¡El vehículo ha sido modificado correctamente!", error: false });
                setTimeout(() => document.getElementById("back-btnpu")?.click(), 2000)
            } else {
                setToast({ show: true, title: "Error", msg: "¡El vehículo no ha sido publicado!", error: true });
            }
        }
    }

    const handleChange = (event: any) => {
        let value: string | string[] = event.target.value;
        setPromoInput({ ...promoInput, [event.target.name]: value })
    };

    return (
        <>{toast.show && <ToastComponent title={toast.title} msg={toast.msg} error={toast.error} />}
            <div className="offcanvas-body mx-0 flex-grow-0">
                <div className="row  mb-3">
                    <h5 id="offcanvasEndLabel" className="offcanvas-title" style={{ marginTop: '30px', marginBottom: '30px' }}>Promocionar vehículo </h5>
                    <div className="col-sm-12">
                        <textarea
                            className="form-control"
                            id="message"
                            name="message"
                            defaultValue={promoInput?.message}
                            placeholder={`Ingresa un mensaje promocional para los potenciales compradores de este vehículo.`}
                            rows={3}
                            onChange={handleChange} ></textarea>
                    </div>
                    <div className="row mb-3">
                        <div className="justify-content-between" style={{ marginTop: '15px' }}>
                            <input className="form-check-input"
                                type="checkbox"
                                onChange={e => {
                                    setChkInput(e.target.checked)
                                    setPromoInput({ ...promoInput, starredAt: e.target.checked ? new Date().toLocaleDateString() : "null" });
                                }}
                                defaultChecked={chkInput} id="starredAt" />
                            <label className="form-check-label" htmlFor="starredAt">&nbsp;&nbsp;&nbsp;Destacar esté vehículo</label>
                        </div>

                    </div>
                </div>
                <div className="row mb-3">
                    <button
                        type="button" 
                        className="btn btn-primary d-grid w-100"
                        data-bs-dismiss="offcanvas"
                        onClick={() => publishVehicleEvent()}>
                        Publicar vehículo
                    </button>
                </div>
                <div className="row mb-3">
                    <button
                        type="button"
                        className="btn btn-outline-secondary d-grid w-100"
                        data-bs-dismiss="offcanvas"
                        id="back-btnpu"
                        onClick={event}>
                        Volver al vehículo
                    </button>
                </div>
            </div>
        </>)
}
export default TablePublishComponent;