<template>
	<div class="main">
		<div class="navigation-bar">
			<Brand></Brand>
			<div class="nav-links">
				<router-link to="/get-credits" class="tab">
					<i class="fas fa-coins"></i>
					Get Credits
				</router-link>
				<router-link to="/facoffercreation" class="tab">
					<i class="fas fa-plus-circle"></i>
					FAC Offer
				</router-link>
				<!-- <router-link to="/fund-project" class="tab">
					<i class="fas fa-project-diagram"></i>
					FAC Accept 
				</router-link> -->
				<router-link to="/fac-accept" class="tab">		<!---review funds-->
					<i class="fas fa-check-double"></i>
					FAC Accept
				</router-link>
				<button class="btn tab" @click="signOut"><i class="fas fa-sign-out-alt"></i>Sign out</button>
			</div>
		</div>
		<div ref="popup" class="popup" :class="pClass">
			<div class="header" v-show="message != ''">
				<i class="fas" :class="icon"></i>
				<span>{{ message }}</span>
			</div>
			<div class="description">{{ description }}</div>
			<input
				v-if="button == 'Confirm'"
				ref="address"
				type="text"
				placeholder="Account Address *"
				class="address"
				name="address"
				id="address"
				v-model="address"
				required />
			<div class="buttons">
				<button @click="pClass = ''" class="btn btn-primary okay">Okay</button>
			</div>
		</div>

		<!-- Top Bar -->
		<div class="top-bar">
			<div class="name">
				Welcome, {{ name }}
			</div>
			<div class="balance">
				<img src="../assets/algo.png" width="40" height="40" alt="algo-logo">
				{{ balance }}
			</div>
			<div class="account">
				<i class="fas fa-wallet"></i>
				<span>{{ account }}</span>
			</div>	
		</div>
		<transition
			name="home-router-view-transition"
			enter-active-class="animated fadeIn"
			leave-active-class="animated fadeOut"
			mode="out-in">
			<router-view @popup="gotPopup" v-slot="{ Component }">
				<component :class="{darken: this.pClass != ''}" ref="view" :is="Component" />
			</router-view>
		</transition>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import Brand from '@/components/traits/Brand.vue'

export default {
	name: 'Main',
	components: {
		Brand
	},
	data() {
		return {
			message: '',
			description: '',
			icon: '',
			pClass: '',
			address: '',
			balance: null,
			account: this.$store.state.account,
			name: this.$store.state.lastName + ' ' + this.$store.state.firstName 
		}
	},
	methods: {
		...mapActions([
			'updateAccount'
		]),
		signOut() {
			localStorage.removeItem('account')
			localStorage.removeItem('firstName')
			localStorage.removeItem('lastName')
			this.$store.dispatch('updateAccount', {
				account: '',
				firstName: '',
				lastName: ''
			})
			this.$router.push('/login')
		},
		gotPopup(message, description) {
			this.address = ''
			this.message = message
			this.description = description
			if(message != '') {
				this.icon = 'fa-check-circle'
			}
			this.pClass = 'pop'
			setTimeout(()=>{
				this.getAccountBalance()
			},1000)
		},
		async getAccountBalance() {
			try {
				let post = {
					mode: 'cors',
					method: 'POST',
					headers: { 'Content-Type': 'application/json; charset=UTF-8' },
					body: JSON.stringify({
						'account_address' : this.account,
						Token_ID: 48689901
					})
				}
				await fetch(this.$url+'/tokenbalance', post)
					.then(response => response.json())
					.then(data => {
						if(data['Token Balance'] === null)
						this.balance = 0
						else
						this.balance = data['Token Balance']
					})
			} catch(err) {
				console.log(err)
			}
		},
	},
	mounted() {
		this.getAccountBalance()
	}
}
</script>

<style lang="scss" scoped>
.top-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	position: absolute;
	top: 0;
	right: 0;
	height: fit-content;
	width: 100%;
	padding: 0.6rem 2rem 0.6rem 18rem;
	background-color: #40515E;
	color: white;
	box-shadow: 0 3px 7px -7px black;
	text-align: left;
	font-size: 1.8rem;

	.balance {
		margin: 0 2rem;
	}

	.account {
		word-break: break-all;
		display: flex;
		align-items: center;
		font-size: 1.1rem;
	}

	i {
		margin-right: 10px;
	}
}

.navigation-bar {
	height: 100%;
	width: 16rem;
	display: grid;
	grid-gap: 2.5rem;
	grid-template-rows: 4rem auto;
	background-color: navy;
	color: white;
	position: fixed;
	z-index: 1;

	.nav-links {
		display: flex;
		flex-direction: column;
		align-items: baseline;

		.fas {
			margin-right: 5px;
		}

		.tab {
			color: white;
			padding: 10px 30px;
			width: 100%;
			text-align: left;
			transition: all 200ms ease-in-out;

			&:hover {
				text-decoration: none;
				background-color: #2c7e59
			}
		}

		.router-link-active {
			color: navy !important;
			background-color: white;
			pointer-events: none;
		}
	}
}
</style>