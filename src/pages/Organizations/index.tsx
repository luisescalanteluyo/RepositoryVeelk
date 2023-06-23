import { useEffect, useState } from "react";
import { BreadCrumbComponent, DataTableComponent, TemplateComponent } from "../../componentes";
import { EmptyOrganization, organizationModel, showInDT } from "../../models/organizatinos/organizationsModel";
import { getAllOrganizations } from "../../controllers/organizations";
import UTILS from "../../utils/utils";



function OrganizationsPage() {
    const [organizationsState, setOrganizationsState] = useState<organizationModel[] | []>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [columns] = useState(UTILS.SET_COLUMNS_DATATABLE(new EmptyOrganization()));

    useEffect(() => {
        setIsLoading(true);
        if (organizationsState.length === 0) {
            getOrganizations();
        }
    }, [])

    const getOrganizations = async () => {
        const organizationsList: organizationModel[] = await getAllOrganizations();
        setOrganizationsState(organizationsList);
        setIsLoading(false);
    }

    const wrapper = () => {
        return (
            !isLoading &&
            <>
                <BreadCrumbComponent title="" subtitle="Organizaciones" />
                <div className="card">
                    <div className="card-header" style={{ "position": "relative", "marginBottom": "-65px", "width": "50%" }}>
                        <a href="#!" className="btn rounded-pill btn-primary">Agregar</a>
                    </div>
                    <div className="table-responsive text-nowrap">
                        <DataTableComponent
                            path="organizations"
                            columns={columns}
                            data={organizationsState}
                            showItems={showInDT}
                        />
                    </div>
                </div>
            </>
        )
    };

    return <TemplateComponent
        menuActive="admin"
        subMenuActive="organizations"
        children={wrapper()}
        isLoading={isLoading} />;
}

export default OrganizationsPage;