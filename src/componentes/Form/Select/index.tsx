function SelectComponent({
    id,
    title,
    placeholder,
    icon,
    options,
    change,
    value,
    width
}:
    {
        id: string,
        title: string,
        placeholder: string,
        icon: string,
        options: Array<{ k: string, v: string }>,
        change: Function,
        value: string,
        width: number
    }) {

    const mapOptions = () => options.map(({ k, v }) => <option key={k} value={k}>{v}</option>);

    return (
        <>
            <label className="col-sm-1 col-form-label" htmlFor={id}>{title}</label>
            <div className={`col-sm-${width}`}>
                <div className="input-group input-group-merge">
                    <span id="basic-icon-default-fullname2" className="input-group-text">
                        <i className={`bx ${icon}`}></i>
                    </span>
                    <select className="form-select"
                        id={id}
                        aria-label={placeholder}
                        value={value}
                        name={id}
                        onChange={(e) => change(e)}>
                        {mapOptions()}
                    </select>
                </div>
            </div>
        </>
    )
}
export default SelectComponent;