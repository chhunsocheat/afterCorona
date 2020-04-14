<template>
  <div class="container">
    <footer>
      <p class="copyright"><i class="far fa-copyright"></i> copyright by Chhun Socheat</p>
      <div class="footer-container">
        <div class="footer-icon">
          <a href="https://www.facebook.com/jame.sweet.5">
            <i id="fb" class="fab fa-facebook"></i>
          </a>
          <a href="https://www.linkedin.com/in/chhun-socheat-494b67156/">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com/chhunsocheat">
            <i id="gh" class="fab github-footer fa-github"></i>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.copyright{
  top: 10%;
  position: relative;
  margin: 20px;
  color: white;
}
 i {
  color: #ffffff;
  font-size: 30px;
}
.footer-icon i:hover{
  transition: 0.5s all ease;
  color: #39ace7;
}
.fa-copyright{
  font-size: 15px;
}
.footer-icon{
  display: flex;
  width: 20%;
  justify-content: space-evenly;
}
.footer-container{
  display: flex;
  justify-content: center;
}
footer {
  bottom: 0;
  width: 100%;
  height: 10vh;
  background: var(--main-btn-color);
}
</style>