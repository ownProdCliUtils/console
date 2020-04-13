<template>
  <div id="test">
    <SqlEidt @getSql="getSql"></SqlEidt>
  </div>
</template>
<script>
import SqlEidt from '@/components/sqlEidt'
export default {
  data() {
    return {}
  },
  components: {
    SqlEidt
  },
  computed: {},
  methods: {
      getSql(val){
          console.log('val: ', val);
      }
  }
}
</script>
<style lang="scss" scoped>
</style>
