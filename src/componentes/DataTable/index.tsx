import DataTable, { Api } from 'datatables.net-bs5';
import { useEffect, useState } from 'react';
import { DataTableConstants } from './constants';

function DataTableComponent({ path, columns, data, showItems }: { path: string, columns: any, data: any, showItems: Array<string> }) {
    const [isLoadedTable, setIsLoadedTable] = useState(false);
    const [table, setTable] = useState<Api<any> | null>(null);

    useEffect(() => {
        if (!isLoadedTable) { setIsLoadedTable(true); }
        if (isLoadedTable) { renderDatatable() }
    }, [isLoadedTable])

    const renderDatatable = () => {
        if (table === null) {
            let dt = new DataTable('#tableComponent', DataTableConstants);
            setTable(dt);
        }
    }

    const renderTitles = () => columns.map((item: any) => showItems.includes(item.name) && <th key={item.id + Math.random()}>{item.name}</th>);

    const renderValues = () => data.map((item: any) => <tr key={item._id}>{renderTD(item)}</tr>);

    const renderTD = (item: any) => Object.entries(item).map((x: any) => showItems.includes(x[0]) && <td key={`${x[0]}_${Math.random()}`}>{x[0] === "_id" ? renderActions(x[1]) : x[1]}</td>)

    const renderActions = (id: string) => {
        return (
            <div className="dropdown">
                <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                    <i className="bx bx-dots-vertical-rounded"></i>
                </button>
                <div className="dropdown-menu">
                    <a className="dropdown-item" href={`/${path}/edit/${id}`}><i className="bx bx-edit-alt me-1"></i> Editar</a>
                    {/* <a className="dropdown-item" href={`/${path}/delete/${id}`}><i className="bx bx-trash me-1"></i> Eliminar</a> */}
                </div>
            </div>
        )
    }

    return (
        isLoadedTable ?
            <table id="tableComponent" className="table display table-striped table-sm table-condensed" >
                <thead>
                    <tr>{renderTitles()}</tr>
                </thead>
                <tbody>{renderValues()}</tbody>
                <tfoot>
                    <tr>{renderTitles()}</tr>
                </tfoot>
            </table>
            : null
    );
}

export default DataTableComponent;