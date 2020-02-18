<template>
	<div class="base-template-sidebar">
		<loading-svg :isLoading="isLoading"></loading-svg>
		<div class="content">
			<header class="clearfix">
				<h4>{{titleForms}}</h4>
				<el-button id="cancel" @click="closeModal()">
					<img :src="require('@/assets/images/icons/big-close.png')">
				</el-button>
			</header>
			<section>
				<slot></slot>
			</section>
		</div>
		<div class="actions-button clearfix">
			<el-button v-show="formEdit" class="button-outline-black" id="trash" @click.prevent="submitDelete()">
				<img :src="require('@/assets/images/icons/trash.png')" alt="img-trash">
			</el-button>
			<el-button class="button-outline-black" @click="closeModal()">
				Batal
			</el-button>
			<el-button v-show="formEdit" class="button-white-green" id="save-edit" @click.prevent="submitEdit()">
				Simpan
			</el-button>
			<el-button v-show="!formEdit" class="button-white-green" id="save" @click.prevent="submitSave()">
				Simpan
			</el-button>
		</div>
	</div>
</template>
<script>
import func from '@/functions'
import loadingSvg from '@/components/loadingSvg'

export default {
	props: {
		titleForms: String,
		isLoading: Boolean,
		formEdit: {
			type: Boolean,
			default: false,
		},
		submitSave: Function,
		submitEdit: Function,
		submitDelete: Function
	},
	methods: {
		closeModal() {
			func.sidebarToggle(false)
		},
	},
	components: {
		loadingSvg,
	},
}
</script>
