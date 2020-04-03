<template>
  <div id="app">
    <Contain></Contain>
  </div>
</template>
<script>
import Contain from './views/contain'
export default {
  data() {
    return {}
  },
  components: {
    Contain
  }
}
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
  font-size: 12px;
  color: #404041;
  font-family: Arial, '微软雅黑';
}
.title{
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: #404041;
}
</style>
