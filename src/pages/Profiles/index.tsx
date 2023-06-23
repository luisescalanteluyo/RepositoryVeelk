import { useEffect, useState } from "react";
import { BreadCrumbComponent, DataTableComponent, TemplateComponent } from "../../componentes";
import { getAllProfiles } from "../../controllers/profiles";
import UTILS from "../../utils/utils";
import { EmptyProfile, profileModel, showInDT } from "../../models/profiles/profilesModel";




function ProfilesPage() {
    const [profilesState, setProfilesState] = useState<profileModel[] | []>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [columns] = useState(UTILS.SET_COLUMNS_DATATABLE(new EmptyProfile()));

    useEffect(() => {
        setIsLoading(true);
        if (profilesState.length === 0) {
            getProfiles();
        }
    }, [])

    const getProfiles = async () => {
        const profilesList: profileModel[] = await getAllProfiles();
        setProfilesState(profilesList);
        setIsLoading(false);
    }

    const wrapper = () => {
        return (
            !isLoading &&
            <>
                <BreadCrumbComponent title="" subtitle="Miembros" />
                <div className="card">
                    <div className="card-header" style={{ "position": "relative", "marginBottom": "-65px", "width": "50%" }}>
                        <a href="#!" className="btn rounded-pill btn-primary">Agregar</a>
                    </div>
                    <div className="table-responsive text-nowrap">
                        <DataTableComponent
                            path="organizations"
                            columns={columns}
                            data={profilesState}
                            showItems={showInDT}
                        />
                    </div>
                </div>
            </>
        )
    };

    return <TemplateComponent
        menuActive="admin"
        subMenuActive="profiles"
        children={wrapper()}
        isLoading={isLoading} />;
}

export default ProfilesPage;