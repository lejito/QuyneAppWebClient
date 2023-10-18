
<template>
  <header style="display: flex;flex-direction: row; ">
    <div class="shadow" style="
        flex:1;
        width: 300px;">
      <div class="rectangle-m">
        <div class="rectangle-m2">
          <h4 class="text-m">{{ name }}</h4>
          <div class="line-m"></div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  props: {
    name: String
  }
}
</script>
<style scoped>
.rectangle-m {
  clip-path: polygon(0 0, 100% 0, 95% 100%, 0% 100%);
  background-color: var(--color-secundario);
  width: 100% !important;
  height: 140px !important;

}

.rectangle-m2 {
  clip-path: polygon(0 0, 100% 0, 96% 100%, 0% 100%);
  background: linear-gradient(138deg, transparent, var(--color-primario) 75%);
  width: 96%;
  height: 110px;

}

.text-m {
  color: white;
  margin-top: 25px;
  margin-left: 20%;
}

.line-m {
  width: 450px;
  border-bottom: 1px solid white;
  margin-left: 15%;
  margin-top: 8px;
}

.search-bar-container {

  margin-top: 10px;
  position: relative;
}

.icono-dentro {
  position: relative;
  left: 1.5%;
  top: -23%;
  font-size: 20px;
  color: black;
  outline: none;
  cursor: pointer;
}

.search-bar {
  width: 650px;
  padding: 10px 10px 10px 40px;
  outline: none;
  margin-top: 30px;
  margin-right: 50px;
  background: #fafafa;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 40px;
}
</style>  