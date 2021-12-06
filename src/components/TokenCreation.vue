<template>
	<section id="token-creation">
		<h3>Buy Token</h3>
		<form @submit.prevent="tokenCreation">
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
                <label>Number of Tokens :</label>
				<input type="number" v-model="No_Of_Credits" required />
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
	name: 'tokenCreation',
	data() {
		return {
			isLoading: false,
			No_Of_Tokens: null,
		}
	},
	methods: {
		async tokenCreation() {
			try {
				this.isLoading = true
				let post = {
					mode: 'cors',
					method: 'POST',
					headers: { 'Content-Type': 'application/json; charset=UTF-8' },
					body: JSON.stringify({
						'Purchaser_Address' : this.$store.state.account,
						'No_Of_Tokens' : this.No_Of_Tokens,
						'Token_ID': 48764113,
					})
				}
				await fetch(this.$url+'/tokentransfer', post)
					.then(response => response.json())
					.then(
						this.$emit('popup', 'Tokens Deposited Successfully!')
						// this.url = ''
						// this.funds = null
					)
			} catch(err) {
				this.$emit('popup', '', 'An error occurred while transferring tokens.')
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
		this.focusInput()
		let today = new Date()
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();
		this.startDate = yyyy + '-' + mm + '-' + dd;
	}
}
</script>

<style scoped>
.split {
	align-items: center;
	grid-template-columns: 18.8% 1% 18.8%;
}
</style>