import React, { useState } from "react";
import AccordionMap from "../../componentes/Accordion/AccordionMap";
import MyMap from './MyMap';  // Asegúrate de que la ruta es correcta

const Dashboard = () => {
    const [expandedAccordions, setExpandedAccordions] = useState({
        collapseVehiculosActivos1: false,
        collapseVehiculosInactivos: false,
    });

    const handleAccordionChange = (accordion) => {
        setExpandedAccordions((prev) => ({
            ...prev,
            [accordion]: !prev[accordion],
        }));
    };

    const locations = [
        [19.42552788710817, -99.09006396360215], // Ciudad de México
        [19.42579655190068, -99.09053986056135], // Otra ubicación en la Ciudad de México
    ];

    return (
        <> <div className="p-4 grid md:grid-cols-2 grid-cols-1 gap-4">
            <AccordionMap
                titulo="Vehículos activos"
                idTarget="collapseVehiculosActivos1"
                expanded={expandedAccordions.collapseVehiculosActivos1}
                onClick={() => handleAccordionChange("collapseVehiculosActivos1")}
            >
                {expandedAccordions.collapseVehiculosActivos1 && (
                    <div style={{ height: '500px', width: '100%' }}>
                        <MyMap locations={locations} />
                    </div>
                )}
            </AccordionMap>
            <AccordionMap
                titulo="Vehículos inactivos"
                idTarget="collapseVehiculosInactivos"
                expanded={expandedAccordions.collapseVehiculosInactivos}
                onClick={() => handleAccordionChange("collapseVehiculosInactivos")}
            >
                {expandedAccordions.collapseVehiculosInactivos && (
                    <div style={{ height: '500px', width: '100%' }}>
                        <MyMap locations={locations} />
                    </div>
                )}
            </AccordionMap>
        </div>
        </>
    );
};

export default Dashboard;
