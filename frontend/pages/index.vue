<template>
  <div class="index-layout">
    <nav class="index-navbar">
      <a class="index-navbar__container-logo" href=".">
        <img src="QuyneApp_Logo_Normal.png" alt="QuyneApp" class="index-navbar__logo">
      </a>

      <div class="index-navbar__options">
        <NuxtLink to="/login">
          <button class="index-navbar__options__button">
            Iniciar sesión
          </button>
        </NuxtLink>
        <NuxtLink to="/registro">
          <button class="index-navbar__options__button">
            Registrarse
          </button>
        </NuxtLink>
      </div>
    </nav>

    <main class="index-content">
      <div class="index-content__left">
        <h2 class="index-content__phrase">
          "{{ currentPhrase.text }}"
        </h2>
        <br>
        <h4 class="index-content__author">
          - {{ currentPhrase.author }}
        </h4>
      </div>

      <div class="index-content__mid-bar"></div>

      <div class="index-content__right">
        <img src="business_bank.png" alt="Imagen" class="index-content__img">

        <div class="index-content__register">
          <h5 class="index-content__register__title">
            QuyneApp, tu plataforma confiable, donde podrás gestionar tu dinero, transferirlo, pagar tus facturas,
            recargar
            tu línea, separar tu dinero en bolsillos... ¡y mucho más!
          </h5>

          <h6 class="index-content__register__title">
            ¿No tienes una cuenta? ¡Crea una! Es muy fácil:
          </h6>

          <NuxtLink to="/registro">
            <button class="index-content__register__button">
              Crear cuenta
            </button>
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>


<script setup>
definePageMeta({
  layout: "blank"
});

useHead({
  title: "QuyneApp ~ Gestiona tu dinero, paga tus facturas, crea bolsillos, ¡y más!"
});

onBeforeMount(() => {
  currentPhrase.value = phrases[Math.floor(Math.random() * phrases.length)];
});

const isLoading = ref(true);
onMounted(() => {
  isLoading.value = false;
})

const phrases = [
  {
    text: "El dinero no te hará feliz por si mismo, pero todo el mundo lo quiere descubrir por si mismo.",
    author: "Zig Ziglar"
  },
  {
    text: "La inversión en conocimiento paga el mejor interés.",
    author: "Benjamin Franklin"
  },
  {
    text: "El mayor riesgo es no tener ningún riesgo. En un mundo que cambia muy rápido, la única estrategia que garantiza fallar es no correr riesgos.",
    author: "Mark Zuckerberg"
  },
  {
    text: "La vida es una obra de teatro que no tiene ensayos. Por eso, canta, ríe, baila y vive cada momento intensamente.",
    author: "Charlie Chaplin"
  },
  {
    text: "La mayor gloria no es no caer nunca, sino levantarse siempre.",
    author: "Nelson Mandela"
  },
  {
    text: "La educación es el arma más poderosa que puedes usar para cambiar el mundo.",
    author: "Nelson Mandela"
  },
  {
    text: "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
    author: "Albert Schweitzer"
  },
  {
    text: "La única forma de hacer un gran trabajo es amar lo que haces.",
    author: "Steve Jobs"
  },
  {
    text: "El fracaso es la oportunidad de empezar de nuevo, con más inteligencia.",
    author: "Henry Ford"
  },
  {
    text: "La vida es como una bicicleta. Para mantener el equilibrio tienes que seguir moviéndote.",
    author: "Albert Einstein"
  },
  {
    text: "El cambio es la ley de la vida. Y aquellos que miran solo el pasado o el presente, se perderán el futuro.",
    author: "John F. Kennedy"
  }
]
const currentPhrase = ref({});

</script>