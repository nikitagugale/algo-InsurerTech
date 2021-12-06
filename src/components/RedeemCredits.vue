<template>
	<section id="credit-redeem">
		<h3>Redeem Tokens</h3>
		<form @submit.prevent="tokenRedeem">
			<!-- <div class="input-field with-label">
                <label>InsurerTech Address</label>
				<input ref="name" type="text" v-model="name" required />
			</div>
			<div class="input-field with-label">
                <label>Total</label>
				<input type="url" v-model="url" required />
			</div>
			<div class="input-field with-label">
                <label>Symbol</label>
				<input type="number" v-model="funds" required />
			</div>
            <div class="input-field with-label">
                <label>Token Name</label>
				<input type="text" v-model="name" required />
			</div>
            <div class="input-field with-label">
                <label>URL</label>
				<input type="text" v-model="name" required />
			</div> -->
            <div class="input-field with-label">
                <label>Number Of Tokens : </label>
				<input type="number" v-model="Amount" required />
			</div>
			<button type="submit" class="btn btn-primary" value="Submit">
				<div v-if="!isLoading">Submit</div>
				<div v-else class="lds-ring">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</button>
		</form>
	</section>	
</template>

<script>
export default {
	name: 'tokenRedeem',
	data() {
		return {
			isLoading: false,
			Amount: null,
		}
	},
	methods: {
		async tokenRedeem() {
			try {
				this.isLoading = true
				let post = {
					mode: 'cors',
					method: 'POST',
					headers: { 'Content-Type': 'application/json; charset=UTF-8' },
					body: JSON.stringify({
						'Token_Revoke_Address' : this.$store.state.account,
						'Amount' : this.Amount,
						'Token_ID': 48764113,
					})
				}
				await fetch(this.$url+'/tokenredeem', post)
					.then(response => response.json())
					.then(
						this.$emit('popup', 'Tokens Redeemed Successfully!')
						// this.url = ''
						// this.funds = null
					)
			} catch(err) {
				this.$emit('popup', '', 'An error occurred while redeeming.')
				console.log(err)
			} 
			this.isLoading = false
		},
		focusInput() {
			setTimeout(() => {
				this.$refs.name.focus()
			}, 100)
		}
	},
	mounted() {
	}
}
</script>

<style scoped>
.split {
	align-items: center;
	grid-template-columns: 18.8% 1% 18.8%;
}
</style>