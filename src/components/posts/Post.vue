<template>
<div>
<h1>Your posts</h1>
<p>{{id}}</p>
</div>
</template>

<script>
export default {
data(){
    return {
        id:this.$route.params.cmtId
    }
}
}
</script>

<style>

</style>