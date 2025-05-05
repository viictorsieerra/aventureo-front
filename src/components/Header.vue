<template>
    <header class="navbar">
      <div class="container">
    
        <h1 class="logo">Aventureo</h1>
    
        <nav class="nav">
  <button class="nav-item">Alojamiento</button>
  <button class="nav-item" id="vuelos">Vuelos</button>
  <button class="nav-item">Vuelo + hotel</button>
  <router-link to="actividades"><button class="nav-item">Actividades</button></router-link>
  <button class="nav-item">Trenes</button>
</nav>
    
        <div class="actions">
          <button class="login-button">Iniciar sesión</button>
          <button class="signup-button">Registrarse</button>
        </div>
      </div>
    
      <div class="header-title">
          <h1 class="first-title">Piensa un lugar y disfruta del viaje!</h1>
      </div>
  
     
        <div class="help-icon" @click="showOverlay = !showOverlay">
            <span>?</span>
        </div>
  
     
        <div v-if="showOverlay" class="overlay">
            <div class="overlay-content">
                 
                <div class="close-btn" @click="showOverlay = false">×</div>
                <v-stepper :items="['Step 1', 'Step 2', 'Step 3']">
                    <template v-slot:item.1>
                        <v-card title="Step One" flat>Para empezar selecciona lo que quieras buscar, alojamiento, vuelo o ambas!!</v-card>
                    </template>

                    <template v-slot:item.2>
                        <v-card title="Step Two" flat>Una vez lo hayas seleccionado, indica las fechas de ida y de vuelta junto el lugar del que quieres salir y al que quieres acudir.</v-card>
                    </template>

                    <template v-slot:item.3>
                        <v-card title="Step Three" flat>Y ya para terminar, observa todas las opciones y elige la que mas te guste.</v-card>
                    </template>
                </v-stepper>
            </div>
        </div>
    </header>  
    
</template>
  
<script setup lang="ts">
  import { ref } from 'vue';
  
  const showOverlay = ref(false);
  </script>
  
  <style scoped lang="scss">
  .navbar {
    background-color: #48a259;
    color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 16px;
    width: 100%;
    position: static;
    top: 0;
    left: 0;
    z-index: 50;
  }
  
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  
  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
  }
  
  .nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 100%;
  }
  
  .nav-item {
    background: none;
    border: none;
    color: white;
    font-size: 1rem;
    padding: 10px 16px;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease;
    width: 100%;
    text-align: center;
  }
  
  .nav-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
  
  .actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }
  
  .login-button,
  .signup-button {
    background-color: white;
    color: #003580;
    padding: 10px;
    border-radius: 8px;
    font-size: 0.9rem;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  .signup-button {
    background-color: #ffffbf;
    color: black;
  }
  
  .login-button:hover,
  .signup-button:hover {
    background-color: #f7f7f7;
    transform: translateY(-2px);
  }
  
  .signup-button:hover {
    background-color: #d78d00;
  }
  
  .header-title {
    text-align: center;
    padding: 40px 16px;
  }
  
  .first-title {
    font-size: 1.5rem;
    margin-top: 140px;
  }
  
  @media (min-width: 768px) {
    .container {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }
  
    .nav {
      flex-direction: row;
      gap: 24px;
      width: auto;
    }
  
    .actions {
      flex-direction: row;
      width: auto;
      gap: 12px;
    }
  
    .nav-item {
      width: auto;
    }
  
    .login-button,
    .signup-button {
      width: auto;
    }
  
    .first-title {
      font-size: 2rem;
      margin-top: 5%;
    }
  
    .header-title {
      padding: 60px 24px;
    }
  }
  
 
  .help-icon {
    position: absolute;
    top: 16px;
    right: 16px;
    font-size: 2rem;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.3s ease;
  }
  
  .help-icon:hover {
    color: #ffffbf;
  }
  
 
  .overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.overlay-content {
  position: relative; 
  background-color: white;
  color: #003580;
  padding: 24px;
  border-radius: 8px;
  text-align: center;
  width: 80%;
  max-width: 400px;
  font-size: 1.1rem;
  max-height: 90vh; 
  overflow-y: auto; 
}

.close-btn {
  position: absolute;
  top: -11px;
  right: 3px;
  font-size: 2rem;
  cursor: pointer;
  color: #48a259;
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: #d78d00; 
}
  </style>
  