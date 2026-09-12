import React, { useEffect, useRef } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';

interface ProductMapProps {
  onLocationSelect?: (lng: number, lat: number) => void;
  className?: string;
}

export const ProductMap: React.FC<ProductMapProps> = ({
  onLocationSelect,
  className = '',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<maptilersdk.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Configurar API Key de MapTiler proporcionada
    maptilersdk.config.apiKey = 'BaJJvaZYuwfsQCN0TWEs';

    // Usamos el estilo 'DARK' o 'DATAVIZ.DARK' para que no rompa con diseños oscuros/modernos
    const map = new maptilersdk.Map({
      container: mapContainerRef.current,
      style: maptilersdk.MapStyle.DATAVIZ.DARK, // Estilo limpio y elegante
      center: [-99.1332, 19.4326],
      zoom: 14,
      navigationControl: false, // Desactivar controles automáticos que puedan capturar foco
      geolocateControl: false,
      keyboard: false, // Impide que el mapa capture foco por teclado o tabindex
      scrollZoom: false, // Evita interferir con el scroll del usuario en la landing
    });

    mapInstanceRef.current = map;

    // Asegurar que el contenedor no tenga foco
    if (mapContainerRef.current) {
      mapContainerRef.current.tabIndex = -1;
      mapContainerRef.current.blur();
    }

    // Crear la lata con transparencia
    const lataElement = document.createElement('div');
    lataElement.style.backgroundImage =
      'url("https://res.cloudinary.com/hw31kdln/image/upload/v1788805587/lata_xxjtju.png")';
    lataElement.style.width = '50px';
    lataElement.style.height = '80px';
    lataElement.style.backgroundSize = 'contain';
    lataElement.style.backgroundRepeat = 'no-repeat';
    lataElement.style.backgroundPosition = 'center';
    lataElement.style.cursor = 'pointer';
    lataElement.className = 'transition-transform duration-300 hover:scale-110 drop-shadow-[0_8px_16px_rgba(255,107,0,0.5)]';

    // Añadir la lata al mapa con popup (desactivando focusAfterOpen para evitar que el navegador haga scroll automático al mapa)
    const popup = new maptilersdk.Popup({
      offset: 28,
      closeButton: true,
      focusAfterOpen: false,
    }).setHTML(
      '<div style="text-align:center; padding: 2px;"><b style="color:#FFB347; font-size:13px; display:block; margin-bottom:2px;">Naran Go • Punto Central</b><span style="color:#fff; font-size:12px;">¡Encuentra nuestra lata aquí!</span></div>'
    );

    new maptilersdk.Marker({ element: lataElement })
      .setLngLat([-99.1332, 19.4326])
      .setPopup(popup)
      .addTo(map);

    // Asegurar transparencia en el canvas WebGL para acoplarse a la landing sin capturar foco
    map.on('load', () => {
      const canvas = map.getCanvas();
      if (canvas) {
        canvas.style.backgroundColor = 'transparent';
        canvas.removeAttribute('tabindex');
        if (typeof canvas.blur === 'function') {
          canvas.blur();
        }
      }
      try {
        if (map.getLayer('background')) {
          map.setPaintProperty('background', 'background-opacity', 0.5);
        }
      } catch {
        // Ignorar si el estilo no define capa de fondo estática
      }
      map.resize();
    });

    // Permitir clic para interactuar o seleccionar punto de entrega
    map.on('click', (e) => {
      if (onLocationSelect) {
        onLocationSelect(e.lngLat.lng, e.lngLat.lat);
      }
    });

    // ResizeObserver para mantener el lienzo nítido ante cambios de tamaño del contenedor
    const resizeObserver = new ResizeObserver(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.resize();
      }
    });
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [onLocationSelect]);

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Contenedor oficial #mapa-producto con bordes redondeados y fondo transparente */}
      <div
        id="mapa-producto"
        ref={mapContainerRef}
        className="w-full relative"
      />
    </div>
  );
};
