<template>
  <div class="loading">
    <span class="loading__loader"></span>
  </div>
</template>

<style>
.loading {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-loader-background);
  transition: all 300ms ease-in-out;
  z-index: 999;
}

.loading__loader {
  display: inline-block;
  width: 80px;
  height: 80px;
}

.loading__loader::after {
  content: "";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>