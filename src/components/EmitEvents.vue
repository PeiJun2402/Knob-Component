<script setup>
import { computed, ref, watch } from 'vue';

const inputData = ref({
    angle:0,
    minNub:0,
    maxNub:100,
    valueNub:0,
    outerCicleColor:"#2ad2e8",
    outerBGColor:"#ebebeb",
    innerCicleColor:"#ffffff",
    outerCicleSize:200,
    innerCicleSize:150

})

const emit =defineEmits(["updateCircleData"])

const handleInput = ()=>{
    emit("updateCircleData",inputData.value)
}
</script>

<template>

<form  @change.prevent = handleInput>
      <div class="nubValue">
        <div class="singleInput">
        <label for="startAngle">開始角度</label>
        <input type="number" id="startAngle" v-model.number="inputData.angle">
      </div>
      <div class="singleInput">
        <label for="minNub">最小值</label>
        <input type="number" id="minNub" v-model.number="inputData.minNub">
      </div>
      <div class="singleInput">
        <label for="maxNub">最大值</label>
        <input type="number" id="maxNub" v-model="inputData.maxNub">
      </div>
      </div>

      <div class="colorSizeValue">
        <div class="singleInput">
        <label for="outerCicleColor">外圈顏色</label>
        <input type="color" id="outerCicleColor" v-model="inputData.outerCicleColor">
      </div>
      <div class="singleInput">
        <label for="outerBGColor">外圈背景顏色</label>
        <input type="color" id="outouterBGColor" v-model="inputData.outerBGColor">
      </div>
      <div class="singleInput">
        <label for="innerCicleColor">內圈顏色</label>
        <input type="color" id="innerCicleColor" v-model="inputData.innerCicleColor">
      </div>
      <div class="singleInput">
        <label for="outerCicleSize">外圈尺寸</label>
        <input type="number" id="outerCicleSize" v-model.number="inputData.outerCicleSize">
      </div>
      <div class="singleInput">
        <label for="innerCicleSize">內圈尺寸</label>
        <input type="number" id="innerCicleSize" v-model.number="inputData.innerCicleSize">
      </div>
      </div>
      
    </form>


</template>

<style lang="scss">
form{
    @include layout(column,center,center);
      gap: 2rem;
      
      .nubValue{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
  

      }
      .colorSizeValue{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;


      }

      .singleInput{
        margin: 0 1rem;
        label{
        display: block;
        }
        input{
          width: 100%;
          height: 70%;
          padding: 0 0.5rem;
          border-radius: 0.5rem;
          border: 1px black solid;
        }
      }

     



}
</style>