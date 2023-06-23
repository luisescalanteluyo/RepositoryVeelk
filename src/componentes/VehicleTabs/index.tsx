import { useState } from "react";

function VehicleTabsComponent({ items, changeSearch }: { items: Array<any>, changeSearch: Function }) {

    const [activeTab, setActiveTab] = useState("published");

    const setNewTab = (e: any) => {
        setActiveTab(e.title);
        changeSearch(e.event);
    }

    const validateActiveTab = (title: string) => activeTab === title ? 'active' : '';

    return (
        <ul className="nav nav-tabs nav-fill" role="tablist">
            {items.map((el: any) => {
                return (
                    <li className="nav-item" key={el.key}>
                        <button
                            type="button"
                            className={`nav-link ${validateActiveTab(el.event)}`}
                            role="tab"
                            data-bs-toggle="tab"
                            onClick={() => setNewTab(el)}>
                            {el.title}
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}

export default VehicleTabsComponent;