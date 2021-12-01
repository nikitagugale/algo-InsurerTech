<template>
	<section id="fund-projects">
		<h2>Fund Project</h2>	
		<div class="Projects">
			<table class="table table-striped">
				<thead>
					<tr>
						<td class="heading center">Project ID</td>
						<td class="heading center">Project Name</td>
						<td class="heading center">Project URL</td>
						<td class="heading center">Funding Goal</td>
						<td class="heading center">Total Funding</td>
						<td class="heading center">Invest</td>
					</tr>
				</thead>
				<tbody>
					<tr v-if="projects == ''">
						<td class="empty" colspan="7">There are no more open projects.</td>
					</tr>
					<tr v-else v-for="(project, index) in projects" :key="index">
						<td class="data center">{{ project.appID }}</td>
						<td class="data center">{{ project.project_name }}</td>
						<td class="data center"><a :href="project.project_url" target="_blank">{{ project.project_url }}</a></td>
						<td class="data center">{{ project.fund / 1000000 }}</td>
						<td class="data center">0</td>
						<td class="data center">
							<label @click="selectedProject = project" for="accept-order">
								<input type="radio" name="accept-order">
							</label>
						</td>
					</tr>
				</tbody>
			</table>
			<button v-show="projects != ''" @click="confirmInvestment" class="btn btn-primary">
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
	name: 'FundProjects',
	data() {
		return {
			isLoading: false,
			projects: [],
			selectedProject: {}
		}
	},
	methods: {
		async confirmInvestment() {
			try {
				this.isLoading = true
				let project = this.selectedProject
				let data = {
					Creator_Address: project.creator_address,
					Investor_Address: this.$store.state.account,
					appID: project.appID,
					Invest_Accept: 1,
				}
				let post = {
					mode: 'cors',
					method: 'POST',
					headers: { 'Content-Type': 'application/json; charset=UTF-8' },
					body: JSON.stringify(data)
				}
				await fetch(this.$url+'/invest', post)
				.then(() => {
					this.$emit('popup', 'Investment successful!', 'The investment amount has been deducted from your account.')
					this.loadData()
				}) 
			} catch(err) {
				this.$emit('popup', '', 'There was an error.')
			}
			this.isLoading = false
		},
		async loadData() {
			try {
				this.isLoading = true
				let get = {
					mode: 'cors',
					method: 'GET',
					headers: { 'Content-Type': 'application/json; charset=UTF-8' },
				}
				await fetch(this.$url+'/facofferlist', get)
					.then(response => response.json())
					.then(data => {
						this.projects = []
						data.projects.map(p => {
							if(p.invest_accept == 0 && p.creator_address != this.$store.state.account) {
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

<style lang="scss" scoped>
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