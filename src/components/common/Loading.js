import React from 'react'

const ContentLoading = () => {
    return (
        <section className="loading pb-5">
            <div className="card mb-5">
                <div className="card-body pt-sm-5 pb-sm-5">
                    <div className="row">
                        <div className="col-auto">
                            <div className="image"></div>
                        </div>
                        <div className="col">
                            <div className="text">
                                <div className="text-line"></div>
                                <div className="text-line"></div>
                                <div className="text-line"></div>
                                <div className="text-line"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const ProductLoading = () => {
    return (
        <article className="main background-light-gray pb-5 loading">
            <section className="hero" style={{ backgroundImage: 'none' }}>
                <div className="container">
                    <div className="pt-sm-5 pb-sm-5 pt-1">
                        <div className="text-center">
                            <div className="text mb-3 w-50 ml-auto mr-auto">
                                <div className="text-line"></div>
                                <div className="text-line"></div>
                                <div className="text-line"></div>
                            </div>

                            <div className="text mb-3 ml-auto mr-auto w-75">
                                <div className="text-line"></div>
                                <div className="text-line"></div>
                                <div className="text-line"></div>
                            </div>

                            <div className="text ml-auto mr-auto w-25">
                                <div className="text-line"></div>
                                <div className="text-line"></div>
                                <div className="text-line"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    )
}

const PageLoading = () => {
    const banner = {
        background: "",
        textcolor: "",
        title: ''
    }
    return (
        <article className="main background-very-light-gray pb-5 loading">
            <section className="hero background-light-gray" style={{ backgroundImage: 'none' }}>
                <div className="container">
                    <div className="row pt-sm-5 pb-sm-5 pt-4">
                        <div className="col">
                            <div className="text">
                                <div className="text-line"></div>
                                <div className="text-line"></div>
                                <div className="text-line"></div>
                            </div>
                        </div>
                        <div className="col">
                        </div>
                    </div>
                </div>
            </section>
            <div className="container">
                <div className="card shadow border">
                    <div className="card-body pt-sm-5 pb-sm-5">
                        <div className="row">
                            <div className="col-2">
                                <div className="text">
                                    <div className="text-line"></div>
                                    <div className="text-line"></div>
                                    <div className="text-line"></div>
                                </div>
                            </div>
                            <div className="col-10">
                                <div className="text">
                                    <div className="text-line"></div>
                                    <div className="text-line"></div>
                                    <div className="text-line"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}

const HeaderLoading = () => {
    return (
        <header className="header loading">
            <section style={{ height: '67px' }}>

            </section>
        </header>
    )
}

const HomeLoading = () => {
    return (
        <article className="main background-light-gray pb-5 loading">
            <section className="hero" style={{ backgroundImage: 'none' }}>
                <div className="container">
                    <div className="row pt-sm-5 pb-sm-5">
                        <div className="col"></div>
                        <div className="col">
                            <div className="text mb-3">
                                <div className="text-line"></div>
                                <div className="text-line"></div>
                                <div className="text-line"></div>
                            </div>

                            <div className="text mb-3" style={{ width: '90%' }}>
                                <div className="text-line"></div>
                                <div className="text-line"></div>
                                <div className="text-line"></div>
                            </div>

                            <div className="text" style={{ width: '80%' }}>
                                <div className="text-line"></div>
                                <div className="text-line"></div>
                                <div className="text-line"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    )
}

const OverlayLoading = ({open, transparent = false, scrollable = false}) => {
    const toggleClass = scrollable ? 'body' : 'modal-open'
    const el = document.querySelector('body')
    const addBodyClass = () => {
        if (el.classList)
            el.classList.add(toggleClass)
        else
            el.className += ' ' + toggleClass
    }
    const removeBodyClass = () => {
        if (el.classList)
            el.classList.remove(toggleClass);
        else
            el.className = el.className.replace(new RegExp('(^|\\b)' + toggleClass.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
    }
    open ? addBodyClass() : removeBodyClass()
    return open ? <div className={`modal-backdrop fade show ${transparent ? 'background-transparent' : 'background-very-light-gray'}`}></div> : null
}

const CardLoading = () => {
    return (
        <section className="loading mb-3">
            <div className="card border shadow">
                <div className="card-body p-3">
                    <div className="row">
                        <div className="col-3">
                            <div className="text">
                                <div className="text-line"></div>
                                <div className="text-line"></div>
                                <div className="text-line"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export { ContentLoading, PageLoading, HeaderLoading, HomeLoading, ProductLoading, OverlayLoading, CardLoading }