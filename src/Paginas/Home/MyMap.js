import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// Importa tu imagen (ajusta la ruta según tu estructura de archivos)
import markerIconUrl from '../../imagenes/icono-de-camion.png';

const customIcon = new L.Icon({
    iconUrl: markerIconUrl,
    iconSize: [25, 41], // Tamaño del icono
    iconAnchor: [12, 41], // Punto del icono que corresponde a la ubicación del marcador
    popupAnchor: [1, -34], // Punto desde donde se mostrará el popup relativo al icono
});

const MyMap = ({ locations }) => {
    return (
        <MapContainer center={[19.42552788710817, -99.09006396360215]} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((location, index) => (
                <Marker key={index} position={location} icon={customIcon}>
                    <Popup>
                        Coordenadas: {location[0]}, {location[1]}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MyMap;
