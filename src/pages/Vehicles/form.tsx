import { useEffect, useState } from "react";
import { BreadCrumbComponent, TemplateComponent, ToastComponent } from "../../componentes";
import { renderInput, renderInputDate, renderSelect } from "../../componentes/Form/Input/renders";
import UTILS from "../../utils/utils";
import SELECT_CONST from "../../componentes/Form/Select/constants";
import { useParams } from "react-router-dom";
import { EmptyVehicles, inputsNotRequiredEvent, vehiclesModel } from "../../models/vehicles/vehiclesModel";
import { eventVehicle, getVehicleById } from "../../controllers/vehicles";
import { EmptyBranch, branchModel } from "../../models/branch/branchModel";
import { getAllBranches } from "../../controllers/branches";
import { profileModel } from "../../models/profiles/profilesModel";

function VehiclesFormPage({ is }: { is: string }) {
    const [vehicleState, setVehicleState] = useState<vehiclesModel | EmptyVehicles>(new EmptyVehicles());
    const [docsState, setDocsState] = useState({ insurance: '', permit: '', checkup: '' });
    const [branchState, setBranchState] = useState([{ k: "", v: "Sin sucursal" }])
    const [toast, setToast] = useState({ show: false, title: "", msg: "", error: false });
    const profile: profileModel = UTILS.GET_ORGANIZATION();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { _id = "" } = useParams();

    useEffect(() => {
        setIsLoading(true);
        if (vehicleState._id === "") {
            getVehicle();
        }
        getBranches();

    }, [])

    useEffect(() => {
        getUpdatedData();
    }, [vehicleState])

    const getBranches = async () => {
        const branches: branchModel[] | EmptyBranch = await getAllBranches();
        if (branches.length > 0) {
            let branchSelect: any = [];
            branchSelect.push({ k: "", v: "Sin sucursal" });
            branches.forEach(e => {
                branchSelect.push({ k: e._id, v: e.name });
            })
            setBranchState(branchSelect);
        }
    }

    const getVehicle = async () => {
        const vehicle: vehiclesModel | EmptyVehicles = await getVehicleById(_id);
        setIsLoading(false);
        setVehicleState(vehicle)
    }

    const handleChange = async (event: any) => {
        let value: string | string[] = event.target.value;
        let docs = {
            permit: vehicleState.documents.permit,
            checkup: vehicleState.documents.checkup,
            insurance: vehicleState.documents.insurance
        }
        let maintenance = {
            comments: vehicleState.maintenance.comments,
            status: vehicleState.maintenance.status
        }
        if (event.target.name == "permit") { docs.permit = event.target.value; }
        if (event.target.name == "checkup") { docs.checkup = event.target.value }
        if (event.target.name == "insurance") { docs.insurance = event.target.value; }
        if (event.target.name == "maintenanceComments") { maintenance.comments = event.target.value; }
        if (event.target.name == "maintenanceStatus") { maintenance.status = event.target.value; }
        setVehicleState({
            ...vehicleState,
            [event.target.name]: value,
            documents: docs,
            maintenance: maintenance,
            profile: profile._id,
            organization: profile.organization
        })
        getUpdatedData()
    };

    const validateCheckItem = (k: string) => {
        let count = 0;
        if (vehicleState.characteristics && vehicleState.characteristics.length > 0) {
            vehicleState.characteristics.forEach(e => { if (e === k) { count++ } });
        }

        return count > 0;
    }

    const changeCheckInp = (e: any) => {
        var values: string[] = vehicleState.characteristics;
        if (e.target.checked) {
            values.push(e.target.value);
        } else if (values.indexOf(e.target.value) > -1) {
            values.splice(values.indexOf(e.target.value), 1);
        }
        setVehicleState({ ...vehicleState, characteristics: values })
    }

    const closeToast = () => setTimeout(() => setToast({ show: false, title: '', msg: '', error: false }), 2000);

    const getUpdatedData = () => vehicleState;

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);

        if (UTILS.VALIDATE_EMPTY_FIELDS(vehicleState, inputsNotRequiredEvent)) {
            setToast({ show: true, title: "Error", msg: "¡Debes completar todos los campos!", error: true });
            setIsLoading(false);
            closeToast()
            return;
        }

        const vehicle = await eventVehicle(vehicleState);
        if (vehicle) {
            setToast({ show: true, title: "Correcto", msg: "¡El vehículo ha sido modificado correctamente!", error: false });
        } else {
            setToast({ show: true, title: "Error", msg: "¡El vehículo no ha sido agregado!", error: true });
        }
        closeToast()
        setIsLoading(false);
    }

    const wrapper = () => {
        return (
            <>
                {toast.show && <ToastComponent title={toast.title} msg={toast.msg} error={toast.error} />}
                <BreadCrumbComponent title="Vehículos" subtitle={`${UTILS.ACTION_TEMPLATE_TEXT(is)} vehículo`} />
                <div className="col-xxl">
                    <div className="card mb-4">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    {renderSelect("type", "Tipo:", "Seleccione el tipo", "bx-car", SELECT_CONST.VEHICLES.TYPES, handleChange, vehicleState.type, 5)}
                                    {renderInput("brand", "Marca:", "text", "Ingresar marca", "brand2", "bxs-store-alt", false, false, handleChange, vehicleState.brand)}
                                </div>
                                <div className="row mb-3">
                                    {renderInput("year", "Año:", "number", "Ingresar el año", "year2", "bxs-calendar", false, false, handleChange, vehicleState.year)}
                                    {renderInput("model", "Modelo:", "text", "Ingresar el modelo", "brand2", "bxs-store-alt", false, false, handleChange, vehicleState.model)}
                                </div>
                                <div className="row mb-3">
                                    {renderInput("odometer", "Kilometraje:", "number", "Ingresar el kilometraje", "odometer2", "bxs-bar-chart-alt-2", false, false, handleChange, vehicleState.odometer)}
                                    {renderInput("version", "Versión:", "text", "Ingresar la versión", "version2", "bxs-car", false, false, handleChange, vehicleState.version)}
                                </div>
                                <div className="row mb-3">
                                    {renderSelect("fuel", "Combustible:", "Seleccione el tipo de combustible", "bx-gas-pump", SELECT_CONST.VEHICLES.FUEL, handleChange, vehicleState.fuel, 5)}
                                    {renderInput("color", "Color:", "text", "Ingresar el color", "color2", "bxs-palette", false, false, handleChange, vehicleState.color)}
                                </div>
                                <div className="row mb-3">
                                    {renderSelect("gearbox", "Transmisión:", "Seleccione el tipo de transmisión", "bxs-car", SELECT_CONST.VEHICLES.TRANSMISSION, handleChange, vehicleState.gearbox, 5)}
                                    {renderSelect("chassisType", "Chasis:", "Seleccione el tipo de chasis", "bxs-purchase-tag-alt", SELECT_CONST.VEHICLES.CHASSIS_TYPE, handleChange, vehicleState.chassisType, 5)}
                                </div>
                                <div className="row  mb-3">
                                    <div className="col-sm-12">
                                        <label htmlFor="comments" className="form-label"><i className={`bx bxs-comment`}></i> Comentarios</label>
                                        <textarea className="form-control" id="comments" name="comments" defaultValue={vehicleState.comments} onChange={handleChange} placeholder="Escribe el estado del vehículo" rows={3} >
                                        </textarea>
                                    </div>
                                </div>

                                <div className="row  mb-3">
                                    <div className="col-sm-12">
                                        <label htmlFor="comments" className="form-label"><i className={`bx bxs-car-mechanic`}></i> Características</label>
                                        <small className="text-light fw-semibold d-block">Confort</small>
                                        <table className="tbl-chars col-sm-12">
                                            <thead>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="justify-content-between">
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[0].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[0].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[0].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[0].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[0].v}</label>
                                                    </td>
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[1].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[1].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[1].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[1].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[1].v}</label>
                                                    </td>
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[2].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[2].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[2].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[2].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[2].v}</label>
                                                    </td>
                                                </tr>
                                                <tr className="justify-content-between">
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[3].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[3].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[3].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[3].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[3].v}</label>
                                                    </td>
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[4].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[4].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[4].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[4].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[4].v}</label>
                                                    </td>
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[5].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[5].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[5].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[5].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[5].v}</label>
                                                    </td>
                                                </tr>
                                                <tr className="justify-content-between">
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[6].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[6].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[6].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[6].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[6].v}</label>
                                                    </td>
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[7].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[7].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[7].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[7].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[7].v}</label>
                                                    </td>
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[8].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[8].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[8].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[8].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[8].v}</label>
                                                    </td>
                                                </tr>
                                                <tr className="justify-content-between">
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[9].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[9].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[9].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[9].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[9].v}</label>
                                                    </td>
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[10].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[10].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[10].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[10].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[10].v}</label>
                                                    </td>
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[11].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[11].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[11].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[11].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[11].v}</label>
                                                    </td>
                                                </tr>
                                                <tr className="justify-content-between">
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[12].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[12].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[12].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[12].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[12].v}</label>
                                                    </td>
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[13].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[13].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[13].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[13].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[13].v}</label>
                                                    </td>
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[14].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[14].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[14].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[14].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.COMFORT[14].v}</label>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>


                                <div className="row  mb-3">
                                    <div className="col-sm-12">
                                        <small className="text-light fw-semibold d-block">Exterior</small>
                                        <table className="tbl-chars col-sm-12">
                                            <thead>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="justify-content-between">
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[0].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[0].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[0].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[0].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[0].v}</label>
                                                    </td>
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[1].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[1].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[1].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[1].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[1].v}</label>
                                                    </td>
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[2].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[2].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[2].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[2].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[2].v}</label>
                                                    </td>
                                                </tr>
                                                <tr className="justify-content-between">
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[3].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[3].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[3].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[3].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[3].v}</label>
                                                    </td>
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[4].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[4].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[4].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[4].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[4].v}</label>
                                                    </td>
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[5].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[5].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[5].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[5].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[5].v}</label>
                                                    </td>
                                                </tr>
                                                <tr className="justify-content-between">
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[6].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[6].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[6].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[6].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[6].v}</label>
                                                    </td>
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[7].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[7].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[7].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[7].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[7].v}</label>
                                                    </td>
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[8].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[8].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[8].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[8].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.EXTERIOR[8].v}</label>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>


                                <div className="row  mb-3">
                                    <div className="col-sm-12">
                                        <small className="text-light fw-semibold d-block">Seguridad</small>
                                        <table className="tbl-chars col-sm-12">
                                            <thead>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="justify-content-between">
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[0].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[0].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[0].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[0].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[0].v}</label>
                                                    </td>
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[1].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[1].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[1].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[1].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[1].v}</label>
                                                    </td>
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[2].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[2].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[2].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[2].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[2].v}</label>
                                                    </td>
                                                </tr>
                                                <tr className="justify-content-between">
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[3].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[3].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[3].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[3].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[3].v}</label>
                                                    </td>
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[4].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[4].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[4].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[4].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[4].v}</label>
                                                    </td>
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[5].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[5].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[5].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[5].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[5].v}</label>
                                                    </td>
                                                </tr>
                                                <tr className="justify-content-between">
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[6].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[6].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[6].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[6].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[6].v}</label>
                                                    </td>
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[7].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[7].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[7].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[7].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[7].v}</label>
                                                    </td>
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[8].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[8].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[8].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[8].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[8].v}</label>
                                                    </td>
                                                </tr>
                                                <tr className="justify-content-between">
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[9].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[9].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[9].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[9].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[9].v}</label>
                                                    </td>
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[10].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[10].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[10].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[10].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[10].v}</label>
                                                    </td>
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[11].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[11].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[11].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[11].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[11].v}</label>
                                                    </td>
                                                </tr>
                                                <tr className="justify-content-between">
                                                    <td>
                                                        <input className="form-check-input" type="checkbox" onChange={e => changeCheckInp(e)} defaultChecked={validateCheckItem(SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[12].k)} id={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[12].k} value={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[12].k} />
                                                        <label className="form-check-label" htmlFor={SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[12].k}>&nbsp;&nbsp;&nbsp;{SELECT_CONST.VEHICLES.CHARACTERISTICS.SECURITY[12].v}</label>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <small className="text-light fw-semibold d-block">Estado de propiedad</small>
                                    {renderSelect("state", "Estado:", "Seleccione el estado", "bxl-stripe", SELECT_CONST.VEHICLES.STATE, handleChange, vehicleState.state, 5)}
                                    {branchState.length > 0 && renderSelect("branch", "Sucursal:", "Seleccione la sucursal", "bxs-directions", branchState, handleChange, vehicleState.branch, 5)}
                                </div>

                                <div className="row mb-3">
                                    <small className="text-light fw-semibold d-block">Registros</small>
                                    {renderInput("plate", "Patente:", "text", "Ingresar la patente", "plate2", "bxs-barcode", false, false, handleChange, vehicleState.plate)}
                                    {renderInput("chassisId", "Chasis:", "text", "Ingresa el número de chasis...", "chassisId2", "bxs-barcode", false, false, handleChange, vehicleState.chassisId)}
                                </div>
                                <div className="row mb-3">
                                    {renderInput("engineId", "Número motor:", "text", "Ingresar el número de motor", "engineId2", "bxs-car", false, false, handleChange, vehicleState.engineId)}
                                </div>

                                <div className="row mb-3">
                                    <small className="text-light fw-semibold d-block">Propietarios y llaves</small>
                                    {renderInput("owners", "Número propietarios:", "number", "Ingresar el número de propietarios", "owners2", "bxs-crown", false, false, handleChange, vehicleState.owners)}
                                    {renderInput("keys", "Llaves:", "number", "Ingresa el número de llaves...", "keys2", "bxs-key", false, false, handleChange, vehicleState.keys)}
                                </div>

                                <div className="row mb-3">
                                    <small className="text-light fw-semibold d-block">Tasación y precio</small>
                                    {renderInput("appraisal", "Tasación:", "text", "Ingresar la tasación", "appraisal2", "bxs-barcode", false, false, handleChange, vehicleState.appraisal)}
                                    {renderInput("price", "Precio publicación:", "text", "Ingresa el precio de la publicación...", "price.listing2", "bxs-purchase-tag-alt", false, false, handleChange, vehicleState.price)}
                                </div>
                                <div className="row mb-3">
                                    {renderInput("suggestedPrice", "Precio sugerido:", "text", "Ingresar el precio sugerido", "price.suggested2", "bxs-purchase-tag-alt", false, false, handleChange, vehicleState.suggestedPrice)}
                                </div>

                                <div className="row mb-3">
                                    <small className="text-light fw-semibold d-block">Documentación</small>
                                    {renderSelect("insurance", "Estado seguro:", "Seleccione el estado del seguro", "bxl-stripe", SELECT_CONST.VEHICLES.INSURANCE, handleChange, vehicleState.documents.insurance, 5)}
                                    {renderSelect("permit", "Estado permiso:", "Seleccione el estado del permiso", "bxl-stripe", SELECT_CONST.VEHICLES.PERMIT, handleChange, vehicleState.documents.permit, 5)}
                                </div>
                                <div className="row mb-3">
                                    {renderInputDate("checkup", "Fecha vencimiento:", "date", "Ingresar la fecha de vencimiento de la revisión", "checkup2", "bxs-purchase-tag-alt", false, false, handleChange, vehicleState.documents.checkup)}
                                </div>

                                <div className="row mb-3">
                                    <small className="text-light fw-semibold d-block">Mantenciones</small>
                                    <div className="col-sm-12">
                                        <textarea className="form-control" id="maintenanceComments" name="maintenanceComments" rows={3} placeholder="Escribe el estado de las mantenciones" onChange={handleChange} defaultValue={vehicleState.maintenance.comments} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    {renderSelect("maintenanceStatus", "Estado:", "Seleccione el estado de mantenimiento", "bxl-stripe", SELECT_CONST.VEHICLES.MAINTENANCE, handleChange, vehicleState.maintenance.status, 5)}
                                    <div className="col-sm-6">
                                        <button className="btn btn-primary">{UTILS.ACTION_TEMPLATE_TEXT(is)}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    };

    return <TemplateComponent
        menuActive="vehicles"
        subMenuActive=""
        children={wrapper()}
        isLoading={isLoading} />;
}

export default VehiclesFormPage;