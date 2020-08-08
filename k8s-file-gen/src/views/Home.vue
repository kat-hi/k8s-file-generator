<template>
  <div>
    <div class="row">
     <div>
      <b-card class="deploymentCard"
          img-alt="Image"
          img-top
          tag="article"
          style="width: 20rem;">
          <img src="@/assets/index.jpeg" class="image">
          <b-card-body
          title="Deployment">
          </b-card-body>
        <b-card-text>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </b-card-text>
        <b-button class="button" @click="openDeployment" variant="light"><b-icon icon="arrow-right-circle"></b-icon></b-button>
      </b-card>
    </div>

    <div>
      <b-card class="serviceCard"
      img-alt="Image"
      img-top
      tag="article"
      style="width: 20rem;">
      <img src="@/assets/cardheader.jpg" class="image">
      <b-card-body title="Service"></b-card-body>
        <b-card-text>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </b-card-text>
        <b-button class="button" @click="openService" variant="light"><b-icon icon="arrow-right-circle"></b-icon></b-button>
      </b-card>
    </div>

    <div>
      <b-card class="ingressCard"
        img-alt="Image"
        img-top
        tag="article"
        style="width: 20rem;">
        <img src="@/assets/ingressheader.jpeg" class="image">
        <b-card-body
        title="Ingress">
        </b-card-body>
        <b-card-text>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </b-card-text>
        <b-button @click="openIngress" variant="light"><b-icon icon="arrow-right-circle"></b-icon></b-button>
        </b-card>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',

    methods: {
      openDeployment() {
        this.$router.push({ name: 'Deployment' })
      },
      openService() {
        this.$router.push({ name: 'Service' })
      },
      openIngress() {
        this.$router.push({ name: 'Ingress' })
      }
  }
}
</script>

<style>
  .row {
    justify-content: space-around;
    padding: 8vw;
  }
  .image {
      width: 100%;
      transition: 0.3s ease;
  }
  .button {
    width: 30%;
  }

  .ingressCard, .deploymentCard, .serviceCard {
   transition: 0.27s ease;
   opacity: 0.85;
 }
 .ingressCard:hover, .serviceCard:hover, .deploymentCard:hover {
   opacity: 1;
   transform: scale(1.07);
 }

</style>
