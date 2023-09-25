<template>
  <div>
    <NuxtLayout>
      <Loader v-if="isLoading"></Loader>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>


<script setup>
const isLoading = ref(true);
onMounted(() => {
  isLoading.value = false;
});
</script>