<script setup lang="ts">
import { ref } from 'vue';

const items = ref([{}, {}, {}, {}, {}, {}, {}]);

const onLoad = (index, done) => {
  setTimeout(() => {
    items.value.push({}, {}, {}, {}, {}, {}, {});
    done();
  }, 2000);
};
/**
 * @load: 이 이벤트는 사용자가 스크롤을 하여 지정된 오프셋에 도달했을 때 발생합니다.
 * onLoad 메서드는 새로운 데이터를 불러오는 데 사용됩니다.
 * 메서드에서 데이터를 불러온 후, 무한 스크롤이 계속 진행되도록 loaded() 함수를 호출해야 합니다.
 *
 * :offset: 이 속성은 스크롤이 페이지 끝에 도달하기 전 얼마나 먼저 @load 이벤트를 발생시킬 것인지를 픽셀 단위로 지정합니다.
 * 예를 들어, :offset="1"은 사용자가 실제 페이지 끝에서 1픽셀 떨어진 지점에 도달했을 때 데이터를 불러오기 시작합니다.
 */
</script>
<template>
  <div class="q-pa-md">
    <q-infinite-scroll @load="onLoad" :offset="1">
      <div v-for="(item, index) in items" :key="index" class="caption">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
          perferendis totam, ea at omnis vel numquam exercitationem aut, natus
          minima, porro labore.
        </p>
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>
<style></style>
