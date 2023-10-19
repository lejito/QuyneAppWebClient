<template>
  <div style="background-color: var(--color-secondary);">
    <slot />
  </div>
</template>
<script setup>
import { UtilsService } from '~/services/UtilsService';
onBeforeMount(() => {
  const sessionToken = UtilsService.getSessionToken();
  if (sessionToken) {
    navigateTo("/inicio");
  }
})
</script>