<template>
  <div id="mapid"></div>
</template>

<script>
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';

  export default {
    props: ['lat', 'lng'],
    mounted() {
      var map = L.map('mapid').setView([this.lat, this.lng], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        ccessToken: 'not-needed',
      }).addTo(map);
    }
  }
</script>

<style scoped>
  #mapid {
    height: 500px;
    width: 100%;
  }
</style>
