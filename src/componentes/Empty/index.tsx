function EmptyComponent({ title, description, icon, width }: { title: string, description: string, icon: string, width: string }) {

    return (
        <div className="misc-wrapper" style={{ textAlign: 'center', marginTop: '40px' }}>
            <h2 className="mb-2 mx-2">{title}</h2>
            <p className="mb-4 mx-2">{description}</p>
            <div className="mt-3">
                <img
                    src={`./assets/img/illustrations/${icon}`}
                    alt="girl-doing-yoga-light"
                    width={width}
                    className="img-fluid"
                    data-app-dark-img="illustrations/page-misc-error-dark.png"
                    data-app-light-img={`illustrations/${icon}`}
                />
            </div>
        </div>
    )
}

export default EmptyComponent;