import { MouseEventHandler, useEffect, useState } from "react"
import { expensesModel, incomesModel } from "../../models/vehicles"
import { renderInput, renderInputDate } from "../Form/Input/renders"
import UTILS from "../../utils/utils";
import { billsVehicle } from "../../controllers/vehicles";

function TableBillsComponent({ idk, title, event, bills, showTitle }: { idk: string | undefined, title: string, event: MouseEventHandler, bills: undefined | incomesModel[] | expensesModel[], showTitle: string }) {
    const [billState, setBillState] = useState<incomesModel[] | expensesModel[]>(bills != undefined ? bills : []);
    const [billInput, setBillInput] = useState<incomesModel | expensesModel>({ _id: '', date: '', cost: 0, description: '' });
    const [totalCostState, setTotalCostState] = useState(0)

    useEffect(() => {
        emptyBillEvent();
        sumCosts()
    }, [])

    const sumCosts = () => {
        let total = 0;
        billState.forEach(i => total += i.cost);
        setTotalCostState(total);
    }

    const emptyBillEvent = () => {
        setBillInput({ _id: '', date: '', cost: 0, description: '' })
    }

    const updateListBills = async () => {
        if (idk !== undefined) {
            const bill = await billsVehicle(billInput, idk, title);
            if (bill) {
                setBillState(bill);
                emptyBillEvent();
                sumCosts()
                // setToast({ show: true, title: "Correcto", msg: "¡El vehículo ha sido modificado correctamente!", error: false });
            } else {
                // setToast({ show: true, title: "Error", msg: "¡El vehículo no ha sido agregado!", error: true });
            }
        }
    }

    const handleChange = (event: any) => {
        let value: string | string[] = event.target.value;
        setBillInput({ ...billInput, [event.target.name]: value })
    };

    return (
        <div className="offcanvas-body mx-0 flex-grow-0">
            <div className="row mb-3">
                <div className="table-responsive ">
                    <table className="table display table-striped table-sm table-condensed dataTable">
                        <thead>
                            <tr id={`trh-fTtoal-${UTILS.SET_RANDOM_KEY("100")}`}><th>ID</th>
                                <th id={`trh1-fTtoal-${UTILS.SET_RANDOM_KEY("100")}`}>Descripción</th>
                                <th id={`trh2-fTtoal-${UTILS.SET_RANDOM_KEY("100")}`}>Fecha</th>
                                <th id={`trh3-fTtoal-${UTILS.SET_RANDOM_KEY("100")}`}>Valor</th></tr>
                        </thead>
                        <tbody>
                            {billState.map(e =>
                                <tr id={`tr-${UTILS.SET_RANDOM_KEY(e._id)}`}>
                                    <td id={`td1-${UTILS.SET_RANDOM_KEY(e._id)}`}>{e._id}</td>
                                    <td id={`td2-${UTILS.SET_RANDOM_KEY(e._id)}`}>{e.description}</td>
                                    <td id={`td3-${UTILS.SET_RANDOM_KEY(e._id)}`}>{e.date}</td>
                                    <td id={`td4-${UTILS.SET_RANDOM_KEY(e._id)}`}>{UTILS.FORMAT_CURRENCY_ITEM(e.cost)}</td>
                                </tr>
                            )}
                            <tr id={`tr-fTtoal--${UTILS.SET_RANDOM_KEY("120")}`}>
                                <th id={`th1-fTtoal-${UTILS.SET_RANDOM_KEY("100")}`}></th>
                                <th id={`th2-fTtoal-${UTILS.SET_RANDOM_KEY("100")}`}></th>
                                <th id={`th3-fTtoal-${UTILS.SET_RANDOM_KEY("100")}`}>TOTAL:</th>
                                <th id={`th4-fTtoal-${UTILS.SET_RANDOM_KEY("100")}`}>{UTILS.FORMAT_CURRENCY_ITEM(totalCostState)} </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="row  mb-3">
                    <h5 id="offcanvasEndLabel" className="offcanvas-title" style={{ marginTop: '30px', marginBottom: '30px' }}>Agregar {title} </h5>
                    <div className="row mb-3">
                        {renderInputDate("date", "Fecha:", "date", "Ingresar la fecha", "checkup2", "bxs-purchase-tag-alt", false, false, handleChange, billInput?.date)}
                        {renderInput("cost", "Valor:", "number", `Ingresar el valor del ${showTitle}`, "appraisal2", "bxs-barcode", false, false, handleChange, billInput?.cost)}
                    </div>
                    <div className="col-sm-12">
                        <textarea className="form-control" id="description" name="description" defaultValue={billInput?.description} placeholder={`Descripcion del ${showTitle}`} rows={3} onChange={handleChange} ></textarea>
                    </div>
                </div>
                <div className="row mb-3">
                    <button
                        type="button"
                        className="btn btn-primary d-grid w-100"
                        data-bs-dismiss="offcanvas"
                        onClick={() => updateListBills()}>
                        Agregar {showTitle}
                    </button>
                </div>
                <div className="row mb-3">
                    <button
                        type="button"
                        className="btn btn-outline-secondary d-grid w-100"
                        data-bs-dismiss="offcanvas"
                        onClick={event}>
                        Volver al vehículo
                    </button>
                </div>
            </div>
        </div>)
}
export default TableBillsComponent