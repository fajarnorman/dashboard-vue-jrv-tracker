export default {
	sidebarToggle(value){
        if(value == true){
            document.querySelector('.base-template-sidebar').classList.add('showing')
            document.querySelector('.backdrop').classList.add('show')
            document.querySelector('body').classList.add('no-scroll')
        }else{
            document.querySelector('.base-template-sidebar').classList.remove('showing')
            document.querySelector('.backdrop').classList.remove('show')
            document.querySelector('body').classList.remove('no-scroll')
        }
	},
	createParams(limit, page, search){
		return "?limit=" + limit + "&page=" + page + "&search=" + search
	},
}
