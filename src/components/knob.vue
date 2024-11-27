<script setup>

import  EmitEvents from '../components/EmitEvents.vue';
import { ref, watch } from 'vue';

let centerX = 0;
let centerY = 0;
const angleDegree = ref(0)

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

//【滑鼠區 變數】拖移偵測
const isDragging = ref(false)




//【method和watch區】滑鼠移動弧度計算 & 角度轉換value | 更新最大最小值範圍


const getAngle = (x, y, centerX, centerY,initialAngle = 0) => {
  let angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) +90; // 計算滑鼠角度
  angle = (angle + 360) % 360; // 確保角度在 0-360 之間
  angle = (angle - initialAngle + 360) % 360; // 調整角度以考慮初始偏移
  return angle;
};

const updateValue = (angle) => {
  const normalizedAngle = angle < 0 ? angle + 360 : angle; // 將負角度轉為正角度
  const range = childComponentData.value.maxNub - childComponentData.value.minNub;
  const value = Math.round((normalizedAngle / 360) * range + childComponentData.value.minNub);
  childComponentData.value.valueNub = value ; 
  angleDegree.value = normalizedAngle
};



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

  const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
      centerX = left + width / 2;
      centerY = top + height / 2;



  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp); 
}

////拖移過程
const  onMouseMove=(event)=>{
  if(isDragging.value === true){
    const angle = getAngle(event.clientX, event.clientY, centerX, centerY,childComponentData.value.angle);
    updateValue(angle);

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

    
}

}




</style>
