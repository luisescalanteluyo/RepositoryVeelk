function InputDateComponent({
    id,
    title,
    type,
    placeholder,
    describedby,
    icon,
    leftText,
    bottomText,
    change,
    value
}:
    {
        id: string,
        title: string,
        type: string,
        placeholder: string,
        describedby: string,
        icon: string,
        leftText: string | boolean,
        bottomText: string | boolean,
        change: Function,
        value: string | number
    }) {

    return (
        <>
            <label className="col-sm-1 col-form-label" htmlFor={id}>{title}</label>
            <div className="col-sm-5">
                <div className="input-group input-group-merge">
                    <span id={describedby} className="input-group-text"><i className={`bx ${icon}`}></i></span>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id={id}
                        name={id}
                        placeholder={placeholder}
                        aria-label={placeholder}
                        aria-describedby={describedby}
                        onChange={(e) => change(e)}
                        value={value}
                    />
                    {leftText && <span id={describedby} className="input-group-text">{leftText}</span>}
                </div>
                {bottomText && <div className="form-text">{bottomText}</div>}
            </div>
        </>
    )
}
export default InputDateComponent;