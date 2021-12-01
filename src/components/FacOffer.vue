<template>
	<section id="fac-offer">
		<h2>FAC Offer</h2>
		<form @submit.prevent="facOffer">
				<div class = "split">				
				<div class="input-field with-label">
					<label>Policy Number</label>
					<input type="number" v-model="PolicyNo" required />
				</div>
				-
				<div class="input-field with-label">
					<label>Insurer Address</label>
					<input type="text" v-model="Insurer_Address" required />
				</div>
				</div>
				<div class = "split">
				<div class="input-field with-label">
					<label>Product ID</label>
					<input type="number" v-model="ProductID" required />
				</div>
				-
				<div class="input-field with-label">
					<label>Product Name</label>
					<input type="text" v-model="Product_Name" required />
				</div>
				</div>
				<div class = "split">
				<div class="input-field with-label">
					<label>ReInsurer1 Address</label>
					<input type="text" v-model="ReInsurer1_Address" required />
				</div>
				-
				<div class="input-field with-label">
					<label>ReInsurer2 Address</label>
					<input type="text" v-model="ReInsurer2_Address" required />
				</div>
				</div>
				<div class = "split">
				<div class="input-field with-label">
					<label>Risk Type</label>
				<input type="text" v-model="Risk_Type" required />
				</div>
				-
				<div class="input-field with-label">
					<label>TokenID</label>
					<input type="number" v-model="TokenID" required />
				</div>
				</div>
				<div class = "split">
				<div class="input-field with-label">
					<label>FAC SI</label>
					<input type="number" v-model="FAC_SI" required />
				</div>
				-
				<div class="input-field with-label">
					<label>FAC Premium</label>
					<input type="number" v-model="FAC_Premium" required />
				</div>
				</div>
				<div class = "split">
				<div class="input-field with-label">
					<label>Total SI</label>
					<input type="number" v-model="Total_SI" required />
				</div>
				-
				<div class="input-field with-label">
					<label>Total Premium</label>
					<input type="number" v-model="FAC_Premium" required />
				</div>
				</div>
				<div class = "split">
				<div class="input-field with-label">
					<label>ReInsurer1 Amount</label>
					<input type="number" v-model="ReInsurer1_Amount" required />
				</div>
				-
				<div class="input-field with-label">
					<label>ReInsurer2 Amount</label>
					<input type="number" v-model="ReInsurer2_Amount" required />
				</div>
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
	name: 'facOffer',
	data() {
		return {
			isLoading: false,
			ReInsurer1_Address: '',
			ReInsurer2_Address: '',
			Insurer_Address: '',
			PolicyNo: null,
			ProductID: null,
			Product_Name: '',
			Risk_Type: '',
			Total_SI: null,
			Total_Premium: null,
			FAC_SI: null,
			FAC_Premium: null,
			ReInsurer1_Amount: null,
			ReInsurer2_Amount: null,
			TokenID: null,
		}
	},
	methods: {
		async facOffer() {
			try {
				this.isLoading = true
				let post = {
					mode: 'cors',
					method: 'POST',
					headers: { 'Content-Type': 'application/json; charset=UTF-8' },
					body: JSON.stringify({
						'ReInsurer1_Address' : this.$store.state.account,
						'ReInsurer2_Address' : this.$store.state.account,
						'Insurer_Address' : this.$store.state.account,
						'PolicyNo' : this.PolicyNo, 
						'ProductID' : this.ProductID,
						'Product_Name' : this.Product_Name,
						'Risk_Type' : this.Risk_Type,
						'Total_SI' : this.Total_SI,
						'Total_Premium' : this.Total_Premium,
						'FAC_SI' : this.FAC_SI,
						'FAC_Premium' : this.FAC_Premium,
						'ReInsurer1_Amount' : this.ReInsurer1_Amount,
						'ReInsurer2_Amount' : this.ReInsurer2_Amount,
						'TokenID' : this.TokenID, 
					})
				}
				await fetch(this.$url+'/facoffercreation', post)
					.then(response => response.json())
					.then(data => {
						this.$emit('popup', 'FAC Offer created successfully!', 'Your FAC Offer ID is '+data.appID)
						this.PolicyNo = ''
						this.ProductID = ''
						this.Product_Name = ''
						this.Risk_Type = ''
						this.Total_SI = ''
						this.Total_Premium = ''
						this.FAC_SI = ''
						this.FAC_Premium = ''
						this.ReInsurer1_Amount = ''
						this.ReInsurer2_Amount = ''
					})
			} catch(err) {
				this.$emit('popup', '', 'An error occurred while creating your order.')
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