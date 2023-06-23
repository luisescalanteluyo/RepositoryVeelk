import { useEffect, useState } from "react";
import { BreadCrumbComponent, TemplateComponent, ToastComponent } from "../../componentes";
import { renderInput, renderSelect } from "../../componentes/Form/Input/renders";
import SELECT_CONST from "../../componentes/Form/Select/constants";
import { useParams } from "react-router-dom";
import { EmptyVehicles, vehiclesModel } from "../../models/vehicles/vehiclesModel";
import { getVehicleById, picturesVehicle } from "../../controllers/vehicles";
import S3Aws from "../../utils/aws/session";
import { fileModel } from "../../models/file/fileModel";
import UTILS from "../../utils/utils";
import { uploadFile } from "../../controllers/files";

function VehiclesGalleryPage({ is }: { is: string }) {
    const [vehicleState, setVehicleState] = useState<vehiclesModel | EmptyVehicles>(new EmptyVehicles());
    const [publicPicturesState, setPublicPicturesState] = useState<Array<string>>([]);
    const [registryPicturesState, setRegistryPicturesState] = useState<Array<string>>([]);
    const [attachmentssState, setAttachmentsState] = useState<Array<string>>([]);
    const [selectState, setSelectState] = useState("");
    const [nameFileState, setNameFileState] = useState("");
    const [fileState, setFileState] = useState<any>(null);
    const [toast, setToast] = useState({ show: false, title: "", msg: "", error: false });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { _id = "" } = useParams();

    useEffect(() => {
        setIsLoading(true);
        if (vehicleState._id === "") {
            getVehicle();
        }
    }, [])

    const getVehicle = async () => {
        setIsLoading(true);
        const vehicle: vehiclesModel | EmptyVehicles = await getVehicleById(_id);
        if (vehicle && vehicle.publicsFiles) { getPictures(vehicle.publicsFiles, "public") }
        if (vehicle && vehicle.registryFiles) { getPictures(vehicle.registryFiles, "registry") }
        if (vehicle && vehicle.attachmentsFiles) { getPictures(vehicle.attachmentsFiles, "attachment") }
        setIsLoading(false);
        setVehicleState(vehicle)
    }

    const handleChange = (event: any) => {
        if (event.target.name === "gallery") { setFileState(event.target.files[0]); }
        else if (event.target.name === "nameFile") { let value: string = event.target.value; setNameFileState(value); }
        else { let value: string = event.target.value; setSelectState(value); }
    };

    const uploadImageFile = async () => {
        if (fileState !== null) {
            let image = await S3Aws.uploadImage(fileState);
            if (image && typeof image === "string") {
                let upload = await uploadFile(image, fileState.name, fileState?.type);
                if (upload) {
                    let saveInVehicle = await picturesVehicle(vehicleState._id, upload._id, selectState, nameFileState);
                    if (saveInVehicle) {
                        showPreview();
                    }
                }
            }
        }
    }

    const showPreview = () => {
        const file: any = document.querySelector('.gallery');
        file.value = '';
        const objectUrl: any = URL.createObjectURL(fileState);

        if (selectState !== "attachment") {
            let img = document.createElement('img');
            img.src = objectUrl;
            document.getElementById(selectState + "-item")?.appendChild(img);
        } else {
            let a = document.createElement('a');
            a.href = objectUrl;
            a.text = nameFileState;
            a.target = "_blank";
            a.style.width = '150px';
            a.style.float = 'left';
            document.getElementById(selectState + "-item")?.appendChild(a);
        }


    }

    const getPictures = async (item: Array<fileModel>, type: string) => {
        let image = "/assets/img/elements/default.png";
        if (item.length > 0) {
            let iPictures: Array<string> = [];
            for (let i = 0; i < item.length; i++) {
                const getS3Image: any = await S3Aws.getImage(item[i].key);
                if (typeof getS3Image === 'string') { iPictures.push(`data:${item[i].type};base64, ${getS3Image}`); }
                else { iPictures.push(image); }
            }
            if (type === "public") { setPublicPicturesState(iPictures); }
            else if (type === "registry") { setRegistryPicturesState(iPictures); }
            else if (type === "attachment") { setAttachmentsState(iPictures); }
        }
        return image;
    }

    const validateSelect = () => {
        if (selectState !== "attachment") {
            if (selectState === "" || fileState === null) {
                return true;
            }
        } else {
            if (fileState === null || nameFileState === "") {
                return true;
            }
        }
        return false;
    }


    const wrapper = () => {
        return (
            <>
                {toast.show && <ToastComponent title={toast.title} msg={toast.msg} error={toast.error} />}
                <BreadCrumbComponent title="Vehículos" subtitle={`Galería de vehículo`} />
                <div className="col-xxl">
                    <div className="card mb-12">
                        <div className="card-body">
                            <form>
                                <div className="row mb-3" style={{ marginTop: '10px', marginLeft: '-6px', textAlign: 'center' }}>
                                    <h5><b>{`${vehicleState.brand !== null ? vehicleState.brand : ""} (${vehicleState.model})`}</b> {vehicleState.plate} - {vehicleState.year}</h5>
                                </div>
                                <div className="row mb-3">
                                    {renderSelect("image", "Tipo galería:", "Seleccione el tipo de galería", "bx-images", SELECT_CONST.VEHICLES.GALLERY, handleChange, selectState, 3)}
                                </div>
                                {selectState !== "" &&
                                    <div className="row mb-3">
                                        {selectState === "attachment" && renderInput("nameFile", "Nombre documento:", "text", "Ingresa el nombre para esté documento", "nameFile", "bx-document", false, false, handleChange, nameFileState)}
                                        <>
                                            <label className="col-sm-1 col-form-label" htmlFor="gallery">Agregar archivo</label>
                                            <div className="col-sm-4">
                                                <div className="input-group input-group-merge">
                                                    <span id={"gallery"} className="input-group-text"><i className={`bx bx-image-add`}></i></span>
                                                    <input
                                                        type="file"
                                                        className="gallery form-control"
                                                        id="gallery"
                                                        disabled={selectState === ""}
                                                        name="gallery"
                                                        placeholder="Agregar imagen"
                                                        aria-label="Agregar imagen"
                                                        aria-describedby="Agregar imagen"
                                                        accept={selectState === "public" || selectState === "registry" ?
                                                            "image/*" :
                                                            ".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf"}
                                                        onChange={(e) => handleChange(e)}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                        <div className="col-md-3">
                                            <button
                                                type="button"
                                                disabled={validateSelect()}
                                                className="btn rounded-pill btn-primary"
                                                onClick={() => uploadImageFile()}>
                                                Agregar
                                            </button>
                                        </div>
                                    </div>
                                }
                                {selectState === "public" &&
                                    <div className="row mb-3 glry-cont public-item" id="public-item">
                                        {publicPicturesState.length > 0 && publicPicturesState.map(e => <img key={UTILS.SET_RANDOM_KEY(e)} src={e} />)}
                                    </div>
                                }
                                {selectState === "registry" &&
                                    <div className="row mb-3 glry-cont registry-item" id="registry-item">
                                        {registryPicturesState.length > 0 && registryPicturesState.map(e => <img key={UTILS.SET_RANDOM_KEY(e)} src={e} />)}
                                    </div>
                                }
                                {selectState === "attachment" &&
                                    <div className="row mb-3 glry-cont attachment-item" id="attachment-item">
                                        {attachmentssState.length > 0 && attachmentssState.map((e, idx) =>
                                            <a style={{ width: '150px',float: 'left'}} key={UTILS.SET_RANDOM_KEY(`alink-${e}`)} href={e} download>
                                                <img width={20} key={UTILS.SET_RANDOM_KEY(e)} src="/assets/img/elements/attachment.png" />
                                                <span>Archivo {idx+1} </span>
                                            </a>)}
                                    </div>
                                }
                            </form>
                        </div>
                    </div >
                </div >
            </>
        )
    };

    return <TemplateComponent
        menuActive="vehicles"
        subMenuActive=""
        children={wrapper()}
        isLoading={isLoading} />;
}

export default VehiclesGalleryPage;