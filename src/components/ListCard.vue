<template>
    <div class="card">
        <h3 class="cardTitle overflowElipsis">{{title}}</h3>
        <router-link
          id="listLink"
          :to="{ name: 'todoList', params: { listId: listId }}">
          open List
        </router-link>
    </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    listId: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
  .card {
    width: 150px;
    padding: 8px;
    margin: 8px;
    border-radius: 4px;
    background: white;
    box-shadow: #627479 2px 2px 4px;
    text-align: center;

    .overflowElipsis {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    #listLink {
        width: 100%;
        background: #428ca2;
        color: white;
        padding: 8px;
        border-radius: 2px;
        cursor: pointer;
        text-decoration: none;
        display: block;
    }
}
</style>
