<template>
  <div class="shadow2">
        <div class="rectangle-p">
            <div class="rectangle-p2">
                    <h4 class="text-p">PERFIL</h4>
                    <div class="line-p"></div>
            </div> 
        </div>
    </div>
    <div class="contenedior">
      <div class="card-perfil">
          <div class="iconContainer">
            <img src="~/public/perficon.png"/>
            <h4>Identificacion</h4>
          </div>
          <div class="linea"></div>
          <div class="inputscontainer">
            <v-container>
              <v-row>
                <h5 class="texto-label-p">Primer nombre</h5>
                <h5 class="texto-label-p">Segundo nombre</h5>
              </v-row>
              <v-row>
                <input class="labelContainer" placeholder="Nombre"/>
                <input class="labelContainer" placeholder="Segundo nombre"/>
              </v-row>
              <v-row>
                <h5 class="texto-label-p">Primer apellido</h5>
                <h5 class="texto-label-p">Segundo apellido</h5>
              </v-row>
              <v-row>
                <input class="labelContainer" placeholder="Apellido"/> 
                <input class="labelContainer" placeholder="Segundo apellido"/>
              </v-row>
              <v-row>
                <h5 class="texto-label-p">Correo</h5>
              </v-row>
              <v-row>
                <input class="labelContainer2" placeholder="Correo"/>
              </v-row>
            </v-container>
            <button class="boton">Guardar Cambios</button>
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

.card-perfil {
  display: flex;
  justify-content: flex-start;
  align-self: start;
  align-items: center;
  background-color: #fafafa; 
  width: 800px; 
  height: 450px; 
  border-radius: 40px;
  box-shadow: 0 2px 5px var(--color-hover-background);
  margin-top: 25px;

}
.contenedior{
  display: flex;
  justify-content: center;
  align-items: center;
}
.iconContainer{
  width: 150px;
  height: 150px;
  margin-left: 50px;
  margin-bottom: 50px;
}
.linea{
  background-color: black;
  width: 1px;
  height: 80%;
  margin-left: 50px;
  
}
.labelContainer{
  display: flex;
  padding-left: 20px;
  align-items: center;
  height: 50px;
  width: 200px;
  background-color: beige;
  border-radius: 40px;
  margin-right: 20px;
  margin-top: 5px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
.labelContainer2{
  display: flex;
  padding-left: 20px;
  align-items: center;
  height: 50px;
  width: 420px;
  background-color: beige;
  border-radius: 40px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
.label-p{
  margin-left: 10px;
}
.texto-label-p{
  font-size: 20px;
  margin-left: 9px;
  color: black;
  margin-right: 90px;
}
.inputscontainer{
  margin-left: 30px;
}
.boton{
  height: 50px;
  width: 200px;
  background-color: transparent;
  border: 4px solid var(--color-terciario);
  color: black;
  padding: 10px 20px;
  border-radius: 30px;
  margin-left: 25%;
  margin-top: 10px;
  font-size: 20px;
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-weight: bold;
}
.boton:hover {
  background-color: var(--color-terciario);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  font-weight: bold;
}

</style>