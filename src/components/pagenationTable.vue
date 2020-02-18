<template>
	<div class="mobayar-actions-bottom clearfix">
		<div class="showing-page float-left">
			<span>View</span>
			<ul>
				<li class="active"><a href="#" @click.prevent="limitChange('10', $event)">10</a></li>
				<li><a href="#" @click.prevent="limitChange('25', $event)">25</a></li>
				<li><a href="#" @click.prevent="limitChange('50', $event)">50</a></li>
				<li><a href="#" @click.prevent="limitChange('100', $event)">100</a></li>
			</ul>
		</div>
		<div class="pagination-result float-right">
			<span>Showing results 1 - {{data.length}} of {{parseInt(data.pagination.rowCount)}}</span>
			<el-pagination
				layout="prev, pager, next"
				:total="parseInt(data.pagination.rowCount)"
				@current-change="pageChange"
				:page-size="parseInt(limit)">
			</el-pagination>
		</div>
	</div>
</template>

<script>
import func from '@/functions'

export default {
	props: ['data', 'dataFrom', 'limitFrom', 'pageFrom', 'searchFrom'],
	data(){
		return{
			limit: "",
			page: "",
			search: "",
		}
	},
	mounted(){
		this.limit = this.limitFrom
		this.page = this.pageFrom
		this.search = this.searchFrom
	},
	watch: {
		limitFrom(newValue){
			this.limit = newValue
		},
		pageFrom(newValue){
			this.page = newValue
		},
		searchFrom(newValue){
			this.search = newValue
		}
	},
	methods: {
		limitChange(value) {
			this.limit = value
			this.checkPaginations()
			this.$store.dispatch(this.dataFrom, func.createParams(this.limit, this.page, this.search))
			this.viewActive()
		},
		pageChange(value){
			this.page = value
			this.$store.dispatch(this.dataFrom, func.createParams(this.limit, this.page, this.search))
		},
		checkPaginations(){
			if(document.querySelector('.el-pagination') !== null){
				if(document.querySelector('.el-pagination').children[1].children[0] !== undefined){
					document.querySelector('.el-pagination').children[1].children[0].click()
				}
			}
		},
		viewActive(){
			document.querySelectorAll('.showing-page ul li').forEach(function(a){ a.classList.remove('active') })
			event.target.parentNode.classList.add('active')
		},
	},
}
</script>
