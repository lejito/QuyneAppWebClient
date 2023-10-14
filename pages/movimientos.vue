<template>
    <div class="shadow">
        <div class="rectangle-m">
            <div class="rectangle-m2">
                <h4 class="text-m">MOVIMIENTOS</h4>
                <div class="line-m"></div>
            </div> 
        </div>
    </div>
    <div class="search-bar-container">
        <input type="text" class="search-bar" placeholder="Buscar...">
        <v-icon icon="mdi-magnify" class="icono-dentro"></v-icon>
    </div>
</template>

<script setup>

definePageMeta({
  layout: "navbar"
});

</script>

<style scoped>
    .rectangle-m {
        clip-path: polygon(0 0, 100% 0, 95% 100%, 0% 100%);
        background-color: var(--color-secundario);
        width: 50% !important; 
        height: 140px !important;
        float: left;
    }
    .rectangle-m2 {
        clip-path: polygon(0 0, 100% 0, 96% 100%, 0% 100%);
        background: linear-gradient(138deg, transparent, var(--color-primario) 75%);
        width: 96%; 
        height: 110px; 
        float: left;
    }
    .text-m{
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
        float: right; 
        margin-top: 10px;
        position: relative; 
    }
    .icono-dentro { 
        position: absolute;
        left: 10px; 
        top: 70%;
        transform: translateY(-50%);
        font-size: 20px; 
        color: black; 
        outline: none;
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