<template>
    <div class="card">
        <h3 id="cardTitle"></h3>
        <a id="listLink" :href="link">
            <button>
                open List
            </button>
        </a>
    </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
