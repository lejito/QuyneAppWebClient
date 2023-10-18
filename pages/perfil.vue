<template>
  <div class="shadow2">
        <div class="rectangle-p">
            <div class="rectangle-p2">
                    <h4 class="text-p">PERFIL</h4>
                    <div class="line-p"></div>
            </div> 
        </div>
    </div>

</template>
<script>
definePageMeta({
  layout: "navbar"
});
</script>
<style scoped>
    .rectangle-p {
        clip-path: polygon(0 0, 5% 100%, 95% 100%, 100% 0);
        background-color: var(--color-secundario);
        width: 50% !important; 
        height: 140px !important;
        margin: 0 auto;
    }
    .rectangle-p2 {
        clip-path: polygon(0 0, 100% 0, 96% 100%, 4% 100%);
        background: linear-gradient(10deg, var(--color-primario) 25%,transparent);
        width: 92%; 
        height: 110px; 
        margin: 0 auto;
    }
    .text-p{
        color: white;
        padding-top: 20px;
        margin-top: 25px;
        margin-left: 45%;
    }
    .line-p {
        width: 450px; 
        border-bottom: 1px solid white;
        margin-left: 18%;
        margin-top: 8px;
    }
    .card-container {
    display: flex;
    justify-content: space-between;
    margin-top: 11%;
    padding: 35px;
}

.card {
  background-color: #fafafa; 
  width: 350px; 
  height: 400px; 
  border-radius: 40px;
  box-shadow: 0 2px 5px var(--color-hover-background);
  transition: transform 0.3s;
}

</style>