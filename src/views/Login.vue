<template>
	<div id="login">
		<Brand brandClass="form-brand" type="Login"></Brand>
		<form class="login-form" @submit.prevent="submitLoginForm">
			<div class="input-field">
				<input ref="email" type="email" placeholder="Email *" v-model="email" required />
			</div>
			<div class="input-field">
				<input ref="password" type="password" placeholder="Password *" v-model="password" required />
			</div>
			<div class="split">
				<div class="to-registration">
					Don't have an account?
					<router-link to="/signup">Signup</router-link>
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
			</div>
		</form>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import Brand from '@/components/traits/Brand.vue'

export default {
	name: 'Login',
	components: {
		Brand
	},
	data() {
		return {
			isLoading: false,
			email: '',
			password: ''
		}
	},
	methods: {
		...mapActions([
			'updateAccount'
		]),
		async submitLoginForm() {
			try {
				this.isLoading = true
				let postData = {
					Email: this.email,
					Password: this.password,
				}
				let post = {
					mode: 'cors',
					method: 'POST',
					headers: { 'Content-Type': 'application/json; charset=UTF-8' },
					body: JSON.stringify(postData)
				}
				await fetch(this.$url+'/login', post)
					.then(response => response.json())
					.then(data => {
						if(data.status === false) {
							this.$emit('externalPopup', '', 'Your email or password is incorrect.')
						} else {
							this.$store.dispatch('updateAccount', data)
							this.$router.push('/facoffercreation')
						}
					})
			} catch(err) {
				console.log(err)
				this.$emit('externalPopup', '', 'An error occurred.')
			}
			this.isLoading = false
		}
	}
}
</script>

<style lang="scss" scoped>
#login {
	display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
	min-width: 45rem;
	margin: auto;
}
</style>