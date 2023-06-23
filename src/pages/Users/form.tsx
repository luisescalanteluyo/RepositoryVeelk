import { useEffect, useState } from "react";
import { BreadCrumbComponent, TemplateComponent, ToastComponent } from "../../componentes";
import { renderInput, renderSelect, renderSelectMultiple } from "../../componentes/Form/Input/renders";
import UTILS from "../../utils/utils";
import { EmptyUser, userModel, inputsNotRequiredEvent } from "../../models/user/userModel";
import SELECT_CONST from "../../componentes/Form/Select/constants";
import { useParams } from "react-router-dom";
import { eventUser, getUserById } from "../../controllers/users";
import SELECT_CONST_MULTIPLE from "../../componentes/Form/SelectMultiple/constants";

function UsersFormPage({ is }: { is: string }) {
    const [userState, setUserState] = useState<userModel | EmptyUser>(new EmptyUser());
    const [toast, setToast] = useState({ show: false, title: "", msg: "", error: false });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { _id = "" } = useParams();

    useEffect(() => {
        setIsLoading(true);
        if (userState._id === "") {
            getUser();
        }
    }, [])

    const getUser = async () => {
        const user: userModel | EmptyUser = await getUserById(_id);
        setIsLoading(false);
        setUserState(user)
    }

    const handleChange = (event: any) => {
        let value: string | string[] = event.target.value;
        if (event.target.name === 'roles' && event.target.name !== '') {
            setUserState({ ...userState, ['roles']: [] })
            value = userState.roles;
            if (value.indexOf(event.target.value) > -1) {
                value.splice(event.target.name, 1);
            } else {
                value.push(event.target.value);
            }
        }
        setUserState({ ...userState, [event.target.name]: value })
    };

    const closeToast = () => setTimeout(() => setToast({ show: false, title: '', msg: '', error: false }), 2000);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        if (UTILS.VALIDATE_EMPTY_FIELDS(userState, inputsNotRequiredEvent)) {
            setToast({ show: true, title: "Error", msg: "¡Debes completar todos los campos!", error: true });
            setIsLoading(false);
            closeToast()
            return;
        }
        
        const user = await eventUser(userState);
        if (user) {
            setToast({ show: true, title: "Correcto", msg: "¡El usuario ha sido modificado correctamente!", error: false });
        } else {
            setToast({ show: true, title: "Error", msg: "¡El usuario no ha sido agregado!", error: true });
        }
        closeToast()
        setIsLoading(false);
    }

    const wrapper = () => {
        return (
            <>
                {toast.show && <ToastComponent title={toast.title} msg={toast.msg} error={toast.error} />}
                <BreadCrumbComponent title="Usuarios" subtitle={`${UTILS.ACTION_TEMPLATE_TEXT(is)} usuario`} />
                <div className="col-xxl">
                    <div className="card mb-4">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    {renderInput("firstname", "Nombre:", "text", "John", "firstname2", "bx-user", false, false, handleChange, userState.firstname)}
                                    {renderInput("lastname", "Apellido:", "text", "Doe", "lastname2", "bxs-user-detail", false, false, handleChange, userState.lastname)}
                                </div>
                                <div className="row mb-3">
                                    {renderInput("email", "Correo electrónico:", "text", "user@veekls.com", "email2", "bx-envelope", "@veekls.com", "", handleChange, userState.email) } 
                                    {renderSelect("gender", "Género", "Seleccione su género", "bx-body", SELECT_CONST.GENDERS, handleChange, userState.gender, 5)}
                                </div>
                                <div className="row mb-3">
                                    {renderInput("nin", "NIN:", "text", "Número de identificación nacional", "nin2", "bx-id-card", false, false, handleChange, userState.nin)}
                                    {renderInput("password", "Contraseña:", "password", "V33kLs-P445", "password2", "bxs-lock-open", false, false, handleChange, userState.password)}
                                </div>
                                <div className="row mb-3">
                                {renderSelectMultiple("roles", "Roles", "Seleccione sus roles", "bx-body", SELECT_CONST_MULTIPLE.ROLES, handleChange, userState.roles)}
                                </div>
                                <div className="row justify-content-end">
                                    <div className="col-sm-10">
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
        menuActive="admin"
        subMenuActive="users"
        children={wrapper()}
        isLoading={isLoading} />;
}

export default UsersFormPage;