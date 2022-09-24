<!--смотри splashscreen;-->
<!--смотри index.js-->
<template>
    <div class="fon">
        <div  class="productsINcatalog">
            <div class="products" v-for="(product,index) in this.ring" :key="product.model">
                <div class="card-header">
                    <div class="card-text" style="color: white">{{ product.category }}</div>
                </div>
                <div class="card text-center" style="width: 18rem;">
                    <img v-bind:src="'/storage/'+product.image">
                    <div class="card-body ">
                        <h5 class="card-text">{{ product.name }}</h5>
                        <div class="card-text">{{ product.price }}</div>
                        <button v-on:click="addTOcart(product)" class="btn btn-outline-secondary">в корзину</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="add"></div>
    </div>
</template>
<script>
import {mapActions} from "vuex";
export default {
    name: "RingVuexComponent",
    data(){
        return{
            ring:[],
        }
    },
    mounted() {
        for (let i=0;i<this.$store.state.products.length;i++){
            if(this.$store.state.products[i].category==="ring"){
                this.ring.push(this.$store.state.products[i])
            }
        }
    },

    methods:{
        addTOcart: function (product) {
            this.$store.dispatch('TOCART', product);
        },
    },

}
</script>

<style scoped>
.fon{
    background-image: url("/storage/newimage/fon2.jpg");
    background-size:100%,50%;
    margin-top: 3em;
}
.productsINcatalog {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-left: -3em;
    margin-top: 2rem;
}
.products {
    width: 12.4em;
    height: 23em;
    margin-top: 3em;
    margin-left: 3em;
    box-shadow: 1em 1em 2em grey;
    border: 3px solid white;
    border-radius: 0.5em;
    overflow: hidden;
}
img {
    width: 13em;
    height: 13em;
}
img:hover{
    width: 23em;
    height: 23em;
    margin-left: -5rem;
}
.card-text{
    font-family: "Noto Sans";
}
.card-body{
    margin-top: -1em;
    margin-left: -5.5rem;
}
.add{
    width: 100%;
    height: 80px;
}
</style>
