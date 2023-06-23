import { useEffect, useState } from "react";
import { TemplateComponent } from "../../componentes";
import UTILS from "../../utils/utils";
import { profileModel } from "../../models/profiles/profilesModel";
import { getAllProfilesByUserId } from "../../controllers/profiles";
import EmptyComponent from "../../componentes/Empty";
import CONST from "../../utils/constants";
import { organizationModel } from "../../models/organizatinos/organizationsModel";

function DashboardPage() {
    const [profilesState, setProfilesState] = useState<profileModel[] | []>([]);
    const [filterInp, setFilterInpState] = useState<organizationModel[] | []>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        if (profilesState.length === 0) {
            getProfiles();
        }
    }, [])

    const getProfiles = async () => {
        const profilesList: profileModel[] = await getAllProfilesByUserId();
        setProfilesState(profilesList);
        setIsLoading(false);
    }
    const filterInput = (e: any) => {
        let value = e.target.value;
        let filterProfile: profileModel[] = profilesState;
        let organizations: organizationModel[][] = filterProfile.map(q => {
            return q.detailOrganization.filter(org => org.name.toLowerCase().includes(value))
        });

        //set result
        organizations = organizations.filter(e => e.length > 0)
        let resutOrganizations: organizationModel[] = [];
        organizations.forEach((i) => resutOrganizations.push(i[0]));
        setFilterInpState(resutOrganizations);
    }

    const renderProfileItem = (profile: profileModel) => {
        return (
            <div className="col item-dsh" key={profile._id} onClick={() => UTILS.SET_ORGANIZATION(profile)}>
                <div className="card h-100">
                    <img className="card-img-top" src={profile.logo} alt={profile.organization} />
                    <div className="card-body">
                        <h5 className="card-title">{profile.detailOrganization[0].name}</h5>
                        <p className="card-text">
                            {profile.job}<br />
                            <i style={{ fontSize: '10px' }}>Permisos actuales: <b>{`${profile.roles.length > 10 && "+"}${profile.roles.length}`}</b></i>
                        </p>
                    </div>
                </div>
            </div>);
    }

    const wrapper = () => {
        return (
            profilesState.length > 0 ? <>
                <h5 className="card-header">
                    <input
                        type="text"
                        className="form-control"
                        id="defaultFormOrganizations"
                        placeholder="Buscar Organizaciones"
                        aria-describedby="defaultFormOrganizations"
                        onChange={filterInput}
                    />
                </h5>
                <div className="dashboard-ctn">
                    <div className="row row-cols-md-5 g-4 ">
                        {profilesState.map(item => {
                            if (filterInp.length > 0) {
                                let ss = filterInp.find(o => o._id === item.detailOrganization[0]._id);
                                if (ss !== undefined) {
                                    return renderProfileItem(item);
                                } else {
                                    return null;
                                }
                            } else {
                                return renderProfileItem(item);
                            }
                        })}
                    </div>
                </div>
            </> : <EmptyComponent
                title={CONST.EMPTY.DASHBOARD.TITLE}
                description={CONST.EMPTY.DASHBOARD.MSG}
                icon="girl-doing-yoga-light.png"
                width="500" />
        )
    };

    return <TemplateComponent menuActive="dashboard" children={wrapper()} isLoading={isLoading} subMenuActive="" />;
}

export default DashboardPage;