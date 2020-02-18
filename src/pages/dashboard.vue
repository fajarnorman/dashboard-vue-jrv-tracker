<template>
	<div class="content-wrapper">
		<div class="page-header">
			<page-header titleName="Devices Tracker" :isCreate="true" />
		</div>
		<div class="content">
			<div class="filterSearching clearfix">
				<div class="input-with-icons clearfix">
					<el-input v-model="search" class="float-left"></el-input>
					<img :src="require('@/assets/images/icons/search1.png')">
				</div>
			</div>
			<el-table
				:data="data.data"
				max-height="530"
				empty-text="No data available in table"
				ref="singleTable"
				v-loading="isLoading"
				@current-change="handleCurrentChange"
				class="mobayar-table">
				<el-table-column label="Device ID" prop="device_id"></el-table-column>
				<el-table-column label="Device Status" prop="device_status"></el-table-column>
				<el-table-column label="Lock Status" prop="lock_status"></el-table-column>
				<el-table-column label="Created At">
					<template slot-scope="scope">
						{{scope.row.createdAt | moment("YYYY-MM-DD, H:mm:ss")}}
					</template>
				</el-table-column>
				<el-table-column label="Updated At">
					<template slot-scope="scope">
						{{scope.row.updateAt | moment("YYYY-MM-DD, H:mm:ss")}}
					</template>
				</el-table-column>
			</el-table>
			<paginationTable
				:dataFrom="fetchData"
				:data="data"
				:limitFrom="limit"
				:pageFrom="page"
				:searchFrom="search"/>
			<sidebar-content
				ref="sidebar-content"
				titleForms="Create Devices Tracker"
				:isLoading="isLoadingDetail"
				:formEdit="formEdit"
				:submitSave="submitSave"
				:submitEdit="submitEdit"
				:submitDelete="submitDelete">
				<el-form
					:model="forms"
					status-icon
					:rules="rules"
					ref="formsvalid"
					label-width="120px"
					class="demo-ruleForm">
					<div class="item-forms-details">
						<div class="forms-details">
							<el-row :gutter="20">
								<el-col :span="24">
									<el-form-item label="Devices Id" prop="devices_id">
										<el-input v-model="forms.devices_id"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
						</div>
					</div>
				</el-form>
			</sidebar-content>
		</div>
	</div>
</template>

<script>
import func from "@/functions"
import { mapGetters } from "vuex"
import { FETCH_DATA_DEVICES, SAVE_DATA_DEVICES, FETCH_DATA_DETAIL_DEVICES } from "@/store/actions.type"
import pageHeader from '@/components/pageHeader'
import paginationTable from '@/components/pagenationTable'
import sidebarContent from '@/components/sidebarContent'

export default {
	name: 'dashboard',
	data(){
		return{
			fetchData: FETCH_DATA_DEVICES,
			limit: 10,
			page: 1,
			search: "",
			formEdit: true,
			forms: {
				devices_id: ""
			},
			rules: {},
		}
	},
	mounted() {
		this.$store.dispatch(FETCH_DATA_DEVICES, "")
	},
	methods: {
		handleCurrentChange(val){
			if(val){
				this.formEdit = true
				func.sidebarToggle(true)
				this.$store
					.dispatch(FETCH_DATA_DETAIL_DEVICES, "/" + val._id)
					.then(() => {
						this.forms.devices_id = this.dataDetail.device_id
					})
			}
		},
		submitSave(){
			let dataForm = { device_id: this.forms.devices_id }
			this.$store
				.dispatch(SAVE_DATA_DEVICES, dataForm)
				.then(() => {
					this.forms.devices_id = ""
					func.sidebarToggle(false)
				})
		},
		submitEdit(){
			console.log("Submit Edit")
		},
		submitDelete(){
			console.log("Submit Delete")
		}
	},
	computed: {
		...mapGetters(["data", "isLoading", "dataDetail", "isLoadingDetail"]),
	},
	components: {
		pageHeader,
		paginationTable,
		sidebarContent
	},
}
</script>
