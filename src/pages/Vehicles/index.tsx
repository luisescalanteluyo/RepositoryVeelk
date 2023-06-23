import { useEffect, useState } from "react";
import { CardTabsComponent, LoadingComponent, ModalActionsComponent, TemplateComponent, VehicleTabsComponent } from "../../componentes";

import { vehiclesModel } from "../../models/vehicles/vehiclesModel";
import { getAllVehicles } from "../../controllers/vehicles";
import UTILS from "../../utils/utils";
import EmptyComponent from "../../componentes/Empty";
import CONST from "../../utils/constants";

function VehiclesPage() {
  const [vehiclesState, setVehiclesState] = useState<vehiclesModel[] | []>([]);
  const [filterInp, setFilterInpState] = useState<vehiclesModel[] | []>([]);
  const [filterInpParams, setFilterInpParamsState] = useState({ fromYear: 0, untilYear: 0, fromPrice: 0, untilPrice: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [typeSearch, setTypeSearch] = useState("published");
  const [isEmptyList, setIsEmptyList] = useState(false);
  const [filterSearchBtn, setFilterSearchBtn] = useState(false);


  useEffect(() => {
    
    if (vehiclesState.length === 0 && !isEmptyList) {
      getVehicles(typeSearch);
    }
  }, [vehiclesState, filterInpParams])

  useEffect(() => {
    if (!filterSearchBtn) {
      setFilterInpParamsState({ fromYear: 0, untilYear: 0, fromPrice: 0, untilPrice: 0 })
    }
  }, [filterSearchBtn])

  const getVehicles = async (type: string) => {
    setIsLoading(true);
    UTILS.VALIDATE_ORGANIZATION();
    const vehiclesList: vehiclesModel[] = await getAllVehicles(type);
    setIsEmptyList(vehiclesList.length === 0);
    setVehiclesState(vehiclesList);
    setIsLoading(false);
  }

  const changeSearch = async (type: string) => {
    setVehiclesState([]);
    setFilterInpState([]);
    setFilterSearchBtn(false);
    setIsEmptyList(false);
    setTypeSearch(type);
  }

  const renderItems = () => (
    <div className="card-body vehicle-ctn">
      <div className="row mb-5">
        {filterInp.length > 0 ?
          filterInp.map(item => <CardTabsComponent key={UTILS.SET_RANDOM_KEY(item._id)} item={item} />) :
          vehiclesState.map(item => <CardTabsComponent key={UTILS.SET_RANDOM_KEY(item._id)} item={item} />)
        }
      </div>
    </div>
  );

  const filterSearchEvent = (e: any) => {
    let value = e.target.value;
    let vehicles: vehiclesModel[] = vehiclesState;
    let filter: vehiclesModel[] = vehicles.filter(q => {
      return q.name?.toLowerCase().includes(value) ||
        q.branch?.toLowerCase().includes(value) ||
        q.brand?.toLowerCase().includes(value) ||
        q.make?.toLowerCase().includes(value) ||
        q.model?.toLowerCase().includes(value) ||
        q.body?.color.toLowerCase().includes(value) ||
        q.plate?.toLowerCase().includes(value)
    });
    setFilterInpState(filter);
  }
  const filterSearchParamsEvent = (e: any, key: string) => {
    if (key === "fromPrice") { setFilterInpParamsState({ ...filterInpParams, fromPrice: e.target.value === "" ? 0 : e.target.value }) }
    else if (key === "untilPrice") { setFilterInpParamsState({ ...filterInpParams, untilPrice: e.target.value === "" ? 0 : e.target.value }) }
    else if (key === "fromYear") { setFilterInpParamsState({ ...filterInpParams, fromYear: e.target.value === "" ? 0 : e.target.value }) }
    else if (key === "untilYear") { setFilterInpParamsState({ ...filterInpParams, untilYear: e.target.value === "" ? 0 : e.target.value }) }
    let vehicles: vehiclesModel[] = vehiclesState;
    let filter: vehiclesModel[] = vehicles.filter(q => {
      return (filterInpParams.fromPrice > 0 && parseInt(q.price) >= filterInpParams.fromPrice || parseInt(q.price) >= filterInpParams.fromPrice) ||
        (filterInpParams.untilPrice > 0 && parseInt(q.suggestedPrice) <= filterInpParams.fromPrice || parseInt(q.suggestedPrice) <= filterInpParams.fromPrice) ||
        (filterInpParams.fromYear > 0 && q.year >= filterInpParams.fromPrice) ||
        (filterInpParams.untilPrice > 0 && q.year <= filterInpParams.fromPrice)
    });

    setFilterInpState(filter);
  }

  const renderContainer = () => (
    <>
      <div className="row">
        <div className="col-md-12 card-header">
          {!filterSearchBtn ?
            <div className="row">
              <span className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  id="vehicleListInput"
                  placeholder="Buscar vehículos"
                  onChange={(e) => filterSearchEvent(e)}
                  aria-describedby="vehicleListInput" />
              </span>
              <div className="col-md-2">
                <a href="/vehicles/add" className="btn rounded-pill btn-primary">Agregar</a>
              </div>

            </div> :
            <div className="row">
              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  id="fromInpYear"
                  placeholder="Año desde..."
                  maxLength={4}
                  value={filterInpParams.fromYear === 0 ? "" : filterInpParams.fromYear}
                  onChange={(e) => filterSearchParamsEvent(e, "fromYear")}
                  aria-describedby="fromInpYear" />
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  id="untillInpYear"
                  placeholder="Año hasta..."
                  maxLength={4}
                  value={filterInpParams.untilYear === 0 ? "" : filterInpParams.untilYear}
                  onChange={(e) => filterSearchParamsEvent(e, "untilYear")}
                  aria-describedby="untillInpYear" />
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  id="fromInpPrice"
                  placeholder="Precio desde..."
                  value={filterInpParams.fromPrice === 0 ? "" : filterInpParams.fromPrice}
                  onChange={(e) => filterSearchParamsEvent(e, "fromPrice")}
                  aria-describedby="fromInpPrice" />
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  id="untilInpPrice"
                  placeholder="Precio hasta..."
                  value={filterInpParams.untilPrice === 0 ? "" : filterInpParams.untilPrice}
                  onChange={(e) => filterSearchParamsEvent(e, "untilPrice")}
                  aria-describedby="untilInpPrice" />
              </div>
            </div>}

        </div>
        <div className="col-md-3" style={{ margin: '0 auto' }}>
          <a
            className={`dropdown-item ${!filterSearchBtn ? '' : 'active'}`}
            style={{ textAlign: 'center' }}
            onClick={() => setFilterSearchBtn(!filterSearchBtn)}>
            <i className={`bx ${!filterSearchBtn ? 'bx-chevron-down' : 'bx-chevron-up'}`}></i>
            <span className="align-middle">{CONST.VEHICLES.FILTER.BUTTON}</span>
          </a>
        </div>

      </div>
      {renderItems()}
    </>
  )

  const renderEmpty = () =>
    <EmptyComponent
      title={CONST.EMPTY.VEHICLES.TITLE}
      description={CONST.EMPTY.VEHICLES.MSG}
      icon="man-with-laptop-light.png"
      width="300"
    />

  const wrapper = () => {
    return (
      <>
        <div className="col-xl-12">
          <div className="nav-align-top mb-4">
            <VehicleTabsComponent items={CONST.VEHICLES.TABS} changeSearch={changeSearch} />
            <div className="tab-content">
              {!isLoading ?
                vehiclesState.length > 0 ? renderContainer() : renderEmpty() :
                <div className="tab-cont-loading">
                  <LoadingComponent />
                </div>
              }
            </div>
          </div>
        </div>
      </>
    )
  };

  return <TemplateComponent
    menuActive="vehicles"
    subMenuActive=""
    children={wrapper()}
    isLoading={false} />;
}

export default VehiclesPage;