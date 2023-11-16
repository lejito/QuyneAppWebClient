<template>
  <v-card>
    <div class="shadow2">
      <div class="rectangle-p">
        <div class="rectangle-p2">
          <h4 class="text-p">PERFIL</h4>
          <div class="line-p"></div>
        </div>
      </div>
    </div>
    <v-layout style="height: 100vh;">
      <v-navigation-drawer v-model="drawer" temporary location="right" style="position: absolute;">
        <v-list density="compact" nav>
          <v-list-item>
            <template v-slot:append>
              <v-btn variant="text" @click.stop="drawer = !drawer">
                <v-icon icon="mdi-chevron-right" style="font-size: xx-large;">
                </v-icon>
              </v-btn>
            </template>
          </v-list-item>
          <v-list-item prepend-icon="mdi-form-textbox" title="Nombre completo" @click="current = 'name'"
            :active="current === 'name'"></v-list-item>
          <v-list-item prepend-icon="mdi-lock-reset" title="Contraseña" @click="current = 'password'"
            :active="current === 'password'"></v-list-item>
          <v-list-item prepend-icon="mdi-email-edit" title="Correo electronico" @click="current = 'email'"
            :active="current === 'email'"></v-list-item>
          <v-list-item prepend-icon="mdi-calendar-edit" title="Fecha de nacimiento" @click="current = 'birth'"
            :active="current === 'birth'"></v-list-item>
          <v-list-item prepend-icon="mdi-account-details" title="Registros de actividad" @click="current = 'logs'"
            :active="current === 'logs'"></v-list-item>
        </v-list>

      </v-navigation-drawer>
      <v-btn variant="text" @click.stop="drawer = !drawer"
        style="float: right; position: absolute; right: 15px; top: 10px;">
        <v-icon icon="mdi-chevron-left" style="font-size: xx-large;"></v-icon>
      </v-btn>
      <v-main class="main">

        <div>
          <ProfileNameSection @loading="Load" v-if="current === 'name'"></ProfileNameSection>
          <ProfilePasswordSection @loading="Load" v-if="current === 'password'"></ProfilePasswordSection>
          <ProfileEmailSection @loading="Load" v-if="current === 'email'"></ProfileEmailSection>
          <ProfileBirthSection @loading="Load" v-if="current === 'birth'"></ProfileBirthSection>
          <ProfileLogSection @loading="Load" v-if="current === 'logs'"></ProfileLogSection>
        </div>
      </v-main>
    </v-layout>
  </v-card>


  <Loader v-if="loading"></Loader>
</template>
<script setup>

const drawer = ref(true);
const loading = ref(false);
const current = ref('name');
function Load(value) {
  loading.value = value;
}
definePageMeta({
  layout: "navbar"
});

useHead({
  title: "QuyneApp ~ Editar perfil"
});
</script>
<style scoped>
.rectangle-p {
  clip-path: polygon(0 0, 5% 100%, 95% 100%, 100% 0);
  background-color: var(--color-secundario);
  width: 50% !important;
  height: 110px !important;
  margin: 0 auto;
}

.rectangle-p2 {
  clip-path: polygon(0 0, 100% 0, 96% 100%, 4% 100%);
  background: linear-gradient(10deg, var(--color-primario) 25%, transparent);
  width: 92%;
  height: 90px;
  margin: 0 auto;
}

.text-p {
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

.main {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 400px;
  margin-top: 40px;
}
</style>