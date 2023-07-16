<template>
  <div id="mapid"></div>
</template>

<script>
  import L from 'leaflet';
  import { ref, onMounted, watch } from 'vue';
  import 'leaflet/dist/leaflet.css';

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });

  export default {
    props: ['lat', 'lng', 'zoom', 'interactive'],
    setup(props) {
      const map = ref(null);
      const markers = ref([]);

      onMounted(() => {
        map.value = L.map('mapid').setView([props.lat, props.lng], props.zoom);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map.value);

        // Only add click event if interactive prop is true
        if (props.interactive) {
          map.value.on('click', addMarker);
        }
      });

      watch(() => props.lat, (newLat) => {
        if (map.value) {
          map.value.flyTo([newLat, props.lng], props.zoom);
        }
      });

      watch(() => props.lng, (newLng) => {
        if (map.value) {
          map.value.flyTo([props.lat, newLng], props.zoom);
        }
      });

      watch(() => props.zoom, (newZoom) => {
        if (map.value) {
          map.value.setZoom(newZoom)
        }
      });

      function addMarker(e) {
        // Remove existing markers
        markers.value.forEach(marker => {
          map.value.removeLayer(marker);
        });

        // Clear the markers array
        markers.value = [];

        // Add new marker
        let newMarker = L.marker(e.latlng).addTo(map.value);
        // newMarker.bindPopup("<b>New location!</b>").openPopup();

        // Store the new marker in the markers array
        markers.value.push(newMarker);
      }

      return { map, markers, addMarker };
    }
  }
</script>

<style scoped>
  #mapid {
    height: 500px;
    width: 100%;
  }
</style>
