import CONST from "../../utils/constants";

function LoadingComponent() {

    return (
        <div className="spinner-border spinner-border-lg text-danger"
            style={{ position: 'relative', top: '45%', left: '45%' }} role="status">
            <span className="visually-hidden">{CONST.LOADING.TEXT}</span>
        </div>
    );
}

export default LoadingComponent;