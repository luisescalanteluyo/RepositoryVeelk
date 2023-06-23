import { useEffect, useState } from "react";
import CONST from "../../utils/constants";
import UTILS from "../../utils/utils";
const logo = "/veekls-logo.png";

function LeftMenuComponent({ menuActive, subMenuActive }: { menuActive: string, subMenuActive: string }) {
    const [activeDropdown, setActiveDropdown] = useState({ menu: '', show: false });
    const [showItemsMenu, setShowItemsMenu] = useState(false);

    const validateActiveMenu = (key: string) => menuActive === key ? "active" : "";
    const validateSubActiveMenu = (key: string) => subMenuActive === key ? "active" : "";

    const validateActiveDropdown = (menu: string) => activeDropdown.menu === menu && activeDropdown.show ? 'active open' : '';

    const showMenuEvent = (menu: string, showItem: boolean) => setActiveDropdown({ menu: menu, show: showItem });


    useEffect(() => {
        let item = menuActive === "admin";
        setActiveDropdown({ menu: item ? subMenuActive : menuActive, show: item });
        let organization = UTILS.GET_ORGANIZATION();
        if (organization) {
            setShowItemsMenu(true);
        }
    }, [])

    return (
        <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
            <div className="app-brand demo">
                <img src={logo} width='100%' alt="veekls-logo" />
                <a href="#!" onClick={UTILS.RIGHT_MENU_EXPANDED}
                    className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                    <i className="bx bx-chevron-left bx-sm align-middle"></i>
                </a>
            </div>
            <div className="menu-inner-shadow"></div>
            <ul className="menu-inner py-1">
                <li className={`menu-item ${validateActiveMenu("dashboard")}`} >
                    <a href="/dashboard" className="menu-link">
                        <i className="menu-icon tf-icons bx bx-home-circle"></i>
                        <div data-i18n="Analytics">{CONST.MENU.DASHBOARD}</div>
                    </a>
                </li>
                <li className="menu-header small text-uppercase">
                    <span className="menu-header-text">{CONST.MENU.MODULES}</span>
                </li>
                {showItemsMenu &&
                    <>

                        <li className={`menu-item ${validateActiveMenu("vehicles")}`} >
                            <a className="menu-link menu-link" href="/vehicles">
                                <i className="menu-icon tf-icons bx bx-car"></i>
                                <div data-i18n="car">{CONST.MENU.VEHICLES}</div>
                            </a>
                        </li>
                    </>
                }

                <li className={`menu-item 
                    ${validateActiveMenu(subMenuActive)} 
                    ${validateActiveDropdown(subMenuActive)}`}
                    onClick={() => showMenuEvent(subMenuActive, !activeDropdown.show)}>
                    <a className="menu-link menu-toggle">
                        <i className="menu-icon tf-icons bx bxs-user-detail"></i>
                        <div data-i18n="user-list">{CONST.MENU.ADMIN.TITLE}</div>
                    </a>
                    <ul className="menu-sub">
                        <li className={`menu-item ${validateSubActiveMenu("profiles")}`}>
                            <a href="/profiles" className="menu-link">
                                <div data-i18n="Basic">{CONST.MENU.ADMIN.PROFILES}</div>
                            </a>
                        </li>
                        <li className={`menu-item ${validateSubActiveMenu("organizations")}`}>
                            <a href="/organizations" className="menu-link">
                                <div data-i18n="Basic">{CONST.MENU.ADMIN.ORGANIZATIONS}</div>
                            </a>
                        </li>
                        <li className={`menu-item ${validateSubActiveMenu("users")}`}>
                            <a href="/users" className="menu-link">
                                <div data-i18n="Basic">{CONST.MENU.ADMIN.USERS}</div>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </aside>
    );
}

export default LeftMenuComponent;