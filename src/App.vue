<template>
	<div id="app">
		<div id="nav">
			<!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
		</div>
		<router-view></router-view>
	</div>
</template>

<script type="text/javascript">
export default {
  data: function () {
    return {
      token: 'e8a128b5-98ae-4bf6-8da4-d6b4bfbdab81'
    }
  }
}
</script>
<style lang="less">
</style>
