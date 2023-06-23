import { useEffect, useState } from "react";
import { BreadCrumbComponent, DataTableComponent, TemplateComponent } from "../../componentes";
import { EmptyUser, userModel, showInDT } from "../../models/user/userModel";
import { getAllUsers } from "../../controllers/users";
import UTILS from "../../utils/utils";

function UsersPage() {
    const [usersState, setUsersState] = useState<userModel[] | []>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [columns] = useState(UTILS.SET_COLUMNS_DATATABLE(new EmptyUser()));

    useEffect(() => {
        setIsLoading(true);
        if (usersState.length === 0) {
            getUsers();
        }
    }, [])

    const getUsers = async () => {
        const usersList: userModel[] = await getAllUsers();
        setUsersState(usersList)
        setIsLoading(false);
    }

    const wrapper = () => {
        return (
            !isLoading &&
            <>
                <BreadCrumbComponent title="" subtitle="Usuarios" />
                <div className="card">
                    <div className="card-header" style={{ "position": "relative", "marginBottom": "-65px", "width": "50%" }}>
                        <a href="/users/add" className="btn rounded-pill btn-primary">Agregar</a>
                    </div>
                    <div className="table-responsive text-nowrap">
                        <DataTableComponent
                            path="users"
                            columns={columns}
                            data={usersState}
                            showItems={showInDT}
                        />
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

export default UsersPage;