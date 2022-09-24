<template>
<div>
    <canvas class="m" id="canvas"></canvas>
</div>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: "ThreeComponent2",
    data(){
        return{
          mesh:{},
        }
    },
    methods: {
        flagscreen: function () {
            this.$store.dispatch('ActionFlagScreen', 'shown');
        },
        ...mapActions([
            'GET_PRODUCTS_FROM_API'
        ]),
    },
    mounted() {
        this.GET_PRODUCTS_FROM_API();

       var init=function (){
           let width=window.innerWidth;
           let height=window.innerHeight;
           let canvas=document.getElementById("canvas");
           canvas.setAttribute("width",width);
           canvas.setAttribute("height",height);
           let renderer=new THREE.WebGLRenderer({canvas:canvas,alpha: true});
           renderer.setClearColor(0x000000,0);
           let scene=new THREE.Scene();
           let camera=new THREE.PerspectiveCamera(60,width/height,100,5000);
           camera.position.set(0,0,1000);
           let color = 0xffffff;
           let intensity=1;
           let light=new THREE.DirectionalLight(color, intensity);
           light.position.set(100, 200, 400);
           scene.add(light);
           let geometry=new THREE.SphereGeometry(300,20,20);
           const loaderImage = new THREE.TextureLoader();

           function createMaterial() {
               let material = new THREE.MeshPhongMaterial({
                   map: loaderImage.load('/storage/newimage/earth.jpg'),
               });
               let color=0;
               let saturation = 0;
               let luminance = 1;
               material.color.setHSL(color,saturation,luminance);
               return material;
           }
           let mesh=new THREE.Mesh(geometry,createMaterial())
           scene.add(mesh);

           const textOrbit = new THREE.Object3D();
           scene.add(textOrbit);

           const loader = new THREE.FontLoader();
           function loadFont(url) {
               return new Promise((resolve, reject) => {
                   loader.load(url, resolve, undefined, reject);
               });
           }
           async function doit() {
               let font = await loadFont('https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json');
                let text="octarine_art";
               let geometry2=new THREE.TextGeometry(text,{
                   font:font,
                   size:100,
                   height:25,
                   curveSegments:12,
                   bevelEnabled:true,
                   bevelThickness:0.15,
                   bevelSize:0.3,
                   bevelSegments:5,
               })

               function createMaterialOctarine() {
                   let materialOctarine = new THREE.MeshPhongMaterial({
                   });
                   let color=0;
                   let saturation = 1;
                   let luminance = .5;
                   materialOctarine.color.setHSL(color, saturation, luminance);
                   return materialOctarine;
               }

               let octarineMesh=new THREE.Mesh(geometry2,createMaterialOctarine());
               octarineMesh.position.x = -350;
                octarineMesh.position.z= 400;
               octarineMesh.position.y= -30;
               textOrbit.add(octarineMesh);

               let loopOctarine=function (){
                   textOrbit.rotation.y-=Math.PI/200;
                   renderer.render(scene,camera);
                   requestAnimationFrame(function () {loopOctarine();});
               }
               loopOctarine();
           }
           doit();

          let loop=function (){
              mesh.rotation.y+=Math.PI/500;
              renderer.render(scene,camera);
              requestAnimationFrame(function () {loop();});
          }
           loop();
       }
        init();
        setTimeout(this.flagscreen, 7100);

    }
}
</script>

<style scoped>
.m{
    background-image:url("/storage/newimage/cosmos.jpg");
    width: 100%;
    height: 100%;
}
</style>
