import React from "react"
import InstallationAddressComponent from '../../components/InstallationAddressComponent'

const SiteInstallationAddress = ({ productStore }) => {
    return (
        <section className="mb-3">
            <h3 className="title-text text-center pt-4 pb-4">Site Installation Address</h3>
            <div className="tabs">
                <nav>
                    {productStore.packages && <InstallationAddressComponent productStore={productStore} />}
                </nav>
            </div>
        </section>
    )
}

export default SiteInstallationAddress