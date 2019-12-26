<template>
  <detail :is-edit="false" />
</template>
<script>
import Detail from './components/Detail'
export default {
  name: 'BookCreate',
  components: {
    Detail
  }
}
</script>
