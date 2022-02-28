<template>
  <header class="topbar">
      <div class="container">
        <h2>Contatos</h2>
      </div>
    </header>
</template>
<script>
export default {
  name:'Topbar'
}
</script>
<style>
.topbar {
  backface-visibility: hidden;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  left: 0;
  padding: 10px 16px;
  position: fixed;
  top: 0;
  width: 100%;
}

.topbar .container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.topbar h2 {
  font-size: 1.8em;
}
</style>