import CONST from '../constants';

export default function NotFound() {
    return (
        <div className="container-xxl container-p-y" style={{ margin: '0 AUTO', textAlign: 'center' }}>
            <div className="misc-wrapper">
                <h2 className="mb-2 mx-2">{CONST._404.PAGE_TITLE}</h2>
                <p className="mb-4 mx-2">{CONST._404.PAGE_DESCRIPTION}</p>
                <a href="/dashboard" className="btn btn-primary">{CONST._404.PAGE_BACK}</a>
                <div className="mt-3">
                    <img
                        src="./assets/img/illustrations/page-misc-error-light.png"
                        alt="page-misc-error-light"
                        width="500"
                        className="img-fluid"
                        data-app-dark-img="illustrations/page-misc-error-dark.png"
                        data-app-light-img="illustrations/page-misc-error-light.png"
                    />
                </div>
            </div>
        </div>
    );
}