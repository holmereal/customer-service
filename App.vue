<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		created() {
			if (window.localStorage.getItem('identificationNumber') == null) {
			  window.localStorage.setItem('identificationNumber', this.guid())
			}
		},
		methods: {
			guid () {
			  let d = new Date().getTime();
			  if (window.performance && typeof window.performance.now === "function") {
			    d += performance.now(); //use high-precision timer if available
			  }
			  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			    let r = (d + Math.random() * 16) % 16 | 0;
			    d = Math.floor(d / 16);
			    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
			  });
			  return uuid;
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("common/css/reset.css");
	
	.van-checkbox__label{
		color: #FFFFFF !important;
	}
	body{
		user-select: text;
	}
	.MsgClass{
	  top: 50px !important;
	  left: 50% !important;
	  margin-left: -100px !important;
	  border-radius: 10px !important;
	  max-width: 200px !important;
	  min-height: 60px;
	}
</style>
