import { useState } from "react";
import { vehiclesModel } from "../../models/vehicles/vehiclesModel";
import SELECT_CONST from "../Form/Select/constants";
import UTILS from "../../utils/utils";
import TableBillsComponent from "./tableBills";
import TablePublishComponent from "./publish";
import TableArchiveComponent from "./archive";

function ModalActionsComponent({ item, show, close }: { item: vehiclesModel | undefined, show: boolean, close: Function }) {
    const [renderSpace, setRenderSpace] = useState("principal");

    const editVehicle = (id: string | undefined, redirect: string) => {
        if (item !== undefined && redirect) {
            window.location.href = redirect + id
        } else {
            return false;
        }
    };

    const getItemSelectName = (select: any, value: string | undefined) => {
        let selected = [{ k: "", v: "?" }];
        if (value !== undefined && value !== null) {
            selected = select.filter((e: any) => e.k === value);
        }
        return selected.length > 0 && selected[0].v !== undefined ? selected[0].v : "";
    }

    const renderSharedOptions = () => {
        return (
            <div className="items-sh-btn" style={{ margin: '0 auto', width: '100%', textAlign: 'center' }}>
                <a onClick={() => { window.open('https://www.addtoany.com/add_to/facebook?linkurl=http%3A%2F%2Fveekls.com&amp;linkname=Veekls', 'popup', 'width=600,height=600'); return false; }}>
                    <img src="https://static.addtoany.com/buttons/facebook.svg" width="32" height="32" style={{ backgroundColor: 'rgb(24, 119, 242)', margin: '5px', borderRadius: '50%', padding: '5px' }} />
                </a>
                <a onClick={() => { window.open('https://www.addtoany.com/add_to/twitter?linkurl=http%3A%2F%2Fveekls.com&amp;linkname=Veekls', 'popup', 'width=600,height=600'); return false; }}>
                    <img src="https://static.addtoany.com/buttons/twitter.svg" width="32" height="32" style={{ backgroundColor: 'rgb(29, 155, 240)', margin: '5px', borderRadius: '50%', padding: '5px' }} />
                </a>
                <a onClick={() => { window.open('https://www.addtoany.com/add_to/email?linkurl=http%3A%2F%2Fveekls.com&amp;linkname=Veekls', 'popup', 'width=600,height=600'); return false; }}>
                    <img src="https://static.addtoany.com/buttons/email.svg" width="32" height="32" style={{ backgroundColor: 'rgb(1, 102, 255)', margin: '5px', borderRadius: '50%', padding: '5px' }} />
                </a>
                <a onClick={() => { window.open('https://www.addtoany.com/add_to/pinterest?linkurl=http%3A%2F%2Fveekls.com&amp;linkname=Veekls', 'popup', 'width=600,height=600'); return false; }}>
                    <img src="https://static.addtoany.com/buttons/pinterest.svg" width="32" height="32" style={{ backgroundColor: 'rgb(189, 8, 28)', margin: '5px', borderRadius: '50%', padding: '5px' }} />
                </a>
                <a onClick={() => { window.open('https://www.addtoany.com/add_to/telegram?linkurl=http%3A%2F%2Fveekls.com&amp;linkname=Veekls', 'popup', 'width=600,height=600'); return false; }}>
                    <img src="https://static.addtoany.com/buttons/telegram.svg" width="32" height="32" style={{ backgroundColor: 'rgb(44, 165, 224)', margin: '5px', borderRadius: '50%', padding: '5px' }} />
                </a>
                <a onClick={() => { window.open('https://www.addtoany.com/add_to/facebook_messenger?linkurl=http%3A%2F%2Fveekls.com&amp;linkname=Veekls', 'popup', 'width=600,height=600'); return false; }}>
                    <img src="https://static.addtoany.com/buttons/facebook_messenger.svg" width="32" height="32" style={{ backgroundColor: 'rgb(0, 132, 255)', margin: '5px', borderRadius: '50%', padding: '5px' }} />
                </a>
            </div>
        )
    }

    const renderPrincipal = () => {
        return (<div className="offcanvas-body mx-0 flex-grow-0">
            <table className="detail-tbl-vh">
                <thead><tr><td></td><td></td></tr></thead>
                <tbody>
                    <tr>
                        <td><b>Tipo: </b>{getItemSelectName(SELECT_CONST.VEHICLES.TYPES, item?.type)}</td>
                        <td><b>Marca: </b>{item?.brand}</td>
                    </tr>
                    <tr>
                        <td><b>Color: </b>{item?.color}</td>
                        <td><b>Kilometraje: </b>{UTILS.FORMAT_CURRENCY_ITEM(item?.odometer)} km</td>
                    </tr>
                    <tr>
                        <td><b>Modelo: </b> {item?.model}</td>
                        <td><b>version: </b>{item?.version}</td>
                    </tr>
                    <tr>
                        <td><b>Año: </b> {item?.year}</td>
                        <td><b>Gasolina: </b>{getItemSelectName(SELECT_CONST.VEHICLES.FUEL, item?.fuel)}</td>
                    </tr>
                    <tr>
                        <td><b>Transmisión: </b> {getItemSelectName(SELECT_CONST.VEHICLES.TRANSMISSION, item?.gearbox)}</td>
                        <td><b>Patente: </b>{item?.plate}</td>
                    </tr>
                    <tr>
                        <td><b>Chasis: </b> {item?.chassisId}</td>
                        <td><b>Tipo Chasis: </b>{getItemSelectName(SELECT_CONST.VEHICLES.CHASSIS_TYPE, item?.chassisType)}</td>
                    </tr>
                    <tr>
                        <td><b># Dueños: </b> {item?.owners}</td>
                        <td><b># Llaves: </b>{item?.keys}</td>
                    </tr>
                    <tr>
                        <td><b>Estado: </b> {getItemSelectName(SELECT_CONST.VEHICLES.STATE, item?.state)}</td>
                        <td><b># Motor: </b> {item?.engineId}</td>
                    </tr>
                    <tr>
                        <td><b>Estado Seguro: </b>{getItemSelectName(SELECT_CONST.VEHICLES.INSURANCE, item?.documents.insurance)}</td>
                        <td><b>Estado permiso: </b>{getItemSelectName(SELECT_CONST.VEHICLES.PERMIT, item?.documents.permit)}</td>
                    </tr>
                    <tr>
                        <td><b>Fecha vencimiento seguro: </b>{item?.documents.checkup}</td>
                        <td><b>Avalúo: </b> $ {UTILS.FORMAT_CURRENCY_ITEM(item?.appraisal)}</td>
                    </tr>
                    <tr>
                        <td><b>Precio publicación: </b> $ {UTILS.FORMAT_CURRENCY_ITEM(item?.price)}</td>
                        <td><b>Precio sugerido: </b> $ {UTILS.FORMAT_CURRENCY_ITEM(item?.suggestedPrice)}</td>
                    </tr>
                </tbody>
            </table>
            {renderSharedOptions()}
            <div className="options-vh">
                <table className="detail-tbl-vh">
                    <thead><tr><td></td><td></td></tr></thead>
                    <tbody>
                        <tr>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary d-grid w-100"
                                    onClick={() => editVehicle(item?._id, "/vehicles/edit/")}>
                                    Editar vehículo
                                </button>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary d-grid w-100"
                                    onClick={() => editVehicle(item?._id, "/vehicles/gallery/")}>
                                    Ir a galería
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary d-grid w-100"
                                    data-bs-dismiss="offcanvas"
                                    onClick={() => setRenderSpace("incomes")}
                                >
                                    Ingresos
                                </button>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary d-grid w-100"
                                    data-bs-dismiss="offcanvas"
                                    onClick={() => setRenderSpace("expenses")}
                                >
                                    Gastos
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary d-grid w-100"
                                    data-bs-dismiss="offcanvas"
                                    onClick={() => setRenderSpace("publish")}>
                                    Publicar
                                </button>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary d-grid w-100"
                                    data-bs-dismiss="offcanvas"
                                    onClick={() => setRenderSpace("store")}>
                                    Archivar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <button
                    type="button"
                    className="btn btn-primary d-grid w-100"
                    data-bs-dismiss="offcanvas"
                    style={{ marginLeft: '0' }}
                    onClick={() => close()}
                >
                    Volver al listado de vehículos
                </button>

            </div>
        </div>)
    }

    const renderBills = (title: string, bill: any, showTitle: string) => <TableBillsComponent key={UTILS.SET_RANDOM_KEY(`${showTitle}-${item?._id}`)} idk={item?._id} title={title} event={() => setRenderSpace("principal")} bills={bill} showTitle={showTitle} />

    const renderPublish = () => item?._id && <TablePublishComponent key={UTILS.SET_RANDOM_KEY(item?._id)} idk={item?._id} event={() => setRenderSpace("principal")} promo={item.promo} />
    const renderArchive = () => item?._id && <TableArchiveComponent key={UTILS.SET_RANDOM_KEY(item?._id)} idk={item?._id} event={() => setRenderSpace("principal")} />


    return (
        <div className="col-lg-3 col-md-6">
            <div className="mt-6">
                <div
                    className={`offcanvas offcanvas-end ${show ? 'show' : ''}`}
                    tabIndex={-1}
                    id="offcanvasEnd"
                    aria-labelledby="offcanvasEndLabel"
                    style={{ visibility: 'visible' }}
                >
                    <div className="offcanvas-header">
                        <h5 id="offcanvasEndLabel" className="offcanvas-title">{`${item?.brand !== null ? item?.brand : ""} (${item?.model})`}</h5>
                        <button
                            type="button"
                            className="btn-close text-reset"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                            onClick={() => close()}
                        ></button>
                    </div>
                    {renderSpace === "principal" && renderPrincipal()}
                    {renderSpace === "incomes" && renderBills("incomes", item?.incomes, "ingreso")}
                    {renderSpace === "expenses" && renderBills("expenses", item?.expenses, "gasto")}
                    {renderSpace === "publish" && renderPublish()}
                    {renderSpace === "store" && renderArchive()}
                </div>
                <div className={`${show ? 'offcanvas-backdrop fade show' : ''}`}></div>
            </div>
        </div>
    )
}
export default ModalActionsComponent;