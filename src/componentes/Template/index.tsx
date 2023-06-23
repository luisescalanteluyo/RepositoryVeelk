
import { ReactNode, useEffect } from "react";
import { LeftMenuComponent, LoadingComponent, NavBarComponent } from "..";
import UTILS from "../../utils/utils";
import STORAGE from "../../utils/storage";
import { useNavigate } from "react-router-dom";

function TemplateComponent({ menuActive, children, isLoading, subMenuActive = '' }: { menuActive: string, children: ReactNode, isLoading: boolean, subMenuActive: string }) {
    const navigate = useNavigate();
    useEffect(() => {
        let validateLogged = STORAGE.GET("TOKEN");
        if (!validateLogged) {
            navigate(("/login"));
        }
    }, [navigate])
    return (
        <>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <LeftMenuComponent menuActive={menuActive} subMenuActive={subMenuActive} />
                    <div className="layout-page">
                        <NavBarComponent />
                        <div className="content-wrapper">
                            <div className="container-xxl flex-grow-1 container-p-y">
                                {
                                    !isLoading ? children : <LoadingComponent />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="layout-overlay layout-menu-toggle" onClick={UTILS.RIGHT_MENU_EXPANDED}></div>
                </div>
            </div>
        </>
    );
}

export default TemplateComponent;