<template>
	<section id="approve-reject-funds">
		<h2>Review Funds</h2>
		<div class="Projects">
			<table class="table table-striped">
				<thead>
					<tr>
						<td class="heading center">Project ID</td>
						<td class="heading center">Project Name</td>
						<td class="heading center">Funding Goal</td>
						<td class="heading center">Total Funding</td>
						<td class="heading center">Approve</td>
						<td class="heading center">Reject</td>
					</tr>
				</thead>
				<tbody>
					<tr v-if="projects == ''">
						<td class="empty" colspan="7">You do not have any open projects.</td>
					</tr>
					<tr v-else v-for="(project, index) in projects" :key="index">
						<td class="data center">{{ project.appID }}</td>
						<td class="data center">{{ project.project_name }}</td>
						<td class="data center">{{ project.fund / 1000000 }}</td>

						<td class="data center" v-if="project.invest_accept == 1">{{ project.fund / 1000000 }}</td>
						<td class="data center" v-else>0</td>
						
						<td class="data center">
							<label v-if="project.invest_accept == 1" @click="selectedProject = project; type = 'approve'" for="accept-order">
								<input type="radio" name="accept-order">
							</label>
						</td>
						<td class="data center">
							<label v-if="project.invest_accept == 1" @click="selectedProject = project; type = 'reject'" for="accept-order">
								<input type="radio" name="accept-order">
							</label>
						</td>
					</tr>
				</tbody>
			</table>
			<button v-show="projects != ''" @click="approveOrRejectFunds" class="btn btn-primary">
				<div v-if="!isLoading">Confirm</div>
				<div v-else class="lds-ring">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</button>
		</div>
	</section>
</template>

<script>
export default {
	name: 'ApproveRejectFunds',
	data() {
		return {
			isLoading: false,
			projects: [],
			selectedProject: {},
			type: '',
		}
	},
	methods: {
		async approveOrRejectFunds() {
			try {
				this.isLoading = true
				let project = this.selectedProject
				let type = this.type
				let popupTitle = type == 'reject' ? 'Investment rejected' : 'Investment approved'
				let popupDesc = type == 'reject' ? 'The investment amount has been returned back to the invester.' : 'The investment amount has been credited to your account.'
				let data = {
					'Investor_Address': project.investor_address,
					'Creator_Address': this.$store.state.account,
					'appID': project.appID,
					'Creator_Approve': type == 'reject' ? 0 : 1,
				}
				let post = {
					mode: 'cors',
					method: 'POST',
					headers: { 'Content-Type': 'application/json; charset=UTF-8' },
					body: JSON.stringify(data)
				}
				await fetch(this.$url+'/investapprove', post)
					.then(() => {
						this.$emit('popup', popupTitle, popupDesc)
						this.loadData()
					}) 
			} catch(err) {
				this.$emit('popup', '', 'There was an error.')
			}
			this.isLoading = true
		},
		async loadData() {
			try {
				this.isLoading = true
				let post = {
					mode: 'cors',
					method: 'POST',
					headers: { 'Content-Type': 'application/json; charset=UTF-8' },
					body: JSON.stringify({
						'creator_address': this.$store.state.account
					})
				}
				await fetch(this.$url+'/projectlistonaddress', post)
					.then(response => response.json())
					.then(data => {
						this.projects = []
						data.orderlist.map(p => {
							if(p.status == 0) {
								this.projects.push(p)
							}
						})
					})
			} catch (err) {
				this.$emit('popup', '', 'There was error fetching project data.')
			}
			this.isLoading = false
		},
	},
	mounted() {
		this.loadData()
	}
}
</script>

<style scoped>
table {
	margin: 2rem 0;
}
td {
	padding: 0 20px;
}
.data {
	word-break: break-word;
	text-align: left;
	vertical-align: inherit;
	padding: 0.5rem 0;
}
.heading {
	text-align: left;
	font-weight: 600;
	font-size: 1.2rem;
}
.center {
	text-align: center;
}

input[type=radio] {
	width: 1rem;
	height: 1rem;
	vertical-align: -webkit-baseline-middle;
}

.empty {
	font-size: 1.4rem;
}
</style>