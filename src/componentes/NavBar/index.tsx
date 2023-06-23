import { useNavigate } from "react-router-dom";
import { tokenModel } from "../../models/user/tokenModel";
import CONST from "../../utils/constants";
import UTILS from "../../utils/utils";
import STORAGE from "../../utils/storage";
import { profileModel } from "../../models/profiles/profilesModel";

function NavBarComponent() {
    const userToken: tokenModel = UTILS.GET_TOKEN();
    const profile: profileModel = UTILS.GET_ORGANIZATION();
    const navigate = useNavigate();
    const logoutEvent = () => {
        STORAGE.REMOVE_ITEM("TOKEN");
        STORAGE.CLEAR()
        navigate(("/login"));
    }
    return (
        <nav
            className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar"
        >
            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                <a className="nav-item nav-link px-0 me-xl-4" onClick={UTILS.RIGHT_MENU_EXPANDED}>
                    <i className="bx bx-menu bx-sm"></i>
                </a>
            </div>

            <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                <div className="navbar-nav align-items-center">
                    <div className="nav-item d-flex align-items-center">
                        <b>{profile.logo !== undefined && <img src={profile.logo} style={{ width: '40px', marginRight: '14px', borderRadius: '50%' }} alt="veekls-profile-logo" />} </b>
                        <b>{profile.detailOrganization !== undefined && <span>{profile.detailOrganization[0]?.name}</span>}</b>
                    </div>
                </div>

                <ul className="navbar-nav flex-row align-items-center ms-auto">
                    <span><b>{userToken.names}</b></span>
                    <li className="nav-item navbar-dropdown dropdown-user dropdown">
                        <a className="nav-link dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                            <div className="avatar avatar-online">
                                <img src={userToken.gender == "GENDER.MALE" ? '/assets/img/avatars/1.png' : '/assets/img/avatars/2.png'}
                                    alt="" className="w-px-40 h-auto rounded-circle" />
                            </div>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <a className="dropdown-item" href="#">
                                    <div className="d-flex">
                                        <div className="flex-shrink-0 me-3">
                                            <div className="avatar avatar-online">
                                                <img src={userToken.gender == "GENDER.MALE" ? '/assets/img/avatars/1.png' : '/assets/img/avatars/2.png'} alt="" className="w-px-40 h-auto rounded-circle" />
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <span className="fw-semibold d-block">{userToken.names}</span>
                                            <small className="text-muted">{CONST.NAVBAR.ONLINE}</small>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <div className="dropdown-divider"></div>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    <i className="bx bx-user me-2"></i>
                                    <span className="align-middle">{CONST.NAVBAR.MY_PROFILE}</span>
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    <i className="bx bx-cog me-2"></i>
                                    <span className="align-middle">{CONST.NAVBAR.CONFIGURATION}</span>
                                </a>
                            </li>

                            <li>
                                <div className="dropdown-divider"></div>
                            </li>
                            <li>
                                <a className="dropdown-item" onClick={logoutEvent}>
                                    <i className="bx bx-power-off me-2"></i>
                                    <span className="align-middle">{CONST.NAVBAR.LOGOUT}</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBarComponent;