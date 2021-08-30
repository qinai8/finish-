<template>
  <div @click="dianwo">我是首页5</div>
</template>
<script>
// import { listRole } from "../../request/api";
export default {
  data () {
    return {}
  },
  methods: {
    dianwo () {
      const result = listRole('1', 'aaa')
      console.log(result)
      // console.log(1111)
    }
  }
}
</script>
