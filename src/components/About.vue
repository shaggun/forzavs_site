<template>
  <div class="container">
    <br>
    <hr>
    <div class="textContainer" variant="dark">
      <h4>FORZA VS</h4>
      <br>
      <p>The more cars you keep collecting in-game, the more difficult it becomes to compare them, some cars are extremely similar in performance but here you can compare stock car specs, search by name or manufacturer, sort and filter search results, now it will be easier to find that extra oomph that you're looking for to beat your opponents and the saltiest AI in recent racing games history.</p>
      <p>For now, you can only compare Forza Horizon 4 cars but future Forza games will be added.</p>
      <p>
        If you find any errors or if there's any car missing please go to
        <a>
          <router-link to="/feedback">FEEDBACK</router-link>
        </a> and report it.
      </p>
      <br>
      <span>This website is not affiliated with Microsoft.</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  margin-top: 50px;
  min-height: 100vh;
  background-color: white;
}
p {
  font-size: 1.2em;
}
.textContainer {
  padding-left: 100px;
  padding-right: 100px;
  padding-top: 15px;
  text-align: justify;
}
</style>
