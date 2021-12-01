<template>
	<div id="signup">
		<Brand brandClass="form-brand" type="Signup"></Brand>
		<form class="signup-form" @submit.prevent="registerUser">
			<div class="input-field">
				<input ref="firstName" type="text" placeholder="First Name *" v-model="firstName" required />
			</div>
			<div class="input-field">
				<input ref="lastName" type="text" placeholder="Last Name *" v-model="lastName" required />
			</div>
			<div class="input-field">
				<input ref="email" type="email" placeholder="Email *" v-model="email" required />
			</div>
			<div class="input-field">
				<input ref="password" type="password" placeholder="Password *" v-model="password" required />
			</div>
			<div class="input-field">
				<input ref="confirmPassword" type="password" placeholder="Confirm Password *" v-model="confirmPassword" required />
			</div>
			<div class="split">
				<div>
					Already have an account? 
					<router-link to="/login">Login</router-link>
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
import Brand from '@/components/traits/Brand.vue'

export default {
	name: 'Signup',
	components: {
		Brand
	},
	data() {
		return {
			isLoading: false,
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: ''
			// accountAddress: ''
		}
	},
	methods: {
		async registerUser() {
			try {
				this.isLoading = true
				if(this.password !== this.confirmPassword) {
					this.$emit('externalPopup', '', 'Password & Confirm Password must match.')
					this.isLoading = false
					return
				}
				let postData = {
					First_Name: this.firstName,
					Last_Name: this.lastName,
					Email: this.email,
					Password: this.password,
				}
				let post = {
					mode: 'cors',
					method: 'POST',
					headers: { 'Content-Type': 'application/json; charset=UTF-8' },
					body: JSON.stringify(postData)
				}
				await fetch(this.$url+'/signup', post)
					.then(response => response.json())
					.then((data) => {
						this.$emit('externalPopup', 'Account created successfully!', data.account_address)
						this.$router.push('/login')
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
#signup {
	display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
	min-width: 45rem;
	margin: auto;
}
</style>