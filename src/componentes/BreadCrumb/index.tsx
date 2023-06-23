
function BreadCrumbComponent({ title, subtitle }: { title: string, subtitle: string }) {

    return (
        <h4 className="fw-bold py-3 mb-4">
            <span className="text-muted fw-light">{title} {title !== "" && subtitle !== "" && "/"} </span>{subtitle}
        </h4>
    );
}

export default BreadCrumbComponent;