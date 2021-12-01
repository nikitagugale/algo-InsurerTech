<template>
	<div class="brand" :class="brandClass">
		<img src="../../../public/sft.png" alt="logo">
		<div v-if="type === undefined">
			<p class="marketplace">Marketplace</p>
			InsurerTech
		</div>
		<!-- <div v-show="type !== undefined" class="line"></div> -->
		<h2 v-show="type !== undefined">{{ type }}</h2>
	</div>
</template>

<script>
export default {
	name: 'Brand',
	props: ['brandClass', 'type']
}
</script>

<style lang="scss" scoped>
.brand {
	font-size: 1.6rem;
	margin-top: 1rem;
	display: flex;
	justify-content: center;
	align-items: center;

	.line {
		height: 100px;
		width: 5px;
		background-color: coral;
		margin: 0 2rem;
		border-radius: 5px;
	}

	img {
		height: 3.3rem;
		margin-right: 1rem;
	}

	.marketplace {
		margin: 0;
		font-size: 1rem;
		position: relative;
		top: 8px;
	}
}
</style>