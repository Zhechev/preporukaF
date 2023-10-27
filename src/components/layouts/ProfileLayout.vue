<script>
import DashboardSidebar from '@/components/Profile/DashboardSidebar.vue';



export default {
    components: {
        DashboardSidebar,
    },
};
</script>

<template>
    <div>
      <profile-header></profile-header>
          <!-- Втори слот - за навигационната част -->
        <slot name="dashboard-sidebar">
            <DashboardSidebar /> <!-- Използвайте DashboardSidebar като част от вашата разметка -->
        </slot>
      <slot></slot>
    </div>
  </template>