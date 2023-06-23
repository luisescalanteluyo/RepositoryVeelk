import { useEffect, useState } from "react";
import { vehiclesModel } from "../../models/vehicles/vehiclesModel";
import UTILS from "../../utils/utils";
import { fileModel } from "../../models/file/fileModel";
import S3Aws from "../../utils/aws/session";
import ModalActionsComponent from "./actions";


function CardTabsComponent({ item }: { item: vehiclesModel }) {
    const [isLoading, setIsLoading] = useState(false);
    const [currentItem, setCurrentItem] = useState<vehiclesModel>();
    const [showActions, setShowActions] = useState(false);
    const [imageState, setImageState] = useState("/assets/img/elements/default.png");

    useEffect(() => {
        getImage(item.publicsFiles)
    }, [])

    useEffect(() => {
    }, [imageState])

    const getImage = async (item: fileModel[]) => {
        setIsLoading(true);
        if (item.length > 0) {
            const getS3Image: any = await S3Aws.getImage(item[0].key);
            if (getS3Image !== undefined && getS3Image !== false) {
                setImageState(`data:image/jpeg;base64, ${getS3Image}`);
            }
        }

        setIsLoading(false);
    }

    const showActionsItem = (item: vehiclesModel) => {
        setCurrentItem(item);
        setShowActions(true);
    }

    return (
        <div className="col-md-3 col-lg-2 mb-1" key={UTILS.SET_RANDOM_KEY(item._id)}>
            <ModalActionsComponent item={currentItem} show={showActions} close={() => setShowActions(false)} />
            <div className="card h-100 card-wtp" onClick={() => showActionsItem(item)}>
                <img className="card-img-top" src={imageState} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title"><b>{`${item.brand !== null ? item.brand : ""} (${item.model})`}</b></h5>
                    <p className="card-text">
                        {item.plate} - {item.year}<br />
                        <span style={{ fontSize: '12px' }}><i>{item.comments}</i></span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CardTabsComponent;