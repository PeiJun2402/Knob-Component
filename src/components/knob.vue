<script setup>

import  EmitEvents from '../components/EmitEvents.vue';
import { computed, ref, watch } from 'vue';


//【input區 變數】基本數值&顏色&尺寸
const childComponentData = ref({
  angle:0,
  minNub:0,
  maxNub:100,
  valueNub:0,
  outerCicleColor:"#2ad2e8",
  outerBGColor:"#ebebeb",
  innerCicleColor:"#ffffff",
  outerCicleSize:200,
  innerCicleSize:150

});

const reciveData =(data)=>{
   ({
    angle: childComponentData.value.angle,
    minNub: childComponentData.value.minNub,
    maxNub: childComponentData.value.maxNub,
    valueNub: childComponentData.value.valueNub,
    outerCicleColor: childComponentData.value.outerCicleColor,
    outerBGColor: childComponentData.value.outerBGColor,
    innerCicleColor: childComponentData.value.innerCicleColor,
    outerCicleSize: childComponentData.value.outerCicleSize,
    innerCicleSize: childComponentData.value.innerCicleSize,
  } = data)

}

//【滑鼠區 變數】拖移偵測&按鍵偵測
const isDragging = ref(false)
const directionMouse = ref(null)



//【computed和watch區】value大小值差異 & 占比面積 | 更新最大最小值範圍

const gapValue = computed(()=>{
 return childComponentData.value.maxNub - childComponentData.value.minNub
})


const angleDegree = computed(()=>{
 return 360/gapValue.value * (childComponentData.value.valueNub-childComponentData.value.minNub) 
})



watch(() =>childComponentData.value.valueNub,(newValue)=>{
  if (newValue < childComponentData.value.minNub) {
    childComponentData.value.valueNub = childComponentData.value.minNub;
  } else if (newValue > childComponentData.value.maxNub) {
    childComponentData.value.valueNub = childComponentData.value.maxNub;
  }

})

watch(
  [() => childComponentData.value.minNub, () => childComponentData.value.maxNub],
  () => {
    if (childComponentData.value.valueNub < childComponentData.value.minNub) {
      childComponentData.value.valueNub = childComponentData.value.minNub;
    } else if (childComponentData.value.valueNub > childComponentData.value.maxNub) {
      childComponentData.value.valueNub = childComponentData.value.maxNub;
    }
  }
);

//【事件】
//拖移開始
const onMouseDown =(event)=>{
  isDragging.value = true;
  console.log(childComponentData.value)


  switch (event.button) {
    case 0:
      directionMouse.value = true
      break;

    case 2:
      directionMouse.value = false
      break;

    default:
      alert("請用滑鼠左鍵增加數值，右鍵減少數值")
  }

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp); 
}

////拖移過程
const  onMouseMove=(event)=>{
  if(isDragging.value === true){


    if(directionMouse.value=== false){ 
      childComponentData.value.valueNub--
    }
    else  if(directionMouse.value === true){ 
      childComponentData.value.valueNub++
     
    }
}}

//拖移結束
const onMouseUp=()=>{
  isDragging.value = false;
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
}



</script>

<template>
  <section>
    <div class="container">
      <div class="form">
        <EmitEvents
        @updateCircleData="reciveData"/>

      </div>

    
      <div class="circularArea">
          <div  @mousedown="onMouseDown"  @contextmenu.prevent class="circularProgess" :style="{
            '--angle': `${childComponentData.angle}deg`,
            '--valueNub': `${angleDegree}deg`,
            '--outerCicleColor': `${childComponentData.outerCicleColor}`,
            '--outerBGColor': `${childComponentData.outerBGColor}`,
            '--innerCicleColor': `${childComponentData.innerCicleColor}`,
            '--outerCicleSize': `${childComponentData.outerCicleSize}px`,
            '--innerCicleSize': `${childComponentData.innerCicleSize}px`,


            }">
              <p class="progressValue">{{childComponentData.valueNub}}%</p>
          </div>
       </div>

       <p class="infoWord">在圓圈內【 滑鼠左鍵拖移:增加數值 | 滑鼠右鍵拖移:減少數值】</p>

  </div>

  </section>

  
  
</template>

<style lang="scss">

section{
  width: 100vw;
  height: 100vh;
  background : linear-gradient( #7d2ae8, #2ad2e8);
  @include layout(column,center,center);

  .container{
    width: 80%;
    height: 80%;
    padding: 2rem 0;
    margin: 0rem auto;
    background-color: white;
    border-radius: 2rem;
    @include layout(column,center,center);

    .form{
      flex: 1;

    }

    .circularArea{
      flex: 2.5;
      @include layout(column,center,center);
      
      .circularProgess{
        
        width: var(--outerCicleSize);
        height: var(--outerCicleSize);
        position: relative;
        border-radius: 50%;
        background: conic-gradient(from var(--angle),var(--outerCicleColor) var(--valueNub) , var(--outerBGColor) 0deg);
        

        @include layout(column,center,center);

        &::before{
            content:"";
            position: absolute;
            width: var(--innerCicleSize);
            height: var(--innerCicleSize);

            border-radius: 50%;
            background-color: var(--innerCicleColor);

        }

        .progressValue{
            z-index: 1;
        }

    }
     

    }

    .infoWord{
          letter-spacing: 0.5rem;
          color: gray;
        }

    
}

}




</style>
